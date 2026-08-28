import { BookOpen } from 'lucide-react';
import ComingSoon from '../components/ComingSoon';

export default function Classroom() {
  return (
    <ComingSoon
      icon={BookOpen}
      title="Classroom"
      description="AI-powered training and learning modules"
      step={5}
      totalSteps={14}
    />
  );
}
