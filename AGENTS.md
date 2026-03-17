# AGENTS.md

This file provides guidance to Qoder (qoder.com) when working with code in this repository.

## Project Overview
"心屿" (Mind Island) is a native WeChat Mini Program focused on mental health. It provides psychological assessments,科普 (knowledge education), and interactive tools. The project was migrated from a legacy HTML/Tailwind CSS web project.

## Development Environment & Workflow
- **No CLI Tools**: This is a pure native WeChat Mini Program. There is no `package.json`, no `npm`, and no CLI-based build or test scripts.
- **Development Tool**: Use **WeChat Developer Tools (微信开发者工具)** exclusively for compilation, simulation, and debugging.
- **Legacy Files**: You will see `.html` files in the root directory (e.g., `adhd.html`, `mainpageUI.html`). These are legacy source files and are **not** part of the active Mini Program runtime. Do not modify them unless explicitly asked to update the legacy source.
- **Workflow**: Proceed with UI/UX adjustments directly in `.wxml`, `.wxss`, `.js`, and `.json` files. Saving triggers auto-compilation in the IDE.

## High-Level Architecture

### Core Structure
- **Global Entry**: `app.js` (globalData), `app.json` (routing), `app.wxss` (global styles).
- **Navigation Flow**:
  1. `splash/splash.js`: Step 1 of onboarding (physics-based bubble selection).
  2. `splash2/splash2.js`: Step 2 of onboarding.
  3. `home/home.js`: Main dashboard, customized based on onboarding choices.
- **State Persistence**: The "Disease Interest" selected during onboarding is stored using `wx.setStorageSync('selectedNumbers')`. `home.js` reads this on `onLoad` to personalize the content.

### Specialized Systems
- **Physics Engine**: `pages/splash/` and `pages/splash2/` use a custom 60fps physics engine via `setInterval` for bubble movement and collision detection. Logic resides entirely within the page's `.js` file.
- **Theme System**: `styles/theme.wxss` contains the "Yellow Theme" source of truth.
  - **Requirement**: New pages or components should import this via `@import "../../styles/theme.wxss";` and apply `.bg-app-yellow` to the root container.
- **Custom Headers**: Pages like `search` and `literature` use custom headers. Ensure they account for the WeChat status bar and capsule button padding (~88rpx top padding is common).

## Important Constraints
- **Responsive Units**: Always use `rpx` for dimensions to ensure cross-device compatibility.
- **Backgrounds**: Main pages should use the yellow theme (`#FFF6D8`) or pure white (`#FFFFFF`) as defined in `styles/theme.wxss`.
- **Assets**: All images and icons should be placed in the `images/` directory.
- **Language**: All UI text and technical comments should remain in Chinese (Simplified).

## Common Tasks
- **Adding a Page**: Create the 4-file structure in `pages/`, register it in `app.json`, and ensure it imports `theme.wxss` if it's a main content page.
- **Modifying UI**: Update `.wxml` for structure and `.wxss` for styling. Use the `rpx` system.
- **Onboarding Flow**: The app has a two-step onboarding process (`splash` and `splash2`) that only runs on first launch. The `hasOnboarded` flag in local storage controls this behavior.
- **Literature System**: The literature system consists of a main page (`pages/literature/literature`) and detail pages (`pages/literature-detail/`) with interactive features like comments, likes, and sharing.
- **Medical Endorsement System**: The endorsement system (`pages/endorsement/`) allows users to select diseases and symptoms, storing results in local storage as `lastEndorsement`.

## Key Components & Data Flow
- **Local Storage Keys**: `hasOnboarded`, `selectedNumbers`, `userInfo`, `lastEndorsement` are important storage keys used throughout the app.
- **Navigation Pattern**: Most pages follow a pattern with `goBack()` function for navigation, and detail pages typically use `wx.navigateTo()` to navigate to specific content.
- **Interactive Features**: Many pages include like, comment, and share functionality with associated UI elements and data structures.
- **Disease Categories**: The app covers 9 major mental health conditions: depression, anxiety, bipolar disorder, OCD, PTSD, schizophrenia, ADHD, substance abuse, and phobias.
