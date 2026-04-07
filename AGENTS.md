# AGENTS.md

This file provides guidance to Qoder (qoder.com) when working with code in this repository.

## Project Overview
"心屿" (Mind Island) is a native WeChat Mini Program focused on mental health. It provides psychological assessments,科普 (knowledge education), and interactive tools. The project was migrated from a legacy HTML/Tailwind CSS web project; **root-level legacy `.html` prototypes have been removed**—the active app is the Mini Program only.

## Development Environment & Workflow
- **No CLI Tools**: This is a pure native WeChat Mini Program. There is no `package.json`, no `npm`, and no CLI-based build or test scripts.
- **Development Tool**: Use **WeChat Developer Tools (微信开发者工具)** exclusively for compilation, simulation, and debugging.
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
- **Literature System**: Main list `pages/literature/literature` (category filters); generic detail `pages/literature-detail/literature-detail?id=1..11` loads per-article whitepaper-style content; likes/comments persist under keys like `literature:article:{id}:*`. Optional standalone templates `literature-detail-1`–`3` may exist for legacy links.
- **Medical Endorsement System**: The endorsement system (`pages/endorsement/`) allows users to select diseases and symptoms, storing results in local storage as `lastEndorsement`.

## Key Components & Data Flow
- **Local Storage Keys**: `hasOnboarded`, `selectedNumbers`, `userInfo`, `lastEndorsement` are important storage keys used throughout the app.
- **Navigation Pattern**: Most pages follow a pattern with `goBack()` function for navigation, and detail pages typically use `wx.navigateTo()` to navigate to specific content.
- **Interactive Features**: Many pages include like, comment, and share functionality with associated UI elements and data structures.
- **Disease Categories**: Core education covers major conditions (e.g. depression, anxiety, bipolar, OCD, PTSD, schizophrenia, ADHD, substance use, phobias); the literature library also lists **躯体化障碍** and **性偏好障碍** as additional articles (ids 10–11).
