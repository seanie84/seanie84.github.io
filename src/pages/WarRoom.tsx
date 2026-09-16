import GeneratePage from '../components/GeneratePage';
import { amberSystem } from '../lib/brain';

export default function WarRoom() {
  return (
    <GeneratePage
      title="War Room"
      kicker="LIVE OPS BRIEF · GEMINI / LOCAL ENGINE"
      system={`${amberSystem()}\nProduce a short operations brief: what is moving, what is blocked, who owns the next step.`}
      placeholder="e.g. three open quotes, one tender tonight, NVR still offline"
    />
  );
}
