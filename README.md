# Aditya Dorwal — Portfolio (Updated)

## 📁 Files in This Repo

```
portfolio/
├── index.html        ← Main HTML (fully updated)
├── styles.css        ← All styles (dark theme, modern)
├── script.js         ← All interactions (filter, form, scroll, animations)
├── Images/
│   ├── Profile_pic_1.jpg         ← Hero profile photo (keep as-is)
│   ├── Profile_pic_2.jpg         ← About section photo (keep as-is)
│   ├── PlantDiseaseDetection.png ← Project image (keep)
│   ├── Desktop_Manager.png       ← Project image (keep)
│   ├── baground_profile_pic1.jpg ← (no longer used, can delete)
│   ├── baground_profile_pic2.jpg ← (no longer used, can delete)
│   └── bug_Bounty.png            ← (no longer used, can delete)
└── README.md
```

---

## ✅ What Was Fixed / Updated

### Projects
- Removed all fake/placeholder projects (Bug Bounty, Dorwal AI with broken link)
- Added all 10 real GitHub repos with correct links:
  - plant-disease-detection (with live Streamlit demo)
  - AI_Study_Buddy
  - INTENT-OS
  - Gen_AI_ChatBot
  - ecommerce-platform
  - ResuMatch
  - desktop-file-manager
  - MPIN-Strength-Checker
  - GEN_AI
  - leetcode-dsa_solutions
- Added **filter buttons** (All / AI-ML / Web / Tools)
- Added **hover overlay** with Code & Demo links on each card

### Contact Form
- Added **real client-side validation** (name, email format, subject, message)
- Form shows inline error messages per field
- Shows a success banner on submit
- **Ready to connect to Formspree** (see step below — takes 2 minutes)

### Mobile Navigation
- Fixed slide-in menu (comes from right side, backdrop overlay)
- Hamburger animates to ✕ when open
- Menu closes when any link is clicked

### Other Fixes
- Sticky header now uses `backdrop-filter` blur (looks clean)
- Active nav link highlights as you scroll
- Skill bars animate when scrolled into view (using `data-width` attribute)
- Scroll-to-top button works correctly
- All external links have `target="_blank"` and `rel="noopener"`
- No broken GitHub links (`yourusername` replaced with real username)

---

## 🔧 One Thing You Need To Do — Contact Form

Right now the form validates but doesn't actually send emails. To fix this in 2 minutes:

1. Go to **https://formspree.io** → Sign up free
2. Click **+ New Form** → Give it a name
3. Copy your endpoint URL (looks like `https://formspree.io/f/xabcdefg`)
4. Open `script.js`, find line 12:
   ```js
   const FORM_ENDPOINT = ''; // 👈 paste here
   ```
5. Replace the empty string with your Formspree URL:
   ```js
   const FORM_ENDPOINT = 'https://formspree.io/f/xabcdefg';
   ```
6. Save and push to GitHub. Done ✅

---

## 🖼️ Optional: Add Project Screenshots

For projects without real images (AI Study Buddy, ResuMatch, etc.), you can add screenshots:

1. Take a screenshot of the project / its output
2. Save it to the `Images/` folder (e.g. `Images/AI_Study_Buddy.png`)
3. In `index.html`, find the card for that project and replace:
   ```html
   <div class="project-image project-image-placeholder ai-placeholder">
     <div class="placeholder-icon"><i class="fas fa-graduation-cap"></i></div>
   ```
   with:
   ```html
   <div class="project-image">
     <img src="Images/AI_Study_Buddy.png" alt="AI Study Buddy" />
   ```

---

## 🚀 Deploying on GitHub Pages

1. Push all files to your `adityadorwal/portfolio` repo
2. Go to **Settings → Pages**
3. Source: **Deploy from a branch** → Branch: `main` → Folder: `/ (root)`
4. Save — your site will be live at `https://adityadorwal.github.io/portfolio/`
