import { Brain } from 'lucide-react';
import ComingSoon from '../components/ComingSoon';

export default function Memory() {
  return (
    <ComingSoon
      icon={Brain}
      title="Memory"
      description="Long-term context and knowledge base management"
      step={6}
      totalSteps={14}
    />
  );
}
