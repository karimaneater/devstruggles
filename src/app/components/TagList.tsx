import { Badge } from '@/app/components/ui/badge';
import { Hash } from 'lucide-react';

interface TagListProps {
  tags: string[];
  onClick?: (tag: string) => void;
  max?: number;
}

export function TagList({ tags, onClick, max }: TagListProps) {
  const displayTags = max ? tags.slice(0, max) : tags;
  const remaining = max && tags.length > max ? tags.length - max : 0;

  return (
    <div className="flex flex-wrap items-center gap-2">
      {displayTags.map((tag) => (
        <Badge
          key={tag}
          variant="secondary"
          className="cursor-pointer hover:bg-teal-100 hover:text-teal-900 transition-colors"
          onClick={() => onClick?.(tag)}
        >
          <Hash className="h-3 w-3 mr-1" />
          {tag}
        </Badge>
      ))}
      {remaining > 0 && (
        <Badge variant="outline" className="text-gray-500">
          +{remaining} more
        </Badge>
      )}
    </div>
  );
}
