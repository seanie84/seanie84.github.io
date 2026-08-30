import { Settings as SettingsIcon } from 'lucide-react';
import ComingSoon from '../components/ComingSoon';

export default function Settings() {
  return (
    <ComingSoon
      icon={SettingsIcon}
      title="Settings"
      description="Configure your NEXA command center"
      step={10}
      totalSteps={14}
    />
  );
}
