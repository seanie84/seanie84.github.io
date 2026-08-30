import { BarChart3 } from 'lucide-react';
import ComingSoon from '../components/ComingSoon';

export default function WarRoom() {
  return (
    <ComingSoon
      icon={BarChart3}
      title="War Room"
      description="Real-time operations monitoring and live agent task tracking"
      step={1}
      totalSteps={14}
    />
  );
}
