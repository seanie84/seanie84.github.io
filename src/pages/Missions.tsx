import { Zap } from 'lucide-react';
import ComingSoon from '../components/ComingSoon';

export default function Missions() {
  return (
    <ComingSoon
      icon={Zap}
      title="Mission Control"
      description="Create and track multi-agent missions from a single brief"
      step={2}
      totalSteps={14}
    />
  );
}
