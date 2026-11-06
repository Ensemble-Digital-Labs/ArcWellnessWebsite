#!/usr/bin/env node
/**
 * Resolve the parent GitHub issue (and PR) linked to the merge commit that
 * triggered a deploy. Used so the approval issue can be tagged back to the
 * tracking issue / PR.
 *
 * Required env: ACTIONS_GITHUB_TOKEN (or GH_TOKEN), GITHUB_REPOSITORY
 * Optional env: COMMIT_SHA (defaults to GITHUB_SHA)
 * Writes GITHUB_OUTPUT: issue_number, pr_number (empty if none found)
 */

import { appendFileSync } from 'node:fs';

const token = process.env.ACTIONS_GITHUB_TOKEN || process.env.GH_TOKEN;
const repoFull = process.env.GITHUB_REPOSITORY;
const sha = process.env.COMMIT_SHA || process.env.GITHUB_SHA || '';

if (!token || !repoFull || !sha) {
  console.error('Missing ACTIONS_GITHUB_TOKEN, GITHUB_REPOSITORY, or commit SHA');
  process.exit(1);
}

const [owner, repo] = repoFull.split('/');

async function rest(path, options = {}) {
  const res = await fetch(`https://api.github.com${path}`, {
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
    throw new Error(`REST ${path}: ${res.status} ${text}`);
  }
  if (res.status === 204) return null;
  return res.json();
}

async function graphql(query, variables) {
  const res = await fetch('https://api.github.com/graphql', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ query, variables }),
  });
  const json = await res.json();
  if (json.errors?.length) {
    throw new Error(json.errors.map((e) => e.message).join('; '));
  }
  return json.data;
}

const LINK_RE =
  /(?:^|\s)(?:close|closes|closed|fix|fixes|fixed|resolve|resolves|resolved|related\s+to|relates\s+to|addresses|towards|part\s+of|tracks|tracking)\s+#(\d+)/gi;

function parseLinkedIssues(text) {
  const nums = new Set();
  if (!text) return nums;
  for (const m of text.matchAll(LINK_RE)) {
    nums.add(Number(m[1]));
  }
  return nums;
}

async function issuesFromPullRequest(prNumber) {
  const data = await graphql(
    `query($owner: String!, $name: String!, $number: Int!) {
      repository(owner: $owner, name: $name) {
        pullRequest(number: $number) {
          body
          title
          closingIssuesReferences(first: 20) {
            nodes { number title }
          }
        }
      }
    }`,
    { owner, name: repo, number: prNumber }
  );

  const pr = data?.repository?.pullRequest;
  if (!pr) return [];

  const fromGraph = (pr.closingIssuesReferences?.nodes || []).map((n) => n.number);
  if (fromGraph.length) return fromGraph;

  return [
    ...new Set([
      ...parseLinkedIssues(pr.body),
      ...parseLinkedIssues(pr.title),
    ]),
  ];
}

async function main() {
  let issueNumber = '';
  let prNumber = '';

  let pulls = [];
  try {
    pulls = (await rest(`/repos/${owner}/${repo}/commits/${sha}/pulls`)) || [];
  } catch (err) {
    console.warn(
      `Could not list PRs for commit ${sha.slice(0, 7)} (${err.message}); skipping parent issue link`
    );
    writeOutput(issueNumber, prNumber);
    return;
  }

  if (!pulls.length) {
    console.log(`No pull request linked to commit ${sha.slice(0, 7)}`);
  } else {
    const pr = pulls[0];
    prNumber = String(pr.number);
    console.log(`Merge PR #${pr.number}: ${pr.title}`);
    try {
      const linked = await issuesFromPullRequest(pr.number);
      if (linked.length >= 1) {
        issueNumber = String(linked[0]);
        if (linked.length > 1) {
          console.log(
            `Multiple linked issues (${linked.join(', ')}); using #${issueNumber} as parent`
          );
        }
      } else {
        console.log(
          'No linked issue on PR (add Closes #123 / Related to #123 in PR description or link in Development sidebar)'
        );
      }
    } catch (err) {
      console.warn(`Could not resolve linked issues for PR #${pr.number}: ${err.message}`);
    }
  }

  writeOutput(issueNumber, prNumber);
}

function writeOutput(issueNumber, prNumber) {
  const out = process.env.GITHUB_OUTPUT;
  if (out) {
    appendFileSync(out, `issue_number=${issueNumber}\n`);
    appendFileSync(out, `pr_number=${prNumber}\n`);
  }
  console.log(`parent_issue_number=${issueNumber || '(none)'}`);
  console.log(`pr_number=${prNumber || '(none)'}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
