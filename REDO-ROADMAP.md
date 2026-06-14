# REDO ROADMAP: Controlled Sophistication

**Principle:** Maximum delight with minimum friction.

**Goal:** World-class ecommerce that is premium, futuristic, memorable, interactive, visually stunning, portfolio-worthy, usable, accessible, and conversion-focused.

---

## EFFECT CLASSIFICATION

### 1. Custom Cursor (GooeyCursor + CursorLabel)
**Verdict: REPLACE**

**Why not Keep:** `cursor: none` on body is an accessibility liability. If JS fails, users are stranded. Touch devices get nothing.

**Why not Remove:** A custom cursor CAN be a brand signature if done correctly.

**How it evolves:** Contextual cursor, not a gooey blob.
- Default: Small 8px circle, `#c4a35a`, `mix-blend-mode: difference`.
- Over product images: Expand to 48px with "ZOOM" text.
- Over CTAs: Expand to button-width, fill with `#2a2520`, white text.
- Over draggable: Show grab hand.
- On touch: Disabled entirely. `cursor: none` removed from body. Custom cursor only activates on `hover: hover` media query.
- Implementation: CSS-only where possible. `transform` only. No `requestAnimationFrame` mouse tracking. Use `:hover` states on parent elements to scale the cursor via CSS transitions.

**Apple would:** Not do it. They respect the platform.
**Nike would:** Use it in editorial lookbook sections only, not the shop.
**Awwwards winner would:** Make it the signature interaction. A cursor that morphs based on context — dot, ring, text, arrow. Pure CSS `transform` with `transition`.

---

### 2. GSAP Scroll Animations (HomePage fade-ins)
**Verdict: IMPROVE**

**Why not Keep:** Blank sections on fast scroll. Layout shift risk. Dependencies for basic reveals.

**Why not Remove:** Scroll-triggered reveals add rhythm and pacing to a long page.

**How it evolves:**
- Replace JS-driven ScrollTrigger with CSS-only `IntersectionObserver` for simple reveals.
- Use GSAP ONLY for complex choreography (hero entrance, product page image sequence).
- Reveal rule: `opacity: 0 -> 1`, `translateY(30px) -> 0`. Duration: 0.6s. Ease: `cubic-bezier(0.16, 1, 0.3, 1)`. No stagger on every section — only on grids.
- NEVER fade in above-the-fold content. Hero text should be visible immediately (animate in on load, not on scroll).
- Respect `prefers-reduced-motion`: instant reveal, no transform.

**Apple would:** Almost no scroll animations. Content is static. Motion is reserved for page transitions and product interactions.
**Nike would:** Bold scroll reveals on editorial pages. Quick, snappy, 0.4s max.
**Awwwards winner would:** Scroll-driven 3D transforms, WebGL distortion, pinned sections. But only on editorial pages, not the shop grid.

---

### 3. Parallax (Hero image scroll)
**Verdict: REPLACE**

**Why not Keep:** JS `scroll` listener = jank. Mobile performance is bad. Creates visual disconnect between text and image.

**Why not Remove:** Parallax adds depth and editorial quality.

**How it evolves:** CSS-only parallax via `transform: translateZ(-1px) scale(2)` in a `perspective` container. Or: keep the image static and parallax the text layers instead (lighter). Best option: Remove parallax from the hero entirely. Instead, use a slow, ambient zoom on the product image (scale 1 -> 1.05 over 20s). This is "living photography" — no scroll dependency, no jank.

**Apple would:** Static hero image, perfectly lit. No parallax.
**Nike would:** Full-bleed video background, not parallax stills.
**Awwwards winner would:** WebGL depth map parallax on mouse move (not scroll), inside the product frame only.

---

### 4. Text Scramble (Track Order heading)
**Verdict: REMOVE**

**Why not Keep:** Delays comprehension. Adds no value. Confuses users who think the page is broken.

**Why not Remove:** It is pure decoration with a cognitive cost.

**How it evolves:** Deleted. Replaced with a crisp, instant type reveal: `clip-path` wipe from left, or `overflow: hidden` with `translateY` slide. 0.5s max.

**Apple would:** Never. Clarity is instant.
**Nike would:** Never on functional pages. Maybe on a campaign landing page with "JUST DO IT" glitching for 0.3s.
**Awwwards winner would:** Use it once, on a preloader or a single campaign headline. Never on a form page.

---

### 5. Magnetic Buttons (Hero CTAs)
**Verdict: REMOVE**

**Why not Keep:** Does not improve click accuracy. Distracts from the CTA. Adds JS overhead for every button.

**Why not Remove:** It is a gimmick that adds friction.

**How it evolves:** Deleted. Replaced with tactile press feedback: `scale(0.96)` on `:active`, plus a subtle `box-shadow` inset. Buttons should feel physical, not magnetic.

**Apple would:** Physical press states. No magnetic attraction.
**Nike would:** Bold hover states (color invert, scale 1.02). No cursor-following.
**Awwwards winner would:** Buttons with liquid fill on hover (CSS `clip-path` or SVG mask). Purposeful and contained.

---

### 6. Marquee Banner
**Verdict: IMPROVE**

**Why not Keep:** Generic marquee text feels like a template.

**Why not Remove:** Continuous motion adds energy and can communicate brand voice.

**How it evolves:**
- Content: Not "URBAN CLOTHING URBAN CLOTHING." Use real brand copy: "FREE RETURNS ON ALL ORDERS — DESIGNED FOR THE DETOUR — SS/25 COLLECTION — FREE RETURNS ON ALL ORDERS."
- Speed: Slow. 40s per loop. Pauses on hover.
- Style: No background color band. Instead, text is `#2a2520` at 8% opacity, acting as a texture layer behind content.
- Implementation: CSS `@keyframes translateX`. GPU-accelerated. `will-change: transform`.
- Respect `prefers-reduced-motion`: static text strip.

**Apple would:** No marquee. Ever.
**Nike would:** Massive, bold, fast marquee on campaign pages. "JUST DO IT" repeated at 100px, black on white.
**Awwwards winner would:** Marquee with variable font weight animation (weight oscillates as text moves). Or images inside the marquee, not just text.

---

### 7. Product Interactions (Shop hover, PDP image zoom)
**Verdict: IMPROVE**

**Why not Keep:** Hover-only "Add to Cart" on mobile is a conversion killer. Image zoom via GSAP mouse move is janky.

**Why not Remove:** Product interactions are the core of the experience. They need to be BETTER, not removed.

**How it evolves:**
- **Shop cards:**
  - Desktop: Image scales 1.02 on hover (0.6s ease). "Add to Cart" button is ALWAYS visible on mobile. On desktop, it fades in with the image lift — but is not hidden by default. Use opacity 0.7 -> 1, not 0 -> 1.
  - Quick view: Click/hold on image opens a modal with size selector and Add to Cart. Reduces pogo-sticking.
- **PDP image:**
  - Remove GSAP mouse-move zoom. Replace with: Click to enter fullscreen lightbox with pinch-to-zoom. On desktop, a subtle hover-follow lens (magnifying glass) that shows texture detail.
  - Add image carousel with thumbnail strip. One static image is not enough for a premium product.
- **Size selector:**
  - Replace square buttons with subtle rounded pills.
  - Sold out: Strikethrough, not hidden. Users need to know what is unavailable.
  - Selected: Fill with `#2a2520`, white text. Not just border change.

**Apple would:** Perfect photography. 360-degree rotation. Pinch to zoom in fullscreen. No hover gimmicks.
**Nike would:** 3D model viewer. Spin the shoe. AR try-on.
**Awwwards winner would:** WebGL fabric simulation on hover. The shoe material shifts light as you move the mouse. Not a zoom — a material response.

---

### 8. Page Transitions
**Verdict: ADD — You don't have real page transitions**

**Current state:** `AnimatedRoutes` likely uses simple fade. Feels like a website, not an app.

**How it evolves:**
- Between pages: A brief, directional wipe. Content slides out left, new content slides in from right. 0.4s. `cubic-bezier(0.16, 1, 0.3, 1)`.
- On product click: The product image scales up from its card position to fill the PDP hero (FLIP animation). This is the signature transition.
- On cart open: Drawer slides in from right with staggered item reveals.
- On checkout step change: Cross-fade with a slight upward shift.

**Apple would:** Instant page loads with no transitions (their sites are fast). Or: elegant cross-dissolve between product categories.
**Nike would:** Fast, athletic transitions. Snappy. 0.3s max.
**Awwwards winner would:** Page transitions that tell a story. A curtain of brand color wipes across, revealing the new page. Or a 3D rotation of the entire viewport.

---

## THE PREMIUM MOTION SYSTEM

### Principles
1. **Purpose first:** Every animation answers "What is this communicating?"
   - Loading = "System is working"
   - Hover = "This is interactive"
   - Reveal = "New content arrived"
   - Transition = "You moved to a new context"
2. **Speed is premium:** Slow animations feel cheap. Fast, snappy animations feel expensive.
   - Micro-interactions: 150–200ms
   - Reveals: 400–600ms
   - Page transitions: 400ms
   - Ambient loops: 15–30s
3. **Hardware-accelerated only:** `transform`, `opacity`. Never `width`, `height`, `top`, `left`, `margin`, `padding`.
4. **Reduced motion is not reduced quality:** `prefers-reduced-motion` should still feel polished (instant reveals, no jank).
5. **One signature, many supports:** Choose ONE hero animation (e.g., page transition wipe). Everything else supports it, not competes.

### Token System
```css
--motion-instant: 0ms;
--motion-fast: 150ms;
--motion-normal: 300ms;
--motion-slow: 600ms;
--motion-ambient: 20s;

--ease-out-expo: cubic-bezier(0.16, 1, 0.3, 1);
--ease-out-quart: cubic-bezier(0.25, 1, 0.5, 1);
--ease-in-out-sine: cubic-bezier(0.37, 0, 0.63, 1);
```

---

## THE FUTURISTIC INTERACTION SYSTEM

### 1. AI Size Assistant
- Trigger: "Not sure about your size?" link below size selector.
- Interaction: Modal opens. User types their usual brand + size (e.g., "Nike 9"). System recommends a size with confidence percentage.
- Animation: Modal scales up from the size selector's position (FLIP). Result text types out character by character (real typing, not scramble).
- Visual: Minimal, one input, one result. Not a chatbot.

### 2. Predictive Search
- Trigger: Search overlay.
- Interaction: As user types, products fade in below in real-time. No "Search" button needed.
- Animation: Results stagger in from top, 50ms apart. `opacity` + `translateY(10px)`.
- Visual: Thumbnail + title + price in a clean list. No borders. Separated by 1px hairlines.

### 3. Gesture-Based Product Carousel
- Trigger: Shop page on mobile.
- Interaction: Horizontal swipe through products with momentum. Product snaps to center.
- Animation: Cards scale down to 0.9 and opacity to 0.5 when off-center. Center card is 1.0, full opacity.
- Visual: Full-bleed images. Title and price overlay the bottom with a subtle gradient scrim.

### 4. Haptic Feedback Integration
- Trigger: Add to Cart, size select, checkout submit.
- Interaction: `navigator.vibrate(10)` on supported devices.
- Animation: Button `scale(0.96)` + haptic = physical confirmation.
- Visual: Button flash with accent color for 150ms.

### 5. Ambient Product Backgrounds
- Trigger: Product Detail Page.
- Interaction: None. Purely ambient.
- Animation: A slow, generative gradient mesh behind the product image (subtle, 20s loop, `#f5efe6` -> `#e8ddd0` -> `#f5efe6`). Not video. CSS or WebGL.
- Visual: The gradient responds to the product's dominant color (extracted on upload). Each product page has a unique, subtle ambient mood.

---

## THE UNIQUE BRAND EXPERIENCE

### Brand Signature Element: The "Compass Cursor"
Replace the gooey blob with a compass needle. On the homepage, the cursor is a subtle compass that orients toward the nearest CTA. On the shop, it is a neutral dot. On the PDP, it becomes a magnifying glass over images. This is ONE system with context awareness, not three random effects.

### Brand Voice: "Precision for the Unplanned"
All copy should sound like a technical manual for adventurers:
- Old: "Designed for the modern explorer."
- New: "Engineered for 14km of unplanned terrain."
- Old: "Add to Cart"
- New: "Add to Kit"
- Old: "Your cart is empty"
- New: "Your kit is at base camp."

### Brand Ritual: The "Unfold"
Every page transition uses a diagonal wipe that mimics unfolding a map. This is the signature motion. Consistent across the entire site. Users remember it.

### Brand Color: Own the Gold
`#c4a35a` is not enough. Create a living gold:
- Hover states: Gold shifts to a slightly warmer `#d4b36a`.
- Loading states: A thin gold line that snakes across the top of the viewport (like a topographic contour).
- Active states: Gold with a subtle inner glow.

---

## MEMORABLE HOMEPAGE REDESIGN

### Structure
1. **Hero:** Full-bleed product image (shoe, 60% viewport width, right-aligned). Left side: one massive word "TREK" in Savate, 15vw, clipped by container. Below: "SS/25 Collection. Engineered for the unplanned." CTA: "Explore the Kit" (pill button, gold fill). No frame border. No rotation. No parallax. The image has a slow, 20s ambient zoom (1.0 -> 1.03). This is "living photography."
2. **Press Strip:** Same structure, but text is larger (14px, not 10px) and opacity is 40% (not 20%).
3. **Featured Categories:** 3-column grid. Images are full-bleed within cards. On hover, the image desaturates to 50% and the category name scales 1.05. No borders. White text with a gradient scrim.
4. **Marquee:** As described in "Improve." Slow, low-opacity, real copy.
5. **About:** Split layout. Left: large portrait image. Right: text. No border on image. Instead, the image has a subtle shadow that shifts on scroll (CSS `box-shadow` transition, not JS).
6. **Featured Products:** Horizontal scroll section (not infinite, not hijacked). 4 visible cards. Drag or arrow navigation. Cards have NO border. Image + title + price + visible "Add to Kit" button.
7. **Testimonials:** Large quote typography. One testimonial at a time, auto-rotating every 6s. Fade transition. No cards, no borders. Just text and a name.
8. **Newsletter:** Minimal. One input, one button. No border on input — just a bottom line that expands on focus.

### Hero Animation Sequence
1. Page loads. Image is visible immediately (no fade-in).
2. "TREK" slides up from `translateY(40px)`, `opacity: 0 -> 1`. 0.8s. `ease-out-expo`.
3. Subtitle slides up 0.2s after. 0.6s.
4. CTA fades in 0.2s after subtitle. 0.5s.
5. Image ambient zoom begins (20s loop).
6. Total hero animation time: 1.6s. Not staggered over 5s.

---

## AWARD-WINNING PRODUCT PAGE

### Structure
1. **Breadcrumb:** Minimal. Home > Shop > [Product Name]. `text-xs`, `opacity-40`. No underline. Just slashes.
2. **Image Gallery:** Main image (55% width). Click to expand to fullscreen lightbox. Thumbnail strip below (5 thumbnails, horizontal scroll). On thumbnail hover, main image cross-fades (0.3s). NO border on main image. Instead, the image floats on a subtle ambient gradient background unique to the product.
3. **Product Info (45% width):**
   - Category + Season: `text-xs`, `tracking-wide`, `opacity-40`.
   - Title: `text-4xl`, `font-semibold`, Savate.
   - Price: Large. Old price with strikethrough. Discount badge ONLY if > 10%.
   - Description: `text-sm`, `opacity-70`, `leading-relaxed`. 2 lines max. "Read more" expand.
   - Stock: "In stock" (green dot) or "Only 3 left" (gold dot) or "Sold out" (gray dot). Not a banner.
   - Size selector: Horizontal row of pills. `h-11`, `rounded-full`, `border`. Selected = filled. Sold out = strikethrough. Size guide = text link.
   - Quantity: Stepper. `-` and `+` are `w-11 h-11` with subtle borders. Number is centered.
   - Add to Kit: Full width, `h-14`, gold background (`#c4a35a`), dark text. On click: button text changes to "Added" with a checkmark, button shrinks slightly (`scale(0.98)`), then a small product image flies to the cart icon (FLIP animation).
   - Wishlist: Heart icon to the right of the CTA. Gold fill when active, not red.
   - Trust strip: 3 icons with labels below the CTA. "Authentic Guarantee / Free Returns / 24/7 Support." `text-xs`, `opacity-50`.
4. **Tabs:** Description / Shipping / Reviews. Underline is 1px, gold, not 2px black. Active tab is full opacity, inactive is 40%.
5. **Recently Viewed:** Horizontal scroll. Same card style as Featured Products.
6. **Related Products:** Same.
7. **Sticky Mobile Bar:** White background, top shadow (not border). Product title (truncated), price, "Add to Kit" button (gold, compact).

### Signature PDP Animation
- **Image enter:** On page load, the main image scales from 0.95 to 1.0 with `opacity: 0 -> 1`. 0.6s. This makes the product feel like it "arrives."
- **Add to Kit fly:** When clicked, a clone of the product image creates a FLIP animation that travels to the cart icon in the nav. Duration: 0.8s. Curve: arc, not straight line. This is the "magical" micro-interaction.
- **Tab switch:** Content cross-fades with a slight `translateY(10px)` offset. 0.3s.

---

## VISUALLY STUNNING SHOP PAGE

### Structure
- **Desktop:** Responsive grid. 3 columns (`gap-6`). NOT infinite scroll. NOT dual columns. A clean, browsable catalog.
- **Mobile:** 2-column grid. NOT horizontal swipe. NOT infinite scroll.
- **Filters:** Sticky top bar. Category pills (scrollable horizontal on mobile). Sort dropdown. "24 products" count.
- **Cards:**
  - Aspect ratio: 4:5 (portrait).
  - Image: Full bleed, object-cover.
  - Badge: Top-right. Small pill. "New" = gold bg, dark text. "Sale" = dark bg, gold text. NOT red.
  - Info below image: Brand (optional), Title (16px, semibold), Price (14px, medium). Old price with strikethrough.
  - Rating: Star icon + "4.8 (124)" below price.
  - CTA: Desktop — button fades in on hover, but a "+" icon is always visible in the top-right corner. Mobile — button always visible below price. "Add to Kit" in a compact pill.
  - NO border on card. NO shadow. Instead, a subtle `1px` hairline between cards on mobile. On desktop, whitespace separates them.

### Shop Animation
- **Filter change:** Grid cross-fades. Existing cards fade out (0.2s), new cards fade in with stagger (0.05s each, `translateY(20px)`).
- **Card hover:** Image `scale(1.03)` (0.4s). Title color shifts to gold (0.2s). "+" icon rotates 90deg (0.2s).
- **Load more:** If pagination is used, new cards slide up with stagger. No "Load More" button — use intersection observer to auto-load, but with a clear progress indicator.

---

## MAGICAL MICRO-INTERACTIONS

### 1. The "Kit Fly" (Add to Cart)
- Trigger: Add to Kit click.
- Effect: Product image clone creates a bezier-curve animation from the card/PDP to the cart icon in the nav.
- Duration: 0.8s.
- Easing: Arc path (CSS `offset-path` or GSAP MotionPath).
- Landing: Cart icon bounces once (`scale(1.2) -> 1.0`, 0.3s). Badge count increments with a quick flip animation.
- Purpose: Confirms the action. Delights. Memorable.

### 2. The "Size Breath"
- Trigger: Hover over size selector.
- Effect: Hovered size pill subtly scales to 1.05 and gains a gold ring shadow.
- Duration: 0.2s.
- Purpose: Tactile feedback before selection.

### 3. The "Image Breathe"
- Trigger: Page load (ambient).
- Effect: Product images have a perpetual, imperceptible scale oscillation: 1.0 -> 1.02 -> 1.0 over 10s.
- Purpose: Makes photography feel alive. Not static.

### 4. The "Contour Line" Loading Bar
- Trigger: Page transitions, form submissions.
- Effect: A 2px gold line snakes across the top of the viewport like a topographic contour.
- Duration: Matches load time.
- Purpose: Loading indicator that is on-brand and beautiful. Not a spinner.

### 5. The "Unfold" Transition
- Trigger: Page navigation.
- Effect: A diagonal slice (45deg) of `#2a2520` wipes across the screen, revealing the new page underneath.
- Duration: 0.5s.
- Easing: `ease-out-expo`.
- Purpose: Signature brand motion. Consistent. Memorable.

### 6. The "Press" Button
- Trigger: `:active` on any button.
- Effect: `scale(0.97)` + `translateY(1px)` + subtle inset shadow.
- Duration: 0.1s.
- Purpose: Physicality. Users feel the click.

### 7. The "Ghost" Input Focus
- Trigger: Input focus.
- Effect: Border color transitions to gold. A subtle glow (`box-shadow: 0 0 0 3px rgba(196, 163, 90, 0.15)`) appears.
- Duration: 0.2s.
- Purpose: Clear focus indication without default browser rings.

### 8. The "Reveal" Card
- Trigger: Scroll into view.
- Effect: Card opacity 0 -> 1, `translateY(40px) -> 0`.
- Duration: 0.6s.
- Stagger: 0.08s between cards in a grid.
- Purpose: Content feels discovered, not dumped.

---

## MOTION THAT FEELS INTENTIONAL

### Checklist for every animation
1. **What user need does this serve?**
   - If none: Remove.
   - If "delight": Keep only if it does not delay the task.
   - If "feedback": Keep.
   - If "storytelling": Keep only on editorial pages.
2. **Does this work at 60fps on a 2019 Android phone?**
   - If no: Simplify or remove.
3. **Does this respect `prefers-reduced-motion`?**
   - If no: Add fallback.
4. **Would a user notice if this were removed?**
   - If no: Remove.
   - If yes but negatively: Keep.
   - If yes and they would prefer it gone: Remove.
5. **Is this the ONLY thing happening?**
   - If no and it competes: Remove or defer.

### Applied to current effects
| Effect | User Need | 60fps | Reduced Motion | Noticeable? | Only Thing? | Verdict |
|---|---|---|---|---|---|---|
| Custom cursor | None (replace with context) | No (JS tracking) | No | Yes | No | Replace |
| GSAP scroll fades | Rhythm | Yes | Needs work | Yes | No | Improve |
| Parallax | Depth | No (JS scroll) | Yes | Slightly | No | Replace |
| Text scramble | None | Yes | N/A | Yes (negatively) | Yes | Remove |
| Magnetic buttons | None | Yes | N/A | Yes (negatively) | No | Remove |
| Marquee | Brand energy | Yes | Needs pause | Yes | Yes | Improve |
| Product hover zoom | "This is clickable" | Yes | Yes | Yes | No | Improve |
| Page transitions | Context change | Yes | Needs work | Yes | Yes | Add/Improve |
| Cart fly animation | Confirmation | Yes | Needs fallback | Yes | Yes | Add |
| Kit fly (Add to Cart) | Confirmation | Yes | Needs fallback | Yes | Yes | Add |
| Size breath | Tactile feedback | Yes | Yes | Subtle | No | Add |
| Image breathe | Life | Yes | Yes | Subtle | Yes | Add |
| Contour loading | Progress | Yes | Yes | Yes | Yes | Add |
| Unfold transition | Brand signature | Yes | Needs work | Yes | Yes | Add |
| Press button | Physicality | Yes | Yes | Yes | No | Add |
| Ghost input focus | Accessibility | Yes | Yes | Yes | No | Add |
| Reveal card | Discovery | Yes | Needs work | Yes | No | Improve |

---

## ACCESSIBILITY + CONVERSION PRESERVATION

### Rules that never bend
1. **All tap targets >= 44x44px.** No exceptions.
2. **All text >= 12px for UI, >= 16px for body.** No exceptions.
3. **Focus states are visible and beautiful.** Gold ring, 2px, 3px offset.
4. **CTAs are ALWAYS visible on mobile.** No hover gating.
5. **Express checkout on checkout.** GPay, Paytm, Apple Pay above the fold.
6. **Trust signals on every product page.** Authenticity, returns, support.
7. **Loading states show progress, not spinners.** Contour line.
8. **Errors are helpful, not just red borders.** "We need a 10-digit phone number" not "Invalid."
9. **Reduced motion is still polished.** Instant reveals, no jank, no missing content.
10. **Keyboard navigation works everywhere.** Tab order is logical. Modals trap focus.

---

## IMPLEMENTATION PRIORITY

### Phase 1: Foundation (Week 1)
1. Remove `cursor: none` from body. Implement contextual CSS cursor.
2. Remove text scramble, magnetic buttons, parallax.
3. Unify backgrounds to `#f5efe6` + white.
4. Remove 80% of borders. Use whitespace.
5. Fix typography: ban `vw`, bump labels to 12px.
6. Replace infinite scroll shop with responsive grid.
7. Make mobile CTAs always visible.

### Phase 2: Signature Motion (Week 2)
1. Implement "Unfold" page transition.
2. Implement "Kit Fly" Add to Cart animation.
3. Implement "Contour Line" loading bar.
4. Implement "Press" button states.
5. Implement "Ghost" input focus.
6. Improve marquee to real brand copy, slow speed.

### Phase 3: Product Experience (Week 3)
1. Redesign PDP: image gallery, size pills, trust strip.
2. Implement "Image Breathe" ambient animation.
3. Implement "Size Breath" hover interaction.
4. Add AI size assistant modal.
5. Add express checkout to checkout page.

### Phase 4: Polish (Week 4)
1. Add FLIP image transition (card to PDP).
2. Add predictive search animation.
3. Implement `prefers-reduced-motion` fallbacks for all animations.
4. Performance audit: 60fps on low-end mobile.
5. Brand copy rewrite: "Precision for the Unplanned."

---

**Final Principle:**
> The user should never think "How do I use this?" They should think "Damn, this feels good to use."

---

# PHASE 2: SIGNATURE EXPERIENCES

---

## ADDITION 1: PRODUCT → PDP FLIP TRANSITION

### Purpose
Create a signature, brand-defining transition where a product card image expands and morphs into the PDP hero image. Content then loads around it. This makes every product click feel cinematic and intentional.

### User Experience Impact
- Eliminates the jarring page-switch feeling.
- Creates spatial continuity — users always know where they are.
- Reinforces product focus by keeping the hero image constant across contexts.
- Reduces perceived load time because the product image is already "there."

### Portfolio Impact
- FLIP animations are a senior frontend signature. Recruiters recognize the technical sophistication.
- Demonstrates mastery of `getBoundingClientRect`, `requestAnimationFrame` scheduling, and React state orchestration.
- Becomes the "show me something cool" moment in every interview.

### Visual Design Specification
- **Trigger zone:** Entire product card is clickable. Hovering a card subtly lifts it (`translateY(-4px)`, `scale(1.01)`).
- **During transition:** The card image breaks out of its container, expanding to fill the PDP hero slot. Aspect ratio smoothly shifts from 4:5 to 16:9 or 3:2.
- **Surrounding content:** Title and price fade out. PDP content (title, size selector, CTA) fades in with a 0.15s stagger after the image lands.
- **Overlay:** A subtle `#f5efe6` overlay fades in behind the expanding image to mask the page switch.
- **Z-index choreography:** Image starts at `z-index: 50` and ends at `z-index: 1` once the PDP layout stabilizes.

### Motion Specification
- **Phase 1 — Lift:** Card lifts `translateY(-8px)`, `scale(1.02)`. Duration: 150ms. Ease: `ease-out`.
- **Phase 2 — Expand:** Image rect is captured with `getBoundingClientRect`. A clone is absolutely positioned and animated to the PDP hero rect. Duration: 500ms. Ease: `cubic-bezier(0.16, 1, 0.3, 1)`.
- **Phase 3 — Settle:** Clone fades out as the real PDP hero image fades in (`opacity` crossfade, 200ms). Layout shifts from fixed/absolute to normal flow.
- **Phase 4 — Content Reveal:** PDP title, price, and CTA stagger in from `translateY(20px)`, 50ms apart, 400ms each.
- **Total perceived duration:** ~1.1s. Critical content is readable at 600ms.

### Technical Implementation Approach
- Use the FLIP technique (First, Last, Invert, Play).
- On click: capture source rect from product image. Navigate to PDP route. Capture target rect from PDP hero image (initially hidden). Invert the difference with `transform`. Play with `requestAnimationFrame`.
- Use React `useLayoutEffect` to measure target layout before paint.
- Store transition state in a global context (`TransitionProvider`) so the PDP knows it is part of a FLIP sequence.
- Use `will-change: transform, opacity` on the clone only during the transition.
- Fallback: standard cross-fade if `prefers-reduced-motion` is active or if the image fails to load.

### Accessibility Considerations
- `prefers-reduced-motion:` Standard instant page navigation. No FLIP.
- Screen readers: Announce "Loading product detail" when transition starts. Focus moves to the PDP heading on settle.
- Keyboard users: Pressing Enter on the card triggers the same FLIP, but the visual expansion is decorative. Focus must land on the PDP heading.
- Do not trap focus during the 500ms transition — it is too short to justify a focus trap.

### Performance Considerations
- Clone the `<img>` element, not the entire card DOM. Avoid cloning React components with state.
- Use a single `transform` string per frame. No layout reads after the first frame.
- Decode the PDP hero image in a hidden `<img>` during Phase 1 so it is ready for the crossfade.
- Limit to 60fps by batching layout reads at the start of the animation.
- Do not run FLIP on low-end devices; detect via `navigator.hardwareConcurrency < 4` or `deviceMemory < 4`.

### Mobile Behavior
- FLIP is disabled on mobile. Instead, the product image does a quick `scale(1.05)` press feedback, then a native-feeling slide transition pushes the PDP in from the right (0.3s).
- Why: FLIP on variable viewport sizes is fragile. The slide is safer, faster, and feels native.

### Desktop Behavior
- Full FLIP experience. Mouse users see the image expand from the exact card they clicked.
- If the user clicks the same product again (back button), reverse the FLIP: PDP hero shrinks back into the shop grid card.

---

## ADDITION 2: INTERACTIVE LOOKBOOK

### Purpose
Transform static campaign imagery into an interactive editorial experience where users explore outfits, discover individual items, and click through to products. This positions the brand alongside Nike, Arc'teryx, and luxury fashion houses.

### User Experience Impact
- Transforms browsing from a task into an experience.
- Users discover products in context, increasing conversion intent.
- Builds emotional connection by showing the product "in the wild."
- Reduces decision fatigue: seeing a full outfit helps users visualize ownership.

### Portfolio Impact
- Interactive lookbooks are rare in junior portfolios. This signals editorial design thinking.
- Shows ability to balance immersive experience with commercial goals.
- Hotspot systems demonstrate coordinate mapping, hover detection, and tooltip choreography.
- Perfect case study material: "How I made a lookbook that converts."

### Visual Design Specification
- **Layout:** Full-bleed photography. No UI chrome except a minimal header and a scroll indicator.
- **Hotspots:** Small 24px gold rings (`#c4a35a`) that gently pulse. On hover, the ring expands and a label appears: product name + price.
- **Label card:** Minimal white card with `box-shadow`, 12px radius, sharp typography. Appears above/below the hotspot depending on viewport position.
- **Outfit strip:** Bottom-aligned horizontal strip of the outfit's items. Thumbnail + name. Clicking navigates to PDP.
- **Navigation:** Arrow keys or on-screen arrows move between lookbook scenes. A thin progress line at the bottom indicates position.
- **Scene count:** 4–6 scenes per collection.

### Motion Specification
- **Scene transition:** Current image scales down to 0.95 and fades out (300ms). New image scales from 1.05 to 1.0 and fades in (400ms). Overlap: 150ms.
- **Hotspot entrance:** After scene load, hotspots scale from 0 to 1 with a subtle elastic overshoot. Stagger: 80ms. Duration: 400ms.
- **Hotspot pulse:** Continuous `scale(1 -> 1.15 -> 1)` loop, 2.5s, `ease-in-out-sine`.
- **Label reveal:** `opacity 0 -> 1`, `translateY(8px) -> 0`. Duration: 200ms. Ease: `ease-out`.
- **Outfit strip:** Slides up from `translateY(100%)` when the user hovers near the bottom edge. Duration: 400ms.

### Technical Implementation Approach
- Store lookbook data as an array of scenes. Each scene: `image`, `hotspots[]` (x, y, productId), `outfit[]`.
- Use CSS `transform` for all scene transitions. Preload next scene image in a hidden layer.
- Hotspot positioning: percentage-based (`left: 34%`, `top: 62%`) so it is responsive.
- Tooltip placement: use a simple collision detection — if `y < 50%`, place label below; if `y > 50%`, place above. Same for left/right.
- Use `framer-motion` or GSAP for the scene orchestration if already in the project. Otherwise, pure CSS transitions with React state.
- Mobile: hotspots are tappable circles. Tap to reveal label + "View Product" button.

### Accessibility Considerations
- Each hotspot must be a `<button>` with `aria-label="View [Product Name]"`.
- Scene transitions respect `prefers-reduced-motion`: instant swap, no fade.
- Provide a "List View" toggle that shows all outfit items in a standard grid — do not force the interactive experience.
- Keyboard navigation: Tab moves between hotspots. Arrow keys change scenes.
- Do not auto-rotate scenes. Users must control navigation.

### Performance Considerations
- Images: WebP, responsive `srcset`, lazy-load scenes beyond the next one.
- Do not load all scene images upfront. Load current + next only.
- Hotspot pulse is CSS `@keyframes` — zero JS cost.
- Scene transitions use `opacity` + `transform` — GPU layers.

### Mobile Behavior
- Full-screen imagery. Hotspots are slightly larger (32px) for touch.
- Tap a hotspot: label appears with a "View Product" pill button. Tap again to navigate.
- Swipe left/right to change scenes. Momentum enabled.
- Outfit strip is always visible as a bottom sheet, not hover-triggered.

### Desktop Behavior
- Hover-revealed hotspots. Cursor becomes a compass needle near a hotspot (from the brand cursor system).
- Outfit strip is hidden by default, revealed on bottom-edge hover.
- Scroll wheel changes scenes. Smooth, bounded.

---

## ADDITION 3: STORYTELLING PRODUCT PAGES

### Purpose
Transform PDPs from transactional catalog pages into immersive editorial experiences that communicate product value through narrative sections. Every product has a story — materials, origin, purpose.

### User Experience Impact
- Increases time-on-page, which correlates with conversion.
- Justifies premium pricing by showing engineering and intent.
- Reduces returns by setting accurate expectations about materials and construction.
- Builds brand affinity: users do not just buy a product, they buy into a philosophy.

### Portfolio Impact
- Editorial layouts demonstrate typography mastery, grid systems, and content hierarchy.
- Shows understanding that ecommerce is not just "add to cart" — it is persuasion design.
- Rich content sections are highly screenshot-worthy for case studies.

### Visual Design Specification
- **Section rhythm:** Full-width alternating layout. Image left / text right, then text left / image right. No two identical layouts in a row.
- **Typography hierarchy:**
  - Section label: `text-xs`, `tracking-[0.2em]`, `uppercase`, gold (`#c4a35a`).
  - Section title: `text-3xl` Savate, dark (`#2a2520`).
  - Body: `text-base` Inter/Geist, `opacity-70`, `leading-relaxed`, max 60ch width.
  - Callout stat: `text-5xl` Savate, gold. E.g., "14,000" with a subtitle "steps of tested comfort."
- **Imagery:** Full-bleed, no borders. Some images have a subtle gradient mesh overlay matching the product's ambient color.
- **Dividers:** None. Separation is achieved through whitespace (80–120px between sections).
- **Sections (expandable based on product type):**
  1. Built For: The use case and environment.
  2. Materials: Fabric close-ups, sourcing story.
  3. Construction: Stitching detail, craftsmanship.
  4. Performance: Breathability, stretch, weather ratings.
  5. Durability: Wear tests, lifecycle data.
  6. Field Notes: A short story from a real user or designer.
  7. Design Philosophy: The "why" behind the product.

### Motion Specification
- **Section reveals:** Each section enters with `opacity 0 -> 1`, `translateY(50px) -> 0`. Duration: 600ms. Stagger between image and text: 150ms. Image enters first.
- **Stat counter:** Numbers count up from 0 to final value over 1.2s when scrolled into view. Use `requestAnimationFrame` with `easeOutQuart`.
- **Image parallax (light):** Images have a subtle `translateY` shift based on scroll position, contained to `-20px -> 20px` within their section. CSS-only via `transform: translateY(calc(var(--scroll) * 1px))` with a tiny JS observer.
- **Pull quote:** Large quote text reveals word-by-word with `clip-path: inset(0 100% 0 0) -> inset(0 0 0 0)` on each word. Stagger: 30ms.

### Technical Implementation Approach
- Data-driven: each product in the database has an optional `story` object with sections array.
- Sections render from a map. Layout alternates automatically based on index parity.
- Use `IntersectionObserver` with a `threshold: 0.2` to trigger reveals. No GSAP ScrollTrigger needed here.
- Image parallax: attach a single scroll listener that updates a CSS custom property `--scroll` on the section, throttled to `requestAnimationFrame`.
- Stat counter: a reusable `<AnimatedCounter target={14000} suffix="steps" />` component.

### Accessibility Considerations
- `prefers-reduced-motion:` Sections appear instantly. Stats show final value immediately. No parallax.
- All images have descriptive `alt` text, not just "product image."
- Color contrast for gold text on light backgrounds must pass WCAG AA. If not, darken the gold to `#a08440` for text usage.
- Keyboard users can Tab through sections naturally. No focus traps.

### Performance Considerations
- Lazy-load story images. Use `loading="lazy"` and a blur-up placeholder.
- Do not load all sections for every product. Only products with `story` data render them; others show the standard PDP.
- Limit the light parallax to 60fps by using a single global scroll handler with throttling.
- Keep DOM weight low: do not nest unnecessary wrapper divs.

### Mobile Behavior
- Layout stacks vertically: image, then text. No side-by-side.
- Stats are still large and centered. Counter animation triggers when 50% visible.
- Pull quote reveals line-by-line instead of word-by-word (simpler, less DOM).
- Touch scrolling is natural; no scroll hijacking.

### Desktop Behavior
- Alternating grid layouts. Images can bleed to the edge of the viewport (full-bleed on one side).
- Parallax is subtle and contained. It should never feel like the image is "chasing" the scroll.
- Hovering a stat reveals a tooltip with the testing methodology.

---

## ADDITION 4: MATERIAL INSPECTION SYSTEM

### Purpose
Allow users to inspect fabric and material details with a premium zoom and texture exploration experience. Luxury brands invest heavily in material storytelling — this brings that same tactile digital experience.

### User Experience Impact
- Bridges the sensory gap of online shopping. Users can "feel" the product through the screen.
- Reduces uncertainty about texture, weight, and finish.
- Increases confidence in premium pricing.
- Creates a memorable interaction that competitors lack.

### Portfolio Impact
- Zoom systems demonstrate advanced CSS and canvas/image manipulation skills.
- Hotspot/detail overlay pattern is reusable and shows interaction design depth.
- Impresses recruiters with attention to craft — "you even built a fabric inspector."

### Visual Design Specification
- **Trigger:** A "Inspect Material" text link below the product image gallery, gold underline.
- **Modal/Lightbox:** Full-screen overlay, `#f5efe6` background. Product image on the left 50%, material detail panel on the right 50%.
- **Zoom lens:** On desktop, hovering the product image reveals a circular magnifying lens (120px diameter) that shows a 2x zoom of the fabric texture beneath the cursor.
- **Material strip:** Below the main image, a horizontal scroll of 3–5 material close-up shots (stitching, weave, hardware, labels).
- **Hotspots:** Small gold dots on the product image. Hover to reveal callouts: "Reinforced toe cap," "Memory foam collar," "Water-resistant membrane."
- **Info panel:** Selected hotspot shows title + 2-line description + a material spec badge (e.g., "Gore-Tex / 340g/m²").

### Motion Specification
- **Modal open:** Background dims (`opacity 0 -> 0.6`, 300ms). Modal scales from `0.95` to `1.0` and fades in. Duration: 400ms. Ease: `ease-out-expo`.
- **Lens follow:** Lens position tracks mouse with `transform: translate(x, y)`. Smoothing: `lerp(0.15)`. No jitter.
- **Hotspot reveal:** Gold dot scales from `0 -> 1` with a 200ms delay after modal open. Stagger: 60ms.
- **Callout transition:** Changing hotspots cross-fades the info panel (`opacity`, 200ms) and slides the new text up (`translateY(8px) -> 0`).
- **Modal close:** Reverse of open. Lens fades first, then modal.

### Technical Implementation Approach
- **Zoom lens:** Use a cloned image at 2x resolution inside an `overflow: hidden` circular container. Move the inner image opposite to cursor movement via `transform: translate(-x, -y)`. This is pure CSS/JS, no libraries.
- **Hotspots:** Percentage-based coordinates stored per product. Render as absolutely positioned buttons.
- **Close-up strip:** Swipeable on mobile. Click to swap the main image for a close-up. "Back to product" button returns to the main view.
- **Modal:** Use a React portal. Trap focus inside the modal while open. Close on `Escape` and backdrop click.

### Accessibility Considerations
- The "Inspect Material" trigger is a keyboard-accessible `<button>`.
- Inside the modal, focus is trapped. Tab cycles through hotspots, close button, and close-up strip.
- Screen reader: announce "Material inspection. Use Tab to explore features."
- `prefers-reduced-motion:` Modal appears instantly. No lens smoothing.
- Lens is decorative. The close-up strip provides the same information for keyboard/screen reader users.

### Performance Considerations
- Load the 2x zoom image only when the modal opens. Do not preload on page load.
- Use a single high-res image for the zoom; do not load a separate asset if the product image is already high-res.
- Lens updates use `transform` only. Throttle mousemove to `requestAnimationFrame`.
- Close-up thumbnails should be small (< 50KB each).

### Mobile Behavior
- Modal is full-screen. Zoom lens becomes a "tap to inspect" mode: tap anywhere on the image to place a magnifying circle, drag to move it.
- Hotspots are tappable. Tap cycles through them.
- Close-up strip is horizontally swipeable with snap points.
- Bottom sheet shows the info panel, not a side panel.

### Desktop Behavior
- Hover-driven lens. Cursor hides inside the image area; the lens becomes the cursor.
- Hotspots reveal on hover. Clicking a hotspot locks the info panel to that hotspot until another is clicked.
- Close-up strip is hover-scrolled (no scrollbar visible, just drag).

---

## ADDITION 5: PREMIUM SOUND DESIGN

### Purpose
Introduce subtle, elegant audio feedback that reinforces interactions without becoming a gimmick. Sound adds a layer of physicality that motion alone cannot achieve.

### User Experience Impact
- Confirms actions at a subconscious level. Users feel the "click" even on silent devices.
- Adds perceived quality and polish. Silent luxury sites feel thin.
- Creates emotional resonance: a warm chime on "Add to Kit" feels rewarding.
- Optional by default — never forces sound on users.

### Portfolio Impact
- Sound in web experiences is extremely rare in portfolios. This immediately differentiates the project.
- Shows systems thinking: designing an interaction language that spans multiple senses.
- Demonstrates understanding of user consent and optional enhancement.

### Visual Design Specification
- **Sound toggle:** A small speaker icon in the footer or nav. Default: muted. Clicking enables sound globally.
- **When sound is ON:** A subtle gold ring pulses once around the icon to confirm activation.
- **Volume:** All sounds peak at `-20dB`. They are felt, not heard.
- **Sound palette:** Warm, organic, minimal. Think: woodblock tap, soft bell chime, fabric rustle, leather creak. Not electronic beeps.
- **No visualizer or waveform UI.** Sound is a background layer, not a feature.

### Motion Specification
- **Toggle activation:** Icon rotates 15deg and scales to 1.1, then settles. Duration: 300ms. Gold ring fades in and out over 600ms.
- **Sound-triggered motion pairs:**
  - Add to Cart: Button `scale(0.96)` + haptic + chime.
  - Success: Checkmark draws on screen (SVG stroke animation) + ascending chime.
  - Navigation: Subtle page-transition whoosh (0.2s) that is synchronized with the "Unfold" visual.

### Technical Implementation Approach
- Use the Web Audio API (not HTML5 `<audio>`) for precise, low-latency playback.
- Generate sounds procedurally where possible (OscillatorNode for simple chimes) to avoid asset downloads. For complex sounds (fabric rustle), use short `<audio>` files.
- Create a `SoundEngine` singleton:
  ```js
  class SoundEngine {
    constructor() { this.ctx = new AudioContext(); this.enabled = false; }
    play(type) { if (!this.enabled) return; /* buffer lookup + play */ }
    toggle() { this.enabled = !this.enabled; }
  }
  ```
- Preload sound buffers on first user interaction (to satisfy browser autoplay policies).
- Expose a React hook: `useSound(type)` that plays on call.

### Accessibility Considerations
- Sound is **opt-in** only. Never autoplay. Never assume users want it.
- Provide a visible toggle that is easy to find and dismiss.
- `prefers-reduced-motion:` does not disable sound, but `prefers-reduced-motion` users are more likely to keep sound off. Respect both independently.
- Screen readers: sound does not interfere with announcements. Keep volume extremely low.
- If a user has not interacted with the sound toggle, the site is completely silent.

### Performance Considerations
- Procedural sounds have zero asset cost.
- For sample-based sounds, use tiny MP3/WebM files (< 15KB each).
- Suspend `AudioContext` when no sounds have played for 30s to free CPU.
- Do not instantiate multiple AudioContexts. Use one shared context.

### Mobile Behavior
- Haptic feedback (`navigator.vibrate`) is the primary physical confirmation. Sound is secondary because many mobile users are silent.
- Sound toggle is in the mobile menu, not the main nav (space is limited).
- On iOS, respect the mute switch. If the device is muted, do not play sounds even if enabled.

### Desktop Behavior
- Sound toggle is visible in the footer or nav.
- Sound plays through the default audio output. No spatial audio or 3D positioning needed.
- Keyboard shortcuts: Pressing `M` toggles sound globally.

---

## ADDITION 6: SEASONAL THEME ENGINE

### Purpose
Design a flexible system that supports seasonal collection drops (SS25, AW25, Future) while preserving core brand identity. Each season should feel distinct but unmistakably "Urban Clothing."

### User Experience Impact
- Creates anticipation for new drops. Users return to see "what the season looks like."
- Signals freshness and relevance. A static site feels abandoned.
- Allows emotional storytelling: SS25 feels light and airy; AW25 feels rugged and grounded.
- Maintains usability because the underlying IA and components never change — only the mood does.

### Portfolio Impact
- Theme engines demonstrate design-system thinking at scale.
- Shows ability to create variation within constraint — the hallmark of senior designers.
- Proves understanding of CSS custom properties, runtime theming, and token architecture.
- Multiple seasonal screenshots make the portfolio look active and alive.

### Visual Design Specification
- **Token architecture:** All visual values are CSS custom properties:
  ```css
  :root {
    --season-bg: #f5efe6;
    --season-accent: #c4a35a;
    --season-text: #2a2520;
    --season-image-filter: none;
    --season-motion-speed: 1;
  }
  ```
- **SS25 (Spring/Summer):**
  - Background: `#f5efe6` (warm cream).
  - Accent: `#c4a35a` (bright gold).
  - Image treatment: High exposure, warm highlights, slight desaturation of greens.
  - Motion: Faster, lighter. Reveal durations reduced by 20%.
  - Typography: Slightly more italic, airy line-height.
- **AW25 (Autumn/Winter):**
  - Background: `#e8ddd0` (deeper sand).
  - Accent: `#8a7a60` (bronze/earth).
  - Image treatment: Lower exposure, higher contrast, richer shadows.
  - Motion: Heavier, slower. More weight in transitions.
  - Typography: Tighter tracking, bolder weights.
- **Future (Concept):**
  - Background: `#1a1a1a` (dark graphite).
  - Accent: `#c4a35a` (gold remains).
  - Image treatment: High contrast, neon edge glow, slight grain.
  - Motion: Glitch-like reveals, snap transitions.
  - Typography: Mono-spaced accents, monospace date stamps.

### Motion Specification
- **Theme transition:** When a user switches collections (or the season auto-detects), the background color crossfades over 600ms. Accent color shifts via CSS transition on `--season-accent`. Images with `filter` transition over 800ms.
- **Season load:** Hero text reveals with a season-specific ease: SS25 uses a soft `ease-out-sine`; AW25 uses a heavier `ease-out-expo`; Future uses a stepped/glitch reveal.
- **Season badge:** A small rotating badge in the nav indicates the active season. Rotates 90deg on change. Duration: 400ms.

### Technical Implementation Approach
- Store active season in React context (`SeasonProvider`).
- Apply a `data-season="aw25"` attribute to `<html>` or `<body>`. CSS selectors read this attribute:
  ```css
  [data-season="aw25"] { --season-bg: #e8ddd0; --season-accent: #8a7a60; }
  ```
- All components consume tokens via `var(--season-bg)`. No hardcoded colors in component CSS.
- Season data (images, copy, motion presets) lives in `src/seasons/` as JSON/config files.
- Auto-detect season from URL (`/ss25/...`) or from a launch date flag.
- Provide a manual toggle in the footer for users who want to explore past seasons.

### Accessibility Considerations
- Color contrast must pass WCAG AA for ALL season combinations. Test AW25 bronze on sand: if it fails, darken the bronze text to `#5c5038`.
- `prefers-reduced-motion:` Seasonal motion differences are ignored. Standard motion values apply.
- Screen readers: Announce the season name on page load. "Autumn Winter 2025 collection."
- Manual season toggle must be keyboard accessible.

### Performance Considerations
- CSS custom properties are applied at the layout level; no JS re-rendering of components needed.
- Season-specific images should be loaded lazily. Do not preload all season assets.
- `filter` transitions can be GPU-expensive. Use them on hero images only, not on every thumbnail.
- Store season config as a static JSON import. No API call needed.

### Mobile Behavior
- Season badge is in the mobile menu, next to the collection name.
- Theme transition is lighter: background color only. Skip image filter transitions to save battery.
- Swipe between seasonal lookbooks from the homepage.

### Desktop Behavior
- Season badge is a small pill in the top nav. Hover reveals a dropdown to switch seasons.
- Full theme transition: background, accent, image filters, and motion speed all shift simultaneously.
- Seasonal cursor: AW25 cursor is slightly thicker; SS25 cursor is lighter; Future cursor is a crosshair.

---

## ADDITION 7: PRODUCT COMPARISON MODE

### Purpose
Allow users to compare products side-by-side with an elegant, high-end interface. This is a conversion tool for users who are deciding between similar items.

### User Experience Impact
- Reduces cognitive load when choosing between variants.
- Keeps users on-site instead of opening multiple tabs.
- Surfaces feature differences that are otherwise buried in description text.
- Positions the brand as transparent and confident in its product specs.

### Portfolio Impact
- Comparison interfaces require complex layout engineering (sticky headers, synchronized scroll, diff highlighting).
- Shows systems thinking: designing for data density without clutter.
- Demonstrates understanding of user decision-making and reducing friction.

### Visual Design Specification
- **Trigger:** A "Compare" checkbox on each product card (small, top-right). Selecting 2–4 products enables a sticky bottom bar: "Compare 3 items."
- **Comparison page/modal:** Full-screen overlay or dedicated `/compare` route. Side-by-side columns.
- **Column structure:**
  - Sticky top: Product image, name, price, "Add to Kit" CTA.
  - Scrollable body: Attribute rows (Material, Weight, Fit, Waterproof, Warranty, etc.).
  - Highlighted differences: Attributes that differ across products get a subtle gold left-border. Identical attributes are muted (`opacity-50`).
- **Image strip:** Small thumbnails at the top of each column. Click to swap the main image.
- **Close:** Floating X in the top-right. Clicking a product name in the sticky bar removes it from the comparison.

### Motion Specification
- **Bottom bar entrance:** Slides up from `translateY(100%)` with `ease-out-expo`, 400ms.
- **Modal open:** Background dims. Comparison columns slide in from the bottom, staggered 100ms apart. Duration: 500ms.
- **Row reveal:** Each attribute row fades in with `translateY(10px)`, staggered 20ms. Duration: 300ms.
- **Difference highlight:** Gold left-border draws from top to bottom (`scaleY(0) -> scaleY(1)`), 400ms, triggered when row enters viewport.
- **Remove product:** Column shrinks to `scale(0.95)`, `opacity: 0`, then collapses. Remaining columns re-flow with a 300ms width transition.

### Technical Implementation Approach
- Store compared product IDs in global state (URL query params: `?compare=1,4,7`). This makes comparisons shareable and back-button friendly.
- Data model: each product has a `specs` object with key-value pairs. The comparison table is auto-generated from the union of all keys.
- Layout: CSS Grid with `grid-template-columns: 200px repeat(N, 1fr)`. First column is sticky attribute labels.
- Synchronized scroll: if one column scrolls, all columns scroll. Use a single scroll container with `overflow-x: auto` and equal-width columns.
- Mobile: stacked layout, not side-by-side. Each product is a card with its specs. Swipe between cards.

### Accessibility Considerations
- Comparison checkbox has a visible focus ring and `aria-label="Add [Product] to comparison"`.
- Modal traps focus. Tab order moves through columns top-to-bottom, then to the next column.
- Screen reader: announce "Comparing 3 products." Each column has a `<caption>` or `aria-labelledby`.
- `prefers-reduced-motion:` instant open, no slide animations. Differences are still highlighted with color, not motion.
- Keyboard shortcut: Press `C` to open comparison if items are selected.

### Performance Considerations
- Comparison data should be fetched from already-loaded product state. No extra API call.
- Images in the comparison are small thumbnails (< 80px wide). Load lazily.
- Do not render hidden comparison modal in the DOM until triggered. Use a portal or conditional render.
- Scroll sync should not use React state for scroll position. Use DOM refs and `scrollLeft` directly.

### Mobile Behavior
- Bottom bar is replaced by a floating action button (FAB) when 2+ items are selected.
- Comparison is a stacked vertical list, not columns. Swipe through products.
- Highlighted differences are shown as badges below each attribute.
- "Add to Kit" is a compact pill under each product image.

### Desktop Behavior
- Side-by-side columns. Up to 4 products fit on a 1440px screen. 3 on 1280px. 2 on 1024px.
- Sticky headers remain visible while scrolling specs.
- Hovering a row highlights that row across all columns (`background: rgba(196,163,90,0.05)`).
- Drag-to-reorder columns: drag a header to reorder compared products.

---

## ADDITION 8: COLLECTION WORLDS

### Purpose
Each collection should feel like its own universe — a cohesive aesthetic and interaction language that makes entering a collection feel like entering a different world.

### User Experience Impact
- Creates emotional immersion. Users do not just browse "shoes," they enter "Urban" or "Trail."
- Reduces decision fatigue by grouping products into clear lifestyles.
- Increases average order value by cross-selling within a world.
- Makes the brand feel larger and more intentional.

### Portfolio Impact
- Multi-world design demonstrates versatility and range.
- Shows ability to create distinct visual systems under one brand umbrella.
- Collection landing pages are highly shareable and screenshot-worthy.
- Proves understanding of narrative architecture in ecommerce.

### Visual Design Specification
Define four launch worlds:

**1. Urban**
- **Color language:** `#2a2520` text on `#f5efe6` bg. Gold accent `#c4a35a`. Concrete grays.
- **Motion language:** Fast, snappy. Quick reveals. Horizontal movement.
- **Typography treatment:** Savate display, tight tracking. Bold headlines.
- **Photography style:** City environments, street texture, architectural lines. High contrast.
- **Interaction style:** Hover-lift cards. Quick-flip transitions. Cursor is a compass.

**2. Trail**
- **Color language:** `#3d342b` text on `#e8ddd0` bg. Earth accent `#8a7a60`. Forest greens.
- **Motion language:** Organic, flowing. Slower reveals. Vertical drift.
- **Typography treatment:** Savate with more italic. Relaxed tracking.
- **Photography style:** Natural landscapes, dirt paths, weathered textures. Warm light.
- **Interaction style:** Parallax depth (light). Scroll-driven reveals. Cursor becomes a leaf/needle.

**3. Technical**
- **Color language:** `#1a1a1a` text on `#f0f0f0` bg. Neon accent `#c4a35a`. Utility yellows.
- **Motion language:** Precise, mechanical. Stepped animations. Grid-based.
- **Typography treatment:** Mono-spaced accents. Savate for headlines, Geist Mono for labels.
- **Photography style:** Studio lit, white background, precise angles. Clean lines.
- **Interaction style:** Haptic confirmation. Grid snap. Cursor becomes a crosshair.

**4. Future**
- **Color language:** `#0a0a0a` text on `#111111` bg. Electric gold `#ffd700`. Graphite.
- **Motion language:** Glitch, scanline, pixel sort. Fast cuts.
- **Typography treatment:** Mixed Savate + monospace. Data readouts.
- **Photography style:** Neon-lit, fog, holographic textures. Cyber-natural.
- **Interaction style:** Drag-to-explore. Tilt-based 3D. Cursor becomes a reticle.

### Motion Specification
- **World entrance:** Collection landing page loads with a world-specific entrance:
  - Urban: Hero text slides in from left. Image slides in from right. 0.5s.
  - Trail: Hero image fades in slowly (1s). Text drifts up from `translateY(60px)`.
  - Technical: Grid lines draw themselves (`scaleX(0) -> scaleX(1)`). Content snaps into cells.
  - Future: Screen "glitches" for 200ms, then resolves into the layout.
- **World transition:** When switching collections, a brief brand-colored wipe occurs, then the new world's entrance plays.
- **Ambient:** Each world has a unique ambient background effect:
  - Urban: Subtle noise texture (existing).
  - Trail: Slow-moving fog gradient.
  - Technical: Fine grid lines that pulse on hover.
  - Future: Subtle scanline overlay and occasional pixel-sort flicker.

### Technical Implementation Approach
- Each collection world is defined by a config object:
  ```js
  const worlds = {
    urban: { colors: {}, motion: {}, cursor: 'compass', ambient: null },
    trail: { colors: {}, motion: {}, cursor: 'leaf', ambient: 'fog' },
    // ...
  };
  ```
- The active world is determined by the current route (`/collections/urban`).
- A `WorldProvider` wraps the app and applies CSS custom properties and cursor mode on route change.
- Ambient effects are lightweight CSS/SVG overlays, not WebGL (except Future, which can use a tiny canvas shader).
- Photography style is achieved through CSS `filter` presets applied to collection images.

### Accessibility Considerations
- Future world scanlines must not cause seizures. Flicker frequency < 3Hz. Prefer static noise.
- All worlds must maintain WCAG AA contrast. Future world's electric gold on dark must be checked.
- `prefers-reduced-motion:` All world-specific motion is disabled. Standard motion only.
- Screen readers: Announce the world name on entry. "Urban collection. 24 products."

### Performance Considerations
- World configs are static imports. No runtime computation.
- Ambient effects must not run `requestAnimationFrame` loops when off-screen or when the user has been inactive for 10s.
- Fog and scanline effects should be CSS-based where possible. If canvas is used, cap at 30fps on low-end devices.
- Do not preload all world assets. Load only the active world's CSS and images.

### Mobile Behavior
- World entrance is simplified: cross-fade + text slide only.
- Ambient effects are disabled (save battery).
- Collection landing page is a vertical stack: hero image, headline, product grid.
- Swipe between worlds from a bottom-tab navigator on the collection page.

### Desktop Behavior
- Full world experience with ambient effects, custom cursors, and choreographed entrances.
- Collection landing page can have pinned hero sections or scroll-driven storytelling.
- Hovering the collection nav reveals a preview thumbnail of each world.

---

## ADDITION 9: DYNAMIC PRODUCT AMBIENCE

### Purpose
Create a system where each product page subtly adapts its ambient environment — background gradients, lighting tone, and particle density — based on the product's dominant color and category.

### User Experience Impact
- Makes every product page feel handcrafted rather than templated.
- Reinforces product identity: warm products feel warm; technical products feel clinical.
- Creates a subconscious emotional alignment between the product and the user.
- Increases perceived value because the presentation is bespoke.

### Portfolio Impact
- Dynamic ambience systems are rare outside of Apple and luxury brands.
- Demonstrates generative design thinking and runtime visual adaptation.
- Shows ability to extract data from images and translate it into UI mood.
- Generates beautiful, unique screenshots for every product.

### Visual Design Specification
- **Ambient background:** A slow-moving gradient mesh behind the product image area. Colors are derived from the product image's top 3 dominant colors, blended into the brand cream base.
- **Examples:**
  - Sand/beige product: Warm peach-to-cream gradient.
  - Black/charcoal product: Cool graphite-to-cream gradient.
  - Olive/technical product: Muted sage-to-cream gradient.
- **Intensity:** Extremely subtle. The product image must remain the focal point. Ambient opacity max: 0.4.
- **Product image treatment:** Slight color cast matching the ambient tone (CSS `filter: hue-rotate()` or `sepia()`), applied at 10% intensity.
- **Typography adaptation:** For dark products, the section labels can shift to a slightly darker gold (`#a08440`) to maintain harmony.

### Motion Specification
- **Gradient drift:** The gradient mesh shifts its focal points over 20s. Uses CSS `@keyframes` animating `background-position`.
- **On load:** The ambient gradient fades in over 1s after the product image settles.
- **On product switch (quick view):** Ambient crossfades to the new product's palette over 800ms.
- **Particle density:** Very subtle floating dust particles in the hero area (optional, for Trail/Future worlds). 10–15 particles, slow drift, low opacity.

### Technical Implementation Approach
- **Color extraction:** On build or upload, extract dominant colors using a Node.js script with `node-vibrant` or `sharp`. Store hex values in the product database.
- **Runtime gradient:** A reusable `<AmbientGradient colors={['#e8ddd0', '#f5efe6', '#d4c4a8']} />` component that generates a `linear-gradient` string.
- **CSS-only:** The gradient is a single `<div>` with `position: absolute`, `z-index: -1`, and `animation: drift 20s infinite alternate`.
- **No WebGL needed.** This is achievable with layered CSS gradients and opacity.
- For advanced cases (Future world), a tiny `<canvas>` shader can render a shifting mesh. But default to CSS.

### Accessibility Considerations
- `prefers-reduced-motion:` Gradient drift is paused. Static gradient remains.
- Color contrast between text and ambient background must always pass WCAG AA. The ambient layer is behind all text; text sits on solid or semi-transparent white.
- Screen readers: Ambient effects are decorative. No announcements needed.
- Epilepsy safety: No rapid color changes. Gradients shift over 20s minimum.

### Performance Considerations
- CSS gradients are GPU-composited and cost almost nothing.
- Color extraction is a build-time step, not runtime.
- Do not run particle simulations on every PDP. Reserve them for high-end devices only.
- If using canvas, use `will-change: transform` on the canvas element and cap frame rate.

### Mobile Behavior
- Ambient is a static gradient. No drift animation (battery).
- No particles.
- Product image color cast is disabled. Keep images true to life on small screens.

### Desktop Behavior
- Full ambient experience: drifting gradient, subtle color cast, optional particles.
- On wide screens (>1600px), the ambient gradient extends slightly beyond the image container, creating a "glow" effect.

---

## ADDITION 10: ENGINEERING SHOWCASE PAGE

### Purpose
Create a dedicated `/engineering` page that documents the architecture, design system, accessibility, performance, and motion principles behind the site. Goal: impress recruiters and senior engineers.

### User Experience Impact
- Establishes trust with technical users. Transparency about build quality is a trust signal.
- Serves as a reference for future maintainers.
- Positions the brand as engineering-forward, not just design-forward.
- Can be linked from job applications as a "how it is built" companion.

### Portfolio Impact
- This is the "recruiter wow" page. It turns a design portfolio into a technical portfolio.
- Demonstrates ability to communicate complex technical decisions clearly.
- Shows metrics (Lighthouse, bundle size, accessibility score) — proof, not claims.
- Separates junior "I made a website" from senior "I engineered a system."

### Visual Design Specification
- **Layout:** Editorial, single-page scroll. Sections separated by large whitespace.
- **Sections:**
  1. Architecture: Tech stack diagram (React, Vite, Tailwind, GSAP, etc.).
  2. Design System: Live component gallery with code snippets.
  3. Accessibility: WCAG checklist, focus state demos, screen reader testing notes.
  4. Performance: Lighthouse score display (real data), bundle analysis chart, Core Web Vitals.
  5. Motion Principles: The motion token table with live demos. Interactive easing curves.
  6. Responsive Strategy: Breakpoint behavior illustrated with device frames.
  7. Open Source / Credits: Tools used, inspirations, shoutouts.
- **Typography:** Same system as the main site. No deviation.
- **Code snippets:** Syntax-highlighted with a minimal theme matching the brand colors (cream background, dark text, gold comments).
- **Metrics:** Big, bold numbers for Lighthouse scores. Animated counters on scroll.

### Motion Specification
- **Metric counters:** Animate from 0 to target value (e.g., 98) over 1.5s when scrolled into view.
- **Code reveal:** Code blocks type out line-by-line on scroll (decorative, not functional).
- **Diagram draw:** SVG paths in the architecture diagram self-draw (`stroke-dashoffset` animation) over 2s.
- **Section reveals:** Standard `translateY(40px)` + `opacity` reveal, 600ms.
- **Interactive demos:** Easing curve graphs update in real-time as the user drags control points.

### Technical Implementation Approach
- This page is static content. No API calls.
- Use a code-highlighting library like `prism-react-renderer` with a custom theme.
- Lighthouse scores: generate a `lighthouse.json` at build time via CI and import it.
- Bundle analysis: embed the existing `stats.html` or a simplified treemap SVG.
- Interactive easing: a small canvas or SVG component where users drag handles and see the curve + a bouncing ball demo.
- Build this page LAST. It references the actual system, so it can only be accurate once the system exists.

### Accessibility Considerations
- This page must be MORE accessible than the rest of the site. It is a showcase of your standards.
- All code snippets have a "Copy" button with visible focus.
- All diagrams have `aria-label` descriptions.
- Color contrast must be perfect. No exceptions.
- `prefers-reduced-motion:` Code typing and diagram draw are instant.

### Performance Considerations
- Do not load syntax highlighting on every page. Lazy-load the Prism component only on `/engineering`.
- Do not embed heavy chart libraries. Use lightweight SVG for the bundle treemap.
- Keep the page under 200KB total. It is a text page.
- Use `loading="lazy"` for any images/diagrams below the fold.

### Mobile Behavior
- Single-column layout. Code snippets are horizontally scrollable within a container.
- Metrics are stacked vertically. Numbers are still large and bold.
- Architecture diagram is simplified to a vertical flow.

### Desktop Behavior
- Two-column layout for sections with text + visual side-by-side.
- Code blocks are wider and more readable.
- Interactive easing demo is fully usable with mouse drag.
- A "Print" stylesheet allows recruiters to print a clean PDF of the page.

---

## ADDITION 11: PREMIUM SEARCH EXPERIENCE

### Purpose
Transform search from a utilitarian input into a product feature that feels as polished as Linear, Arc Browser, or Apple Spotlight. Search should be fast, predictive, beautiful, and effortless.

### User Experience Impact
- Reduces time-to-product. Users find what they want in seconds, not page loads.
- Surfaces discovery: trending and recent searches push users toward popular or previously viewed items.
- Keyboard-first navigation makes power users feel at home.
- Elegant animations make the act of searching feel rewarding, not mechanical.

### Portfolio Impact
- Search UI is a common interview topic. A premium implementation demonstrates command over complex interaction states.
- Shows ability to balance speed (instant results) with polish (animations).
- Keyboard navigation and focus management are senior-level skills rarely shown in portfolios.
- Recruiters use search to test a site's attention to detail.

### Visual Design Specification
- **Trigger:** Clicking the search icon or pressing `Cmd/Ctrl + K` opens a centered modal overlay.
- **Modal:** Rounded 16px container, `#ffffff` background, subtle shadow, max-width 720px. It floats over a blurred dimmed backdrop (`backdrop-filter: blur(8px)`).
- **Input:** Large, prominent. `text-xl`, no border, bottom hairline only. Gold caret. Placeholder: "Search products, collections, materials..."
- **Results layout:**
  - **Products:** Thumbnail (48px), name, price, category tag. Grouped under "Products".
  - **Collections:** Larger card with image, name, product count.
  - **Recent searches:** Pills below the input. Tappable/clickable.
  - **Trending searches:** Same style as recent, but with a small flame icon.
  - **Predictive suggestions:** Inline autocomplete in the input (ghost text). `Tab` accepts.
- **Empty state:** "No results for 'xyz'" with 3 suggested related products.
- **Selected item:** Blue/gold left border (`#c4a35a`, 3px) on active result. Background shifts to `rgba(196,163,90,0.05)`.

### Motion Specification
- **Modal open:** Backdrop fades in (200ms). Modal scales from `0.96` to `1.0` and fades in. Duration: 300ms. Ease: `ease-out-expo`.
- **Input focus:** The bottom hairline expands from center (`scaleX(0) -> scaleX(1)`), 300ms, gold color.
- **Results appear:** First result group slides down from `translateY(-10px)`, opacity 0 -> 1. Stagger between groups: 50ms. Duration: 250ms.
- **Typing feedback:** Each keystroke causes a subtle micro-flash on the input border (gold, 100ms).
- **Selection change:** Active result background transitions over 100ms. Left border draws (`scaleY(0) -> scaleY(1)`), 200ms.
- **Modal close:** Reverse of open. Input loses focus. Backdrop fades out.

### Technical Implementation Approach
- **State management:** `SearchProvider` with `isOpen`, `query`, `results`, `recentSearches`, `selectedIndex`.
- **Search index:** Build a local search index at build time using `fuse.js` or `minisearch`. Load it as a static JSON. No backend search needed for this scale.
- **Keyboard handling:**
  - `Cmd/Ctrl + K`: Open.
  - `Esc`: Close.
  - `ArrowUp/Down`: Navigate results.
  - `Enter`: Select active result.
  - `Tab`: Accept ghost autocomplete.
- **Debouncing:** 50ms debounce on input. Results update instantly for short queries.
- **Recent searches:** Persist to `localStorage`. Show last 5. Deduplicated.
- **Trending:** Static list updated manually per season, or computed from mock analytics.

### Accessibility Considerations
- Modal traps focus. Tab cycles through input, recent pills, results, close button.
- Screen reader: announce result count on every change. "3 products found."
- `aria-activedescendant` on the input pointing to the selected result.
- `prefers-reduced-motion:` Modal appears instantly. Results appear instantly. Selection is instant.
- Input has a visible label (sr-only): "Search products and collections."

### Performance Considerations
- Search index is a static JSON import (< 100KB). Parsed once on app load.
- `fuse.js` is ~10KB gzipped. Acceptable. Or use `minisearch` (~6KB) for faster init.
- Results are rendered from local state. No network delay.
- Throttle result re-renders to `requestAnimationFrame`.
- Do not run search on every keystroke if the index is large. Use 50ms debounce.

### Mobile Behavior
- Modal is full-screen, not centered. Input is at the top with a large touch target.
- Results are a vertical stack. Recent searches are horizontally swipeable pills.
- Keyboard opens automatically when modal opens.
- Swipe down on the modal to close (gesture).

### Desktop Behavior
- Centered floating modal. Backdrop blur.
- Ghost autocomplete text appears to the right of the cursor in lighter gray.
- Hovering a result highlights it; keyboard navigation overrides hover.
- Recent searches are clickable pills below the input.

---

## ADDITION 12: CONNECTED PRODUCT JOURNEY

### Purpose
Design the entire user flow — Homepage -> Collection -> Product -> Cart -> Checkout — as one continuous, spatially coherent experience. Users should never feel like they entered a new website.

### User Experience Impact
- Reduces cognitive load. Users always understand where they are in the journey.
- Reinforces trust. A coherent experience feels more professional and secure.
- Increases conversion by reducing drop-off at transition points.
- Creates a sense of momentum: once users start, they glide to checkout.

### Portfolio Impact
- Journey design is a high-level UX skill rarely demonstrated in code portfolios.
- Shows ability to think in flows, not just pages.
- Spatial continuity (FLIP, shared elements) is a frontend craft signal.
- Interviewers will ask "How did you keep the experience continuous?" This section answers before they ask.

### Visual Design Specification
- **Shared elements:** The cart icon, product image, and price should feel like the SAME element moving across contexts, not separate instances.
- **Breadcrumb system:** Minimal, but always present except on homepage. `Home / SS25 / Trail / Terra Boot`. Uses slashes, not arrows.
- **Page identifiers:** Each page has a subtle background tint shift (5% difference) to signal context without changing the brand:
  - Home: `#f5efe6`
  - Collection: `#f0ebe3`
  - Product: `#f5efe6`
  - Cart/Checkout: `#ffffff` (clean, focused)
- **Progress indicator (checkout only):** A thin top bar showing steps: Cart -> Shipping -> Payment -> Confirm. Gold fill indicates progress.
- **Persistent elements:**
  - Nav is always present but compresses on scroll (smaller logo, compact links).
  - Cart icon is always visible. Its badge animates on every add.
  - Footer is consistent across all pages.

### Motion Specification
- **Homepage -> Collection:** Hero image from homepage crossfades into the collection hero. The "Explore" CTA morphs into the collection title.
- **Collection -> Product:** FLIP transition (Addition 1). The product card image expands into the PDP hero.
- **Product -> Cart:** "Add to Kit" triggers the Kit Fly animation. The product image arcs to the cart icon. Cart drawer slides in from the right with a subtle bounce.
- **Cart -> Checkout:** The cart drawer morphs into the checkout page layout. Items slide up into the order summary. The rest of the page fades in around them.
- **Checkout -> Confirmation:** A celebratory sequence. The progress bar completes with a gold flash. A checkmark draws itself. Order details fade in with stagger.
- **Back navigation:** Reverse the forward transition. Product image shrinks back to its card position.

### Technical Implementation Approach
- Use a global `JourneyProvider` that tracks:
  - Current page context (home, collection, product, cart, checkout).
  - Direction of navigation (forward or back).
  - Shared element IDs for FLIP transitions.
- Store transition state in URL params or session state so back/forward buttons work correctly.
- Each major transition is a composed animation:
  ```js
  const transitions = {
    'shop->product': playFlipTransition,
    'product->cart': playKitFlyTransition,
    'cart->checkout': playMorphTransition,
  };
  ```
- Use `SharedElement` component wrappers around elements that persist across pages (product image, cart badge).
- Layout animation: on route change, use `AnimatePresence` (or GSAP timeline) to orchestrate exit and enter animations with overlap.

### Accessibility Considerations
- `prefers-reduced-motion:` All spatial transitions are disabled. Standard instant navigation applies.
- Screen readers: Announce page changes. "Collection page. 24 products." Focus moves to the page heading.
- Keyboard users: Tab order is preserved across transitions. Focus does not get lost in the animation.
- The progress indicator in checkout uses `aria-valuenow` and `role="progressbar"`.

### Performance Considerations
- Preload the next likely page. When hovering a product card, preload its PDP in the background (React.lazy with prefetch).
- Do not block navigation on animation. Start the route change immediately; animate the DOM update.
- Use `will-change` sparingly and remove it after transitions complete.
- Keep transition JS under 5KB. It runs on every navigation.

### Mobile Behavior
- Spatial transitions are simplified. Use native-feeling slide transitions:
  - Forward: push from right.
  - Back: pop to left.
- Kit Fly is replaced by a haptic vibration + cart badge bounce.
- Checkout progress bar is sticky at the top of the viewport.

### Desktop Behavior
- Full FLIP and morph transitions.
- Hovering a nav item previews the destination page's background tint (subtle, 100ms).
- Cursor changes to indicate journey direction: forward = arrow right, back = arrow left.

---

## ADDITION 13: DESIGN SYSTEM SHOWCASE

### Purpose
Create a public `/design-system` page that documents the entire visual and interaction language of the site. It serves as both a team reference and a portfolio piece demonstrating systems thinking.

### User Experience Impact
- Establishes the brand as serious and scalable.
- Helps future contributors understand how to extend the site without breaking consistency.
- Shows users (especially technical ones) that the experience is intentional, not accidental.
- Can be shared as a case study: "Here is the system behind the site."

### Portfolio Impact
- Design system pages are the gold standard for senior frontend portfolios.
- Demonstrates ability to abstract components, define tokens, and document decisions.
- Shows you can speak the language of design ops and design engineering.
- Recruiters from top companies (Stripe, Linear, Vercel) specifically look for this.

### Visual Design Specification
- **Layout:** Sidebar navigation (sticky) + main content area. Sidebar links to sections: Colors, Typography, Spacing, Motion, Components, Tokens.
- **Colors:**
  - Live swatches for all brand colors. Each swatch shows hex, RGB, usage rule, and WCAG contrast against light and dark.
  - Seasonal color variations shown as alternate tabs.
- **Typography:**
  - Live type specimens for Savate (display) and Inter/Geist (UI).
  - All weights, sizes, and line-heights shown at actual scale.
  - Pairing examples: headline + body combinations.
- **Spacing:**
  - Visual scale from 4px to 128px. Each step shown as a rectangle.
  - Usage examples: card padding, section margins, grid gaps.
- **Motion:**
  - Live demos of every easing curve. A ball bounces with the selected ease.
  - Duration scale: instant, fast, normal, slow, ambient.
  - Playground: adjust duration and ease, see the result live.
- **Components:**
  - Every component in its default, hover, active, focus, disabled, and loading states.
  - Product card, size selector, CTA button, input, modal, toast, badge.
  - Each component has a "View Code" toggle revealing the React + Tailwind implementation.
- **Tokens:**
  - A table of all CSS custom properties and their values.
  - Copy-to-clipboard for each token.

### Motion Specification
- **Section entrance:** Same `translateY(40px)` + `opacity` as the main site. Consistency reinforces the system.
- **Color swatch hover:** Swatch scales to 1.05, hex code fades in below.
- **Component state toggles:** When a user clicks "Focus," the component immediately shows its focus state with a smooth transition.
- **Code reveal:** Code block slides down (`scaleY(0) -> scaleY(1)`), 300ms.
- **Live demo updates:** When a user changes a token in the playground, affected components update instantly with a 200ms transition.

### Technical Implementation Approach
- This page consumes the ACTUAL design system used by the site. It is not a separate build.
- Import tokens from `src/styles/tokens.css` or `tailwind.config.js`.
- Import components from `src/components/` and render them in isolation.
- Use a simple router or anchor links for sidebar navigation (`#colors`, `#typography`).
- Code snippets: read the component source file at build time (Vite plugin or raw import) and display it.
- Token playground: wrap components in a controlled wrapper that overrides CSS variables via inline styles.

### Accessibility Considerations
- The design system page must be exemplary. No accessibility shortcuts allowed.
- All interactive demos have keyboard-accessible controls.
- Color swatches include contrast ratios computed in real-time.
- Motion playground respects `prefers-reduced-motion` by defaulting to instant transitions.
- Sidebar is keyboard-navigable with visible focus states.

### Performance Considerations
- Do not load the design system page bundle on the main site. Code-split it (`React.lazy`).
- Component demos should not mount heavy logic (e.g., do not run a real product carousel; render a static version).
- Keep code block rendering lightweight. Do not run full syntax highlighting on the client for every block. Pre-render at build.
- Lazy-load below-the-fold sections.

### Mobile Behavior
- Sidebar becomes a top horizontal scroll or a collapsible menu.
- Component demos are stacked vertically. Touch targets are >= 44px.
- Token playground is simplified: pick from presets, not freeform inputs.

### Desktop Behavior
- Sticky sidebar with smooth scroll to sections.
- Component demos can be shown side-by-side with their code.
- Token playground allows real-time adjustment of any token with sliders and color pickers.
- A "Download Tokens" button exports a JSON of all current values.

---

## ADDITION 14: MICRO PHYSICS SYSTEM

### Purpose
Define a consistent, physics-based interaction language that makes every element feel tangible and responsive. Every button press, card lift, and drawer motion should obey the same physical rules.

### User Experience Impact
- Creates subconscious trust. Consistent physics makes the interface feel "real" and reliable.
- Provides satisfying feedback for every action. Users feel the system responding to them.
- Reduces learning curve: once users feel one interaction, they know how all others will behave.
- Elevates perceived quality from "website" to "native app."

### Portfolio Impact
- Physics systems demonstrate deep animation knowledge beyond simple CSS transitions.
- Shows understanding of spring dynamics, damping, mass, and stiffness.
- Recruiters at motion-focused companies (Meta, Apple, Stripe) value this craft.
- A "Micro Physics" section in a portfolio is instantly memorable.

### Visual Design Specification
Define the physics constants for the brand:

```js
const physics = {
  spring: { stiffness: 300, damping: 25, mass: 1 },        // Bouncy, responsive
  gentle: { stiffness: 120, damping: 20, mass: 1 },        // Smooth, luxurious
  snappy: { stiffness: 500, damping: 30, mass: 0.8 },    // Fast, tactile
  heavy:  { stiffness: 80,  damping: 15, mass: 2 },        // Weighty, premium
};
```

Apply these to:
- **Card lift:** `spring` on hover. Card lifts `translateY(-8px)` with a slight overshoot and settle.
- **Button press:** `snappy`. Button compresses `scale(0.96)` instantly, springs back on release.
- **Cart bounce:** `spring`. When an item is added, the cart icon bounces `scale(1.2) -> scale(1.0)` with overshoot.
- **Badge flip:** `snappy`. Cart count badge does a 3D Y-axis flip (`rotateY(0) -> rotateY(90) -> rotateY(0)`) when the number changes.
- **Drawer momentum:** `gentle`. Cart drawer slides in with a slight anticipation (moves backward 10px, then springs forward).
- **Scroll settle:** `gentle`. After a scroll gesture ends, the scroll position settles with a slight inertia (on supported elements like carousels).

### Motion Specification
- **Springs over easings:** Wherever possible, replace fixed-duration easings with spring physics. Springs feel alive; easings feel robotic.
- **Velocity awareness:** If a user flicks a carousel, the spring should inherit the flick velocity and decay naturally.
- **No instant state changes:** Every visual change must travel through a transition, even if it is 50ms. Zero frames of instant jumping.
- **Rest position:** All springs must settle to a clean pixel value (no subpixel jitter). Round final values to 1px.

### Technical Implementation Approach
- Use `framer-motion` for React spring physics. It handles velocity, gestures, and layout animations natively.
- Or use `react-spring` for lower-level control.
- Define the physics tokens in a single file and import them everywhere:
  ```js
  import { spring, gentle, snappy, heavy } from '@/motion/physics';
  // Usage: <motion.div animate={{ y: -8 }} transition={spring} />
  ```
- For non-React elements (canvas, vanilla JS), replicate the same constants with a tiny spring solver:
  ```js
  function springPhysics({ stiffness, damping, mass }, from, to) { /* rAF loop */ }
  ```
- Use `layout` prop in framer-motion for automatic layout transitions (e.g., when a comparison column is removed and others resize).

### Accessibility Considerations
- `prefers-reduced-motion:` All springs become simple `ease-out` transitions with duration capped at 200ms. No overshoot. No bounce.
- Do not use physics for essential state changes. The "Added" state of a button must be readable even if the spring is mid-animation.
- Screen readers: Physics is visual-only. No audio feedback needed unless paired with the Sound Engine.

### Performance Considerations
- Springs run on `requestAnimationFrame`. Do not start more than 5 concurrent spring animations.
- Use `framer-motion`'s `LazyMotion` feature to tree-shake unused animation features.
- Avoid spring animations on scroll-driven elements. Springs are for discrete interactions, not continuous scroll.
- On low-end devices, detect frame drops and switch to simple CSS transitions automatically.

### Mobile Behavior
- Touch gestures (swipe, drag) should use the same spring constants as desktop hover interactions. Consistency is key.
- Haptic feedback (`navigator.vibrate`) on button press and cart add replaces the visual spring on devices that support it.
- Badge flip is replaced by a simple scale pulse on mobile (performance).

### Desktop Behavior
- Full spring physics on all interactions.
- Hover physics are subtle. A card spring on hover should not feel like it is "boinging." Keep stiffness >= 120 for hover.
- Drawer momentum is more pronounced on desktop because screen real estate allows for dramatic motion.

---

## ADDITION 15: THE HOLY SH*T MOMENT

### Purpose
Design ONE unforgettable signature experience that defines the brand and becomes the talk of every user, recruiter, and design award judge. It must be technically impressive, genuinely useful, and impossible to ignore.

---

### CONCEPT 1: THE "KIT ASSEMBLY" RITUAL

**Concept:** When a user completes checkout, they do not just see a confirmation screen. They see their products "assemble" into a physical kit — items fly from the cart and slot into a virtual duffel bag or backpack. The bag zips. A tag is printed with their order number. The bag is placed on a shelf labeled with their name.

- **Why users remember it:** It turns a boring transaction end into a celebration. They feel like they have prepared for a journey.
- **Why recruiters remember it:** It demonstrates complex timeline animation, SVG manipulation, state orchestration, and storytelling.
- **Why it fits the brand:** "Precision for the Unplanned." The kit is the metaphor for preparedness.
- **Technical complexity:** High. Requires GSAP timeline, SVG path animation, FLIP for cart items, and canvas or SVG for the bag.
- **Portfolio impact:** Extremely high. People will share this.

---

### CONCEPT 2: THE "LIVING CATALOG"

**Concept:** The shop page is not a grid. It is a topographic map. Products are positioned as waypoints on a terrain. Zooming in reveals the product details. The terrain shifts from Urban (concrete) to Trail (dirt) to Technical (grid) based on the active filter. Pan and zoom like Google Maps, but for products.

- **Why users remember it:** No other ecommerce site browses like a map. It is intuitive for spatial thinkers.
- **Why recruiters remember it:** Canvas/WebGL rendering, zoom logic, viewport culling, and gesture handling.
- **Why it fits the brand:** "Engineered for the unplanned." The map is the journey.
- **Technical complexity:** Very High. Requires WebGL or Canvas 2D, spatial indexing, and gesture math.
- **Portfolio impact:** Extremely high. Unique and technically ambitious.

---

### CONCEPT 3: THE "MATERIAL TIME MACHINE"

**Concept:** On a product page, users can scrub through a timeline to see how the material ages. A slider shows Day 1, Day 30, Day 365. The product image subtly shifts: creases form, color deepens, texture roughs. Uses a shader or carefully staged photography with crossfade.

- **Why users remember it:** It answers the question "How will this look after a year?" No other site shows aging.
- **Why recruiters remember it:** Image morphing, shader programming, or precision crossfade staging.
- **Why it fits the brand:** Durability and longevity are core values.
- **Technical complexity:** Medium-High. Can be done with CSS crossfade on pre-staged images.
- **Portfolio impact:** High. It is useful AND visually stunning.

---

### CONCEPT 4: THE "AUGMENTED SIZE ROOM"

**Concept:** A virtual fitting room. Users upload a photo of their foot (for shoes) or enter height/weight. The product page renders a 3D model or AR view scaled to their dimensions. A silhouette shows fit: tight, perfect, loose.

- **Why users remember it:** Solves the #1 ecommerce problem: "Will it fit?"
- **Why recruiters remember it:** 3D/AR integration, image processing, or canvas scaling logic.
- **Why it fits the brand:** Precision. The brand promises the right fit for the journey.
- **Technical complexity:** Very High. Requires 3D models (GLB), Three.js, or ARKit/WebXR.
- **Portfolio impact:** High, but risky if it does not work perfectly.

---

### CONCEPT 5: THE "SOUND OF THE PRODUCT"

**Concept:** Each product page has a "Listen" button. Clicking it plays the sound of the material: leather creaks, sole hits pavement, zipper slides, rain on fabric. Recorded in a studio. Pure ASMR.

- **Why users remember it:** Sensory ecommerce. No one else does this at this level.
- **Why recruiters remember it:** Audio engineering integration and content strategy.
- **Why it fits the brand:** Tactile precision. The brand cares about every detail, including sound.
- **Technical complexity:** Low-Medium. Record audio, serve files, build a player UI.
- **Portfolio impact:** Medium-High. Unique and charming, but not technically deep.

---

### CONCEPT 6: THE "INFINITE SCROLL JOURNEY"

**Concept:** As the user scrolls through the shop, the page transforms. The first 10 products are on a city street. The next 10 are on a forest trail. The next 10 are in a lab. The background scrolls slower than the products, creating a parallax journey through the brand worlds.

- **Why users remember it:** The shop becomes a story. Users scroll to see what world comes next.
- **Why recruiters remember it:** Scroll-driven animation, background layer management, and narrative pacing.
- **Why it fits the brand:** Each collection is a world, and the shop stitches them together.
- **Technical complexity:** Medium. CSS parallax + scroll-driven image swaps.
- **Portfolio impact:** High. Visually striking and screenshot-worthy.

---

### CONCEPT 7: THE "PRODUCT DNA HELIX"

**Concept:** A 3D double-helix visualization on the PDP. Each "rung" of the helix is a product attribute (material, weight, origin, warranty). Users rotate the helix by dragging. Clicking a rung expands it into a detail card.

- **Why users remember it:** It makes specs feel like science. Geeky and cool.
- **Why recruiters remember it:** Three.js, React Three Fiber, 3D math, and interaction design.
- **Why it fits the brand:** Technical precision. Products are engineered, and the helix is engineering made visual.
- **Technical complexity:** High. Requires 3D rendering knowledge.
- **Portfolio impact:** Very high. 3D in ecommerce portfolios is rare.

---

### CONCEPT 8: THE "GESTURE CHECKOUT"

**Concept:** Checkout is not a form. It is a gesture flow. Step 1: Swipe right to confirm shipping. Step 2: Draw a checkmark to confirm payment. Step 3: Swipe up to "launch" the order. Each gesture triggers a satisfying animation.

- **Why users remember it:** Checkout is usually painful. This makes it fun.
- **Why recruiters remember it:** Gesture recognition, canvas drawing, and radical UX rethinking.
- **Why it fits the brand:** Speed and confidence. The user is ready to go.
- **Technical complexity:** Medium. Hammer.js or custom touch handlers + canvas.
- **Portfolio impact:** Medium-High. Risky if usability suffers.

---

### CONCEPT 9: THE "COLLECTION FILM"

**Concept:** A full-screen, autoplaying (muted) cinematic film on the homepage. Not a slider — a single 45-second loop. The film shows a protagonist walking through all four worlds (Urban, Trail, Technical, Future). Products are worn naturally. At the end, the film freezes on a frame and the CTA appears: "Find Your World."

- **Why users remember it:** It is a brand film, not a banner. Emotional and cinematic.
- **Why recruiters remember it:** Video integration, performance optimization, and editorial design.
- **Why it fits the brand:** The brand is about journeys. The film is the journey.
- **Technical complexity:** Medium. Video compression, lazy loading, and mobile fallback.
- **Portfolio impact:** High. Cinematic homepages are Awwwards bait.

---

### CONCEPT 10: THE "LIVE WEATHER PRODUCT"

**Concept:** The product page shows the product in the user's current weather. If it is raining, the hero image has a rain overlay and the copy says "Built for this." If it is hot, the image is bright and the copy says "Engineered for 40°C." Uses geolocation + weather API.

- **Why users remember it:** Context-aware personalization at the product level.
- **Why recruiters remember it:** API integration, real-time personalization, and creative data usage.
- **Why it fits the brand:"*"Engineered for the unplanned." Weather is unplanned. The product is ready.
- **Technical complexity:** Low-Medium. Weather API + conditional image overlay.
- **Portfolio impact:** Medium. Clever and useful, but not visually explosive.

---

### RECOMMENDATION: CONCEPT 1 — THE "KIT ASSEMBLY" RITUAL

**Why this wins:**
1. **Useful:** It celebrates the purchase, increasing customer satisfaction and brand loyalty.
2. **Memorable:** Users will screenshot it and share it.
3. **Technically impressive:** Multi-element choreography, SVG, FLIP, and timeline control.
4. **Brand-defining:** The "kit" metaphor is core to the brand voice.
5. **Safe:** It happens AFTER conversion. It cannot hurt checkout flow or usability.
6. **Portfolio gold:** It is the single clip every recruiter will watch.

**Implementation approach:**
- On checkout success, render a fullscreen overlay.
- GSAP timeline:
  1. Cart items fly from the right into center screen (FLIP from their cart positions).
  2. A backpack SVG unzips (SVG path animation).
  3. Items shrink and slot into the bag.
  4. Bag zips.
  5. A tag slides out with the order number.
  6. Bag fades to a shelf labeled "Your Kit."
  7. "Track Your Order" CTA fades in.
- Duration: 4–5 seconds. Skippable via click or Esc.
- Mobile: Simplified version. Items stack into the bag. No complex SVG path animation.

---

# PHASE 3: INTEGRATED SYSTEMS UPDATE

---

## 1. UPDATED ROADMAP

The project now follows a 6-phase implementation:

### Phase 1: Foundation (Week 1)
1. Remove `cursor: none` from body. Implement contextual CSS cursor.
2. Remove text scramble, magnetic buttons, JS parallax.
3. Unify backgrounds to `#f5efe6` + white.
4. Remove 80% of borders. Use whitespace.
5. Fix typography: ban `vw`, bump labels to 12px.
6. Replace infinite scroll shop with responsive grid.
7. Make mobile CTAs always visible.
8. Implement `SeasonProvider` and CSS token architecture.

### Phase 2: Core Motion (Week 2)
1. Implement "Unfold" page transition.
2. Implement "Kit Fly" Add to Cart animation.
3. Implement "Contour Line" loading bar.
4. Implement "Press" button states.
5. Implement "Ghost" input focus.
6. Improve marquee to real brand copy, slow speed.
7. Implement Micro Physics System (spring constants).

### Phase 3: Product Experience (Week 3)
1. Redesign PDP: image gallery, size pills, trust strip.
2. Implement "Image Breathe" ambient animation.
3. Implement "Size Breath" hover interaction.
4. Add AI size assistant modal.
5. Add express checkout to checkout page.
6. Implement Dynamic Product Ambience.
7. Add Material Inspection System.

### Phase 4: Signature Features (Week 4)
1. Implement Product -> PDP FLIP Transition.
2. Add Interactive Lookbook.
3. Implement Storytelling Product Pages.
4. Implement Premium Search Experience.
5. Implement Connected Product Journey orchestration.

### Phase 5: Worlds & Comparison (Week 5)
1. Implement Collection Worlds (Urban, Trail, Technical, Future).
2. Implement Product Comparison Mode.
3. Implement Seasonal Theme Engine with full visual shifts.
4. Add gesture-based carousels and physics-driven interactions.

### Phase 6: Polish & Showcase (Week 6)
1. Implement Premium Sound Design (opt-in, Web Audio API).
2. Add Kit Assembly Ritual (The Holy Sh*t Moment).
3. Build Engineering Showcase page (`/engineering`).
4. Build Design System Showcase page (`/design-system`).
5. Performance audit: 60fps on low-end mobile.
6. Implement `prefers-reduced-motion` fallbacks for all animations.
7. Brand copy rewrite: "Precision for the Unplanned."
8. Lighthouse target: 95+ Performance, 100 Accessibility, 100 Best Practices.

---

## 2. UPDATED MOTION SYSTEM

### Expanded Principles
1. **Purpose first:** Every animation answers "What is this communicating?"
2. **Speed is premium:** Fast, snappy animations feel expensive.
   - Micro-interactions: 150–200ms
   - Reveals: 400–600ms
   - Page transitions: 400ms
   - Ambient loops: 15–30s
3. **Hardware-accelerated only:** `transform`, `opacity`. Never `width`, `height`, `top`, `left`, `margin`, `padding`.
4. **Reduced motion is not reduced quality:** `prefers-reduced-motion` should still feel polished.
5. **One signature, many supports:** Choose ONE hero animation (the "Unfold" transition). Everything else supports it.
6. **Physics over easings:** Springs feel alive. Use springs for discrete interactions. Use easings for continuous ones.

### Expanded Token System
```css
--motion-instant: 0ms;
--motion-fast: 150ms;
--motion-normal: 300ms;
--motion-slow: 600ms;
--motion-ambient: 20s;

--ease-out-expo: cubic-bezier(0.16, 1, 0.3, 1);
--ease-out-quart: cubic-bezier(0.25, 1, 0.5, 1);
--ease-in-out-sine: cubic-bezier(0.37, 0, 0.63, 1);

--physics-spring: { stiffness: 300, damping: 25, mass: 1 };
--physics-gentle: { stiffness: 120, damping: 20, mass: 1 };
--physics-snappy: { stiffness: 500, damping: 30, mass: 0.8 };
--physics-heavy:  { stiffness: 80,  damping: 15, mass: 2 };
```

### Motion by Context
| Context | Motion | Duration | Physics |
|---------|--------|----------|---------|
| Button press | `scale(0.96)` | 100ms | snappy |
| Card hover lift | `translateY(-8px)` | 200ms | spring |
| Page transition | Wipe/directional | 400ms | ease-out-expo |
| FLIP expand | `transform` morph | 500ms | ease-out-expo |
| Scroll reveal | `opacity + translateY` | 600ms | gentle |
| Cart badge | `scale + rotateY` | 300ms | snappy |
| Drawer open | `translateX` | 400ms | gentle |
| Input focus | `border-color + glow` | 200ms | snappy |
| Kit fly | Arc path `offset-path` | 800ms | spring |
| Ambient zoom | `scale` loop | 20s | linear |
| Stat counter | Count up | 1200ms | ease-out-quart |
| Hotspot pulse | `scale` loop | 2.5s | ease-in-out-sine |

---

## 3. UPDATED INTERACTION SYSTEM

### Input Modalities
The site supports five input modalities, each with appropriate feedback:

1. **Mouse:** Hover states, cursor morphs, lens zoom, tooltips.
2. **Touch:** Tap targets >= 44px, swipe gestures, haptic feedback, bottom sheets.
3. **Keyboard:** Full Tab navigation, shortcuts (`Cmd+K`, `M`, `C`, `Esc`), visible focus rings.
4. **Voice/Screen Reader:** Semantic HTML, ARIA labels, live regions, skip links.
5. **Gesture:** Swipe-to-dismiss, drag carousels, pinch-to-zoom.

### Feedback Layers
Every action triggers feedback across multiple layers:

| Action | Visual | Motion | Haptic | Sound |
|--------|--------|--------|--------|-------|
| Button press | Inset shadow | `scale(0.96)` | 10ms vibrate | Woodblock tap (opt-in) |
| Add to Kit | Image fly | Arc to cart | 20ms vibrate | Bell chime (opt-in) |
| Size select | Fill change | `scale(1.05)` ring | 10ms vibrate | Soft click (opt-in) |
| Page transition | Wipe overlay | Diagonal slide | None | Subtle whoosh (opt-in) |
| Search result | Highlight | `translateY` shift | None | None |
| Checkout success | Checkmark draw | Confetti/Shelf | 30ms vibrate | Ascending chime (opt-in) |

### State Orchestration
- Global `InteractionProvider` manages cursor mode, sound state, journey context, and transition state.
- All feedback is batched. Do not trigger 4 separate re-renders for one action.
- Respect `prefers-reduced-motion` at the provider level. When enabled, all motion tokens default to instant or 200ms max.

---

## 4. UPDATED BRAND SYSTEM

### Brand Voice: "Precision for the Unplanned"
All copy should sound like a technical manual for adventurers.

| Old | New |
|-----|-----|
| "Designed for the modern explorer." | "Engineered for 14km of unplanned terrain." |
| "Add to Cart" | "Add to Kit" |
| "Your cart is empty" | "Your kit is at base camp." |
| "Free Shipping" | "Zero-friction delivery." |
| "Sale" | "Field-tested pricing." |
| "New Arrival" | "New drop." |
| "Out of Stock" | "Back at base camp." |
| "Checkout" | "Prepare for departure." |
| "Order Confirmation" | "Kit confirmed." |
| "Track Order" | "Follow your kit." |

### Brand Signature Elements
1. **The Compass Cursor:** Context-aware cursor that morphs based on interactive element type.
2. **The Unfold Transition:** Diagonal wipe (45deg) that mimics unfolding a map.
3. **The Contour Line:** Gold loading bar that snakes across the viewport like a topographic line.
4. **The Kit Metaphor:** Cart = Kit. Products = Gear. Purchase = Departure.
5. **Living Gold:** `#c4a35a` shifts to `#d4b36a` on hover. Active states have a subtle inner glow.

### Brand by World
| World | Color | Motion | Cursor | Ambient |
|-------|-------|--------|--------|---------|
| Urban | `#2a2520` on `#f5efe6` | Fast, snappy | Compass | Noise texture |
| Trail | `#3d342b` on `#e8ddd0` | Organic, flowing | Leaf/Needle | Fog gradient |
| Technical | `#1a1a1a` on `#f0f0f0` | Precise, mechanical | Crosshair | Grid lines |
| Future | `#0a0a0a` on `#111111` | Glitch, fast cuts | Reticle | Scanlines |

---

## 5. UPDATED PORTFOLIO STRATEGY

### How to Present This Project

**Project Title:** Urban Clothing — A Premium Ecommerce Experience

**Tagline:** "Maximum delight with minimum friction."

**Hero Screenshot:** The homepage hero with "TREK" typography, ambient gold gradient, and the contextual compass cursor visible.

### Case Study Sections
1. **The Problem:** "Ecommerce is boring. Most sites look identical. I wanted to build a store that felt like Arc'teryx, Nike, and Apple had a child."
2. **The System:** Show the design system page. Tokens, components, motion physics.
3. **The Journey:** Animated GIF of the FLIP transition. Product card -> PDP -> Cart -> Checkout.
4. **The Worlds:** Side-by-side screenshots of Urban, Trail, Technical, and Future collection pages.
5. **The Ritual:** Video of the Kit Assembly animation. "This is what checkout feels like."
6. **The Engineering:** Lighthouse scores, bundle analysis, accessibility checklist.
7. **The Metrics:** "If this were real: 40% increase in time-on-page, 25% reduction in cart abandonment (hypothetical but grounded in UX research)."

### What Recruiters Will Ask
| Question | Your Answer |
|----------|-------------|
| "How did you handle performance?" | "CSS custom properties, lazy-loaded worlds, 60fps spring physics, and a 95 Lighthouse score." |
| "How did you handle accessibility?" | "`prefers-reduced-motion`, focus traps, semantic HTML, WCAG AA contrast, and screen reader testing." |
| "Why springs over easings?" | "Springs feel physical and responsive. They adapt to velocity. Easings feel robotic after repeated use." |
| "How does the FLIP transition work?" | "I capture source and target rects, invert the difference with transforms, and animate with `requestAnimationFrame`." |
| "How do you maintain consistency across worlds?" | "Every world consumes the same token system. Only the token values change. The components never do." |

### Repository README
- One-paragraph project description.
- Link to live demo.
- Link to `/engineering` and `/design-system` pages.
- Tech stack badges.
- GIF of the Kit Assembly ritual.
- "Hire me" CTA with email.

---

## 6. TOP 20 HIGHEST-IMPACT IMPROVEMENTS

Ranked by combined impact on conversion, portfolio value, and user delight.

| Rank | Improvement | Impact |
|------|-------------|--------|
| 1 | **Product -> PDP FLIP Transition** | Eliminates jarring navigation. Spatial continuity increases perceived quality. |
| 2 | **Kit Assembly Ritual** | Post-checkout delight. Brand-defining. Most shared moment. |
| 3 | **Responsive Grid Shop (no infinite scroll)** | Fixes the #1 usability complaint. Improves mobile conversion. |
| 4 | **Premium Search (Cmd+K)** | Reduces time-to-product. Power users love it. |
| 5 | **Interactive Lookbook** | Emotional connection. Increases AOV via outfit cross-sell. |
| 6 | **Collection Worlds** | Makes the brand feel 4x larger. Each world is a landing page. |
| 7 | **Micro Physics System (springs)** | Every interaction feels premium. Subconscious trust builder. |
| 8 | **Dynamic Product Ambience** | Every PDP feels bespoke. Increases perceived value. |
| 9 | **Contextual Cursor** | Accessibility-safe signature interaction. |
| 10 | **Storytelling PDP Sections** | Justifies premium pricing. Reduces returns. |
| 11 | **Material Inspection System** | Bridges sensory gap. Luxury-grade presentation. |
| 12 | **Connected Product Journey** | Coherence across pages reduces drop-off. |
| 13 | **Seasonal Theme Engine** | Signals freshness. Anticipation drives return visits. |
| 14 | **AI Size Assistant** | Reduces size-related returns. Conversion booster. |
| 15 | **Design System Showcase** | Portfolio gold. Recruiter magnet. |
| 16 | **Engineering Showcase** | Proves technical depth. Separates senior from junior. |
| 17 | **Product Comparison Mode** | Decision-making tool. Reduces pogo-sticking. |
| 18 | **Premium Sound Design** | Differentiator. Rare in portfolios. |
| 19 | **Unfold Page Transition** | Signature brand motion. Consistent and memorable. |
| 20 | **Contour Line Loading Bar** | On-brand loading. Replaces generic spinners. |

---

## 7. TOP 10 RECRUITER WOW FACTORS

These are the specific moments that will make a senior engineer or design manager stop and say "Damn."

1. **The FLIP Transition:** "You implemented shared element transitions in React? That's senior-level craft."
2. **The Physics System:** "You defined spring constants and applied them globally? That's design engineering."
3. **The Kit Assembly Ritual:** "You animated a checkout confirmation with GSAP timelines? Show me the code."
4. **The Design System Page:** "You built a live design system with real components? That's Stripe-level work."
5. **The Engineering Page:** "You documented your own architecture and published Lighthouse scores? That's rare."
6. **The Seasonal Theme Engine:** "You built a runtime theming system with CSS custom properties? Smart."
7. **Collection Worlds:** "Each collection has its own motion language? That shows range."
8. **Premium Search with Keyboard Nav:** "Cmd+K search with focus management? You thought about power users."
9. **Accessibility-First Cursor:** "You replaced `cursor: none` with a contextual cursor that respects `hover: hover`? That's the right call."
10. **The Connected Journey:** "You designed the entire flow as a continuous experience? That's product thinking, not just frontend."

---

## 8. TOP 10 AWWWARDS-LEVEL OPPORTUNITIES

These features, if executed with pixel-perfect polish, could earn Site of the Day or Developer Award nominations.

1. **Kit Assembly Ritual:** A cinematic post-checkout experience has never been done at this level in ecommerce.
2. **FLIP Product Transition:** Shared element transitions are still rare on the web. Doing them with real products is award-worthy.
3. **Interactive Lookbook:** Hotspot-driven editorial lookbooks win awards when the photography and interaction are flawless.
4. **Collection Worlds:** A site that changes its entire aesthetic based on collection is a strong narrative contender.
5. **Material Inspection Modal:** The zoom lens + hotspot system feels like a luxury brand experience.
6. **Dynamic Product Ambience:** Generative ambient backgrounds based on product color is subtle but sophisticated.
7. **Micro Physics System:** Award juries notice when every hover, press, and scroll feels physical.
8. **Seasonal Theme Engine:** A site that evolves with seasons shows long-term design thinking.
9. **The Unfold Transition:** A signature transition that is consistent and beautiful across every page.
10. **Sound + Motion Pairing:** Multi-sensory design is extremely rare. If the sound palette is truly elegant, it will stand out.

---

**Final Thesis:**
> This project is not a website. It is a system. Every pixel, every spring, every sound, and every transition serves a purpose: to make the user feel like they are preparing for something important. That feeling is what turns a store into a brand — and a project into a portfolio.
