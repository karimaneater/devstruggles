import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router';
import { NavbarNew } from '@/app/components/NavbarNew';
import { Card } from '@/app/components/ui/card';
import { Button } from '@/app/components/ui/button';
import { Textarea } from '@/app/components/ui/textarea';
import { Avatar, AvatarFallback, AvatarImage } from '@/app/components/ui/avatar';
import { ReactionBar } from '@/app/components/ReactionBar';
import { CodeBlock } from '@/app/components/CodeBlock';
import { TagList } from '@/app/components/TagList';
import { DifficultyBadge } from '@/app/components/DifficultyBadge';
import { ImageWithFallback } from '@/app/components/figma/ImageWithFallback';
import { Share2, Bookmark, ArrowLeft, Send } from 'lucide-react';
import { useAppSelector, useAppDispatch } from '@/app/store/hooks';
import { setCurrentPost, toggleReaction } from '@/app/store/slices/postsSlice';
import { setComments, addComment, toggleCommentReaction } from '@/app/store/slices/commentsSlice';
import { MOCK_POSTS, MOCK_COMMENTS } from '@/app/data/mockData';
import { ReactionType, Comment } from '@/app/types';
import { formatDistanceToNow } from 'date-fns';
import ReactMarkdown from 'react-markdown';

export function PostDetail() {
  const { postId } = useParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const currentPost = useAppSelector((state) => state.posts.currentPost);
  const comments = useAppSelector((state) => state.comments.comments);
  const currentUser = useAppSelector((state) => state.auth.user);
  const [commentText, setCommentText] = useState('');

  useEffect(() => {
    // Find post from mock data
    const post = MOCK_POSTS.find(p => p.id === postId);
    if (post) {
      dispatch(setCurrentPost(post));
      // Load comments for this post
      const postComments = MOCK_COMMENTS.filter(c => c.post_id === postId);
      dispatch(setComments(postComments));
    }
  }, [postId, dispatch]);

  const handleReaction = (reactionType: ReactionType) => {
    if (currentPost) {
      dispatch(toggleReaction({ postId: currentPost.id, reactionType }));
    }
  };

  const handleCommentReaction = (commentId: string, reactionType: ReactionType) => {
    dispatch(toggleCommentReaction({ commentId, reactionType }));
  };

  const handleSubmitComment = () => {
    if (!commentText.trim() || !currentPost || !currentUser) return;

    const newComment: Comment = {
      id: `comment-${Date.now()}`,
      post_id: currentPost.id,
      author_id: currentUser.id,
      author: currentUser,
      content: commentText,
      parent_id: null,
      reactions: { like: 0, heart: 0, laugh: 0, wow: 0, star: 0 },
      user_reaction: null,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    dispatch(addComment(newComment));
    setCommentText('');
  };

  if (!currentPost) {
    return (
      <div className="min-h-screen bg-gray-50">
        <NavbarNew />
        <div className="max-w-4xl mx-auto px-4 py-8">
          <p className="text-center text-gray-600">Post not found</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <NavbarNew />
      
      <div className="max-w-4xl mx-auto px-4 py-6">
        <Button
          variant="ghost"
          className="mb-4 text-gray-600 hover:text-gray-900"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back
        </Button>

        {/* Post Card */}
        <Card className="p-6 mb-6">
          {/* Author Info */}
          <div className="flex items-center gap-3 mb-4">
            <Avatar className="h-10 w-10 cursor-pointer" onClick={() => navigate(`/profile/${currentPost.author_id}`)}>
              <AvatarImage src={currentPost.author?.avatar_url} alt={currentPost.author?.username} />
              <AvatarFallback className="bg-teal-600 text-white">
                {currentPost.author?.username.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <span 
                  className="font-medium text-gray-900 hover:text-teal-600 cursor-pointer"
                  onClick={() => navigate(`/profile/${currentPost.author_id}`)}
                >
                  {currentPost.author?.username}
                </span>
                {currentPost.difficulty && <DifficultyBadge level={currentPost.difficulty} />}
              </div>
              <p className="text-sm text-gray-500">
                {formatDistanceToNow(new Date(currentPost.created_at), { addSuffix: true })}
              </p>
            </div>
          </div>

          {/* Title */}
          <h1 className="text-2xl mb-4 text-gray-900">{currentPost.title}</h1>

          {/* Tags */}
          {currentPost.tags && currentPost.tags.length > 0 && (
            <div className="mb-4">
              <TagList tags={currentPost.tags} />
            </div>
          )}

          {/* Content */}
          <div className="prose max-w-none mb-4">
            <ReactMarkdown>{currentPost.content}</ReactMarkdown>
          </div>

          {/* Code Snippet */}
          {currentPost.code_snippet && (
            <CodeBlock code={currentPost.code_snippet} language={currentPost.language} />
          )}

          {/* Image */}
          {currentPost.image_url && (
            <div className="mb-4 rounded-lg overflow-hidden">
              <ImageWithFallback
                src={currentPost.image_url}
                alt={currentPost.title}
                className="w-full max-h-96 object-cover"
              />
            </div>
          )}

          {/* Reactions and Actions */}
          <div className="flex items-center justify-between border-t pt-4 mt-4">
            <ReactionBar
              reactions={currentPost.reactions}
              userReaction={currentPost.user_reaction}
              onReact={handleReaction}
            />

            <div className="flex items-center gap-2">
              <Button variant="ghost" size="sm" className="text-gray-600 hover:text-teal-600">
                <Share2 className="h-4 w-4 mr-2" />
                Share
              </Button>
              <Button variant="ghost" size="sm" className="text-gray-600 hover:text-teal-600">
                <Bookmark className="h-4 w-4 mr-2" />
                Save
              </Button>
            </div>
          </div>
        </Card>

        {/* Comments Section */}
        <Card className="p-6">
          <h2 className="text-lg mb-4">Comments ({comments.length})</h2>

          {/* Add Comment */}
          <div className="mb-6">
            <div className="flex gap-3">
              <Avatar className="h-9 w-9">
                <AvatarImage src={currentUser?.avatar_url} alt={currentUser?.username} />
                <AvatarFallback className="bg-teal-600 text-white">
                  {currentUser?.username?.charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <Textarea
                  placeholder="Share your thoughts..."
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                  className="mb-2"
                />
                <Button 
                  className="bg-teal-600 hover:bg-teal-700"
                  onClick={handleSubmitComment}
                  disabled={!commentText.trim()}
                >
                  <Send className="h-4 w-4 mr-2" />
                  Comment
                </Button>
              </div>
            </div>
          </div>

          {/* Comments List */}
          <div className="space-y-4">
            {comments.map((comment) => (
              <div key={comment.id} className="flex gap-3 p-4 bg-gray-50 rounded-lg">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={comment.author?.avatar_url} alt={comment.author?.username} />
                  <AvatarFallback className="bg-teal-600 text-white text-sm">
                    {comment.author?.username.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-sm font-medium text-gray-900">
                      {comment.author?.username}
                    </span>
                    <span className="text-xs text-gray-500">
                      {formatDistanceToNow(new Date(comment.created_at), { addSuffix: true })}
                    </span>
                  </div>
                  <p className="text-sm text-gray-700 mb-2 whitespace-pre-wrap">{comment.content}</p>
                  <ReactionBar
                    reactions={comment.reactions}
                    userReaction={comment.user_reaction}
                    onReact={(type) => handleCommentReaction(comment.id, type)}
                    size="sm"
                  />
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
