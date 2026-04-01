import { useParams } from 'react-router';
import { NavbarNew } from '@/app/components/NavbarNew';
import { Card, CardContent } from '@/app/components/ui/card';
import { Button } from '@/app/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/app/components/ui/avatar';
import { PostCardNew } from '@/app/components/PostCardNew';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/app/components/ui/tabs';
import { Calendar, MapPin, Link as LinkIcon } from 'lucide-react';
import { useAppSelector } from '@/app/store/hooks';
import { MOCK_USERS, MOCK_POSTS } from '@/app/data/mockData';
import { formatDistanceToNow } from 'date-fns';

export function UserProfile() {
  const { userId } = useParams();
  const currentUser = useAppSelector((state) => state.auth.user);
  const posts = useAppSelector((state) => state.posts.posts);
  
  const profileUser = MOCK_USERS.find(u => u.id === userId) || currentUser;
  const userPosts = posts.filter(p => p.author_id === userId);
  
  const isOwnProfile = currentUser?.id === userId;

  if (!profileUser) {
    return (
      <div className="min-h-screen bg-gray-50">
        <NavbarNew />
        <div className="max-w-4xl mx-auto px-4 py-8">
          <p className="text-center text-gray-600">User not found</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <NavbarNew />
      
      <div className="max-w-5xl mx-auto px-4 py-6">
        {/* Profile Header */}
        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-6">
              <Avatar className="h-24 w-24">
                <AvatarImage src={profileUser.avatar_url} alt={profileUser.username} />
                <AvatarFallback className="bg-teal-600 text-white text-3xl">
                  {profileUser.username.charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>

              <div className="flex-1">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h1 className="text-2xl text-gray-900 mb-1">{profileUser.username}</h1>
                    {profileUser.bio && (
                      <p className="text-gray-600 mb-3">{profileUser.bio}</p>
                    )}
                  </div>
                  {isOwnProfile && (
                    <Button variant="outline">Edit Profile</Button>
                  )}
                </div>

                <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    <span>Joined {formatDistanceToNow(new Date(profileUser.created_at), { addSuffix: true })}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="font-medium text-gray-900">{userPosts.length}</span>
                    <span>posts</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Tabs */}
        <Tabs defaultValue="posts" className="space-y-4">
          <TabsList className="bg-white border">
            <TabsTrigger value="posts">Posts</TabsTrigger>
            <TabsTrigger value="comments">Comments</TabsTrigger>
            <TabsTrigger value="saved">Saved</TabsTrigger>
          </TabsList>

          <TabsContent value="posts" className="space-y-4">
            {userPosts.length > 0 ? (
              userPosts.map(post => <PostCardNew key={post.id} post={post} />)
            ) : (
              <Card>
                <CardContent className="p-8 text-center text-gray-600">
                  No posts yet
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="comments" className="space-y-4">
            <Card>
              <CardContent className="p-8 text-center text-gray-600">
                No comments yet
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="saved" className="space-y-4">
            <Card>
              <CardContent className="p-8 text-center text-gray-600">
                No saved posts
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
