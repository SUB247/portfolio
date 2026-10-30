# Vivek Maurya — Developer Portfolio

A visually stunning, modern, interactive personal developer portfolio built with **React, Vite, JavaScript, Tailwind CSS, GSAP, Framer Motion, and hls.js**.

Designed with a high-end Awwwards editorial aesthetic: deep black backgrounds, subtle blue accents, typography with *Instrument Serif* & *Inter*, smooth physics-driven motion, and tactile interactive elements.

---

## 🌟 Key Highlights & Architecture

- **Cinematic Loading Screen**: 2.7s counter animation (000 to 100) cycling through *Explore*, *Create*, *Innovate* with an animated progress bar.
- **Full-Screen HLS Hero Video**: Streamed directly via `hls.js` with native HLS fallback and dark overlay for contrast.
- **Dynamic Role Animation**: Cycles through *Developer*, *Cybersecurity Enthusiast*, *AI Explorer*, *Problem Solver*, and *Creative Technologist*.
- **Editorial About Section**: Authentic student identity highlights from UIT Prayagraj with interactive focus blocks.
- **Bento-Grid Selected Projects**:
  - **CYBERLAB**: Interactive simulated terminal sandbox (`scan`, `decrypt`, `status`, `help`, `hint`).
  - **RELX**: AI Chatbot interface with live conversational simulation (Gemini API integration).
  - **AI Experiments**: Neural architecture inspector with live attention synapses and pipeline benchmarks.
  - **Creative Experiments**: Real-time 60fps kinetic particle canvas physics responding to cursor proximity.
- **Skills & Technologies**: Interactive category filtering across Programming, Web Dev, Tools, and Areas of Interest with authentic learning tags.
- **Parallax Learning Journey**: Two-column GSAP ScrollTrigger parallax gallery with clickable lightbox modals for deep-dive technical reflections.
- **Verified Statistics**: Authentic counter metrics with zero fabricated achievements.
- **Cinematic Contact Section**: Looping video background, one-click email copy with instant feedback, direct dispatch form, and social links.
- **Resume Drawer**: In-portfolio resume modal with print/save PDF capability.
- **Subtle Custom Cursor**: Magnetic ring follower for desktop with spring physics and auto-detection of interactive elements.

---

## 🛠️ Tech Stack

- **Framework**: React 19 + Vite 8
- **Language**: JavaScript (ES6+)
- **Styling**: Tailwind CSS + Custom CSS Variables
- **Animations**: GSAP 3 (ScrollTrigger) & Framer Motion
- **Video Streaming**: HLS.js
- **Typography**: Inter (Body) + Instrument Serif Italic (Display)
- **Icons**: Lucide React + Custom SVG Brand Icons

---

## 🚀 Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Start Development Server
```bash
npm run dev
```

### 3. Build for Production
```bash
npm run build
```

### 4. Preview Production Build
```bash
npm run preview
```

---

## 📁 File Structure

```text
src/
├── assets/                  # Static assets & branding
├── components/              # Modular React UI components
│   ├── About.jsx            # Editorial identity & info blocks
│   ├── AiExperimentsVisual.jsx # Interactive neural weights & RAG pipelines
│   ├── Contact.jsx          # Cinematic contact section & message form
│   ├── CreativeExperimentsVisual.jsx # Interactive 60fps particle canvas
│   ├── CustomCursor.jsx     # Desktop magnetic cursor follower
│   ├── CyberlabTerminal.jsx # Interactive terminal sandbox for CYBERLAB
│   ├── Explorations.jsx     # Two-column parallax gallery & lightbox modal
│   ├── Footer.jsx           # Monogram logo, copyright & back-to-top
│   ├── Hero.jsx             # Fullscreen video hero, dynamic roles & GSAP entrance
│   ├── HlsVideoBackground.jsx # Reusable HLS streaming background component
│   ├── LoadingScreen.jsx    # Cinematic 2.7s counter & text cycle
│   ├── Navbar.jsx           # Floating pill navbar with active section indicators
│   ├── ProjectModal.jsx     # Deep-dive architecture details modal
│   ├── Projects.jsx         # Bento-grid project showcase
│   ├── RelxChatPreview.jsx  # Interactive Gemini AI chat sandbox
│   ├── ResumeModal.jsx      # Full resume preview & print view
│   ├── Skills.jsx           # Categorized interactive tech stack
│   ├── SocialIcons.jsx      # Clean vector SVG icons
│   └── Stats.jsx            # Verified learning metrics with count-up
├── data/                    # Fully editable configuration & content files
│   ├── explorations.js      # Learning themes, quotes & perspectives
│   ├── personal.js          # Personal identity, bio, links & socials
│   ├── projects.js          # Project showcase data & terminal commands
│   ├── skills.js            # Skill categories, tags & descriptions
│   └── stats.js             # Verified learning counts
├── App.jsx                  # Main application orchestrator
├── index.css                # Global styles, Tailwind directives & CSS variables
└── main.jsx                 # React root mounting
```

---

## ⚙️ Customization

All personal details, project links, and skills are decoupled into `src/data/`:
- Edit `src/data/personal.js` to update social media links, email, or bio.
- Edit `src/data/projects.js` to add or update projects and repository URLs.
- Edit `src/data/skills.js` to modify technologies and exploration areas.
