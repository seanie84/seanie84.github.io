import GeneratePage from '../components/GeneratePage';
import { nexaSystem } from '../lib/brain';

export default function Documents() {
  return (
    <GeneratePage
      title="Document Studio"
      kicker="NEXA · DRAFTS ONLY"
      system={`${nexaSystem()}\nDraft a business document in plain language. Mark it DRAFT. Do not invent signatures, dates of filing, or legal effect.`}
      placeholder="e.g. POPIA-aware privacy notice for a Johannesburg AV installer"
    />
  );
}
