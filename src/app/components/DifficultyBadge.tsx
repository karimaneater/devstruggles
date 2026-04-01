import { DifficultyLevel } from '@/app/types';
import { Badge } from '@/app/components/ui/badge';

interface DifficultyBadgeProps {
  level: DifficultyLevel;
}

const difficultyConfig: Record<DifficultyLevel, { color: string; label: string }> = {
  beginner: { color: 'bg-green-100 text-green-800 border-green-300', label: 'Beginner' },
  intermediate: { color: 'bg-yellow-100 text-yellow-800 border-yellow-300', label: 'Intermediate' },
  advanced: { color: 'bg-red-100 text-red-800 border-red-300', label: 'Advanced' },
};

export function DifficultyBadge({ level }: DifficultyBadgeProps) {
  const config = difficultyConfig[level];

  return (
    <Badge variant="outline" className={`${config.color} border`}>
      {config.label}
    </Badge>
  );
}
