# Next Steps - Portfolio Website Setup

Your creative portfolio website is now fully set up and running! 🎉

The development server is currently running at **http://localhost:4321**

## Immediate Next Steps

### 1. Update Project Content with Your Images

All placeholder projects are currently using the same image. Replace them with your actual project media:

1. Your project images and videos are already in `/project photo and video/`

2. Update each markdown file in `/src/content/` with the correct image paths:

**Example for OrbKey project** ([src/content/websites/orbkey.md](src/content/websites/orbkey.md)):

```markdown
---
title: OrbKey
description: "Your description..."
media:
  src: "/project photo and video/OrbKey_1.mp4"  # Update this path
  type: video  # Change to 'video' if using video
  alt: "OrbKey 3D keyboard UI"
tags:
  - Web Design
  - 3D modeling
url: "https://your-actual-url.com"  # Update the URL
category: website
order: 1
---
```

3. Go through each project file:
   - `src/content/websites/orbkey.md`
   - `src/content/websites/chillr.md`
   - `src/content/websites/we-are-enough.md`
   - `src/content/websites/contour.md`
   - `src/content/branding/zuoluh.md`
   - `src/content/others/not-ok.md`

4. The site auto-reloads - you'll see changes instantly!

### 2. Add Missing Projects

You have more projects in Figma. Add them by creating new markdown files:

**Website Projects to Add:**
- AI Persona Muse
- Unwrapped Forgettings

**Branding Projects to Add:**
- We Are Enough (branding version)

**Others Projects to Add:**
- Between Shadows

Use this template for each new project:

```markdown
---
title: Project Name
description: "Detailed description..."
media:
  src: "/project photo and video/your-file.png"
  type: image
  alt: "Alt text"
tags:
  - Tag 1
  - Tag 2
url: "https://project-url.com"
category: website  # or 'branding' or 'others'
order: 1
---
```

### 3. Verify Interactive Effects

Test these interactive features in your browser:

✅ **Sidebar Text Scramble**
- Hover over project names in the left sidebar
- Characters should scramble before revealing the text

✅ **WebGL Image Effect**
- Move your mouse over project images
- You should see a fluid distortion effect

✅ **SVG Morph on Links**
- Hover over "Live site" links
- The arrow icon should animate

✅ **Responsive Design**
- Resize your browser window
- Mobile layout should activate below 1024px width

### 4. Test on Mobile Devices

1. Find your local IP address:
```bash
npm run dev -- --host
```

2. Visit `http://YOUR_IP:4321` on your mobile device

3. Check the mobile layout and interactions

### 5. Prepare for Deployment

Once you're happy with the content:

**Option A: Deploy to Vercel (Recommended)**

1. Initialize Git (if not already done):
```bash
git init
git add .
git commit -m "Initial portfolio website"
```

2. Push to GitHub:
```bash
# Create a new repository on GitHub first, then:
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
git branch -M main
git push -u origin main
```

3. Import to Vercel:
   - Go to [vercel.com](https://vercel.com)
   - Click "Add New Project"
   - Import your GitHub repository
   - Vercel auto-detects Astro and deploys!

**Option B: Build Locally**

```bash
npm run build
```

The static site will be in `./dist/` folder.

## Customization Tips

### Adjust Colors

Edit [src/styles/global.css](src/styles/global.css):

```css
:root {
  --dark: #0e0f09;          /* Background color */
  --white: #ffffff;          /* Primary text */
  --off-white: #e7e1dc;      /* Secondary text */
}
```

### Modify Social Links

Edit [src/lib/utils/constants.ts](src/lib/utils/constants.ts):

```typescript
social: {
  linkedin: {
    url: "https://www.linkedin.com/in/jiu-fang-lin/",
    label: "LinkedIn",
  },
  // ... update URLs as needed
}
```

### Adjust WebGL Effect Strength

Edit [src/lib/webgl/fluidShader.ts](src/lib/webgl/fluidShader.ts), line with `uStrength`:

```glsl
// Increase/decrease the distortion amount
float distortion = smoothstep(0.3, 0.0, dist) * uStrength;
```

### Change Text Scramble Characters

Edit [src/lib/utils/textScramble.ts](src/lib/utils/textScramble.ts):

```typescript
private chars = '!<>-_\\/[]{}—=+*^?#________';
```

## Troubleshooting

### WebGL Not Working?

- Check browser console for errors
- Ensure your browser supports WebGL (most modern browsers do)
- Try disabling browser extensions

### Images Not Showing?

- Check file paths match exactly (case-sensitive!)
- Ensure files are in `/public/project photo and video/`
- Paths in markdown should start with `/project photo and video/`

### Dev Server Won't Start?

```bash
# Kill any existing processes on port 4321
npx kill-port 4321

# Restart
npm run dev
```

## Performance Checklist

Before deploying:

- [ ] All images are optimized (compress large files)
- [ ] Videos are compressed and web-optimized
- [ ] Test on multiple browsers (Chrome, Firefox, Safari)
- [ ] Test on mobile devices
- [ ] Run `npm run build` successfully
- [ ] No console errors in production build

## Need Help?

- Check the [README.md](README.md) for detailed documentation
- Astro docs: https://docs.astro.build
- Svelte docs: https://svelte.dev
- GSAP docs: https://gsap.com/docs

---

**Current Status:**
✅ Project structure created
✅ All interactive components implemented
✅ Responsive design configured
✅ Development server running at http://localhost:4321

**Ready for:** Content updates and deployment!
