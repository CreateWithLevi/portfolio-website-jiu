# Jiu Fang - Creative Portfolio Website

A dynamic, one-page portfolio website built with **Astro**, **Svelte**, and **WebGL**, featuring interactive effects and smooth animations.

## Features

- **Content Collections**: Astro-powered content management for easy project updates
- **Interactive Effects**:
  - Text scramble effect on sidebar navigation
  - WebGL fluid shader distortion on project images
  - SVG morph animations on links
- **Responsive Design**: Optimized for desktop and mobile devices
- **Performance**: Static site generation with selective client-side interactivity
- **Type-Safe**: Full TypeScript support

## Tech Stack

- **[Astro 5](https://astro.build)** - Static site generator
- **[Svelte 5](https://svelte.dev)** - Interactive UI components
- **[OGL](https://github.com/oframe/ogl)** - Lightweight WebGL library
- **[GSAP](https://gsap.com)** - Professional animation library
- **TypeScript** - Type safety

## Project Structure

```
/
├── public/              # Static assets
├── src/
│   ├── assets/          # Project images and videos
│   ├── components/      # Svelte components
│   │   ├── Sidebar.svelte
│   │   ├── ProjectCard.svelte
│   │   ├── ProjectImage.svelte
│   │   ├── LiveSiteLink.svelte
│   │   └── SocialLinks.svelte
│   ├── content/         # Content Collections
│   │   ├── config.ts    # Schema definitions
│   │   ├── websites/    # Website projects
│   │   ├── branding/    # Branding projects
│   │   └── others/      # Other projects
│   ├── layouts/         # Astro layouts
│   ├── lib/             # Utilities and WebGL code
│   ├── pages/           # Routes
│   └── styles/          # Global CSS
├── astro.config.mjs     # Astro configuration
└── package.json
```

## Getting Started

### Prerequisites

- Node.js 18+ and npm

### Installation

1. Clone the repository (or you already have it!)

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open [http://localhost:4321](http://localhost:4321) in your browser

## Available Commands

| Command | Action |
|---------|--------|
| `npm run dev` | Starts local dev server at `localhost:4321` |
| `npm run build` | Build your production site to `./dist/` |
| `npm run preview` | Preview your build locally before deploying |
| `npm run astro` | Run Astro CLI commands |

## Adding Projects

Projects are managed through Astro Content Collections. To add a new project:

1. Create a new `.md` file in the appropriate category folder:
   - `src/content/websites/` for website projects
   - `src/content/branding/` for branding projects
   - `src/content/others/` for other projects

2. Use this template:

```markdown
---
title: Project Title
description: "Project description here..."
media:
  src: "/project photo and video/your-image.png"
  type: image  # or 'video'
  alt: "Image description"
tags:
  - Tag 1
  - Tag 2
url: "https://your-project-url.com"
category: website  # or 'branding' or 'others'
order: 1  # Optional: for custom ordering
---
```

3. Place your project images/videos in the `public/project photo and video/` folder

4. The site will automatically rebuild and display your new project!

## Updating Project Images

To use your actual project photos and videos:

1. Place all media files in `/public/project photo and video/`

2. Update each project's markdown file with the correct `media.src` path

3. Set `media.type` to either `image` or `video`

## Configuration

### Site Information

Edit site configuration in [src/lib/utils/constants.ts](src/lib/utils/constants.ts):

- Site title and description
- Hero text
- Social media links
- Category labels

### Styling

Design tokens are defined in [src/styles/global.css](src/styles/global.css):

- Colors
- Typography
- Spacing
- Layout dimensions

## Deployment to Vercel

This project is pre-configured for Vercel deployment:

1. Push your code to GitHub

2. Import the repository in Vercel

3. Vercel will automatically detect the Astro framework and deploy

4. Your site will be live at `your-project.vercel.app`

### Manual Deployment

```bash
npm run build
```

The static site will be generated in the `./dist/` folder, ready for deployment.

## Performance Features

- **Static Generation**: Pre-rendered HTML for instant page loads
- **Lazy Loading**: Images and videos load as needed
- **Optimized WebGL**: Efficient shader rendering with OGL
- **Code Splitting**: Only load JavaScript for interactive components

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

WebGL effects require WebGL 1.0+ support.

## Customization

### Interactive Effects

- **Text Scramble**: Customize characters in `src/lib/utils/textScramble.ts`
- **Fluid Shader**: Adjust distortion in `src/lib/webgl/fluidShader.ts`
- **SVG Morph**: Modify animation paths in `src/components/LiveSiteLink.svelte`

### Layout

Responsive breakpoints and layout dimensions are defined in CSS variables in [src/styles/global.css](src/styles/global.css).

## License

ISC

## Contact

Jiu Fang
- LinkedIn: https://www.linkedin.com/in/jiu-fang-lin/
- Instagram: https://www.instagram.com/jlstudio.xyz/
- Behance: https://www.behance.net/JiuFang
