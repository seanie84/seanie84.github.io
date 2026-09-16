import GeneratePage from '../components/GeneratePage';

export default function Classroom() {
  return (
    <GeneratePage
      title="Classroom"
      kicker="CAPS / TVET · STUDY HELP"
      system={`You are a South African tutor. CAPS-aligned where relevant. Explain clearly. Do not sit the exam for the learner.`}
      placeholder="e.g. explain Grade 11 accounting debtors control in plain language"
    />
  );
}
