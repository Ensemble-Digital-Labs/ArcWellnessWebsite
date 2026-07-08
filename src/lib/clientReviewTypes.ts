export type ClientReviewSection = {
  id: string;
  excelRow: number;
  section: string;
  currentContent: string;
  feedback: string;
  status: string;
  priority: string;
  implementationStatus: string;
  implementationNotes: string;
  /** Excel column I — blocked items (one bullet per line). */
  implementationBlocked?: string;
};

export type ClientReviewPage = {
  id: string;
  sheet: string;
  label: string;
  url: string;
  sections: ClientReviewSection[];
};

export type ClientReviewDocument = {
  meta: {
    sourceFile: string;
    sourcePath?: string;
    importedAt: string;
    updatedAt: string;
    lastExportedAt?: string;
    sheetCount: number;
    sectionCount: number;
  };
  pages: ClientReviewPage[];
};

export const CLIENT_REVIEW_STATUS_OPTIONS = [
  "",
  "Not Reviewed",
  "Needs Changes",
  "Question",
  "Approved",
] as const;

export const CLIENT_REVIEW_PRIORITY_OPTIONS = ["", "High", "Medium", "Low"] as const;

export const CLIENT_REVIEW_IMPL_OPTIONS = [
  "Not Started",
  "In Progress",
  "Done",
  "Deferred",
  "Blocked",
] as const;

export type ClientReviewSectionPatch = Partial<
  Pick<
    ClientReviewSection,
    | "feedback"
    | "status"
    | "priority"
    | "implementationStatus"
    | "implementationNotes"
    | "implementationBlocked"
  >
>;
