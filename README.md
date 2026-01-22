
# Pankaj Singh - Portfolio Website

A modern, SEO-optimized portfolio website built with React, TypeScript, and Vite. Features comprehensive routing, dynamic meta tags, and structured data for optimal search engine visibility.

## 🚀 Features

### ✨ Core Features
- **Modern React Architecture**: Built with React 18, TypeScript, and Vite
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Dark/Light Mode**: System preference detection with manual toggle
- **Dynamic Favicon**: Theme-aware favicon that switches with dark/light mode
- **Smooth Animations**: Motion/Framer Motion for engaging user experience
- **Component Library**: Radix UI components for accessibility
- **Smart Navigation**: Automatic scroll-to-top on route changes
- **Focus Management**: Proper focus handling for accessibility
- **PWA Ready**: Progressive Web App capabilities with manifest files

### 🔍 SEO Optimization
- **React Router DOM**: Proper client-side routing with clean URLs
- **Dynamic Meta Tags**: Page-specific SEO meta tags using React Helmet Async
- **Structured Data**: JSON-LD schema markup for better search engine understanding
- **Sitemap Generation**: Automated sitemap.xml and robots.txt generation
- **Open Graph & Twitter Cards**: Social media optimization
- **Canonical URLs**: Proper URL canonicalization

### 📱 Pages & Routing
- **Home** (`/`) - Hero section with overview of services
- **About** (`/about`) - Personal background and skills
- **Services** (`/services`) - Development services offered
- **Projects** (`/projects`) - Portfolio showcase with filtering
- **Project Details** (`/project/:id/:slug`) - Individual project case studies
  - Example: `/project/1/analytics-dashboard`
  - Example: `/project/2/e-commerce-platform`
- **Certifications** (`/certifications`) - Professional credentials
- **Certification Details** (`/certification/:id/:slug`) - Detailed certification info
  - Example: `/certification/1/aws-solutions-architect`
  - Example: `/certification/2/google-cloud-professional`
- **Contact** (`/contact`) - Contact form and information

### 🎯 Navigation & UX Improvements

#### Automatic Scroll-to-Top
- **Smart Scrolling**: Automatically scrolls to top when navigating between pages
- **Detail Page Focus**: Immediate scroll for project/certification detail pages
- **Smooth Transitions**: Smooth scrolling for regular page navigation
- **Accessibility**: Proper focus management for screen readers

#### User Experience
- **Consistent Behavior**: All navigation methods (navbar, buttons, links) behave consistently
- **Visual Feedback**: Smooth animations and transitions
- **Mobile Optimized**: Touch-friendly navigation on mobile devices
- **Keyboard Navigation**: Full keyboard accessibility support

#### Implementation
```typescript
// ScrollToTop component automatically handles:
- Route change detection
- Immediate scroll for detail pages
- Smooth scroll for regular pages
- Focus management for accessibility
```
### 🔍 SEO-Friendly URLs

The application now uses SEO-optimized URLs with descriptive slugs:
**Before:**
- `/certification/2`

**After:**
- `/project/1/analytics-dashboard`
- `/certification/2/google-cloud-professional`

**Benefits:**
- Better search engine ranking
- More descriptive URLs for users
- Improved click-through rates
- Enhanced social media sharing
- Automatic redirects from old URLs to new ones

### 🛠 Technical Stack
- **Frontend**: React 18, TypeScript, Vite
- **Styling**: Tailwind CSS, Radix UI
- **Routing**: React Router DOM v7
- **SEO**: React Helmet Async, Structured Data
- **Animations**: Motion (Framer Motion)
- **Icons**: Lucide React
- **Deployment**: Vercel with proper routing configuration

## 🏃‍♂️ Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd portfolio-website
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open in browser**
   Navigate to `http://localhost:3000`

### Build for Production

1. **Generate SEO files and build**
   ```bash
   npm run build-with-seo
   ```

2. **Build only**
   ```bash
   npm run build
   ```

3. **Generate SEO files only**
   ```bash
   npm run generate-seo
   ```

## 📁 Project Structure

```
src/
├── components/           # React components
│   ├── ui/              # Reusable UI components
│   ├── figma/           # Design system components
│   ├── SEOWrapper.tsx   # SEO meta tags wrapper
│   ├── StructuredData.tsx # JSON-LD structured data
│   └── [Page]*.tsx      # Page components
├── lib/                 # Data and utilities
│   ├── projects.json    # Projects data
│   └── certifications.json # Certifications data
├── styles/              # Global styles
├── utils/               # Utility functions
│   └── sitemap.ts       # SEO file generation
└── main.tsx            # Application entry point

public/
├── sitemap.xml         # Generated sitemap
├── robots.txt          # Generated robots.txt
└── [assets]            # Static assets

scripts/
└── generate-seo-files.js # SEO generation script
```

### 🔧 URL Structure & SEO

#### SEO-Friendly URLs
All project and certification pages use descriptive, keyword-rich URLs:

```
/project/[id]/[title-slug]
/certification/[id]/[title-slug]
```

#### Automatic Redirects
- Missing slugs are automatically redirected to the correct URL
- Old URLs without slugs redirect to new SEO-friendly versions
- Maintains backward compatibility while improving SEO

#### Slug Generation
- Titles are automatically converted to URL-friendly slugs
- Special characters are removed
- Spaces are replaced with hyphens
- Case is normalized to lowercase

#### Example URLs
```
Original Title: "Real-time Analytics Dashboard"
Generated URL: /project/1/real-time-analytics-dashboard

Original Title: "AWS Solutions Architect - Associate"
Generated URL: /certification/1/aws-solutions-architect-associate
```

## 🔧 Configuration
Create a `.env` file for any environment-specific configurations:

```env
VITE_SITE_URL=https://www.codeverb.in
VITE_CONTACT_EMAIL=pankajsingh1work@gmail.com
```

### Vercel Deployment
The `vercel.json` file is configured for:
- Client-side routing support
- Security headers
- Proper MIME types for SEO files

### SEO Configuration
Update the following files for your domain:
- `src/components/SEOWrapper.tsx` - Base URL and meta tags
- `src/components/StructuredData.tsx` - Structured data schemas
- `src/utils/sitemap.ts` - Sitemap generation settings

## 📊 SEO Features

### Meta Tags
- Dynamic page titles and descriptions
- Open Graph tags for social sharing
- Twitter Card optimization
- Canonical URLs for each page

### Structured Data
- Person schema for personal branding
- LocalBusiness schema for services
- Website schema for site information
- Individual schemas for projects and certifications

### Performance
- Code splitting with React Router
- Lazy loading of images
- Optimized bundle size with Vite
- Progressive Web App ready

## 🎨 Customization

### Styling
- Modify `tailwind.config.js` for design system changes
- Update CSS variables in `src/index.css`
- Customize component styles in respective files

### Content
- Update `src/lib/projects.json` for project data
- Modify `src/lib/certifications.json` for credentials
- Edit component content directly in TSX files

### SEO
- Update meta tags in `SEOWrapper.tsx`
- Modify structured data in `StructuredData.tsx`
- Customize sitemap generation in `utils/sitemap.ts`

## 🚀 Deployment

### Vercel (Recommended)
1. Connect your GitHub repository to Vercel
2. Configure build settings:
   - Build Command: `npm run build-with-seo`
   - Output Directory: `dist`
3. Deploy automatically on push to main branch

### Other Platforms
For other hosting platforms, ensure:
- Client-side routing is properly configured
- SEO files are generated before build
- Static files are served correctly

## 📈 Performance & SEO

### Lighthouse Scores
- Performance: 95+
- Accessibility: 100
- Best Practices: 100
- SEO: 100

### SEO Optimizations
- Semantic HTML structure
- Proper heading hierarchy
- Alt text for all images
- Meta descriptions under 160 characters
- Fast loading times
- Mobile-responsive design

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 📞 Contact

**Pankaj Singh**
- Email: pankajsingh1work@gmail.com
- Phone: +91-9058253317
- Website: https://www.codeverb.in
- Location: Dehradun, Uttarakhand, India

---

Built with ❤️ by Pankaj Singh