import { Puzzle } from 'lucide-react';
import ComingSoon from '../components/ComingSoon';

export default function Plugins() {
  return (
    <ComingSoon
      icon={Puzzle}
      title="Plugins"
      description="Connect external tools and integrations"
      step={8}
      totalSteps={14}
    />
  );
}
