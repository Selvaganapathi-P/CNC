# MILLTECH CNC — Website

**Manufacturer of Heavy Engineering Components | Chennai, India**

Built with React CRA · Plain CSS · React Router DOM · Three.js (3D scene)

---

## Quick Start

```bash
# 1. Install dependencies
npm install

# 2. Start dev server
npm start

# 3. Open http://localhost:3000
```

---

## Project Structure

```
milltech-cnc/
├── public/
│   ├── index.html          ← Three.js CDN + Google Fonts loaded here
│   ├── images/
│   │   ├── products/       ← Add product photos here (product-1.jpg etc.)
│   │   └── machines/       ← Add machine photos here
│   └── videos/             ← Add factory/product videos here (mp4)
└── src/
    ├── App.js              ← Router setup
    ├── index.js
    ├── components/
    │   ├── Navbar/
    │   ├── Footer/
    │   ├── AnimatedCounter/
    │   ├── ProductCard/
    │   ├── ReviewSlider/
    │   └── RocketScene/    ← Interactive Three.js 3D scene
    ├── pages/
    │   ├── Home/
    │   ├── AboutUs/
    │   ├── Products/
    │   ├── ProductDetail/
    │   ├── Machines/
    │   ├── Services/
    │   │   └── Aerospace/  ← Full aerospace page with 3D scene
    │   └── ContactUs/
    ├── data/
    │   ├── products.js     ← Edit product details here
    │   ├── machines.js     ← Edit machine specs here
    │   └── reviews.js      ← Edit testimonials here
    ├── hooks/
    │   └── useScrollReveal.js
    └── styles/
        ├── variables.css   ← Colors, fonts, design tokens
        ├── animations.css  ← Keyframe library
        └── global.css      ← Reset + global utilities
```

---

## Adding Real Product Photos

Place photos in `public/images/products/` and update `src/data/products.js`:

```js
// src/data/products.js
export const products = [
  {
    id: 1,
    name: "Fore End Ring Ø 2840 (ALU)",
    image: "/images/products/fore-end-ring.jpg",  // ← add your image path
    // ...
  }
]
```

---

## EmailJS Setup (Contact Form)

1. Create account at [emailjs.com](https://www.emailjs.com)
2. Add an Email Service (Gmail)
3. Create a template with variables: `{{from_name}}`, `{{from_email}}`, `{{phone}}`, `{{message}}`
4. Create a `.env` file in the project root:

```
REACT_APP_EMAILJS_SERVICE_ID=your_service_id
REACT_APP_EMAILJS_TEMPLATE_ID=your_template_id
REACT_APP_EMAILJS_PUBLIC_KEY=your_public_key
```

5. In `src/pages/ContactUs/ContactUs.js`, uncomment the EmailJS send block and update the env variable names.

---

## Three.js 3D Rocket Scene

Three.js is loaded via CDN in `public/index.html`:
```html
<script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js"></script>
```

**What it does:**
- Shows a 3D rocket + floating ring with starfield background
- **Click the ring** → ring flies and slots into the rocket
- **Click the rocket** → ring detaches and floats back
- **Drag to rotate** → manual orbit controls
- Falls back to a CSS-animated 2D rocket if Three.js fails to load

---

## Deploy to Vercel

```bash
# Build
npm run build

# Option A — Vercel CLI
npm i -g vercel
vercel

# Option B — GitHub
# Push to GitHub → import repo at vercel.com → auto deploys
```

Add environment variables in Vercel dashboard under **Settings → Environment Variables**.

---

## Customisation

### Change Colours
Edit `src/styles/variables.css`:
```css
--color-red: #C0161C;    /* Primary red */
--color-gold: #C8A84B;   /* Gold accent */
--color-bg: #0a0a0a;     /* Background */
```

### Add More Products
Edit `src/data/products.js` — each product needs: `id`, `name`, `image`, `category`, `specs`, `description`, `material`, `client`.

### Add More Machines
Edit `src/data/machines.js` — each machine needs: `id`, `name`, `unit`, `make`, `description`, `control`, `specs` (object), `image`.

---

## Contact

**BARANEETHARAN** — MILLTECH CNC, Chennai  
📞 9444058659 / 8072515869  
📧 btharan76@gmail.com / baranee_i@rediffmail.com  
📍 No. 101/1, SIDCO Industrial Estate, Thirumudivakkam, Chennai 600132
