import { BarChart2 } from 'lucide-react';
import ComingSoon from '../components/ComingSoon';

export default function Analytics() {
  return (
    <ComingSoon
      icon={BarChart2}
      title="Analytics"
      description="Business intelligence and performance dashboards. Connect your AI API keys in Settings to unlock full functionality."
      step={7}
      totalSteps={14}
    />
  );
}
