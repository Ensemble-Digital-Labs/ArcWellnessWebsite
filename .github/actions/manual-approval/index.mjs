/**
 * Wait for deploy/rollback approval via GitHub issue comments.
 * Approvers comment: approve | approved | lgtm
 * Deny: deny | denied
 *
 * When parent-issue-number / pr-number are provided, the approval issue is
 * tagged back to that tracking issue and/or PR. On approve or deny the
 * approval issue is closed automatically.
 */

const GITHUB_API = 'https://api.github.com';
const APPROVE_RE = /\b(approve|approved|lgtm)\b/i;
const DENY_RE = /\b(deny|denied)\b/i;

/** Match @actions/core / runner: INPUT_<NAME>, hyphens preserved (e.g. github-token → INPUT_GITHUB-TOKEN). */
function getInput(name, { required = false, defaultValue = '' } = {}) {
  const key = `INPUT_${name.replace(/ /g, '_').toUpperCase()}`;
  const value = process.env[key] ?? defaultValue;
  if (required && !value) {
    console.error(`Missing required action input: ${name}`);
    process.exit(1);
  }
  return value;
}

// Never fall back to process.env.GITHUB_TOKEN — a repo secret with that name can override the job token.
const token =
  getInput('github-token', { required: true }) ||
  process.env.MANUAL_APPROVAL_GITHUB_TOKEN ||
  '';
const repoFull = process.env.GITHUB_REPOSITORY;

const approvers = getInput('approvers', { required: true })
  .split(',')
  .map((s) => s.trim().toLowerCase())
  .filter(Boolean);

const minimumApprovals = Math.max(
  1,
  parseInt(getInput('minimum-approvals', { defaultValue: '1' }), 10)
);
const excludeInitiator = getInput('exclude-workflow-initiator', { defaultValue: 'true' }) !== 'false';
const workflowActor = getInput('workflow-actor').trim().toLowerCase();
const pollSeconds = Math.max(
  5,
  parseInt(getInput('polling-interval-seconds', { defaultValue: '10' }), 10)
);
const issueTitle = getInput('issue-title', { defaultValue: 'Deploy approval required' });
const issueBody = getInput('issue-body');
const parentIssueNumber = getInput('parent-issue-number').trim();
const prNumber = getInput('pr-number').trim();

if (!token || !repoFull) {
  console.error('github-token input and GITHUB_REPOSITORY are required');
  process.exit(1);
}

if (!approvers.length) {
  console.error('INPUT_APPROVERS is empty');
  process.exit(1);
}

const [owner, repo] = repoFull.split('/');

async function github(path, options = {}) {
  const res = await fetch(`${GITHUB_API}${path}`, {
    ...options,
    headers: {
      Accept: 'application/vnd.github+json',
      Authorization: `Bearer ${token}`,
      'X-GitHub-Api-Version': '2022-11-28',
      ...(options.headers || {}),
    },
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`GitHub API ${path}: ${res.status} ${text}`);
  }
  if (res.status === 204) return null;
  return res.json();
}

async function postIssueComment(issueNumber, body) {
  try {
    await github(`/repos/${owner}/${repo}/issues/${issueNumber}/comments`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ body }),
    });
  } catch (err) {
    console.warn(`Could not post issue comment: ${err.message}`);
  }
}

async function closeIssue(issueNumber, stateReason) {
  await github(`/repos/${owner}/${repo}/issues/${issueNumber}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ state: 'closed', state_reason: stateReason }),
  });
  console.log(`Closed approval issue #${issueNumber} (${stateReason})`);
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function canApprove(login) {
  const user = login.toLowerCase();
  if (!approvers.includes(user)) return false;
  if (excludeInitiator && workflowActor && user === workflowActor) return false;
  return true;
}

function classifyComment(body) {
  const text = (body || '').trim();
  if (!text) return null;
  if (DENY_RE.test(text)) return 'deny';
  if (APPROVE_RE.test(text)) return 'approve';
  return null;
}

function relatedSection() {
  const lines = [];
  if (parentIssueNumber) {
    lines.push(`- Tracking issue: #${parentIssueNumber}`);
  }
  if (prNumber) {
    lines.push(`- Pull request: #${prNumber}`);
  }
  if (!lines.length) return '';
  return `\n\n### Related\n${lines.join('\n')}\n`;
}

async function ensureLabels(names) {
  for (const name of names) {
    try {
      await github(`/repos/${owner}/${repo}/labels`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          color: name === 'deploy-approval' ? '0E8A16' : 'FBCA04',
          description:
            name === 'deploy-approval'
              ? 'CI/CD deploy or migrate approval gate'
              : 'Manual approval via issue comment',
        }),
      });
    } catch (err) {
      // Already exists (422) is fine
      if (!String(err.message).includes('422')) {
        console.warn(`Could not ensure label ${name}: ${err.message}`);
      }
    }
  }
}

async function linkAsSubIssue(parentNumber, childIssue) {
  if (!parentNumber) return;

  try {
    await github(`/repos/${owner}/${repo}/issues/${parentNumber}/sub_issues`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ sub_issue_id: childIssue.id }),
    });
    console.log(
      `Linked approval issue #${childIssue.number} as sub-issue of #${parentNumber}`
    );
  } catch (err) {
    console.warn(`Sub-issue API failed: ${err.message}`);
  }
}

async function tagBackToParentAndPr(childIssue) {
  const childRef = `#${childIssue.number}`;
  const childUrl = childIssue.html_url;

  if (parentIssueNumber) {
    await linkAsSubIssue(parentIssueNumber, childIssue);
    await postIssueComment(
      parentIssueNumber,
      `Deploy/migrate **approval** opened: ${childRef}\n\n${childUrl}\n\nComment \`approve\` on that issue to proceed.`
    );
    console.log(`Commented on tracking issue #${parentIssueNumber}`);
  }

  if (prNumber) {
    await postIssueComment(
      prNumber,
      `Deploy/migrate **approval** opened for this merge: ${childRef}\n\n${childUrl}`
    );
    console.log(`Commented on PR #${prNumber}`);
  }
}

async function main() {
  const labels = ['deploy-approval', 'manual-approval'];
  await ensureLabels(labels);

  const body =
    `${issueBody}${relatedSection()}\n` +
    `---\n**Approvers:** ${approvers.map((a) => `@${a}`).join(', ')}\n` +
    `**Required approvals:** ${minimumApprovals}\n\n` +
    `Comment \`approve\`, \`approved\`, or \`lgtm\` to proceed. Comment \`deny\` or \`denied\` to cancel.\n` +
    `This approval issue is **closed automatically** after approve or deny.`;

  const issue = await github(`/repos/${owner}/${repo}/issues`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      title: issueTitle,
      body,
      labels,
    }),
  });

  const issueNumber = issue.number;
  const issueUrl = issue.html_url;
  console.log(`Created approval issue #${issueNumber}: ${issueUrl}`);

  await tagBackToParentAndPr(issue);

  const approvedBy = new Set();
  const seenCommentIds = new Set();

  while (true) {
    const comments = await github(
      `/repos/${owner}/${repo}/issues/${issueNumber}/comments?per_page=100`
    );

    for (const c of comments) {
      if (seenCommentIds.has(c.id)) continue;
      seenCommentIds.add(c.id);

      const login = c.user?.login;
      if (!login || c.user?.type === 'Bot') continue;

      const verdict = classifyComment(c.body);
      if (!verdict) continue;

      if (verdict === 'deny') {
        if (!canApprove(login)) continue;
        await postIssueComment(
          issueNumber,
          `Deploy **denied** by @${login}. Closing approval issue.`
        );
        try {
          await closeIssue(issueNumber, 'not_planned');
        } catch (err) {
          console.error(`Failed to close denied approval issue: ${err.message}`);
        }
        if (parentIssueNumber) {
          await postIssueComment(
            parentIssueNumber,
            `Deploy/migrate approval ${`#${issueNumber}`} was **denied** by @${login}.`
          );
        }
        console.error(`Approval denied by ${login}`);
        process.exit(1);
      }

      if (verdict === 'approve') {
        if (!canApprove(login)) {
          if (
            excludeInitiator &&
            workflowActor &&
            login.toLowerCase() === workflowActor
          ) {
            console.log(
              `Ignoring approval from workflow initiator @${login} (exclude-workflow-initiator is enabled; use a different approver or workflow_dispatch)`
            );
          }
          continue;
        }
        approvedBy.add(login.toLowerCase());
        console.log(`Approval from ${login} (${approvedBy.size}/${minimumApprovals})`);
      }
    }

    if (approvedBy.size >= minimumApprovals) {
      await postIssueComment(
        issueNumber,
        `Deploy **approved** (${approvedBy.size} approval(s)). Closing this issue and continuing workflow.`
      );
      try {
        await closeIssue(issueNumber, 'completed');
      } catch (err) {
        console.error(`Failed to close approved approval issue: ${err.message}`);
        process.exit(1);
      }
      if (parentIssueNumber) {
        await postIssueComment(
          parentIssueNumber,
          `Deploy/migrate approval #${issueNumber} was **approved** (${[...approvedBy]
            .map((a) => `@${a}`)
            .join(', ')}).`
        );
      }
      if (prNumber) {
        await postIssueComment(
          prNumber,
          `Deploy/migrate approval #${issueNumber} was **approved**. Deploy continuing.`
        );
      }
      console.log(`Approved by: ${[...approvedBy].join(', ')}`);
      return;
    }

    await sleep(pollSeconds * 1000);
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
