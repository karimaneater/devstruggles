# DevStruggles 🚀

A modern developer community platform where programmers share their code struggles, solutions, and learn together.

![DevStruggles](https://img.shields.io/badge/React-18.3.1-blue) ![Redux](https://img.shields.io/badge/Redux_Toolkit-2.11.2-purple) ![TypeScript](https://img.shields.io/badge/TypeScript-Ready-green) ![Supabase](https://img.shields.io/badge/Supabase-Ready-orange)

## ✨ Features

### Core Functionality
- **User Authentication** - Login/Register with email & password (Supabase-ready)
- **Create Posts** - Share code struggles with markdown support and syntax highlighting
- **Code Snippets** - Embed code with syntax highlighting for 13+ languages
- **Social Reactions** - Express yourself with 5 reaction types (👍 Like, ❤️ Heart, 😂 Laugh, 😮 Wow, ⭐ Star)
- **Comments** - Nested comment threads with reactions
- **Tag System** - Organize posts by programming languages and topics
- **Difficulty Levels** - Mark posts as Beginner, Intermediate, or Advanced
- **User Profiles** - View post history and user stats
- **Explore Page** - Discover trending and top posts
- **Search** - Find posts by keywords and tags

### Technical Features
- **Redux State Management** - Centralized state with Redux Toolkit
- **React Router** - Client-side routing with protected routes
- **Supabase-Ready Architecture** - Database schema and API layer prepared for Supabase integration
- **Real-time Ready** - Structure supports real-time updates via Supabase subscriptions
- **Responsive Design** - Mobile-first with Tailwind CSS
- **Code Syntax Highlighting** - React Syntax Highlighter with multiple themes
- **Markdown Support** - Rich text formatting in posts and comments

## 🎨 Design System

**Brand**: DevStruggles  
**Color Scheme**: Green/Teal palette  
- Primary: `#0d9488` (Teal)
- Secondary: `#14b8a6` (Light Teal)
- Background: `#f8faf9` (Off-white with green tint)

## 🛠️ Tech Stack

### Frontend
- **React 18.3.1** - UI library
- **TypeScript** - Type safety
- **Redux Toolkit** - State management
- **React Router 7** - Routing
- **Tailwind CSS 4** - Styling
- **Radix UI** - Accessible component primitives
- **Lucide React** - Icon library
- **React Markdown** - Markdown rendering
- **React Syntax Highlighter** - Code highlighting
- **date-fns** - Date formatting

### Backend (Ready for Integration)
- **Supabase** - PostgreSQL database, authentication, real-time subscriptions
- Row-Level Security policies defined
- Database schema and migrations ready

## 📁 Project Structure

```
src/
├── app/
│   ├── components/          # Reusable UI components
│   │   ├── ui/             # Radix UI components
│   │   ├── CodeBlock.tsx   # Syntax-highlighted code display
│   │   ├── DifficultyBadge.tsx
│   │   ├── NavbarNew.tsx
│   │   ├── PostCardNew.tsx # Post preview cards
│   │   ├── ReactionBar.tsx # Social reactions component
│   │   ├── SidebarNew.tsx
│   │   └── TagList.tsx
│   ├── pages/              # Page components
│   │   ├── CreatePost.tsx  # Post creation form
│   │   ├── Explore.tsx     # Discover content
│   │   ├── HomeNew.tsx     # Main feed
│   │   ├── LoginNew.tsx
│   │   ├── PostDetail.tsx  # Single post view
│   │   ├── RegisterNew.tsx
│   │   └── UserProfile.tsx
│   ├── store/              # Redux store
│   │   ├── slices/
│   │   │   ├── authSlice.ts
│   │   │   ├── postsSlice.ts
│   │   │   ├── commentsSlice.ts
│   │   │   └── uiSlice.ts
│   │   ├── hooks.ts        # Typed Redux hooks
│   │   └── index.ts
│   ├── services/
│   │   └── supabase.ts     # Supabase client & API functions
│   ├── data/
│   │   └── mockData.ts     # Mock data for development
│   ├── types/
│   │   └── index.ts        # TypeScript interfaces
│   ├── routes.tsx          # Route definitions
│   └── App.tsx
└── styles/
    └── theme.css           # Tailwind theme configuration
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or pnpm

### Installation

1. Clone the repository
```bash
git clone <repository-url>
cd devstruggles
```

2. Install dependencies
```bash
npm install
```

3. Start development server
```bash
npm run dev
```

4. Open http://localhost:5173

### Demo Credentials
```
Email: test@example.com
Password: password123
```

## 🔐 Authentication Flow

The app uses Redux for authentication state management with localStorage persistence.

**Current**: Mock authentication
**Production-Ready**: Supabase auth integration (see `SUPABASE_SETUP.md`)

## 📊 State Management

### Redux Slices

1. **authSlice** - User authentication and session
2. **postsSlice** - Posts, sorting, filtering, search
3. **commentsSlice** - Comment threads and reactions
4. **uiSlice** - UI state (modals, sidebar, theme)

### Example Usage

```typescript
import { useAppSelector, useAppDispatch } from '@/app/store/hooks';
import { toggleReaction } from '@/app/store/slices/postsSlice';

function PostCard({ post }) {
  const dispatch = useAppDispatch();
  
  const handleReaction = (type: ReactionType) => {
    dispatch(toggleReaction({ postId: post.id, reactionType: type }));
  };
  
  return <ReactionBar onReact={handleReaction} {...post} />;
}
```

## 🗄️ Database Schema

See `SUPABASE_SETUP.md` for complete database schema, RLS policies, and migration instructions.

**Tables**:
- `users` - User profiles
- `posts` - Blog posts with code snippets
- `comments` - Nested comments
- `reactions` - Social reactions
- `tags` - Tag management

## 🎯 Supabase Integration

The app is **Supabase-ready** but currently uses mock data for development.

### To Enable Supabase:

1. Create a Supabase project
2. Run SQL migrations from `SUPABASE_SETUP.md`
3. Add environment variables:
```env
VITE_SUPABASE_URL=your_project_url
VITE_SUPABASE_ANON_KEY=your_anon_key
```
4. Uncomment Supabase client in `/src/app/services/supabase.ts`
5. Update Redux thunks to use Supabase functions

### Real-time Features (Post-Supabase)

```typescript
// Subscribe to new posts
const channel = supabase
  .channel('posts')
  .on('postgres_changes', {
    event: 'INSERT',
    schema: 'public',
    table: 'posts'
  }, (payload) => {
    dispatch(addPost(payload.new));
  })
  .subscribe();
```

## 🎨 Customization

### Theme Colors

Edit `/src/styles/theme.css`:

```css
:root {
  --primary: #0d9488;      /* Teal */
  --accent: #14b8a6;       /* Light Teal */
  --background: #f8faf9;   /* Off-white */
}
```

### Add New Reaction Types

1. Update `ReactionType` in `/src/app/types/index.ts`
2. Add icon config in `/src/app/components/ReactionBar.tsx`
3. Update database schema if using Supabase

## 📝 Creating Posts

Posts support:
- **Markdown** - Rich text formatting
- **Code Snippets** - Syntax-highlighted code blocks
- **Tags** - Up to 10 tags per post
- **Difficulty Levels** - Beginner, Intermediate, Advanced
- **Images** - Via URL (no file uploads to keep database light)

## 🧪 Development

### Mock Data

Mock data is located in `/src/app/data/mockData.ts`:
- 8 sample posts with code snippets
- 3 sample users
- 2 sample comments
- 10 popular tags

### Adding Features

1. **New Page**: Create in `/src/app/pages/`, add route in `/src/app/routes.tsx`
2. **New Component**: Add to `/src/app/components/`
3. **State Management**: Create slice in `/src/app/store/slices/`
4. **API Integration**: Add functions to `/src/app/services/supabase.ts`

## 🚢 Deployment

### Build for Production

```bash
npm run build
```

Output will be in `/dist` folder.

### Deploy to Vercel/Netlify

1. Connect your repository
2. Set environment variables (Supabase URL & Key)
3. Deploy!

### Supabase Deployment

1. Set up Supabase project
2. Run database migrations
3. Configure authentication providers
4. Enable Row Level Security
5. Update environment variables in hosting platform

## 🤝 Contributing

Feel free to contribute! Areas for improvement:
- Add unit tests
- Implement notification system
- Add bookmarking functionality
- Create admin dashboard
- Implement search with Algolia
- Add dark mode
- Mobile app with React Native

## 📄 License

MIT License - feel free to use this project for learning or production!

## 🙏 Acknowledgments

- Tailwind CSS for the amazing utility-first framework
- Radix UI for accessible components
- Supabase for the incredible backend platform
- The developer community for inspiration

---

**Built with ❤️ for developers who struggle (all of us)**

Happy coding! 🚀
