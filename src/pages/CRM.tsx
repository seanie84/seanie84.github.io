import { Users } from 'lucide-react';
import ComingSoon from '../components/ComingSoon';

export default function CRM() {
  return (
    <ComingSoon
      icon={Users}
      title="CRM"
      description="Manage contacts, leads and customer relationships"
      step={3}
      totalSteps={14}
    />
  );
}
