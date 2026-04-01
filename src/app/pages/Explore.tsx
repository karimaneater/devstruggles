import { useState } from 'react';
import { NavbarNew } from '@/app/components/NavbarNew';
import { PostCardNew } from '@/app/components/PostCardNew';
import { Card, CardContent, CardHeader, CardTitle } from '@/app/components/ui/card';
import { Badge } from '@/app/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/app/components/ui/tabs';
import { Hash, TrendingUp, Star } from 'lucide-react';
import { useAppSelector } from '@/app/store/hooks';
import { POPULAR_TAGS } from '@/app/data/mockData';

export function Explore() {
  const posts = useAppSelector((state) => state.posts.posts);
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  const filteredPosts = selectedTag
    ? posts.filter(p => p.tags?.includes(selectedTag))
    : posts;

  const topPosts = [...posts].sort((a, b) => {
    const aTotal = Object.values(a.reactions).reduce((sum, val) => sum + val, 0);
    const bTotal = Object.values(b.reactions).reduce((sum, val) => sum + val, 0);
    return bTotal - aTotal;
  }).slice(0, 10);

  const trendingPosts = [...posts].sort((a, b) => b.view_count - a.view_count).slice(0, 10);

  return (
    <div className="min-h-screen bg-gray-50">
      <NavbarNew />
      
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="mb-6">
          <h1 className="text-3xl text-gray-900 mb-2">Explore DevStruggles</h1>
          <p className="text-gray-600">Discover popular posts, trending topics, and active developers</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <Tabs defaultValue="top" className="space-y-4">
              <TabsList className="bg-white border">
                <TabsTrigger value="top">
                  <Star className="h-4 w-4 mr-2" />
                  Top Posts
                </TabsTrigger>
                <TabsTrigger value="trending">
                  <TrendingUp className="h-4 w-4 mr-2" />
                  Trending
                </TabsTrigger>
                <TabsTrigger value="tags">
                  <Hash className="h-4 w-4 mr-2" />
                  By Tag
                </TabsTrigger>
              </TabsList>

              <TabsContent value="top" className="space-y-4">
                {topPosts.map(post => (
                  <PostCardNew key={post.id} post={post} />
                ))}
              </TabsContent>

              <TabsContent value="trending" className="space-y-4">
                {trendingPosts.map(post => (
                  <PostCardNew key={post.id} post={post} />
                ))}
              </TabsContent>

              <TabsContent value="tags" className="space-y-4">
                {selectedTag && (
                  <div className="flex items-center gap-2 mb-4">
                    <span className="text-sm text-gray-600">Filtered by:</span>
                    <Badge
                      variant="secondary"
                      className="cursor-pointer"
                      onClick={() => setSelectedTag(null)}
                    >
                      #{selectedTag} ✕
                    </Badge>
                  </div>
                )}
                {filteredPosts.map(post => (
                  <PostCardNew key={post.id} post={post} />
                ))}
              </TabsContent>
            </Tabs>
          </div>

          {/* Sidebar */}
          <div className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-sm">All Tags</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {POPULAR_TAGS.map(tag => (
                  <div
                    key={tag.id}
                    className={`flex items-center justify-between p-2 rounded cursor-pointer transition-colors ${
                      selectedTag === tag.name
                        ? 'bg-teal-100 text-teal-900'
                        : 'hover:bg-gray-50'
                    }`}
                    onClick={() => setSelectedTag(tag.name === selectedTag ? null : tag.name)}
                  >
                    <span className="text-sm">#{tag.name}</span>
                    <Badge variant="secondary" className="text-xs">
                      {tag.post_count}
                    </Badge>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-teal-500 to-emerald-600 text-white border-0">
              <CardContent className="p-4">
                <h3 className="font-semibold mb-2">Community Stats</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-teal-50">Total Posts:</span>
                    <span className="font-semibold">{posts.length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-teal-50">Active Tags:</span>
                    <span className="font-semibold">{POPULAR_TAGS.length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-teal-50">Total Reactions:</span>
                    <span className="font-semibold">
                      {posts.reduce((sum, p) => 
                        sum + Object.values(p.reactions).reduce((s, v) => s + v, 0), 0
                      )}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
