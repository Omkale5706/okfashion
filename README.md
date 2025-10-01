# OK Fashion - AI-Powered Fashion Stylist

A complete full-stack web application that provides personalized fashion recommendations using AI technology.

## Features

### 🎨 Core Features
- **AI Style Analysis**: Upload photos for personalized fashion recommendations
- **Outfit Recommendations**: Get suggestions based on body type and style preferences
- **Hairstyle Suggestions**: Find hairstyles that complement your face shape
- **Color Analysis**: Discover colors that enhance your natural beauty
- **Style Transformation**: Complete makeover recommendations

### 👤 User Features
- **Authentication**: Secure JWT-based login/signup system
- **User Dashboard**: Personal profile and recommendation history
- **Photo Upload**: Secure image upload with progress tracking
- **Favorites**: Save and organize your favorite recommendations
- **Dark/Light Mode**: Toggle between themes

### 🛡️ Admin Features
- **Admin Dashboard**: Comprehensive system management
- **User Management**: View and manage user accounts
- **Analytics**: Detailed usage statistics and insights
- **System Logs**: Monitor system activity and troubleshoot issues

### 🌟 Additional Features
- **Contact Form**: Get in touch with support
- **Newsletter**: Subscribe to fashion updates
- **Responsive Design**: Works on all devices
- **Modern UI**: Clean, professional design with gradients

## Tech Stack

### Frontend
- **Next.js 15**: React framework with App Router
- **TypeScript**: Type-safe development
- **Tailwind CSS v4**: Modern styling with custom design tokens
- **Lucide React**: Beautiful icons
- **shadcn/ui**: High-quality UI components

### Backend
- **Next.js API Routes**: Serverless API endpoints
- **JWT Authentication**: Secure user sessions
- **bcryptjs**: Password hashing
- **File Upload**: Image processing and storage

### Features
- **AI Integration**: Mock AI analysis with extensible architecture
- **Real-time Updates**: Dynamic recommendation updates
- **Search & Filter**: Advanced filtering capabilities
- **Email Integration**: Contact forms and newsletters

## Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. **Clone the repository**
   \`\`\`bash
   git clone <repository-url>
   cd ok-fashion
   \`\`\`

2. **Install dependencies**
   \`\`\`bash
   npm install
   \`\`\`

3. **Set up environment variables**
   Create a `.env.local` file in the root directory:
   \`\`\`env
   JWT_SECRET=your-super-secret-jwt-key-here
   NEXT_PUBLIC_APP_URL=http://localhost:3000
   \`\`\`

4. **Run the development server**
   \`\`\`bash
   npm run dev
   \`\`\`

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## Demo Accounts

### Regular User
- **Email**: user@example.com
- **Password**: password

### Admin User
- **Email**: admin@okfashion.com
- **Password**: password

## Project Structure

\`\`\`
ok-fashion/
├── app/                    # Next.js App Router pages
│   ├── api/               # API routes
│   ├── admin/             # Admin dashboard
│   ├── dashboard/         # User dashboard
│   └── ...                # Other pages
├── components/            # React components
│   ├── ui/               # Base UI components
│   ├── sections/         # Page sections
│   ├── dashboard/        # Dashboard components
│   └── admin/            # Admin components
├── contexts/             # React contexts
├── hooks/                # Custom hooks
└── public/               # Static assets
\`\`\`

## API Endpoints

### Authentication
- `POST /api/auth/login` - User login
- `POST /api/auth/signup` - User registration
- `GET /api/auth/me` - Get current user

### Fashion AI
- `POST /api/fashion/analyze` - Analyze uploaded images
- `GET /api/fashion/recommendations` - Get user recommendations
- `POST /api/fashion/recommendations/[id]/like` - Like recommendation
- `POST /api/fashion/recommendations/[id]/save` - Save recommendation

### Contact & Newsletter
- `POST /api/contact` - Send contact message
- `POST /api/newsletter` - Subscribe to newsletter

## Deployment

### Vercel (Recommended)
1. Push your code to GitHub
2. Connect your repository to Vercel
3. Set environment variables in Vercel dashboard
4. Deploy automatically

### Other Platforms
The app can be deployed to any platform that supports Next.js:
- Netlify
- Railway
- DigitalOcean App Platform
- AWS Amplify

## Customization

### Colors
Update the color scheme in `app/globals.css`:
- Primary gradient: Purple to blue
- Accent gradient: Pink tones
- Neutral colors: Grays and whites

### AI Integration
Replace mock AI responses in `/api/fashion/analyze` with real AI services:
- Face analysis APIs
- Style recommendation engines
- Color analysis tools

### Database
Currently uses mock data. Integrate with:
- PostgreSQL
- MongoDB
- Supabase
- PlanetScale

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request



## Support

For support, email okfashionai@gmail.com or create an issue in the repository.

---

Built with ❤️ by Om Kale
