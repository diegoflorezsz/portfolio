# PROJECT CONTEXT

Permanent technical handoff for the GRAPHICZSZ / Diego Flores portfolio desktop application.

This document is intended for a new engineer with zero prior context. It explains the product, architecture, visual system, data flow, conventions, fragile areas, and future extension strategy. Do not treat this as a marketing summary. Treat it as the operating manual for maintaining and extending the application.

---

## 1. Project overview

This project is a portfolio website implemented as a custom macOS-inspired desktop environment. It is not a normal scrolling portfolio page. The interface behaves like an operating system:

- A full-screen wallpaper forms the background.
- Portfolio projects appear as draggable desktop artwork thumbnails.
- A macOS-style Dock opens apps, project-adjacent dialogs, and external links.
- Projects open inside Finder-like information windows.
- A Notes/CV app presents Diego Flores' profile.
- Adobe app Dock icons open small native-feeling dialog windows.
- Gallery opens as a Dock app, not as a desktop project.
- A Translate Dock icon toggles global language between English and Spanish.
- Mobile portrait mode uses a vertical Dock and a scattered editorial project composition.

The app is built with:

- Next.js `14.2.31`
- React `18.3.1`
- TypeScript
- Tailwind CSS utility classes
- A large handcrafted `globals.css` visual system
- Static data in `src/data`
- Static and dynamic project image serving through Next API routes

The app currently runs as a single-page desktop simulation. There is no database, CMS, authentication, or external API dependency for content. The only outbound interactions are external links such as Instagram and WhatsApp.

---

## 2. Design philosophy

The design direction is not "web app dashboard." It is "native macOS desktop portfolio."

Core principles:

1. The interface should feel like a personal operating system.
2. Project thumbnails should feel like floating artwork, not app launcher icons.
3. Project windows should feel like Finder "Information about..." panels.
4. The Dock should feel like a light translucent macOS shelf.
5. Motion should be restrained, precise, and premium.
6. Mobile portrait should preserve the desktop metaphor instead of collapsing into a normal responsive web page.
7. Content should feel curated and editorial.
8. The project image layouts should be vertical, clean, and image-forward.
9. The app should remain data-driven wherever possible.
10. Interactions should be native-feeling, not playful or exaggerated.

Important aesthetic references from prior work:

- Chudy-style portfolio desktop composition.
- macOS Finder information windows.
- macOS Dock proportions and icon rhythm.
- Native macOS Notes typography/checklist style.
- Adobe-style small dark native dialogs.

The code intentionally contains many small visual constants. These should not be "cleaned up" into generic design tokens unless the visual result is carefully preserved.

---

## 3. Current architecture

The app is organized around a few major systems:

1. Desktop shell
   - `src/components/Desktop.tsx`
   - Owns the wallpaper, top bar, desktop icons, window layer, Dock, language toggling, and app/project opening.

2. Desktop icons
   - `src/components/DesktopIcon.tsx`
   - Renders project thumbnails, labels, drag behavior, mobile positioning, and hover styling.

3. Window system
   - `src/hooks/useWindowManager.ts`
   - `src/components/WindowLayer.tsx`
   - `src/components/OSWindow.tsx`
   - `src/components/WindowControls.tsx`

4. Dock system
   - `src/data/dockApps.ts`
   - `src/components/Dock.tsx`

5. Project system
   - `src/data/projects.ts`
   - `src/components/apps/ProjectApp.tsx`
   - project images in `projects/[slug]/images`
   - project API routes in `src/app/api`

6. Notes/CV app
   - `src/components/apps/NotesApp.tsx`

7. Gallery/media app
   - `src/components/apps/MediaInfoApp.tsx`
   - `projects/gallery`
   - `/api/gallery-images`
   - `/api/gallery-image`

8. Translation system
   - `src/i18n/language.tsx`
   - `src/i18n/ui.ts`
   - `src/i18n/types.ts`

9. Responsive/mobile state
   - `src/hooks/useIsPortraitMobile.ts`
   - `data-mobile-portrait` attribute on the `#desktop` root
   - component-level conditional rendering/classes

The app is mostly client-rendered. Server/API routes are used for reading image files dynamically from the filesystem.

---

## 4. Folder structure

High-level structure:

```txt
.
├─ projects/
│  ├─ aspect/
│  ├─ aura/
│  ├─ casagrande/
│  ├─ coral/
│  ├─ gallery/
│  ├─ graphiczsz/
│  ├─ logofolio/
│  ├─ melabody/
│  ├─ pagaille/
│  ├─ saltwood/
│  ├─ sealed/
│  └─ sinky/
├─ public/
│  ├─ dock-apps/
│  └─ wallpapers/
├─ src/
│  ├─ app/
│  │  ├─ api/
│  │  ├─ globals.css
│  │  ├─ layout.tsx
│  │  └─ page.tsx
│  ├─ components/
│  │  ├─ apps/
│  │  ├─ Desktop.tsx
│  │  ├─ DesktopIcon.tsx
│  │  ├─ Dock.tsx
│  │  ├─ OSWindow.tsx
│  │  ├─ TopBar.tsx
│  │  ├─ Wallpaper.tsx
│  │  ├─ WindowControls.tsx
│  │  └─ WindowLayer.tsx
│  ├─ data/
│  ├─ hooks/
│  ├─ i18n/
│  └─ types/
├─ package.json
├─ next.config.mjs
├─ tailwind.config.ts
└─ tsconfig.json
```

Important directories:

- `projects/`
  - Source-of-truth image folders and markdown files.
  - Most actual rendered project data is still manually represented in `src/data/projects.ts`, but dynamic image routes read from this folder.

- `public/dock-apps/`
  - PNG Dock icons.

- `public/wallpapers/desktop-wallpaper.png`
  - Current desktop wallpaper image.

- `src/app/api/`
  - Filesystem-backed image-serving routes.

- `src/components/apps/`
  - Content apps displayed inside `OSWindow`.

---

## 5. Component hierarchy

Entry:

```txt
src/app/page.tsx
└─ Desktop
   ├─ Wallpaper
   ├─ TopBar
   ├─ Desktop icon section
   │  └─ DesktopIcon[]
   ├─ WindowLayer
   │  └─ OSWindow[]
   │     ├─ WindowControls
   │     └─ app content:
   │        ├─ ProjectApp
   │        ├─ NotesApp
   │        ├─ MediaInfoApp
   │        ├─ AdobeDialogApp
   │        ├─ WorkApp
   │        ├─ ArchiveApp
   │        ├─ AboutApp
   │        └─ ContactApp
   └─ Dock
      └─ dock app buttons
```

`Desktop` is the orchestration component. It owns:

- window manager hook
- language state access
- selected desktop icon state
- external Dock label state
- desktop icon z layers for dragged icons
- project opening
- Notes section opening
- Dock app routing
- mobile portrait detection
- root `data-mobile-portrait` attribute

`WindowLayer` receives the open window list from `useWindowManager`, renders an `OSWindow` for each, and chooses which app component to mount.

`OSWindow` is the visual chrome and interaction wrapper. It does not know project internals. It only knows `window.appId` enough to apply visual themes and title behavior.

---

## 6. State management

There is no Redux/Zustand/global store. State is local React state plus one context.

### Window state

Owned by `useWindowManager`.

State:

- `windows: WindowInstance[]`
- `activeWindowId: string | null`
- `zIndexCounter: number`

Important behavior:

- `openWindow(input)`
  - If a window already exists for the app ID, it updates title/payload/status/z-index instead of creating a duplicate.
  - Project windows all share the ID `"project"`, meaning opening a new project reuses the same project window.
  - Adobe dialogs, Notes, Gallery, etc. have stable IDs.

- `closeWindow(windowId)`
  - Marks the window as `closing`.
  - Removes it after `TRANSITION_DURATION_MS`.

- `minimizeWindow(windowId)`
  - Marks as `minimizing`.
  - Later marks as `minimized`.

- `bringToFront(windowId)`
  - Updates z-index and active window.

- `moveWindow(windowId, position)`
  - Updates stored window position.

- `toggleMaximizeWindow(windowId)`
  - Toggles between `maximized` and `open`.

### Language state

Owned by `LanguageProvider` in `src/i18n/language.tsx`.

State:

- `language: "en" | "es"`

Actions:

- `setLanguage`
- `toggleLanguage`

Language is not persisted to localStorage. A page reload resets to English.

### Desktop icon state

Owned by `Desktop`.

- `selectedIconId`
  - Mostly cleared on open/canvas click.
  - Hover styling is CSS-driven.

- `externalDockLabel`
  - Used to show labels like Instagram/WhatsApp in the top bar after activating external Dock apps.

- `desktopIconLayers`
  - Used to bring dragged desktop icons visually forward.

### App-specific state

- `ProjectApp`
  - local collapsible state for Details and Preview
  - local lightbox selection for gallery-style grids

- `NotesApp`
  - active Notes section
  - syncs to `requestedSection` payload from TopBar/Dock actions

- `MediaInfoApp`
  - collapsible Details/Preview
  - gallery grid fetched from API
  - local lightbox selected image

---

## 7. Desktop system

### Data source

Desktop icons are generated in:

```txt
src/data/desktopIcons.ts
```

The source array is `projects` from `src/data/projects.ts`, filtered to exclude `gallery`:

```ts
projects.filter((project) => project.slug !== "gallery")
```

Gallery is intentionally not a desktop project. It opens from the Dock.

Each desktop icon includes:

- `id`
- `title`
- `label`
- `type`
- `icon`
- `image`
- `target`
- `position`

`position` includes:

- `desktop`
- `tablet`
- `mobile: { order: number }`

Desktop and tablet positions are manually curated.

### Desktop covers

Desktop covers use each project’s `single-hero` image where possible. `getProjectHeroImage()` searches `project.editorialLayout` for a path matching `/single-hero.`.

Special case:

- `graphiczsz` uses `/api/project-hero-image?slug=graphiczsz` as its hero.
- It also has special panoramic desktop/header layout.

### Desktop layout

Desktop/tablet use CSS custom properties:

- `--desktop-x`
- `--desktop-y`
- `--desktop-width`
- `--desktop-height`
- `--tablet-x`
- `--tablet-y`
- etc.

CSS media queries in `globals.css` place desktop icons absolutely for `min-width: 768px`.

Mobile portrait uses a separate inline coordinate system in `Desktop.tsx`.

### Dragging

Dragging is implemented in `DesktopIcon.tsx`.

Important behavior:

- Drag starts only from the thumbnail area.
- Dragging is disabled below `DESKTOP_BREAKPOINT = 768`.
- A small threshold (`DRAG_THRESHOLD = 5`) distinguishes click from drag.
- Runtime drag position is stored in local component state.
- Static data is never mutated.
- Drag position is not persisted.
- Drag coordinates are clamped so icons cannot disappear completely off-screen.

### Hover and labels

Desktop icon hover styling lives in `globals.css`:

- thumbnail hover selection rectangle
- blue Finder-style label background
- subtle scaling
- small thumbnail radius

Mobile label readability currently has a scoped rule:

```css
#desktop[data-mobile-portrait="true"] .desktop-artwork__label {
  position: relative;
  z-index: 20;
  pointer-events: none;
}
```

This was added so labels render above overlapping thumbnails in mobile portrait. It is deliberately scoped to mobile portrait.

Be careful: changing stacking contexts on `.desktop-artwork` can break this.

---

## 8. Window system

Files:

- `src/hooks/useWindowManager.ts`
- `src/components/WindowLayer.tsx`
- `src/components/OSWindow.tsx`
- `src/components/WindowControls.tsx`
- `src/types/window.ts`

### Window kinds

`WindowKind` includes:

- `about`
- `contact`
- `work`
- `archive`
- `project`
- `notes`
- `gallery`
- `trash`
- `after-effects`
- `photoshop`
- `illustrator`

Note:

- `trash` still exists as a window kind/type, but the Dock currently uses Translate instead of Trash.
- Gallery uses `windowKind: "gallery"`.

### Window IDs

`getWindowId(input)` returns:

- `"project"` for all project windows
- `input.appId` for every other window

This means only one project window exists at a time.

### Window sizes

Default sizes are in `useWindowManager.ts`.

Important:

- Project and media windows start at `760 x 620`, but `OSWindow` visually scales project/media windows to `0.82` width and fixed `451` height.
- Notes is `640 x 470`.
- Adobe dialogs are `356 x 134`.

### Window placement

Non-Adobe windows:

```ts
x: 96 + index * 28
y: 76 + index * 24
```

Adobe windows are centered in viewport.

### Window animations

`OSWindow` manages a local visual state:

- `entering`
- `open`
- `closing`

Opening:

- `requestAnimationFrame` twice, then sets visual state to open.

Closing/minimizing:

- detected via window status
- sets visual state to closing

CSS classes:

- `.window-shell--entering`
- `.window-shell--open`
- `.window-shell--closing`

### Dragging windows

Window dragging:

- begins on titlebar pointer down
- disabled if maximized
- disabled below `1024px`
- clamps so some part of window remains visible
- uses direct top/left movement, not transform animation

### Mobile layering

`WindowLayer` accepts:

```ts
shouldCoverDock?: boolean
```

In `Desktop.tsx`:

```tsx
shouldCoverDock={isPortraitMobile && windowManager.windows.length > 0}
```

When true, `WindowLayer` uses `z-50` instead of `z-20`, covering the `z-40` Dock. This is mobile-only behavior so windows can cover the vertical Dock.

Desktop layering remains unchanged.

---

## 9. Dock system

Files:

- `src/data/dockApps.ts`
- `src/components/Dock.tsx`
- Dock CSS in `src/app/globals.css`

### Current Dock apps

Order:

1. After Effects
2. Photoshop
3. Illustrator
4. Notes/CV
5. Gallery
6. Instagram
7. WhatsApp
8. Translate

There is no Trash Dock icon. Translate replaced Trash.

### Dock actions

`DockApp.action` can be:

- `open-app`
- `open-folder`
- `external`
- `mailto`
- `toggle-language`

Current behavior:

- Adobe apps open internal dialog windows.
- Notes opens the CV/Notes app.
- Gallery opens the Gallery app window.
- Instagram opens `https://www.instagram.com/graphiczsz` in a new tab.
- WhatsApp opens the configured `wa.me` link in a new tab.
- Translate toggles `language`.

### Dock icons

Icon PNGs live in:

```txt
public/dock-apps/
```

Mappings:

- `/dock-apps/notes.png`
- `/dock-apps/whatsapp.png`
- `/dock-apps/instagram.png`
- `/dock-apps/gallery.png`
- `/dock-apps/translate.png`
- `/dock-apps/photoshop.png`
- `/dock-apps/illustrator.png`
- `/dock-apps/after-effects.png`

Images are rendered using:

- fixed slot
- `object-fit: contain`
- transparent background

Some icon-specific scale adjustments exist in CSS:

```css
.dock-icon--notes .dock-icon__image,
.dock-icon--photos .dock-icon__image,
.dock-icon--instagram .dock-icon__image,
.dock-icon--whatsapp .dock-icon__image {
  transform: scale(1.091);
}
```

Do not crop or recolor Dock icons.

### Dock open indicators

Internal apps with open windows show a small dot indicator.

External apps and Translate do not show open indicators.

### Mobile Dock

Mobile portrait Dock behavior:

- vertical
- fixed left
- vertically centered
- glass style preserved
- icons stacked
- does not overlap topbar

Controlled by `isPortraitMobile` prop and `.dock--portrait-mobile`.

Important:

- A previous attempt to increase vertical gap broke layout and was reverted.
- Be careful changing `.dock--portrait-mobile .dock__surface`.

---

## 10. Project loading

There are two project-content sources:

1. `src/data/projects.ts`
   - Actual React-rendered project metadata and editorial layout.
   - Current source used by `ProjectApp`.

2. `projects/[slug]/project.md`
   - Exists for project content/source-of-truth direction.
   - The current production rendering does not parse markdown files directly at runtime.

Important:

Prior tasks moved toward a markdown-source system, but the current app still imports `projects` from `src/data/projects.ts`. Do not assume markdown is automatically parsed into the app. If markdown changes need to appear, update the parser/data generation strategy or manually sync `src/data/projects.ts`.

### Project data shape

`Project` includes:

- `slug`
- `title`
- `shortTitle?`
- `year`
- `category`
- `tags`
- `summary`
- `thumbnail`
- `featured?`
- `description?`
- `details?`
- `editorialLayout?`
- `editorialNote?`

Most text fields can be localized.

### Project opening

Desktop icon click:

```txt
DesktopIcon → Desktop.openDesktopIcon → openProject → windowManager.openWindow
```

Project window payload:

```ts
payload: { projectSlug: slug }
```

`ProjectApp` receives the slug from `WindowLayer`.

---

## 11. Markdown pipeline

Current state:

- Project folders contain `project.md`.
- The documented desired markdown format is:

```md
## Description

### en
English description.

### es
Spanish description.

---

## Details

**Type**
Design > Brand > Identity > Art Direction > Digital

**Tools**
Adobe Illustrator, Adobe Photoshop

---

## Editorial Layout

single-hero
pair-01-a
pair-01-b

---

## Editorial Note

### en
English note.

### es
Spanish note.
```

However, this markdown pipeline is not currently the app's runtime pipeline. The app’s actual rendered project metadata comes from `src/data/projects.ts`.

Existing image API routes do read image directories dynamically, but the main project metadata does not read markdown dynamically.

If implementing a real markdown pipeline in the future:

1. Create a server-side parser module.
2. Parse only known headings.
3. Treat Details values as plain text.
4. Never parse `>` as blockquote in Details.
5. Return localized fields as `{ en, es }`.
6. Return Editorial Layout entries as image role strings.
7. Resolve image filenames by matching layout entries to files in `projects/[slug]/images`.
8. Keep `single-hero` discoverable for desktop covers.
9. Preserve `gallery-grid` and `gallery-layout`.

Do not attempt partial markdown parsing inside client components.

---

## 12. Translation system

Files:

- `src/i18n/language.tsx`
- `src/i18n/ui.ts`
- `src/i18n/types.ts`

### Types

```ts
type Language = "en" | "es";
type LocalizedText = { en: string; es: string };
type LocalizedTextArray = { en: string[]; es: string[] };
type MaybeLocalizedText = string | LocalizedText;
type MaybeLocalizedTextArray = string | string[] | LocalizedText | LocalizedTextArray;
```

### Helpers

Use these everywhere:

- `localizeText(value, language, fallback?)`
- `localizeTextArray(value, language)`

Never render localized objects directly:

Bad:

```tsx
{project.description}
```

Good:

```tsx
{localizeText(project.summary, language)}
```

### Language toggle

The Translate Dock app calls `toggleLanguage()`.

The current language is not persisted. Open windows remain open while visible text updates reactively.

### Spanish taxonomy rendering

`ProjectApp` and `MediaInfoApp` translate project taxonomy terms at render time.

Examples:

- `Design` → `Diseño`
- `Brand` → `Marca`
- `Identity` → `Identidad`
- `Art Direction` → `Dirección de Arte`
- `Print` → `Impreso`

Tool names are not translated.

### Encoding issue

Some Spanish text in `src/data/projects.ts`, `ProjectApp.tsx`, and `MediaInfoApp.tsx` appears mojibake-encoded in the current file contents, e.g. `DiseÃ±o`.

This is technical debt. It may display incorrectly depending on runtime decoding and should eventually be normalized to UTF-8. Be careful when editing files; save as UTF-8.

---

## 13. Gallery architecture

Gallery is a Dock app, not a desktop project.

Files:

- `src/components/apps/MediaInfoApp.tsx`
- `projects/gallery/project.md`
- `projects/gallery/images`
- `src/app/api/gallery-images/route.ts`
- `src/app/api/gallery-image/route.ts`

### Gallery window

`Dock` opens `windowKind: "gallery"`.

`WindowLayer` renders:

```tsx
<MediaInfoApp kind="gallery" />
```

`MediaInfoApp`:

- reads the `gallery` project metadata from `projects` in `src/data/projects.ts`
- shows the Gallery Dock icon in the header
- shows Description, Details, Preview, and Editorial Note
- fetches images from `/api/gallery-images`
- renders them in `.project-editorial--gallery-grid`
- supports click-to-lightbox

### Gallery image API

`/api/gallery-images`

- reads files from `projects/gallery/images`
- filters image extensions
- sorts filenames numerically/case-insensitively
- returns JSON:

```json
{ "images": [{ "src": "/api/gallery-image?file=...", "alt": "Gallery image 01" }] }
```

`/api/gallery-image?file=...`

- validates file with `path.basename`
- validates extension/content type
- returns image bytes
- uses `Cache-Control: no-store`

### Gallery project exclusion

`desktopIcons.ts` filters out `project.slug === "gallery"` so Gallery does not appear on the desktop.

---

## 14. GRAPHICZSZ architecture

GRAPHICZSZ is a normal desktop project with special visual behavior.

Files:

- `projects/graphiczsz/project.md`
- `projects/graphiczsz/images`
- `src/data/projects.ts`
- `src/data/desktopIcons.ts`
- `src/components/apps/ProjectApp.tsx`
- API routes for project images/hero

### Desktop behavior

GRAPHICZSZ appears as a desktop project icon.

Special desktop layout:

```ts
if (project.slug === "graphiczsz") {
  return { x: "43%", y: "63%", width: 142, height: 72, rotation: 0 };
}
```

Tablet also has a special panoramic layout.

The desktop cover uses:

```txt
/api/project-hero-image?slug=graphiczsz
```

### Project window header

`ProjectApp` applies special classes:

- `project-info__identity--panoramic`
- `project-info__thumbnail--panoramic`

Only for:

```ts
project.slug === "graphiczsz"
```

### Image layout

GRAPHICZSZ uses:

```ts
kind: "gallery-layout"
```

`ProjectApp.EditorialBlock` handles:

```tsx
<GalleryGrid endpoint={`/api/project-images?slug=${projectSlug}`} />
```

This automatically loads every image from `projects/graphiczsz/images`.

The layout visually matches the Gallery masonry/grid style.

Important:

- Do not treat `single-hero` as the only image.
- `single-hero` is used for cover/header, but the full gallery layout should still load all images.
- Do not move GRAPHICZSZ into the Dock.

---

## 15. Responsive architecture

Responsive handling is deliberately cautious because broad CSS mobile overrides caused previous blank screens and layout collapses.

### Detection

File:

```txt
src/hooks/useIsPortraitMobile.ts
```

Mobile portrait is true when:

- `window.innerWidth <= 768`
- OR `matchMedia("(orientation: portrait)")`

`Desktop` applies:

```tsx
data-mobile-portrait={isPortraitMobile ? "true" : "false"}
```

### Golden rule

Avoid broad global mobile selectors that target `.desktop-artwork` generally.

Preferred:

- component-level conditional class names
- scoped selectors under `#desktop[data-mobile-portrait="true"]`
- inline styles from the mobile layout map

### Mobile Dock

`Dock` receives `isPortraitMobile`.

When true:

- adds `.dock--portrait-mobile`
- becomes vertical left Dock
- remains fixed and centered

### Mobile project composition

File:

```txt
src/components/Desktop.tsx
```

The mobile layout map is:

```ts
const mobileIconLayout: Record<string, MobileIconLayout>
```

Current entries include:

- `aura`
- `casagrande`
- `coral`
- `graphiczsz`
- `logofolio`
- `pagaille`
- `sealed`
- `melabody`
- `aspect`
- `sinky`
- `saltwood`

`DesktopIcon` receives:

- `isPortraitMobile`
- `mobileLayout`

When mobile portrait:

- `position: absolute`
- `left`
- `top`
- `width`
- extra label gap
- parent z-index is `auto`

The mobile icon canvas class:

```css
.desktop-icon-canvas--portrait-mobile
```

Important:

- Do not mix CSS grid/flex flow with absolute mobile positioning.
- Do not add manual z-index stacking by project unless thoroughly tested.
- Previous z-index attempts broke visual layout.
- Mobile label layering is currently handled by scoped label z-index.

### Mobile windows

Tailwind responsive classes in `OSWindow` make windows fit mobile:

- `max-lg:inset-x-3`
- `max-lg:bottom-24`
- `max-lg:top-12`
- `max-lg:h-auto`
- `max-lg:max-h-none`
- `max-lg:w-auto`

Window dragging is disabled below `1024px`.

WindowLayer rises above Dock when mobile and any window is open.

---

## 16. Image handling

### Public static assets

Dock icons:

```txt
public/dock-apps/
```

Wallpaper:

```txt
public/wallpapers/desktop-wallpaper.png
```

Project images for normal project layouts are referenced directly under:

```txt
/projects/[slug]/images/[filename]
```

This assumes the `projects` folder is served statically or otherwise available under public routing. In this repo it is referenced from client image paths.

### API-served images

Dynamic routes serve filesystem images:

- `/api/project-images?slug=...`
- `/api/project-image?slug=...&file=...`
- `/api/project-hero-image?slug=...`
- `/api/gallery-images`
- `/api/gallery-image?file=...`

These routes:

- validate slugs with `/^[a-z0-9-]+$/i`
- validate filenames with `path.basename`
- whitelist image extensions
- set `Cache-Control: no-store`

### Image layout kinds

Supported `ProjectEditorialBlock.kind`:

- `single`
- `banner`
- `pair`
- `triple`
- `mosaic`
- `custom-grid`
- `gallery-grid`
- `gallery-layout`

`detail` is not part of the final type. In `projects.ts`, helper `block()` accepts `"detail"` but converts it to `"single"`.

### Lightbox

Gallery-style grids support click-to-fullscreen lightbox.

Implemented in:

- `ProjectApp.GalleryGrid`
- `MediaInfoApp.GalleryGrid`

CSS:

- `.project-lightbox`
- `.project-lightbox__backdrop`
- `.project-lightbox__image`

---

## 17. Performance considerations

Current performance profile:

- Small app bundle.
- Most images are lazy-loaded inside project editorial layouts.
- Desktop cover images are preloaded by browser because they appear in initial HTML/image tags.
- Gallery and GRAPHICZSZ gallery-style images are fetched client-side after window open.
- API image routes use `no-store`, ensuring updates show immediately but reducing caching benefits.

Potential performance issues:

1. Large image files
   - Many project images are large PNG/JPEG files.
   - No Next Image optimization is used.

2. Dynamic image routes
   - `no-store` avoids stale images but prevents browser caching.

3. Client-side masonry
   - CSS column layout is simple and cheap, but large image counts can still affect memory.

4. OneDrive filesystem
   - The project lives in OneDrive. Next cache/chunk issues have repeatedly appeared.
   - Generated `.next` artifacts sometimes become stale/corrupted.

5. `globals.css`
   - Large CSS file with many custom rules.
   - Changes can have broad visual effects.

Practical advice:

- Optimize large images manually before committing.
- Use JPG/WebP for photographic imagery where possible.
- Avoid unnecessary query-string cache busting unless images are truly replaced.
- If Next dev server shows missing chunk errors, clear `.next`.

---

## 18. Known limitations

1. Markdown is not the active runtime source.
   - `project.md` files exist, but `src/data/projects.ts` drives actual project rendering.

2. Language is not persisted.
   - Refresh resets language to English.

3. Desktop drag positions are not persisted.
   - Dragging lasts only for the current session/component state.

4. Only one project window exists at a time.
   - Opening a different project reuses the `"project"` window.

5. Mobile composition is hand-tuned.
   - It is not algorithmic.
   - New projects require manual mobile coordinates.

6. Window resizing is not implemented.

7. Maximize/minimize behavior exists but is visual/system-lite, not a full OS replica.

8. Some Spanish text appears mojibake-encoded in source.

9. Gallery and GRAPHICZSZ gallery layouts duplicate similar logic.
   - Both have local `GalleryGrid` implementations.

10. Next dev cache is fragile in this workspace.
    - Missing chunks like `./276.js` or `./682.js` are usually stale `.next`, not source failures.

11. Some legacy app components still exist (`AboutApp`, `WorkApp`, etc.) but may not be prominent in the current UI.

12. `trash` remains in types/window/media code even though Dock currently uses Translate.

---

## 19. Coding conventions

### General

- Use TypeScript strictly.
- Prefer explicit types for shared data models.
- Keep UI state local unless truly global.
- Keep data-driven project/Dock/icon definitions.
- Avoid introducing external dependencies casually.

### Localization

- All user-facing text should either:
  - come from `uiText`
  - be a localized object
  - pass through `localizeText` / `localizeTextArray`

Never render `{ en, es }` objects directly.

### Styling

- Tailwind is used for component layout/chrome.
- Detailed visual styling is mostly in `globals.css`.
- Before changing `globals.css`, search existing selectors and test both desktop and mobile.
- Avoid broad selectors for mobile.

### Responsive changes

Use the existing pattern:

- `useIsPortraitMobile`
- `data-mobile-portrait`
- scoped selectors
- component-level conditional props/classes

Do not introduce new global mobile overrides unless unavoidable.

### Project data

- Keep `single-hero` discoverable for every project.
- For dynamic gallery-style projects, ensure APIs can find images by slug.
- Preserve exact filenames unless updating all references.

### Image routes

- Always validate slug and filename.
- Do not allow path traversal.
- Keep extension whitelist.

---

## 20. Things that must never be changed without careful review

1. `useWindowManager` window ID strategy
   - Changing project ID behavior affects whether multiple project windows can exist.

2. `WindowLayer` mobile z-index behavior
   - Mobile windows must cover the vertical Dock when open.

3. `.dock--portrait-mobile`
   - Small spacing/layout changes have previously broken mobile Dock.

4. Mobile `.desktop-artwork` positioning
   - Do not mix grid/flex flow with absolute mobile coordinates.

5. Mobile label layering
   - Labels must stay above thumbnails in mobile portrait.

6. `desktopIcons.ts` gallery exclusion
   - Gallery must not appear as a desktop project.

7. GRAPHICZSZ special cases
   - Panoramic desktop/header cover.
   - `gallery-layout` internal project rendering.
   - `/api/project-hero-image?slug=graphiczsz`.

8. Translation helpers
   - Do not bypass `localizeText` for localized objects.

9. API route path validation
   - Do not weaken slug/file validation.

10. `.next` folder
    - It is generated and safe to delete when stale, but never commit it.

11. `public/dock-apps` icon sizing system
    - The Dock icon balance has been hand-tuned.

12. `globals.css` window/project styles
    - Tiny changes can disrupt the Finder/macOS illusion.

13. Wallpaper layering
    - UI must remain sharp; do not blur the entire page.

---

## 21. Future roadmap

Recommended roadmap:

### Short-term

1. Normalize UTF-8 Spanish text.
2. Add a real markdown parser/generator so `projects/[slug]/project.md` becomes the true source of metadata.
3. Remove stale/legacy code for `trash` if Translate fully replaces it.
4. Consolidate duplicated gallery grid/lightbox code.
5. Add a stable dev script that clears `.next` automatically when needed on Windows/OneDrive.

### Medium-term

1. Persist language choice to localStorage.
2. Persist desktop icon dragged positions.
3. Add mobile window polish for near-fullscreen behavior.
4. Add better image optimization pipeline.
5. Add project metadata validation.
6. Add automated checks for missing `single-hero` images.
7. Add a typed project registry generated from project folders.

### Long-term

1. Full markdown/content pipeline.
2. Optional CMS-like local editor.
3. Multiple project windows if desired.
4. More native OS interactions:
   - minimize-to-Dock
   - window-origin animation
   - Finder-like selection model
5. More robust responsive compositions for different phone sizes.

---

## 22. Deployment considerations

The app is a Next.js app.

Scripts:

```bash
npm run dev
npm run build
npm run start
```

Important deployment notes:

1. The `projects/` folder is required at runtime for API routes.
   - API routes read from `process.cwd()/projects`.
   - Ensure deployment includes `projects/`.

2. The app currently references some images as `/projects/...`.
   - Ensure those assets are publicly reachable in deployment.
   - If the host does not serve root `projects/` statically, move/copy images into `public/projects` or rely entirely on API routes.

3. API routes use Node filesystem APIs.
   - Deployment target must support Node runtime and filesystem reads.
   - Pure static export will not support dynamic image APIs.

4. `next.config.mjs` is currently empty.

5. `.next` should never be committed.

6. On Windows/OneDrive, `.next` can become corrupted.
   - Stop dev server and delete `.next`.
   - Restart dev server.

7. `Cache-Control: no-store` is used for dynamic images.
   - Good for fast asset replacement.
   - Less good for production caching.

Potential deployment improvement:

- Add a build step that copies `projects/[slug]/images` into `public/projects/[slug]/images`.
- Or refactor all image serving to API routes.

---

## 23. Technical debt

1. `src/data/projects.ts` is large and manual.
2. `project.md` files are not automatically parsed.
3. Spanish text contains mojibake in several files.
4. Gallery grid logic is duplicated.
5. Taxonomy translation maps are duplicated in `ProjectApp` and `MediaInfoApp`.
6. Many visual constants live directly in CSS.
7. Mobile layout is hardcoded and brittle.
8. Next dev cache is unstable in the current OneDrive workspace.
9. Some legacy apps/types remain after feature direction changed.
10. Window sizing mixes default sizes with visual overrides in `OSWindow`.
11. `globals.css` is very large and could be split, but doing so risks visual regressions.
12. No automated visual regression tests.
13. No content validation for missing image files.
14. No route-level tests for API image endpoints.

---

## 24. File dependency map

### App root

```txt
src/app/page.tsx
└─ Desktop
```

```txt
src/app/layout.tsx
└─ LanguageProvider
```

### Desktop

```txt
Desktop.tsx
├─ desktopIcons from src/data/desktopIcons.ts
├─ projects from src/data/projects.ts
├─ useIsPortraitMobile
├─ useWindowManager
├─ useLanguage
├─ uiText
├─ DesktopIcon
├─ Dock
├─ TopBar
├─ Wallpaper
└─ WindowLayer
```

### Desktop icons

```txt
DesktopIcon.tsx
├─ DesktopIcon type
├─ DesktopDragPosition type
├─ localizeText/useLanguage
└─ uiText
```

### Window layer

```txt
WindowLayer.tsx
├─ OSWindow
├─ AboutApp
├─ ContactApp
├─ WorkApp
├─ ArchiveApp
├─ ProjectApp
├─ NotesApp
├─ MediaInfoApp
└─ AdobeDialogApp
```

### Window chrome

```txt
OSWindow.tsx
├─ WindowControls
├─ WindowInstance type
├─ useLanguage
└─ uiText
```

### Project rendering

```txt
ProjectApp.tsx
├─ projects data
├─ i18n helpers
├─ ProjectEditorialBlock/Image types
├─ /api/gallery-images for gallery-grid
└─ /api/project-images for gallery-layout
```

### Gallery/Media

```txt
MediaInfoApp.tsx
├─ projects data
├─ i18n helpers
├─ uiText
├─ /api/gallery-images
└─ /api/gallery-image
```

### Dock

```txt
Dock.tsx
├─ dockApps data
├─ i18n helpers
├─ uiText
└─ DockApp type
```

### Data

```txt
desktopIcons.ts
├─ projects data
└─ portfolio types
```

```txt
dockApps.ts
└─ DockApp type
```

```txt
projects.ts
└─ portfolio types
```

### API routes

```txt
/api/project-images
└─ projects/[slug]/images directory listing
```

```txt
/api/project-image
└─ projects/[slug]/images/[file] image bytes
```

```txt
/api/project-hero-image
└─ first file named single-hero.* in projects/[slug]/images
```

```txt
/api/gallery-images
└─ projects/gallery/images directory listing
```

```txt
/api/gallery-image
└─ projects/gallery/images/[file] image bytes
```

---

## 25. Extension guidelines

### Adding a new normal project

1. Create:

```txt
projects/[slug]/
├─ project.md
└─ images/
```

2. Add images.
   - Must include `single-hero.*`.

3. Add project object to `src/data/projects.ts`.
   - Include localized description/editorial note.
   - Include Details.
   - Include `editorialLayout`.

4. Ensure `desktopIcons.ts` picks it up.
   - It automatically maps all projects except `gallery`.

5. Add/verify desktop composition.
   - If project count changes, update desktop/tablet composition arrays.
   - Add mobile coordinates in `Desktop.tsx`.

6. Test:
   - Desktop icon cover.
   - Project window.
   - Spanish toggle.
   - Mobile portrait layout.

### Adding a gallery-layout project

Use `editorialLayout`:

```ts
block("gallery-layout", {
  src: "/api/project-hero-image?slug=your-slug",
  alt: "Project hero image",
})
```

Ensure:

- `projects/[slug]/images/single-hero.*` exists.
- `/api/project-images?slug=your-slug` can read every image.

### Adding a Dock app

1. Add icon to `public/dock-apps`.
2. Add item to `src/data/dockApps.ts`.
3. Add `WindowKind` if it opens a window.
4. Add default size in `useWindowManager.ts`.
5. Add render case in `WindowLayer.tsx`.
6. Add localized labels if needed.
7. Test open indicator behavior.

### Adding a new app window

1. Create component in `src/components/apps`.
2. Add `WindowKind`.
3. Add default size.
4. Add Dock or TopBar entry.
5. Add `WindowLayer` render case.
6. Decide whether it uses:
   - dark generic window
   - Finder-style light window
   - Adobe dialog style
7. Add CSS classes carefully.

### Adding localized text

1. Add to `uiText` if interface text.
2. Add `{ en, es }` object if content/data text.
3. Render with `localizeText`.
4. For paragraph arrays, use `localizeTextArray`.

### Editing mobile layout

Only edit:

```ts
mobileIconLayout
```

Avoid:

- z-index experiments
- render-order changes
- grid/flex mobile layout
- broad `.desktop-artwork` CSS overrides
- changing Dock to solve desktop icon problems

After edits:

```bash
npm run build
```

Then verify mobile visually.

### Fixing stale Next chunk errors

Common errors:

- `Cannot find module './276.js'`
- `Cannot find module './682.js'`
- `EINVAL readlink .next/...`

Fix:

1. Stop Node/Next dev server.
2. Delete `.next`.
3. Restart dev server.
4. Hard refresh browser.

These errors are almost always generated-cache problems in this workspace, not app source problems.

### Safe verification checklist

After any change:

1. `tsc --noEmit --incremental false`
2. `npm run build`
3. Start dev server.
4. Check localhost returns `200`.
5. Check desktop mode.
6. Check mobile portrait.
7. Open a project.
8. Open Notes.
9. Open Gallery.
10. Toggle Translate.

---

## Final maintenance note

This project is visually sensitive. Its quality comes from many deliberately small choices: spacing, layering, radius, opacity, typography, image rhythm, Dock proportions, and macOS-like restraint. Avoid broad refactors that flatten those details. Prefer small, observable changes with frequent visual checks.

When in doubt, preserve:

- Finder-like project windows
- vertical mobile Dock behavior
- Gallery as Dock app only
- GRAPHICZSZ as a special panoramic desktop project
- global static localization
- sharp wallpaper/UI separation
- restrained motion
- data-driven project/Dock definitions

