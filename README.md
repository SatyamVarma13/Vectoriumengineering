# Vectorium Engineering — Website

Manufacturing-Ready Mechanical Engineering · Precision from CAD to Factory Floor

---

## 🚀 Deploy to GitHub Pages (Step-by-Step)

### Step 1 — Create GitHub Repository

1. Go to [github.com](https://github.com) and log in
2. Click **"+"** → **"New repository"**
3. Repository name: `vectoriumengineering` (or `vectorium-website`)
4. Set to **Public**
5. Do NOT check "Add README" (we have our own files)
6. Click **"Create repository"**

---

### Step 2 — Upload Files

**Option A — Upload via Browser (Easiest):**
1. On your new repo page, click **"uploading an existing file"**
2. Drag and drop all 3 files:
   - `index.html`
   - `style.css`
   - `script.js`
3. Scroll down → click **"Commit changes"**

**Option B — Git Terminal:**
```bash
# In the folder where your files are:
git init
git add .
git commit -m "Initial Vectorium Engineering website"
git remote add origin https://github.com/YOUR_USERNAME/vectoriumengineering.git
git push -u origin main
```

---

### Step 3 — Enable GitHub Pages

1. Go to your repository
2. Click **Settings** (top menu)
3. Left sidebar → **Pages**
4. Under "Source" → select **"Deploy from a branch"**
5. Branch: **main** | Folder: **/ (root)**
6. Click **Save**

**Your site will be live at:**
`https://YOUR_USERNAME.github.io/vectoriumengineering/`

(Takes 1–3 minutes to go live after enabling)

---

### Step 4 — Custom Domain (Optional)

If you have a domain like `vectoriumengineering.com`:
1. In GitHub Pages settings → "Custom domain" → enter your domain
2. At your domain registrar → add CNAME record pointing to `YOUR_USERNAME.github.io`

---

## 📁 File Structure

```
vectoriumengineering/
├── index.html      ← Main website file
├── style.css       ← All styling
├── script.js       ← Interactions & animations
└── README.md       ← This file
```

---

## ✏️ How to Update Content

### Change contact email:
In `index.html` → search `varmasatyms1302@gmail.com` → replace with new email
Also update in `script.js` → same email in the mailtoUrl line

### Add a project:
In `index.html` → find `<!-- PROJECTS -->` section → copy a `.proj-card` div and edit content

### Update pricing:
In `index.html` → find `<!-- PACKAGES -->` section → edit `.pkg-price` values

### Change phone/location:
In `index.html` → find `<!-- CONTACT -->` section → edit `.contact-row` items

---

## Design

- **Aesthetic:** Clean light mechanical engineering theme
- **Fonts:** Montserrat + Rajdhani + JetBrains Mono
- **Accent Color:** Engineering blue
- **Built:** Pure HTML/CSS/JS, no frameworks or dependencies

## Mechanical Engineering Images to Upload

Place these image files in the same folder as `index.html`:

- `cad-modeling-work.jpg` - CAD workstation, 3D mechanical assembly, SolidWorks/SolidEdge style model
- `technical-drawing-gdt.jpg` - close-up of engineering drawings, GD&T annotations, tolerance callouts
- `cnc-manufacturing-part.jpg` - machined metal component, CNC/fixture/shop-floor precision part

Recommended size: 1200 x 900 px or larger, JPG format, clear lighting, no heavy blur, and no random stock-photo people.

---

Built for Vectorium Engineering · Pune, Maharashtra · 2025
