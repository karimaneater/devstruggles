import { ThumbsUp, Heart, Laugh, Sparkles, Star } from 'lucide-react';
import { ReactionType } from '@/app/types';
import { Button } from '@/app/components/ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/app/components/ui/tooltip';

interface ReactionBarProps {
  reactions: Record<ReactionType, number>;
  userReaction?: ReactionType | null;
  onReact: (type: ReactionType) => void;
  size?: 'sm' | 'md';
}

const reactionConfig: Record<ReactionType, { icon: typeof ThumbsUp; label: string; activeColor: string }> = {
  like: { icon: ThumbsUp, label: 'Like', activeColor: 'text-blue-600' },
  heart: { icon: Heart, label: 'Love', activeColor: 'text-red-500' },
  laugh: { icon: Laugh, label: 'Funny', activeColor: 'text-yellow-500' },
  wow: { icon: Sparkles, label: 'Wow', activeColor: 'text-purple-500' },
  star: { icon: Star, label: 'Star', activeColor: 'text-teal-600' },
};

export function ReactionBar({ reactions, userReaction, onReact, size = 'md' }: ReactionBarProps) {
  const formatCount = (count: number) => {
    if (count === 0) return '';
    if (count >= 1000) return `${(count / 1000).toFixed(1)}k`;
    return count.toString();
  };

  return (
    <TooltipProvider>
      <div className="flex items-center gap-1">
        {(Object.keys(reactionConfig) as ReactionType[]).map((type) => {
          const config = reactionConfig[type];
          const Icon = config.icon;
          const count = reactions[type] || 0;
          const isActive = userReaction === type;

          return (
            <Tooltip key={type}>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size={size === 'sm' ? 'sm' : 'default'}
                  className={`gap-1 ${size === 'sm' ? 'h-7 px-2 text-xs' : 'h-9 px-3'} ${
                    isActive ? config.activeColor : 'text-gray-600 hover:text-gray-900'
                  }`}
                  onClick={() => onReact(type)}
                >
                  <Icon 
                    className={size === 'sm' ? 'h-3.5 w-3.5' : 'h-4 w-4'} 
                    fill={isActive ? 'currentColor' : 'none'}
                  />
                  {count > 0 && (
                    <span className={isActive ? 'font-semibold' : ''}>
                      {formatCount(count)}
                    </span>
                  )}
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>{config.label}</p>
              </TooltipContent>
            </Tooltip>
          );
        })}
      </div>
    </TooltipProvider>
  );
}
