import { FileCheck } from 'lucide-react';
import ComingSoon from '../components/ComingSoon';

export default function Quotes() {
  return (
    <ComingSoon
      icon={FileCheck}
      title="Quotes"
      description="Generate professional quotes and proposals"
      step={9}
      totalSteps={14}
    />
  );
}
