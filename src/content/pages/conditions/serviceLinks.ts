/**
 * Resolve recommended-service labels to live routes when we have them.
 * Labels without a match render as non-linking text.
 */
const SERVICE_HREF_BY_LABEL: Record<string, string> = {
  "Brain Health": "/treatments/brain-health",
  "Hormone Health": "/treatments/hormone-health",
  "Gut Health": "/treatments/gut-health",
  "Medical Weight Loss": "/treatments/medical-weight-loss",
  "IV Infusions": "/treatments/infusion-therapy",
  "Peptide Therapy": "/treatments/peptide-therapy",
  Supplements: "/treatments/supplements",
  "ExoMind®": "/treatments/exomind",
  "ExoMind™": "/treatments/exomind",
  "Metabolic Health": "/treatments/metabolic-health",
  Longevity: "/treatments/longevity",
  "EmSculpt Neo®": "/treatments/emsculpt-neo",
  "EmSella®": "/treatments/emsella",
  "Clear RF": "/treatments/clear-rf",
  "Clear RF™": "/treatments/clear-rf",
  "RF Microneedling": "/treatments/rf-microneedling",
  "EmFace®": "/treatments/emface",
  "Exion®": "/treatments/exion",
  "Exion Face®": "/treatments/exion",
  "Exion RF Microneedling®": "/treatments/rf-microneedling",
  "Daxxify®": "/treatments/neuromodulators",
  "Dermal Fillers": "/treatments/dermal-fillers",
  "Sleep Health": "/conditions/sleep-concerns",
  "Cognitive Health": "/conditions/cognitive-health",
  "Food Sensitivity Testing": "/conditions/food-sensitivities",
};

export function conditionService(
  label: string,
  body?: string,
): { label: string; href?: string; body?: string } {
  const href = SERVICE_HREF_BY_LABEL[label];
  return body ? { label, href, body } : { label, href };
}

export function conditionServices(
  ...labels: string[]
): { label: string; href?: string }[] {
  return labels.map((label) => conditionService(label));
}
