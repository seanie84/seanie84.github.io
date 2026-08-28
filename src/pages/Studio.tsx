import { Palette } from 'lucide-react';
import ComingSoon from '../components/ComingSoon';

export default function Studio() {
  return (
    <ComingSoon
      icon={Palette}
      title="Theme Studio"
      description="Customise your command center's appearance"
      step={11}
      totalSteps={14}
    />
  );
}
