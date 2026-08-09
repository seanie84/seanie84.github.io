export interface Category {
  id: string;
  label: string;
  color: string;
}

export const CATEGORIES: Category[] = [
  { id: 'core',        label: 'Core',        color: 'var(--cat-core)' },
  { id: 'leadership',  label: 'Leadership',  color: 'var(--cat-leadership)' },
  { id: 'legal',       label: 'Legal',       color: 'var(--cat-legal)' },
  { id: 'sales',       label: 'Sales',       color: 'var(--cat-sales)' },
  { id: 'marketing',   label: 'Marketing',   color: 'var(--cat-marketing)' },
  { id: 'operations',  label: 'Operations',  color: 'var(--cat-operations)' },
  { id: 'hr',          label: 'HR',          color: 'var(--cat-hr)' },
  { id: 'project',     label: 'Project',     color: 'var(--cat-project)' },
  { id: 'finance',     label: 'Finance',     color: 'var(--cat-finance)' },
  { id: 'research',    label: 'Research',    color: 'var(--cat-research)' },
  { id: 'technology',  label: 'Technology',  color: 'var(--cat-technology)' },
  { id: 'security',    label: 'Security',    color: 'var(--cat-security)' },
  { id: 'maintenance', label: 'Maintenance', color: 'var(--cat-maintenance)' },
  { id: 'specialist',  label: 'Specialist',  color: 'var(--cat-operations)' },
  { id: 'fitness',     label: 'Fitness',     color: 'var(--cat-sales)' },
  { id: 'instruction', label: 'Instruction', color: 'var(--cat-research)' },
  { id: 'fact',        label: 'Fact',        color: 'var(--cat-technology)' },
  { id: 'context',     label: 'Context',     color: 'var(--cat-leadership)' },
  { id: 'preference',  label: 'Preference',  color: 'var(--cat-hr)' },
  { id: 'creative',    label: 'Creative',    color: 'var(--cat-marketing)' },
];

export function getCategoryColor(id: string): string {
  return CATEGORIES.find(c => c.id === id)?.color ?? 'var(--ink-3)';
}
