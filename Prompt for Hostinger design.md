# Master Prompt — Future Foundations Education Website (Hostinger AI)

Use this complete prompt with the Hostinger AI website builder (Hostinger Horizons / AI Website Builder). Paste it as the project brief. It is structured so the AI can generate a multi-page, fully bilingual, conversion-focused educational services website that matches an existing premium reference design.

> If Hostinger rejects the long version with "Message is too long," use the SHORT VERSION below first to generate the Home page, then iteratively prompt Hostinger to add the other pages.

---

## SHORT VERSION (paste this first if the full prompt exceeds Hostinger's limit)

Build a premium, conversion-focused HOME PAGE for **Future Foundations Education**, a small 1-on-1 reading tutoring organization in Kissimmee, FL helping struggling readers (ages 5-13). Tone: warm, empathetic, expert, family-centered — never corporate or gimmicky.

**Brand & design**
- Colors: deep navy primary (`#102a43`, `#243b53`, `#334e68`), warm cream backgrounds (`#faf8f5`, `#f5f0e8`), gold accent for highlights (`#f0b429`, `#de911d`), success green for checkmarks. NO purple, indigo, or violet anywhere.
- Fonts: Playfair Display (serif) for headings, Inter (sans) for body. Max 3 weights. Body 150% line-height, headings 120%.
- Style: rounded-2xl cards, soft shadows, generous whitespace, 8px spacing system, subtle scroll fade-up animations, hover lift on cards and buttons. Lucide icons only. Use Pexels images of children reading.
- Bilingual EN/ES with a header toggle that swaps every string.

**Header (sticky)**: BookOpen icon + "Future Foundations" / "EDUCATION" wordmark, nav (Home, Summer Intensive, Services, About, Contact, Payment), EN/ES toggle, click-to-call phone CTA. Transparent over hero, solid white on scroll, text remains readable in both states.

**Home page sections (in order)**:
1. Hero: gold pill "Summer 2026 - Limited Spots Available", display headline "Summer Intensive Reading Program", subhead about a 6-week program for struggling readers, tagline "One-on-one instruction. Monday–Thursday. Personalized learning.", two CTAs ("Reserve a Spot", "Learn More"), 4-stat row (6 Week Program / 1:1 Instruction / 4 Days Per Week / 98% Parent Satisfaction).
2. Parent Concern "You Know Something Isn't Right" — 5 empathetic bullets about avoiding reading, falling behind, homework stress, shrinking confidence, failed past tutoring + reassurance line.
3. Why One-on-One — 2x2 grid: Truly Personalized, Undivided Attention, Progress at Their Pace, A Safe Space to Grow.
4. Program Structure — 5 numbered steps: Consultation & Assessment → Personalized Learning Plan → One-on-One Instruction → Progress Monitoring → Parent Communication.
5. Student Growth — 3 before/after cards (Reading Level, Confidence, Fluency) with timeframe pills.
6. Why Families Choose Us — 3x2 grid: Truly Individualized, Close Communication, Structured & Transparent, Calm Supportive Environment, Research-Based Methods, Confidence-Centered.
7. Meet the Academic Director — 2-column with oval-cropped portrait + bio paragraphs + italic gold-bordered pull-quote: *"When a child finally believes they can read — that moment changes everything. That is why we do this work."*
8. Parent Testimonials — 3 cards with 5-star rows, real quotes from Jessica M. (Kissimmee), Carlos & Ana R. (Orlando), Sarah T. (Kissimmee), one phrase highlighted in gold.
9. Right Fit — 6 green checkmarks of who fits, honest disclaimer of who does not.
10. Summer Program preview card — schedule pills (Mon–Thu, Morning, 6 Weeks, One-on-One), 4 focus chips (Phonics, Fluency, Comprehension, Writing), motto *"Today a Reader, Tomorrow a Leader"*.
11. Parent Expectations — 5 cards: Initial Assessment Report, Weekly Progress Updates, Measurable Growth Evidence, Home Support Guidance, A More Confident Child.
12. Parent Questionnaire form (lead capture) — fields: Your Name, Phone, Email, Child's Age/Grade, Main Reading Concern, Interested In (select: Summer Intensive / Reading Intervention / Homework & Academic Support / Homeschool / Not sure), Anything else (optional). Submit "Get Started" → success state. Store submissions in **Supabase** in a `leads` table with RLS enabled (anon INSERT only, authenticated SELECT). Use a Supabase Edge Function `submit-lead` with proper CORS to perform the insert.
13. Final CTA banner: "Let's Talk About Your Child" with "Schedule a Consultation" + "Call Us" buttons.
14. Auto-opening questionnaire modal after ~20s (once per session, dismissible).

**Footer**: navy bg, brand description, Quick Links, Contact (Kissimmee FL location, phone, email), Hours Mon–Fri 9am–7pm, copyright.

**Quality bar**: mobile-first responsive, WCAG AA contrast, semantic HTML, one H1, SEO meta + JSON-LD `EducationalOrganization`, Pexels imagery only, no Lorem ipsum, production-ready copy.

After Home is generated, ask Hostinger to add: `/about`, `/services`, `/summer-program`, `/contact`, `/payment` — using the same palette, type, and tone.

---

## 1. PROJECT OVERVIEW

**Business name:** Future Foundations Education
**Type:** Personalized 1-on-1 reading tutoring and literacy intervention organization
**Location:** Kissimmee, FL (also serves Orlando, FL families)
**Audience:** Concerned parents of children (ages 5-13) who struggle with reading, including homeschool families, families with children reading below grade level, and families who tried other tutoring without results.
**Core promise:** Truly personalized, one-on-one, research-based (Science of Reading) reading instruction that rebuilds reading skills AND a child's confidence.
**Tone:** Warm, empathetic, professional, premium, family-centered. Honest, never gimmicky. The site should feel like a small, intentional, expert-led organization — not a tutoring chain.
**Languages:** Fully bilingual English + Spanish. Add a language toggle (EN / ES) in the header that swaps every piece of copy on the entire site.

**Primary conversion goals (in priority order):**
1. Submit the parent questionnaire / consultation request form (lead capture)
2. Click "Schedule a Consultation" / "Reserve a Spot"
3. Phone call (click-to-call from sticky header)
4. Contact form submission

---

## 2. BRAND & VISUAL SYSTEM

### Color Palette (do NOT use purple, indigo, or violet hues)

Use these exact 50–900 ramps:

- **brand (deep navy / primary):** 50 `#f0f4f8`, 100 `#d9e2ec`, 200 `#bcccdc`, 300 `#9fb3c8`, 400 `#829ab1`, 500 `#627d98`, 600 `#486581`, 700 `#334e68`, 800 `#243b53`, 900 `#102a43`, 950 `#0a1929`
- **accent (warm gold / highlight, used sparingly):** 50 `#fffbea`, 100 `#fff3c4`, 200 `#fce588`, 300 `#fadb5f`, 400 `#f7c948`, 500 `#f0b429`, 600 `#de911d`, 700 `#cb6e17`, 800 `#b44d12`, 900 `#8d2b0b`
- **warm (cream/parchment, page backgrounds & soft cards):** 50 `#faf8f5`, 100 `#f5f0e8`, 200 `#ede4d4`, 300 `#e2d4bc`, 400 `#d4bfa0`, 500 `#c4a882`, 600 `#a88b64`, 700 `#8c6f4a`, 800 `#6f5536`, 900 `#523c24`
- **success (green):** 50 `#f0fdf4` … 700 `#15803d` (used for checkmarks, positive states)
- **warning (yellow):** standard yellow ramp (rarely used)
- **error (red):** standard red ramp (form errors only)

**Usage rules:**
- Page backgrounds: `warm-50` and white alternating sections
- Headings & primary text: `brand-900`
- Body text: `brand-700` and `brand-600`
- Primary buttons: `bg-brand-700 hover:bg-brand-800 text-white`
- Pull-quote left border: `border-l-4 border-accent-500`
- Stat strip background: `bg-brand-800` with white numbers and `text-brand-200` labels
- Light icon-circle backgrounds: `bg-brand-100` (icon `text-brand-700`), `bg-accent-100` (icon `text-accent-700`), `bg-success-100` (icon `text-success-700`)

### Typography

- **Display / headings:** `Playfair Display` (serif) — used for h1, h2, h3, the brand wordmark, and pull-quotes
- **Body & UI:** `Inter` (sans-serif)
- Maximum 3 font weights: 400 (body), 600 (semibold for emphasis), 700 (bold for headings/CTAs)
- Line height: 150% for body, 120% for headings
- Headings should feel editorial, not flashy

### Spacing & Layout

- 8px base spacing system; rely on Tailwind's spacing scale (`p-4`, `py-16`, `gap-6`, etc.)
- Container max width ~1200px (`max-w-7xl mx-auto`) with `px-4 sm:px-6 lg:px-8`
- Generous section padding: `py-16 lg:py-24`
- Rounded corners: cards `rounded-2xl`, buttons `rounded-xl`, pills/badges `rounded-full`
- Soft shadows only (`shadow-sm`, `shadow-lg`); no harsh drop shadows
- Card style: white background, `border border-warm-100`, subtle hover `hover:shadow-sm transition-shadow`

### Imagery

- Use Pexels stock photography of children reading, parents helping kids, classroom moments, books, and warm home learning settings. Always reference live Pexels URLs (e.g. `https://images.pexels.com/photos/...`). Do not invent URLs.
- The Academic Director gets ONE real portrait shown as an oval-cropped photo (`rounded-[50%]`) with a 4px white border ring, on the home page only, in the "Meet the Academic Director" section.
- The About page uses a warm photo of children reading together (Pexels), NOT the Director's portrait.
- All images must include descriptive `alt` text.

### Micro-interactions & Animation

- Use `framer-motion` for scroll-triggered fade-up reveals on every section
- Hover states: small upward translate on cards (`hover:-translate-y-0.5`) and primary buttons (`hover:shadow-lg hover:-translate-y-0.5`)
- Smooth transitions everywhere (`transition-all duration-300`)
- Subtle pulse on the "Limited Spots" badge

### Accessibility

- WCAG AA contrast on every text/background pair, including transitional header states (transparent → solid)
- Keyboard-navigable, visible focus rings
- Modal traps focus and closes on Escape
- All form inputs labeled; errors announced

---

## 3. SITE STRUCTURE (PAGES & ROUTES)

| Route | Page |
|---|---|
| `/` | Home |
| `/summer-program` | Summer Intensive |
| `/services` | Services |
| `/about` | About |
| `/contact` | Contact |
| `/payment` | Payment |

### Global Components (every page)

**Sticky Header:**
- Left: small `BookOpen` icon (lucide-react) + wordmark "Future Foundations" with subtitle "EDUCATION"
- Center (desktop) / drawer (mobile): nav links (Home, Summer Intensive, Services, About, Contact, Payment)
- Right: language toggle "EN / ES", phone button (click-to-call) styled as primary CTA
- Transparent over hero, solid `bg-white shadow-sm` on scroll. Text colors switch correctly so they remain readable in BOTH states.

**Footer:**
- 3-4 column layout: brand description, Quick Links, Contact (location, phone, email), hours
- `bg-brand-900 text-brand-100`
- Copyright line at bottom

---

## 4. HOME PAGE — SECTION-BY-SECTION

Render in this exact order:

### 4.1 Hero / HeroIntro
- Background: warm gradient (`from-warm-50 to-brand-50`) with optional faint background pattern
- Top badge pill: "Summer 2026 - Limited Spots Available" (gold accent background)
- Headline (display serif, 2 lines): "Summer Intensive" / "Reading Program"
- Subhead paragraph: 6-week program description (see copy block below)
- Tagline: "One-on-one instruction. Monday – Thursday. Personalized learning."
- Two CTAs side by side: primary "Reserve a Spot" (filled brand) + secondary "Learn More" (outline)
- Below CTAs: a 4-stat row: `6 / Week Program`, `1:1 / Instruction`, `4 / Days Per Week`, `98% / Parent Satisfaction`

### 4.2 ParentConcern — "You Know Something Isn't Right"
- Badge "We Understand"
- Empathetic headline + subhead
- Bulleted list of 5 parent worries with red-tinted X icons or warm checkmarks
- Closing reassurance line in italic
- Soft CTA line: "There is a better path forward."

### 4.3 WhyOneOnOne — "Why One-on-One Support Changes Everything"
- 4 feature cards in a 2x2 grid: Truly Personalized, Undivided Attention, Progress at Their Pace, A Safe Space to Grow
- Each card: lucide icon in `bg-brand-100` circle, bold title, descriptive paragraph

### 4.4 ProgramStructure — "A Clear Path from Struggle to Confidence"
- 5 numbered steps in a vertical timeline OR horizontal stepper:
  1. Consultation & Assessment
  2. Personalized Learning Plan
  3. One-on-One Instruction
  4. Progress Monitoring
  5. Parent Communication & Review
- Bottom strip: 4 detail pills — `Monday – Thursday`, `Morning Sessions`, `6-Week Program`, `One-on-One`

### 4.5 StudentGrowth — "Growth You Can See"
- 3 before/after cards: Reading Level, Confidence, Fluency
- Each card has a Before state, After state, and Timeframe pill
- Footer note: "All growth examples are anonymized and based on typical student outcomes."

### 4.6 WhyFamiliesChoose — "Why Families Choose Future Foundations"
- 6 reason cards in a 3x2 grid: Truly Individualized, Close Communication, Structured & Transparent, Calm Supportive Environment, Research-Based Methods, Confidence-Centered

### 4.7 MeetDirector — "Meet the Academic Director"
- 2-column layout: left = oval-cropped Director portrait with white border + soft ring; right = title, intro paragraph, philosophy paragraph, approach paragraph
- Pull-quote block at the bottom: italic serif, gold left border, the quote: *"When a child finally believes they can read — that moment changes everything. That is why we do this work."*

### 4.8 ParentTestimonials — "What Families Are Saying"
- 3 testimonial cards (carousel on mobile, grid on desktop)
- Each: 5-star row, full quote (with one phrase highlighted in accent color), parent name, location, small rounded avatar placeholder
- Real quotes from Jessica M. (Kissimmee), Carlos & Ana R. (Orlando), Sarah T. (Kissimmee) — see copy block

### 4.9 RightFit — "This Program May Be Right If…"
- 6 green checkmark items describing fit
- Honest disclaimer paragraph for who is NOT a fit (drop-in homework help, test prep, group tutoring)
- Closing line: "Let's talk about whether this is right for your child."

### 4.10 SummerProgram preview block
- Large card with summer badge, program title, key facts (Schedule, Sessions, Duration, Format), 4 focus areas chips, "Reserve a Spot" CTA, "Limited spots available" microcopy, italic motto: *"Today a Reader, Tomorrow a Leader"*

### 4.11 ParentExpectations — "What You Can Expect From Us"
- 5 expectation cards in a row: Initial Assessment Report, Weekly Progress Updates, Measurable Growth Evidence, Home Support Guidance, A More Confident Child

### 4.12 ParentQuestionnaire — inline lead form on the home page
- Header badge "Quick Inquiry"
- Title: "Is Your Child Struggling with Reading?"
- Fields (all required unless noted):
  - Your Name (text)
  - Phone Number (tel)
  - Email Address (email)
  - Child's Age or Grade (text)
  - Main Reading Concern (textarea)
  - Interested In (select with 5 options: Summer Reading Intensive / Reading Intervention (year-round) / Homework & Academic Support / Homeschool Services / Not sure yet)
  - Anything else? (textarea, optional)
- Submit button "Get Started" → "Sending…" loading → success state with "Thank You!" message and a CTA to a longer official enrollment form
- On submit: insert a row into the Supabase `leads` table via the `submit-lead` edge function (see Section 7)

### 4.13 CTA banner
- Centered card: "Let's Talk About Your Child" + descriptive paragraph + two CTAs: "Schedule a Consultation" (primary) and "Call Us" (secondary)

### 4.14 QuestionnaireModal (popup)
- Auto-opens after ~20 seconds on the home page (only once per session, dismissible). Title "Help Your Child Read with Confidence", subtitle, the same questionnaire form embedded, and a small privacy reassurance line.

---

## 5. OTHER PAGES

### About `/about`
- Hero strip with badge "About Us" and title "About Future Foundations Education"
- 2-column section: 4 paragraphs of mission/story copy on the left; warm photo of children reading on the right (Pexels image, NOT the Director's portrait), `rounded-2xl shadow-lg`
- Stats strip on `bg-brand-800`: `100+ Students Supported`, `1:1 Instruction`, `6+ Years Experience`, `98% Parent Satisfaction`
- "Academic Director & Literacy Support Lead" — a centered card with two paragraphs of philosophy and approach
- Vision section (3 cards: Research-Based Instruction, One-on-One Focus, Confidence Building)
- Mission & Values section (3 cards: Trust, Individualization, Growth) with `Heart`, `Lightbulb`, `Target` icons
- Bottom CTA: "Schedule a Consultation"

### Services `/services`
- Hero with title "Helping Your Child Become a Confident Reader"
- 3 service cards: Reading Intervention, Academic Support, Homeschool Services
- "Here is how we support your child" — 7 numbered process steps (Listen, Assess, Build a Personalized Plan, Provide Consistent Instruction, Track and Share Progress, Support You at Home, Rebuild Reading Joy)
- Parent feedback row (3 testimonials)
- "Ready to Take the First Step?" CTA card

### Summer Intensive `/summer-program`
- Hero with "Limited Spots - Summer 2026" badge, title, subhead, "Reserve a Spot" CTA
- "What This Program Provides" with description (mentions Mon–Thu mornings, one-on-one)
- Program Details panel: Schedule (Monday – Thursday), Sessions (Morning), Duration (6 Weeks), Format (One-on-One)
- "Why This Approach Works" — 5 bullet reasons
- "Who This Program Serves" — 6 audience bullets
- "How We Begin" — assessment section
- "Results You Can See" — measurable outcomes section
- FAQ accordion with 5 questions (ages served, learning differences, how to know, after the 6 weeks, is this just tutoring)
- Bottom enrollment CTA

### Contact `/contact`
- Title "Let's Start a Conversation"
- 2-column: contact form (Your Name, Email, Tell Us About Your Child) + alternate ways to reach us (Location, Hours `Mon-Fri: 9:00 am - 7:00 pm`, Phone, Email)
- Form posts to Supabase as a contact-type lead

### Payment `/payment`
- Title "Payment Options"
- 3 method cards: Step Up for Students, Credit and Debit Cards, Bank Transfers
- "Questions About Payment?" contact block

---

## 6. EXACT COPY (USE VERBATIM)

Use the bilingual copy below. Every string must have BOTH an English and Spanish version stored in a translations object keyed by locale (`en`, `es`). The language toggle swaps `t.section.field` references at runtime.

> NOTE TO HOSTINGER AI: The full English + Spanish copy library is the source of truth for all on-page text. Treat the strings exactly as written; do not paraphrase. Spanish strings intentionally omit accented characters in some places — keep them as-is.

**(Insert here: the complete `translations` object — both `en` and `es` — covering all of these keys: `nav`, `heroIntro`, `questionnaire`, `popupModal`, `parentConcern`, `whyOneOnOne`, `programStructure`, `studentGrowth`, `whyFamiliesChoose`, `meetDirector`, `parentTestimonials`, `rightFit`, `summerProgram`, `summerProgramPage`, `parentExpectations`, `services`, `about`, `cta`, `footer`, `aboutPage`, `servicesPage`, `contactPage`, `paymentPage`. The reference React project ships these strings in `src/i18n/translations.ts` — copy them all into the new build.)**

---

## 7. DATA & BACKEND (Supabase)

Use Supabase for all data persistence.

### Database

Table: `leads`

| column | type | notes |
|---|---|---|
| id | uuid PK default `gen_random_uuid()` | |
| parent_name | text NOT NULL | |
| email | text NOT NULL | |
| phone | text | |
| child_age_grade | text | |
| main_concern | text | |
| interested_service | text | |
| message | text | optional notes |
| source_page | text default `'home'` | which page submitted |
| locale | text default `'en'` | en or es |
| created_at | timestamptz default `now()` | |

**Row Level Security:** ENABLED. Policies:
- `"Anyone can submit a lead"` — `FOR INSERT TO anon, authenticated WITH CHECK (true)` (this table is intentionally write-only for the public; the app inserts via the edge function only)
- `"Authenticated admin can read leads"` — `FOR SELECT TO authenticated USING (auth.uid() IS NOT NULL)` (lock down with stricter ownership if admin auth is added later)

### Edge Function: `submit-lead`

- Deno runtime, `Deno.serve` handler
- Accepts POST JSON `{ parent_name, email, phone, child_age_grade, main_concern, interested_service, message, source_page, locale }`
- Validates required fields, inserts into `leads`, returns `{ ok: true }` or error
- Standard CORS headers: `Access-Control-Allow-Origin: *`, methods `GET, POST, PUT, DELETE, OPTIONS`, headers `Content-Type, Authorization, X-Client-Info, Apikey`
- Wrapped in try/catch with JSON error responses

### Frontend Supabase client

- `@supabase/supabase-js` singleton in `src/lib/supabase.ts`
- Reads `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` from env
- All form submissions call the edge function via `fetch(${VITE_SUPABASE_URL}/functions/v1/submit-lead, …)` with the anon key as `Authorization: Bearer …`

---

## 8. TECH STACK & STRUCTURE

- **Framework:** React 18 + TypeScript + Vite
- **Routing:** `react-router-dom` v7 with `<BrowserRouter>` and a top-level `<Routes>` in `App.tsx`. Each page is a default-exported component in `src/pages/`.
- **Styling:** Tailwind CSS with the custom `tailwind.config.js` extending fontFamily, colors, animations, and keyframes (see Section 2)
- **Icons:** `lucide-react` only (e.g., `BookOpen`, `Heart`, `Lightbulb`, `Target`, `UserCheck`, `Award`, `CheckCircle`, `Phone`, `Mail`, `MapPin`, `Star`, `Globe`, `Menu`, `X`, `ArrowRight`, `Users`, `Clock`, `Calendar`)
- **Animation:** `framer-motion` for scroll reveals
- **i18n:** Custom React Context (`LanguageContext`) holding `locale` state, `setLocale`, and a `t` object derived from `translations[locale]`. Persist locale to `localStorage`.
- **Folder layout:**
  ```
  src/
    App.tsx
    main.tsx
    index.css            (Tailwind base + custom utilities like .container-max, .section-padding, .btn-primary)
    i18n/
      LanguageContext.tsx
      translations.ts
    lib/
      supabase.ts
    components/
      Header.tsx
      Footer.tsx
      HeroIntro.tsx
      ParentConcern.tsx
      WhyOneOnOne.tsx
      ProgramStructure.tsx
      StudentGrowth.tsx
      WhyFamiliesChoose.tsx
      MeetDirector.tsx
      ParentTestimonials.tsx
      RightFit.tsx
      SummerProgram.tsx
      ParentExpectations.tsx
      ParentQuestionnaire.tsx
      QuestionnaireModal.tsx
      CTA.tsx
    pages/
      HomePage.tsx
      AboutPage.tsx
      ServicesPage.tsx
      SummerProgramPage.tsx
      ContactPage.tsx
      PaymentPage.tsx
  supabase/
    migrations/
      20260509222150_create_leads_table.sql
    functions/
      submit-lead/
        index.ts
  ```

### Custom Tailwind utility classes (in `index.css`)

```css
.container-max { @apply max-w-7xl mx-auto; }
.section-padding { @apply py-16 lg:py-24 px-4 sm:px-6 lg:px-8; }
.btn-primary { @apply inline-flex items-center justify-center bg-brand-700 hover:bg-brand-800 text-white px-8 py-4 rounded-xl font-bold text-lg transition-all hover:shadow-lg hover:-translate-y-0.5; }
.btn-secondary { @apply inline-flex items-center justify-center bg-white hover:bg-warm-50 text-brand-800 border border-brand-200 px-8 py-4 rounded-xl font-bold text-lg transition-all; }
```

---

## 9. RESPONSIVE BEHAVIOR

- Mobile-first. Breakpoints at `sm` 640px, `md` 768px, `lg` 1024px, `xl` 1280px.
- Header: hamburger drawer on mobile, full nav on `lg+`. Phone CTA always visible.
- Multi-column grids collapse to 1-column < `md`, 2-column at `md`, 3+ at `lg`.
- Hero typography: `text-4xl sm:text-5xl lg:text-6xl`.
- Forms always full-width on mobile.
- Director portrait shrinks but stays oval on all sizes.

---

## 10. SEO & METADATA

- Per-page `<title>` and `<meta name="description">`.
- `<html lang>` reflects current locale (`en` or `es`).
- Open Graph + Twitter card meta with site title, description, and a hero image.
- JSON-LD structured data for `EducationalOrganization` with name, address (Kissimmee, FL), telephone, email, sameAs (social), and `LocalBusiness` hours.
- Sitemap.xml and robots.txt.
- Semantic HTML (one `<h1>` per page, `<main>`, `<nav>`, `<footer>`, `<section>`).

---

## 11. QUALITY BAR / DEFINITION OF DONE

The generated site must:
- Look identical in spirit to a premium, conversion-focused educational services site (small, trustworthy, expert-led — not corporate, not gimmicky)
- Be fully bilingual with the language toggle swapping every visible string
- Have working lead submission writing to Supabase
- Pass Lighthouse with 90+ on Accessibility, Best Practices, and SEO on both desktop and mobile
- Have NO purple, indigo, or violet hues anywhere
- Use only the warm/navy/gold palette in Section 2
- Use Pexels images only — never invent image URLs
- Render correctly on iPhone SE, standard mobile, tablet, and desktop
- Be production-ready (no Lorem ipsum, no placeholder copy, no broken links)

---

## 12. THINGS TO AVOID

- Purple/indigo/violet colors
- Magic links or social login (auth not required for this site)
- Heavy 3D, parallax, or video backgrounds
- Stock corporate "happy family" overly-staged photos — prefer authentic, warm classroom and reading scenes
- Generic tutoring buzzwords ("unlock potential," "world-class") — use the warm, honest copy provided
- Auto-playing audio or video
- Cookie/popup overload — only the one questionnaire modal, dismissible

---

## 13. NICE-TO-HAVES (only after the above is done)

- A small "blog" or "resources" page with 2-3 articles for parents (Science of Reading, How to Tell If Your Child Needs Help, Building Reading Confidence at Home)
- Admin-only `/admin/leads` page (auth-protected) listing submitted leads
- Email notification (Supabase Edge Function + Resend) when a new lead arrives

---

End of master prompt.
