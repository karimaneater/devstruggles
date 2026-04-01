import { Card } from '@/app/components/ui/card';
import { MessageSquare, Share2, Bookmark, Eye } from 'lucide-react';
import { Post } from '@/app/types';
import { ImageWithFallback } from '@/app/components/figma/ImageWithFallback';
import { ReactionBar } from '@/app/components/ReactionBar';
import { TagList } from '@/app/components/TagList';
import { DifficultyBadge } from '@/app/components/DifficultyBadge';
import { Button } from '@/app/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/app/components/ui/avatar';
import { useNavigate } from 'react-router';
import { useAppDispatch } from '@/app/store/hooks';
import { toggleReaction } from '@/app/store/slices/postsSlice';
import { ReactionType } from '@/app/types';
import { formatDistanceToNow } from 'date-fns';

interface PostCardNewProps {
  post: Post;
}

export function PostCardNew({ post }: PostCardNewProps) {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleReaction = (reactionType: ReactionType) => {
    dispatch(toggleReaction({ postId: post.id, reactionType }));
  };

  const handlePostClick = () => {
    navigate(`/post/${post.id}`);
  };

  const handleTagClick = (tag: string) => {
    // Will implement tag filtering later
    console.log('Tag clicked:', tag);
  };

  const formatNumber = (num: number) => {
    if (num >= 1000) return `${(num / 1000).toFixed(1)}k`;
    return num.toString();
  };

  return (
    <Card className="overflow-hidden hover:shadow-md transition-shadow">
      <div className="p-4">
        {/* Author Info */}
        <div className="flex items-center gap-3 mb-3">
          <Avatar className="h-8 w-8 cursor-pointer" onClick={() => navigate(`/profile/${post.author_id}`)}>
            <AvatarImage src={post.author?.avatar_url} alt={post.author?.username} />
            <AvatarFallback className="bg-teal-600 text-white">
              {post.author?.username.charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <span 
                className="text-sm font-medium text-gray-900 hover:text-teal-600 cursor-pointer"
                onClick={() => navigate(`/profile/${post.author_id}`)}
              >
                {post.author?.username}
              </span>
              {post.difficulty && <DifficultyBadge level={post.difficulty} />}
            </div>
            <p className="text-xs text-gray-500">
              {formatDistanceToNow(new Date(post.created_at), { addSuffix: true })}
            </p>
          </div>
        </div>

        {/* Title */}
        <h3 
          className="text-lg mb-2 text-gray-900 hover:text-teal-600 cursor-pointer line-clamp-2"
          onClick={handlePostClick}
        >
          {post.title}
        </h3>

        {/* Content Preview */}
        <p className="text-sm text-gray-600 mb-3 line-clamp-3">
          {post.content}
        </p>

        {/* Image */}
        {post.image_url && (
          <div className="mb-3 rounded-md overflow-hidden cursor-pointer" onClick={handlePostClick}>
            <ImageWithFallback
              src={post.image_url}
              alt={post.title}
              className="w-full max-h-80 object-cover hover:scale-105 transition-transform duration-300"
            />
          </div>
        )}

        {/* Tags */}
        {post.tags && post.tags.length > 0 && (
          <div className="mb-3">
            <TagList tags={post.tags} onClick={handleTagClick} max={5} />
          </div>
        )}

        {/* Reactions and Actions */}
        <div className="flex items-center justify-between border-t pt-3">
          <ReactionBar
            reactions={post.reactions}
            userReaction={post.user_reaction}
            onReact={handleReaction}
            size="sm"
          />

          <div className="flex items-center gap-1">
            <Button 
              variant="ghost" 
              size="sm" 
              className="h-7 px-2 text-gray-600 hover:text-teal-600"
              onClick={handlePostClick}
            >
              <MessageSquare className="h-3.5 w-3.5 mr-1" />
              <span className="text-xs">{post.comment_count}</span>
            </Button>
            <Button variant="ghost" size="sm" className="h-7 px-2 text-gray-600 hover:text-teal-600">
              <Eye className="h-3.5 w-3.5 mr-1" />
              <span className="text-xs">{formatNumber(post.view_count)}</span>
            </Button>
            <Button variant="ghost" size="sm" className="h-7 px-2 text-gray-600 hover:text-teal-600">
              <Share2 className="h-3.5 w-3.5" />
            </Button>
            <Button variant="ghost" size="sm" className="h-7 px-2 text-gray-600 hover:text-teal-600">
              <Bookmark className="h-3.5 w-3.5" />
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
}
