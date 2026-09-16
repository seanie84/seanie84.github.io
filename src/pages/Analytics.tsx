import GeneratePage from '../components/GeneratePage';

export default function Analytics() {
  return (
    <GeneratePage
      title="Analytics"
      kicker="ASK FOR A READ, NOT A FAKE DASHBOARD"
      system={`You turn rough numbers or a business question into a short analytic brief. If no numbers were given, say so and ask for them. Do not invent KPIs.`}
      placeholder="e.g. we quoted 12 jobs and won 3 — what should I look at?"
    />
  );
}
