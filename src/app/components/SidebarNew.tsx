import { Card, CardContent, CardHeader, CardTitle } from '@/app/components/ui/card';
import { Button } from '@/app/components/ui/button';
import { Home, TrendingUp, Bookmark, Hash, Zap } from 'lucide-react';
import { useNavigate } from 'react-router';
import { POPULAR_TAGS } from '@/app/data/mockData';
import { Badge } from '@/app/components/ui/badge';

export function SidebarNew() {
  const navigate = useNavigate();

  return (
    <aside className="space-y-4">
      {/* Navigation Card */}
      <Card>
        <CardContent className="p-3">
          <div className="space-y-1">
            <Button 
              variant="ghost" 
              className="w-full justify-start gap-3 text-gray-700 hover:bg-teal-50 hover:text-teal-900"
              onClick={() => navigate('/')}
            >
              <Home className="h-5 w-5" />
              Home
            </Button>
            <Button 
              variant="ghost" 
              className="w-full justify-start gap-3 text-gray-700 hover:bg-teal-50 hover:text-teal-900"
              onClick={() => navigate('/explore')}
            >
              <TrendingUp className="h-5 w-5" />
              Explore
            </Button>
            <Button 
              variant="ghost" 
              className="w-full justify-start gap-3 text-gray-700 hover:bg-teal-50 hover:text-teal-900"
            >
              <Bookmark className="h-5 w-5" />
              Saved
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Popular Tags */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-sm flex items-center gap-2">
            <Hash className="h-4 w-4" />
            Trending Tags
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          {POPULAR_TAGS.slice(0, 8).map((tag) => (
            <div
              key={tag.id}
              className="flex items-center justify-between p-2 rounded hover:bg-gray-50 cursor-pointer group"
            >
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-900 group-hover:text-teal-600">
                  #{tag.name}
                </span>
              </div>
              <Badge variant="secondary" className="text-xs">
                {tag.post_count}
              </Badge>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Quick Tip Card */}
      <Card className="bg-gradient-to-br from-teal-500 to-emerald-600 text-white border-0">
        <CardContent className="p-4">
          <div className="flex items-start gap-2 mb-2">
            <Zap className="h-5 w-5 flex-shrink-0" />
            <div>
              <h3 className="font-semibold mb-1">Pro Tip</h3>
              <p className="text-sm text-teal-50">
                Add code snippets to your posts to get better engagement and more helpful responses!
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* About Card */}
      <Card>
        <CardContent className="p-4 text-sm text-gray-600">
          <p className="mb-2">
            <strong className="text-gray-900">DevStruggles</strong> is a community where developers share their coding challenges, solutions, and learn together.
          </p>
          <div className="flex flex-wrap gap-2 text-xs text-teal-600">
            <a href="#" className="hover:underline">About</a>
            <span>•</span>
            <a href="#" className="hover:underline">Help</a>
            <span>•</span>
            <a href="#" className="hover:underline">Privacy</a>
            <span>•</span>
            <a href="#" className="hover:underline">Terms</a>
          </div>
        </CardContent>
      </Card>
    </aside>
  );
}
