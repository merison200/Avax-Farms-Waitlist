# AVAX FARMS - Waitlist Platform

Fresh from the Farm - Revolutionizing agriculture through blockchain technology

## Overview

Avax Farms is a decentralized agriculture platform built on the Avalanche blockchain. This repository contains the waitlist registration system where users can join our community before the official launch.

## Key Features

- Blockchain-Powered Agriculture - Transparent supply chain tracking from farm to table
- Direct Farmer Connection - Eliminate middlemen and connect directly with farmers
- Sustainable Practices - Support eco-friendly farming with transparent metrics
- Responsive Design - Beautiful UI that works seamlessly on all devices
- Secure Waitlist System - Email verification with duplicate prevention
- Interactive Farm Showcase - Carousel galleries showcasing our ecosystem

## Tech Stack

### Frontend

- React 18 with TypeScript
- Vite - Fast build tool and dev server
- Tailwind CSS - Utility-first styling
- Lucide React and React Icons - Icon libraries
- Particle Background - Interactive visual effects

### Backend

- Supabase - Backend as a Service
- PostgreSQL Database
- Edge Functions (Deno runtime)
- Row Level Security (RLS)
- Cloudinary - Image hosting and optimization

### Blockchain

- Avalanche Network - Fast, eco-friendly blockchain infrastructure

## Getting Started

### Prerequisites

- Node.js 18+ and npm/yarn
- Supabase account (supabase.com)
- Cloudinary account (cloudinary.com)

### Installation

1. Clone the repository
   ```bash
   git clone https://github.com/yourusername/avax-farms-waitlist.git
   cd avax-farms-waitlist
   ```

2. Install dependencies
   ```bash
   npm install
   ```

3. Set up environment variables
   
   Create a `.env` file in the root directory:
   ```env
   VITE_SUPABASE_URL=your_supabase_project_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

4. Set up Supabase Database
   
   Run the SQL migration in your Supabase SQL Editor:
   ```bash
   Copy content from: supabase/migrations/20251112203909_create_waitlist_table.sql
   ```

5. Deploy Edge Function
   
   Deploy the waitlist registration function in Supabase Dashboard:
   - Go to Edge Functions
   - Create Function named "register-waitlist"
   - Copy content from: supabase/functions/register-waitlist/index.ts

6. Start development server
   ```bash
   npm run dev
   ```

   Open http://localhost:5173 in your browser.

## Project Structure

```
avax-farms-waitlist/
├── src/
│   ├── components/
│   │   └── ParticleBackground.tsx
│   ├── App.tsx
│   ├── supabase.ts
│   └── main.tsx
├── supabase/
│   ├── functions/
│   │   └── register-waitlist/
│   │       └── index.ts
│   └── migrations/
│       └── 20251112203909_create_waitlist_table.sql
├── .env
├── package.json
└── README.md
```

## Database Schema

### Waitlist Table

| Column       | Type         | Description                          |
|--------------|--------------|--------------------------------------|
| id           | uuid         | Primary key                          |
| email        | text         | User email (unique, case-insensitive)|
| name         | text         | User name                            |
| ip_address   | text         | User IP for duplicate detection      |
| location     | jsonb        | Geographic location data             |
| user_agent   | text         | Browser/device information           |
| created_at   | timestamptz  | Registration timestamp               |

Indexes:
- Unique index on email (case-insensitive)
- Index on created_at for sorting
- Index on ip_address for analytics

Security:
- Row Level Security (RLS) enabled
- Anonymous users can INSERT (register)
- Authenticated users can SELECT (admin view)

## Key Features Implementation

### Waitlist Registration

Users can register with:
- Name and email validation
- Duplicate email prevention
- IP-based geolocation tracking
- User agent detection

### Responsive Image Optimization

Using Cloudinary transformations:
- Mobile: c_fill,w_768,h_600,g_center - Cropped for mobile screens
- Tablet: c_fill,w_1024,h_600,g_center - Optimized for tablets
- Desktop: c_pad,w_1920,h_600,b_rgb:1a4d2e - Full padded view

### Farm Showcase Carousel

- Interactive image galleries
- Hover effects with navigation
- Multiple images per farm card
- Smooth transitions and animations

### Social Sharing

Integrated social media sharing for:
- Facebook
- Twitter/X
- LinkedIn
- Instagram
- TikTok

## Environment Variables

| Variable                  | Description                    | Required |
|---------------------------|--------------------------------|----------|
| VITE_SUPABASE_URL         | Supabase project URL           | Yes      |
| VITE_SUPABASE_ANON_KEY    | Supabase anonymous key         | Yes      |

Note: Edge Functions automatically receive SUPABASE_URL and SUPABASE_ANON_KEY from the Supabase environment.

## Deployment

### Deploy to Vercel

```bash
npm i -g vercel
vercel
```

### Deploy to Netlify

```bash
npm i -g netlify-cli
netlify deploy --prod
```

### Environment Variables for Production

Make sure to add your environment variables in your hosting platform:
- VITE_SUPABASE_URL
- VITE_SUPABASE_ANON_KEY

## Analytics and Monitoring

Track waitlist performance through Supabase Dashboard:
- Total registrations
- Registration timeline
- Geographic distribution (via location data)
- Device/browser analytics (via user_agent)

## Contributing

We welcome contributions! Please follow these steps:

1. Fork the repository
2. Create a feature branch (git checkout -b feature/AmazingFeature)
3. Commit your changes (git commit -m 'Add some AmazingFeature')
4. Push to the branch (git push origin feature/AmazingFeature)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Contact and Social Media

- Website: avaxfarms.com
- Twitter/X: @avaxfarms (https://x.com/avaxfarms)
- Facebook: facebook.com/avaxfarms
- LinkedIn: linkedin.com/company/avaxfarms
- Instagram: @avaxfarms (https://instagram.com/avaxfarms)
- TikTok: @avaxfarms (https://tiktok.com/@avaxfarms)

## Acknowledgments

- Built on Avalanche blockchain
- Powered by Supabase
- Images hosted on Cloudinary
- Icons by Lucide

## Roadmap

Completed:
- Waitlist registration system
- Responsive design
- Social sharing integration

Planned:
- Email confirmation system
- Admin dashboard for waitlist management
- Integration with Avalanche wallet
- NFT rewards for early supporters
- Farmer onboarding platform
- Marketplace launch

---

Made with love by the Avax Farms Team

Fresh from the Farm - Building the future of sustainable agriculture
