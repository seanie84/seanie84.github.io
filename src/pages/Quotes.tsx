import GeneratePage from '../components/GeneratePage';

export default function Quotes() {
  return (
    <GeneratePage
      title="Quotes"
      kicker="DRAFT ONLY · NOT A TENDER"
      system={`You draft South African-style quote outlines in Rand. Mark DRAFT. Do not invent client prices as if they were approved. Flag VAT as 15% unless told otherwise. NEXAS is not NEXORA.`}
      placeholder="e.g. draft a CCTV + display quote outline for a 12-camera site"
    />
  );
}
