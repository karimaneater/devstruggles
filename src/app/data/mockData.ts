import { Post, User, Comment, ReactionType } from '@/app/types';

export const MOCK_USERS: User[] = [
  {
    id: 'user-1',
    username: 'sarah_dev',
    email: 'sarah@example.com',
    avatar_url: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah',
    bio: 'Full-stack developer | React enthusiast | Coffee addict ☕',
    created_at: '2024-01-15T10:00:00Z',
  },
  {
    id: 'user-2',
    username: 'code_ninja',
    email: 'ninja@example.com',
    avatar_url: 'https://api.dicebear.com/7.x/avataaars/svg?seed=CodeNinja',
    bio: 'Debugging my way through life 🐛',
    created_at: '2024-02-20T14:30:00Z',
  },
  {
    id: 'user-3',
    username: 'tech_wizard',
    email: 'wizard@example.com',
    avatar_url: 'https://api.dicebear.com/7.x/avataaars/svg?seed=TechWizard',
    bio: 'Teaching code and building cool stuff',
    created_at: '2023-11-05T09:15:00Z',
  },
];

export const MOCK_POSTS: Post[] = [
  {
    id: 'post-1',
    title: 'Finally fixed that async/await bug that haunted me for 3 days!',
    content: `Just spent 3 days debugging an async/await issue that turned out to be a simple race condition. Here's what I learned:

The problem was that I was making multiple API calls without properly waiting for them to complete. I thought Promise.all() would solve it, but I was still getting inconsistent data.

Turns out I needed to use Promise.allSettled() instead to handle both successful and failed promises properly. This way, even if one API call fails, the others still complete.

**Key Takeaways:**
- Always handle promise rejections explicitly
- Promise.allSettled() is your friend for multiple async operations
- Add proper error boundaries in React
- Log everything during development

Has anyone else run into this? What's your approach to handling multiple async operations?`,
    code_snippet: `// Before (buggy)
const data = await Promise.all([
  fetchUsers(),
  fetchPosts(),
  fetchComments()
]);

// After (working)
const results = await Promise.allSettled([
  fetchUsers(),
  fetchPosts(),
  fetchComments()
]);

const data = results.map(r => 
  r.status === 'fulfilled' ? r.value : null
);`,
    language: 'javascript',
    author_id: 'user-1',
    author: MOCK_USERS[0],
    tags: ['javascript', 'async', 'debugging', 'promises'],
    difficulty: 'intermediate',
    image_url: 'https://images.unsplash.com/photo-1544847558-3ccacb31ee7f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWNobm9sb2d5JTIwY29kaW5nJTIwbGFwdG9wfGVufDF8fHx8MTc3MzUwMTkwN3ww&ixlib=rb-4.1.0&q=80&w=1080',
    reactions: { like: 234, heart: 89, laugh: 12, wow: 45, star: 167 },
    user_reaction: null,
    comment_count: 42,
    view_count: 1247,
    created_at: '2026-03-14T10:30:00Z',
    updated_at: '2026-03-14T10:30:00Z',
  },
  {
    id: 'post-2',
    title: 'Built my first full-stack app with React and Node.js!',
    content: `I just deployed my first complete full-stack application and wanted to share my journey! 🎉

After months of learning, I built a task management app with user authentication, real-time updates, and a clean UI.

**Tech Stack:**
- Frontend: React, TypeScript, TailwindCSS
- Backend: Node.js, Express
- Database: PostgreSQL
- Real-time: Socket.io
- Deployment: Vercel + Railway

**Biggest Challenges:**
1. Setting up authentication properly (JWT tokens)
2. Managing state across components
3. Handling WebSocket connections
4. Database schema design

The feeling when everything clicked together was amazing! Now I understand why people say "just build projects" - you learn so much more than from tutorials.

Would love to hear feedback from experienced devs! What would you have done differently?`,
    language: 'typescript',
    code_snippet: `// Simple auth middleware I'm proud of
export const authenticateToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers['authorization']?.split(' ')[1];
  
  if (!token) {
    return res.status(401).json({ error: 'No token provided' });
  }
  
  jwt.verify(token, process.env.JWT_SECRET!, (err, user) => {
    if (err) return res.status(403).json({ error: 'Invalid token' });
    req.user = user;
    next();
  });
};`,
    author_id: 'user-2',
    author: MOCK_USERS[1],
    tags: ['react', 'nodejs', 'fullstack', 'beginner', 'showcase'],
    difficulty: 'beginner',
    image_url: 'https://images.unsplash.com/photo-1634141614476-1b421ce4aace?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmb29kJTIwY29va2luZyUyMGN1aXNpbmV8ZW58MXx8fHwxNzczNTQyOTIyfDA&ixlib=rb-4.1.0&q=80&w=1080',
    reactions: { like: 567, heart: 234, laugh: 5, wow: 123, star: 345 },
    user_reaction: null,
    comment_count: 78,
    view_count: 2893,
    created_at: '2026-03-13T15:45:00Z',
    updated_at: '2026-03-13T15:45:00Z',
  },
  {
    id: 'post-3',
    title: 'CSS Grid vs Flexbox - When to use what?',
    content: `I've been using both CSS Grid and Flexbox for a while now, and I wanted to share my mental model for choosing between them.

**Use Flexbox when:**
- You need 1-dimensional layouts (rows OR columns)
- Content size should determine layout
- You want items to wrap naturally
- Building navigation menus, toolbars
- Aligning items within a container

**Use Grid when:**
- You need 2-dimensional layouts (rows AND columns)
- You want precise control over placement
- Building page layouts, dashboards
- Creating responsive galleries
- Overlapping elements

**Pro Tip:** You can (and should!) combine them! Use Grid for page layout and Flexbox for component internals.

Here's a practical example of both working together:`,
    code_snippet: `/* Page layout with Grid */
.page-layout {
  display: grid;
  grid-template-columns: 250px 1fr;
  grid-template-rows: 60px 1fr;
  gap: 20px;
  height: 100vh;
}

/* Component internals with Flexbox */
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
}

.card {
  display: flex;
  flex-direction: column;
  gap: 12px;
}`,
    language: 'css',
    author_id: 'user-3',
    author: MOCK_USERS[2],
    tags: ['css', 'flexbox', 'grid', 'layout', 'tutorial'],
    difficulty: 'intermediate',
    reactions: { like: 892, heart: 156, laugh: 23, wow: 234, star: 567 },
    user_reaction: null,
    comment_count: 94,
    view_count: 4521,
    created_at: '2026-03-13T09:20:00Z',
    updated_at: '2026-03-13T09:20:00Z',
  },
  {
    id: 'post-4',
    title: 'Why is learning DSA so hard? 😭',
    content: `I've been trying to learn Data Structures and Algorithms for the past month and I feel like I'm hitting a wall.

I can follow along with tutorials, but when I try to solve problems on LeetCode, I just freeze. Even the "easy" problems feel impossible sometimes.

Does it get better? How long did it take you to feel comfortable with DSA?

Any tips for someone struggling? I really want to improve but feeling discouraged lately.`,
    author_id: 'user-2',
    author: MOCK_USERS[1],
    tags: ['dsa', 'learning', 'help', 'beginner'],
    difficulty: 'beginner',
    reactions: { like: 445, heart: 234, laugh: 67, wow: 89, star: 123 },
    user_reaction: null,
    comment_count: 156,
    view_count: 3245,
    created_at: '2026-03-12T18:00:00Z',
    updated_at: '2026-03-12T18:00:00Z',
  },
  {
    id: 'post-5',
    title: 'I made a CLI tool to automate my dev workflow!',
    content: `Got tired of typing the same commands over and over, so I built a CLI tool to automate my development workflow.

Features:
- ✅ Create new React components with boilerplate
- ✅ Run tests with coverage
- ✅ Git commit with conventional commits
- ✅ Deploy to staging/production
- ✅ Database migrations

Built with Node.js and Commander.js. Saved me hours already!

Open sourced it if anyone wants to check it out or contribute 🚀`,
    code_snippet: `#!/usr/bin/env node
import { Command } from 'commander';
import chalk from 'chalk';
import inquirer from 'inquirer';

const program = new Command();

program
  .name('devflow')
  .description('CLI tool for development workflow')
  .version('1.0.0');

program
  .command('component <name>')
  .description('Create a new React component')
  .action(async (name) => {
    const { includeTests } = await inquirer.prompt([{
      type: 'confirm',
      name: 'includeTests',
      message: 'Include test file?',
      default: true,
    }]);
    
    createComponent(name, includeTests);
    console.log(chalk.green(\`✓ Created component \${name}\`));
  });

program.parse();`,
    language: 'javascript',
    author_id: 'user-1',
    author: MOCK_USERS[0],
    tags: ['cli', 'nodejs', 'automation', 'productivity', 'showcase'],
    difficulty: 'advanced',
    reactions: { like: 678, heart: 267, laugh: 34, wow: 345, star: 789 },
    user_reaction: null,
    comment_count: 67,
    view_count: 2156,
    created_at: '2026-03-12T12:30:00Z',
    updated_at: '2026-03-12T12:30:00Z',
  },
  {
    id: 'post-6',
    title: 'Redux vs Context API - Hot take incoming!',
    content: `Unpopular opinion: For most apps, you don't need Redux.

Don't get me wrong, Redux is great for large applications with complex state. But I see too many beginners reaching for Redux when Context API + useReducer would work perfectly fine.

**When to use Context API:**
- Small to medium apps
- Simple state sharing
- Theme, auth, language preferences
- Less than 10-15 different actions

**When to use Redux:**
- Large enterprise apps
- Complex state interactions
- Need for middleware (thunks, sagas)
- Time-travel debugging
- Team needs predictable patterns

The overhead of Redux (boilerplate, learning curve, bundle size) isn't worth it for every project.

Change my mind! 🔥`,
    author_id: 'user-3',
    author: MOCK_USERS[2],
    tags: ['redux', 'react', 'state-management', 'opinion'],
    difficulty: 'intermediate',
    reactions: { like: 423, heart: 89, laugh: 156, wow: 267, star: 134 },
    user_reaction: null,
    comment_count: 234,
    view_count: 5432,
    created_at: '2026-03-11T14:15:00Z',
    updated_at: '2026-03-11T14:15:00Z',
  },
  {
    id: 'post-7',
    title: 'Just got my first dev job offer! 🎉',
    content: `After 8 months of self-study and countless rejections, I finally got my first offer as a junior frontend developer!

**My Journey:**
- Started learning in July 2025
- Built 5 portfolio projects
- Applied to 200+ jobs
- Got 15 interviews
- Received 3 offers

**What worked for me:**
1. Focus on fundamentals (JS, React)
2. Build real projects, not tutorials
3. Contribute to open source
4. Network on Twitter/LinkedIn
5. Practice coding interviews
6. Be persistent!

To everyone still grinding: keep going! The rejections hurt but each one makes you stronger. You only need one "yes"!

Happy to answer any questions! 💪`,
    author_id: 'user-2',
    author: MOCK_USERS[1],
    tags: ['career', 'success', 'motivation', 'junior-dev'],
    difficulty: 'beginner',
    reactions: { like: 1234, heart: 567, laugh: 45, wow: 234, star: 456 },
    user_reaction: null,
    comment_count: 189,
    view_count: 6789,
    created_at: '2026-03-11T08:00:00Z',
    updated_at: '2026-03-11T08:00:00Z',
  },
  {
    id: 'post-8',
    title: 'Understanding JavaScript Closures Once and For All',
    content: `Closures confused me for the longest time. Here's how I finally understood them:

**Simple Definition:**
A closure is when a function "remembers" variables from its parent scope, even after the parent function has finished running.

**Why it matters:**
- Data privacy
- Event handlers
- Callbacks
- Functional programming

The key insight: JavaScript functions create a new scope, and inner functions have access to outer function variables. When you return the inner function, it keeps that access!

Here's the classic example that helped it click for me:`,
    code_snippet: `function createCounter() {
  let count = 0; // Private variable
  
  return {
    increment: () => ++count,
    decrement: () => --count,
    getCount: () => count
  };
}

const counter = createCounter();
console.log(counter.increment()); // 1
console.log(counter.increment()); // 2
console.log(counter.getCount());  // 2

// count is private - can't access directly!
console.log(counter.count); // undefined

// Real-world use case
function debounce(func, delay) {
  let timeoutId; // Closure remembers this!
  
  return function(...args) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      func.apply(this, args);
    }, delay);
  };
}`,
    language: 'javascript',
    author_id: 'user-3',
    author: MOCK_USERS[2],
    tags: ['javascript', 'closures', 'tutorial', 'fundamentals'],
    difficulty: 'intermediate',
    reactions: { like: 756, heart: 234, laugh: 12, wow: 189, star: 445 },
    user_reaction: null,
    comment_count: 103,
    view_count: 3897,
    created_at: '2026-03-10T20:45:00Z',
    updated_at: '2026-03-10T20:45:00Z',
  },
];

export const MOCK_COMMENTS: Comment[] = [
  {
    id: 'comment-1',
    post_id: 'post-1',
    author_id: 'user-3',
    author: MOCK_USERS[2],
    content: 'This is super helpful! I ran into the exact same issue last week. Promise.allSettled() saved me too. Another tip: consider using async/await with try/catch blocks for better error handling.',
    parent_id: null,
    reactions: { like: 34, heart: 12, laugh: 0, wow: 5, star: 8 },
    user_reaction: null,
    created_at: '2026-03-14T11:15:00Z',
    updated_at: '2026-03-14T11:15:00Z',
  },
  {
    id: 'comment-2',
    post_id: 'post-1',
    author_id: 'user-2',
    author: MOCK_USERS[1],
    content: `Great write-up! Here's how I usually handle this pattern:

\`\`\`javascript
const fetchAllData = async () => {
  try {
    const results = await Promise.allSettled([...]);
    return results.reduce((acc, result, index) => {
      if (result.status === 'fulfilled') {
        acc[index] = result.value;
      } else {
        console.error(\`Failed to fetch data \${index}\`, result.reason);
        acc[index] = null;
      }
      return acc;
    }, []);
  } catch (error) {
    // Handle unexpected errors
  }
};
\`\`\``,
    parent_id: null,
    reactions: { like: 45, heart: 23, laugh: 1, wow: 12, star: 15 },
    user_reaction: null,
    created_at: '2026-03-14T12:30:00Z',
    updated_at: '2026-03-14T12:30:00Z',
  },
];

export const POPULAR_TAGS = [
  { id: '1', name: 'javascript', post_count: 1247 },
  { id: '2', name: 'react', post_count: 982 },
  { id: '3', name: 'typescript', post_count: 756 },
  { id: '4', name: 'nodejs', post_count: 634 },
  { id: '5', name: 'css', post_count: 523 },
  { id: '6', name: 'python', post_count: 489 },
  { id: '7', name: 'career', post_count: 367 },
  { id: '8', name: 'tutorial', post_count: 445 },
  { id: '9', name: 'debugging', post_count: 298 },
  { id: '10', name: 'beginner', post_count: 534 },
];
