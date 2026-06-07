# RID Website Development Plan & Tracker

This document serves as our internal "brain" and progress tracker for building the RID website.

## 📌 Our Workflow Rules
1. **Process:** Plan -> Review/Approve -> Execute -> Review.
2. **Modularity:** Strictly avoid "god components". Keep files bite-sized.
3. **Consistency:** New fixes must not destroy old achievements. Do not change unnecessary lines.
4. **Styling:** CSS Modules only to prevent style bleeding. 

## 📖 The Narrative Framework (Why, How, What)
* **The Core Identity:** Youth-led movement transforming peers into leaders.
* **The Method:** Instilling research spirit, masterclasses, mentorship.
* **The Proof:** Community achievements (Smart Glove, etc.) as evidence.

## 🗺️ Full-Stack TSX Architecture Plan
* **`/frontend` (React + Vite + TSX)**
  * `/src/pages`: Home, About, Programs, Impact, Gallery, Updates, Support
  * `/src/components`: Navbar, Footer, modular UI elements
* **`/backend` (Node + Express + TS)**
  * `/src/models`: Mongoose schemas (e.g., Updates, Projects)
  * `/src/routes`: API endpoints to serve data to the frontend securely

## 🎨 Design System
* **Primary:** Navy Blue (Trust, Professionalism)
* **Secondary:** Vibrant Orange (Energy, Action)
* **Background:** Soft Off-White / Pearl (Warmth, Modern)
* **Text:** Dark Slate / Charcoal (Readability, Accessibility)

## 🏁 Checkpoints & Progress
- [x] Phase 1: Define Information Architecture & Narrative
- [x] Phase 2: Agree on Tech Stack (React, Vite, Router, CSS Modules)
- [x] Phase 3: Setup Full-Stack TypeScript Architecture (`frontend` and `backend`)
- [x] Phase 4: Wire up React Router in `frontend/src/App.tsx`
- [x] Phase 5: Setup Global CSS and Color Variables in `frontend`
- [ ] Phase 6: Build Basic Express Server & MongoDB Connection in `backend`
- [x] Phase 7: Build Layout Components (`Navbar.tsx`, `Footer.tsx`)
- [ ] Phase 8: Build Page Shells
