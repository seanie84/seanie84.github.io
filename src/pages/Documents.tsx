import { FileText } from 'lucide-react';
import ComingSoon from '../components/ComingSoon';

export default function Documents() {
  return (
    <ComingSoon
      icon={FileText}
      title="Document Studio"
      description="Generate and manage business documents with AI"
      step={4}
      totalSteps={14}
    />
  );
}
