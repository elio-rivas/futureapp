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

After Home is generated, prompt Hostinger separately to add: `/about`, `/services`, `/summer-program`, `/contact`, `/payment` — using the same palette, type, and tone.
