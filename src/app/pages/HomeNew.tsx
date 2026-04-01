import { useEffect } from 'react';
import { NavbarNew } from '@/app/components/NavbarNew';
import { SidebarNew } from '@/app/components/SidebarNew';
import { PostCardNew } from '@/app/components/PostCardNew';
import { Button } from '@/app/components/ui/button';
import { Flame, Sparkles, TrendingUp, Clock } from 'lucide-react';
import { useAppSelector, useAppDispatch } from '@/app/store/hooks';
import { setPosts, setSortBy } from '@/app/store/slices/postsSlice';
import { MOCK_POSTS } from '@/app/data/mockData';

export function HomeNew() {
  const dispatch = useAppDispatch();
  const { posts, sortBy } = useAppSelector((state) => state.posts);

  useEffect(() => {
    // Initialize posts from mock data
    // In production, this would fetch from Supabase
    dispatch(setPosts(MOCK_POSTS));
  }, [dispatch]);

  const getSortedPosts = () => {
    const postsArray = [...posts];
    
    switch (sortBy) {
      case 'new':
        return postsArray.sort((a, b) => 
          new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
        );
      case 'top':
        return postsArray.sort((a, b) => {
          const aTotal = Object.values(a.reactions).reduce((sum, val) => sum + val, 0);
          const bTotal = Object.values(b.reactions).reduce((sum, val) => sum + val, 0);
          return bTotal - aTotal;
        });
      case 'trending':
        return postsArray.sort((a, b) => b.view_count - a.view_count);
      default: // hot
        return postsArray;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <NavbarNew />
      
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-4">
            {/* Sort Buttons */}
            <div className="bg-white border border-gray-200 rounded-lg p-2 flex gap-2 shadow-sm">
              <Button
                variant={sortBy === 'hot' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => dispatch(setSortBy('hot'))}
                className={sortBy === 'hot' ? 'bg-teal-600 hover:bg-teal-700' : 'hover:bg-gray-100'}
              >
                <Flame className="h-4 w-4 mr-2" />
                Hot
              </Button>
              <Button
                variant={sortBy === 'new' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => dispatch(setSortBy('new'))}
                className={sortBy === 'new' ? 'bg-teal-600 hover:bg-teal-700' : 'hover:bg-gray-100'}
              >
                <Sparkles className="h-4 w-4 mr-2" />
                New
              </Button>
              <Button
                variant={sortBy === 'top' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => dispatch(setSortBy('top'))}
                className={sortBy === 'top' ? 'bg-teal-600 hover:bg-teal-700' : 'hover:bg-gray-100'}
              >
                <TrendingUp className="h-4 w-4 mr-2" />
                Top
              </Button>
              <Button
                variant={sortBy === 'trending' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => dispatch(setSortBy('trending'))}
                className={sortBy === 'trending' ? 'bg-teal-600 hover:bg-teal-700' : 'hover:bg-gray-100'}
              >
                <Clock className="h-4 w-4 mr-2" />
                Trending
              </Button>
            </div>

            {/* Posts */}
            <div className="space-y-4">
              {getSortedPosts().map((post) => (
                <PostCardNew key={post.id} post={post} />
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <div className="hidden lg:block">
            <SidebarNew />
          </div>
        </div>
      </div>
    </div>
  );
}
