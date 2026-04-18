# 🚀 REVIOX AI — Complete Beginner Deployment Guide

> Read this file top to bottom. Every step is explained simply.
> You are using an iPhone 14 Pro Max — all steps below work from mobile using the apps mentioned.

---

## 📁 PROJECT STRUCTURE (What Each File Does)

```
reviox-ai/
│
├── public/
│   └── index.html              ← The main HTML shell of your site
│
├── src/
│   ├── index.js                ← Entry point — starts your React app
│   ├── App.js                  ← Routes (which URL → which page)
│   │
│   ├── styles/
│   │   └── global.css          ← All global styles and animations
│   │
│   ├── constants/
│   │   └── index.js            ← ⭐ EDIT THIS to change pricing, features, FAQ, contact
│   │
│   ├── components/             ← Reusable building blocks
│   │   ├── Navbar.js           ← Top navigation bar
│   │   ├── Footer.js           ← Bottom footer
│   │   ├── WhatsAppFloat.js    ← Floating WhatsApp button
│   │   ├── ParticleCanvas.js   ← Animated particle background
│   │   ├── QRAnimation.js      ← QR code scan animation
│   │   └── ui/
│   │       ├── GlassCard.js    ← The glass-effect card
│   │       ├── GlowButton.js   ← The glowing buttons
│   │       └── SectionLabel.js ← Small badge labels
│   │
│   ├── sections/               ← Each section of the homepage
│   │   ├── HeroSection.js
│   │   ├── DemoSection.js
│   │   ├── HowItWorksSection.js
│   │   ├── FeaturesSection.js
│   │   ├── PricingSection.js
│   │   ├── AboutSection.js
│   │   ├── BlogSection.js
│   │   ├── FAQSection.js
│   │   └── ContactSection.js
│   │
│   └── pages/                  ← Full pages (each URL)
│       ├── HomePage.js         ← / (main website)
│       ├── LoginPage.js        ← /login
│       ├── SignupPage.js       ← /signup
│       ├── DashboardPage.js    ← /dashboard (client)
│       ├── AdminPage.js        ← /admin
│       ├── DemoPage.js         ← /demo
│       └── SuperAdminPage.js   ← /superadmin
│
└── package.json                ← Project config and dependencies
```

---

## 🔧 STEP 1 — INSTALL TOOLS ON YOUR iPHONE

You need 3 free apps:

### A) Working Copy (Git client)
- Download from App Store: "Working Copy — Git Client"
- This is where you store and manage your code files

### B) Spck Editor (Code editor)
- Download from App Store: "Spck Code Editor"
- This is where you edit your code files

### C) iSH Shell (Linux terminal on iPhone)
- Download from App Store: "iSH Shell"
- This lets you run npm commands from your iPhone

---

## 🐙 STEP 2 — CREATE A GITHUB ACCOUNT

GitHub is where your code lives online (free).

1. Go to **github.com** in Safari
2. Tap "Sign up" — use your email
3. Choose a username (e.g., `reviox-ai`)
4. Verify your email
5. You now have a GitHub account ✅

### Create a New Repository:
1. Tap the **+** icon → "New repository"
2. Name it: `reviox-ai`
3. Set it to **Private** (so others can't see your code)
4. Tap "Create repository"
5. Copy the repository URL — it looks like:
   `https://github.com/YOUR-USERNAME/reviox-ai.git`

---

## 📂 STEP 3 — SET UP YOUR PROJECT FILES

### In Working Copy:
1. Open Working Copy
2. Tap **+** → "Clone Repository"
3. Paste your GitHub repo URL
4. Tap "Clone" — this creates your local project folder

### Add the files:
1. Inside Working Copy, open your `reviox-ai` repository
2. Create this folder structure by tapping **+** → "Create Directory":
   - `public`
   - `src`
   - `src/styles`
   - `src/constants`
   - `src/components`
   - `src/components/ui`
   - `src/sections`
   - `src/pages`

3. For each file in this project, tap **+** → "Create File" and paste the code

### Paste all your files (copy from Claude output):
- `public/index.html`
- `src/index.js`
- `src/App.js`
- `src/styles/global.css`
- `src/constants/index.js`
- All component files
- All section files
- All page files
- `package.json`

---

## 📤 STEP 4 — PUSH CODE TO GITHUB

In Working Copy:
1. Tap the repository name at top
2. Tap "Commit" (pencil icon)
3. Write a message: `"Initial commit — Reviox AI website"`
4. Tap "Commit Changes"
5. Tap "Push" (arrow icon pointing up)
6. Enter your GitHub username and password (or token)
7. Your code is now on GitHub ✅

---

## 🔥 STEP 5 — SET UP FIREBASE (FREE DATABASE + AUTH)

Firebase handles your user logins and database — 100% free tier available.

### Create Firebase Project:
1. Go to **firebase.google.com** in Safari
2. Sign in with your Google account
3. Tap "Add project"
4. Name it: `reviox-ai`
5. Disable Google Analytics (not needed now)
6. Tap "Create project"

### Enable Authentication:
1. In Firebase Console → tap "Authentication" in left menu
2. Tap "Get started"
3. Click "Email/Password" → Enable it → Save

### Create Firestore Database:
1. Tap "Firestore Database" in left menu
2. Tap "Create database"
3. Choose "Start in test mode" (we'll secure it later)
4. Choose a location nearest to Dubai: `europe-west1` or `asia-south1`
5. Tap "Enable"

### Get Your Firebase Config:
1. Tap the gear icon → "Project Settings"
2. Scroll to "Your apps" → Tap "</>" (web icon)
3. Register app name: `reviox-ai-web`
4. Copy the config object — it looks like:
```javascript
const firebaseConfig = {
  apiKey: "AIzaSy...",
  authDomain: "reviox-ai.firebaseapp.com",
  projectId: "reviox-ai",
  storageBucket: "reviox-ai.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abc123"
};
```

---

## 🔐 STEP 6 — ADD ENVIRONMENT VARIABLES

Create a file called `.env` in your root folder with this content:

```
REACT_APP_FIREBASE_API_KEY=your_api_key_here
REACT_APP_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
REACT_APP_FIREBASE_PROJECT_ID=your_project_id
REACT_APP_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=123456789
REACT_APP_FIREBASE_APP_ID=your_app_id
```

⚠️ NEVER push this file to GitHub. Add `.env` to your `.gitignore` file.

### Create .gitignore file:
```
node_modules/
.env
build/
.DS_Store
```

---

## ▲ STEP 7 — DEPLOY TO VERCEL (FREE HOSTING)

Vercel is the easiest and best free hosting for React apps.

### Create Vercel Account:
1. Go to **vercel.com** in Safari
2. Tap "Sign Up" → "Continue with GitHub"
3. Authorize Vercel to access your GitHub
4. You're in ✅

### Deploy Your Project:
1. On Vercel dashboard → tap "Add New Project"
2. Find and select your `reviox-ai` GitHub repository
3. Vercel auto-detects it as a React app
4. Before deploying, tap "Environment Variables"
5. Add each variable from your `.env` file:
   - Name: `REACT_APP_FIREBASE_API_KEY` | Value: your actual key
   - Repeat for all 6 variables
6. Tap "Deploy"
7. Wait 2-3 minutes ⏳
8. Your site is LIVE at: `https://reviox-ai.vercel.app` 🎉

---

## 🌐 STEP 8 — CONNECT A CUSTOM DOMAIN

If you have a domain like `reviox.ai`:

### In Vercel:
1. Go to your project → "Settings" → "Domains"
2. Type your domain: `reviox.ai`
3. Tap "Add"
4. Vercel shows you nameservers like:
   - `ns1.vercel-dns.com`
   - `ns2.vercel-dns.com`

### In Your Domain Registrar (e.g., Hostinger):
1. Log in to Hostinger
2. Go to "DNS / Nameservers"
3. Replace existing nameservers with Vercel's nameservers
4. Save changes
5. Wait up to 24 hours for DNS to propagate

Your site will then be live at your custom domain with free SSL ✅

---

## 💳 STEP 9 — ADD STRIPE PAYMENTS (SUBSCRIPTIONS)

### Create Stripe Account:
1. Go to **stripe.com** → Sign up
2. Complete identity verification
3. Go to "Products" → "Add product"
4. Create three products:
   - Basic Plan — AED 49/month
   - Standard Plan — AED 69/month
   - Premium Plan — AED 99/month
5. Copy each product's "Price ID" (starts with `price_`)

### Add to your constants/index.js:
```javascript
export const STRIPE_PRICE_IDS = {
  basic:    'price_xxxxxxxxxxxxx',
  standard: 'price_xxxxxxxxxxxxx',
  premium:  'price_xxxxxxxxxxxxx',
};
```

### Add Stripe keys to .env:
```
REACT_APP_STRIPE_PUBLISHABLE_KEY=pk_live_...
```

---

## 🆓 ALTERNATIVE FREE HOSTING PLATFORMS

Besides Vercel, you can also deploy for free on:

### Option B — Netlify:
1. Go to **netlify.com** → Sign up with GitHub
2. Tap "Add new site" → "Import from Git"
3. Select your repository
4. Build command: `npm run build`
5. Publish directory: `build`
6. Add environment variables same as Vercel
7. Tap "Deploy site"
8. Live URL: `https://reviox-ai.netlify.app`

### Option C — GitHub Pages:
1. In your repository, go to Settings → Pages
2. Source: Deploy from branch `main`, folder `/build`
3. Push your built files
4. Live at: `https://yourusername.github.io/reviox-ai`

### Option D — Render.com:
1. Go to **render.com** → Sign up with GitHub
2. "New" → "Static Site"
3. Connect your repo
4. Build command: `npm run build`
5. Publish directory: `build`
6. Free tier available

---

## ✅ STEP 10 — GO LIVE CHECKLIST

Before you share your site with customers, check these:

```
□ All pages load without errors
□ Navbar links scroll to correct sections
□ Live Demo (Customer + Business) works
□ Login/Signup form shows correctly
□ WhatsApp float button links to +971529682123
□ Contact form fields all work
□ Pricing cards show correct AED amounts
□ Dashboard pages load
□ Mobile view looks good
□ Custom domain is connected (if purchased)
□ Firebase auth is enabled
□ Environment variables are set in Vercel
□ No console errors in browser
```

---

## ✏️ HOW TO MAKE CHANGES (BEGINNER GUIDE)

### To change pricing:
→ Open `src/constants/index.js`
→ Find `PRICING_PLANS`
→ Change the `price` number
→ Commit + Push → Vercel auto-redeploys in 60 seconds

### To change contact info:
→ Open `src/constants/index.js`
→ Find `BRAND`
→ Edit phone, email, etc.

### To add a new feature card:
→ Open `src/constants/index.js`
→ Find `FEATURES`
→ Add a new object: `{ icon: '🎯', title: 'New Feature', desc: 'Description here' }`

### To change colors:
→ Open `src/styles/global.css`
→ Find `:root` at the top
→ Change the hex color values

### To edit the FAQ:
→ Open `src/constants/index.js`
→ Find `FAQ`
→ Edit questions and answers

---

## 🆘 COMMON ERRORS & FIXES

| Error | What it means | Fix |
|-------|--------------|-----|
| `npm not found` | Node not installed | Install iSH and run: `apk add nodejs npm` |
| `Module not found` | Wrong import path | Check the file path in the import statement |
| `White screen` | JavaScript crash | Open browser console, read the red error |
| `404 on refresh` | Router issue | In Vercel settings, add a rewrite rule: `/*` → `/index.html` |
| `Firebase permission denied` | Firestore rules | Go to Firebase → Firestore → Rules → set to allow read/write |
| `Build failed on Vercel` | Code error | Check the build log in Vercel for the specific error line |

---

## 📞 NEED HELP?

Contact: ai.reviox@gmail.com  
WhatsApp: +971 52 968 2123
