You are the lead product designer, UX architect, and senior frontend architect for the official website and delegate management platform of **Vasant Vaani Sansad 2.0 (VVS 2.0)**.

I will attach the complete VVS 2.0 PRD after this prompt.

You must study the PRD carefully before doing anything.

The PRD is the primary source of truth for event-specific requirements.

Do NOT invent event information that is not present in the PRD.

---

# YOUR FIRST OBJECTIVE

Design a **premium, modern, light-theme website** for Vasant Vaani Sansad 2.0.

The website should feel like:

**Premium conference + Youth Parliament + MUN + modern institutional platform**

It should NOT look like:

- A generic college website
- A generic MUN template
- A copied Google Form
- A PDF converted into HTML
- An over-designed hackathon website
- A dark cyberpunk website
- A template with excessive gradients and glowing effects

The design should feel credible enough for a serious national-level student conference.

---

# VISUAL DIRECTION

Use a **LIGHT-FIRST DESIGN SYSTEM**.

Primary visual direction:

- Warm/off-white background
- White cards
- Deep navy typography
- Muted/dignified gold accents
- Very subtle blue-gray surfaces
- Elegant typography
- Large whitespace
- Strong editorial hierarchy
- Premium conference photography
- Subtle borders
- Soft shadows
- Minimal gradients

The VVS brochure uses blue/gold institutional branding.

Do NOT simply copy the brochure's visual design.

Translate its identity into a modern web experience.

The website should feel approximately like:

**Modern editorial website + premium conference website + institutional diplomacy platform**

rather than a traditional college event website.

---

# COLOR SYSTEM

Create a reusable design system.

Suggested direction:

Background:
- Warm white / ivory

Primary:
- Deep navy

Accent:
- Muted antique gold

Secondary:
- Slate / blue-gray

Cards:
- White

Borders:
- Very subtle neutral gray

Text:
- Dark navy / charcoal

Avoid:
- Neon colors
- Excessive gradients
- Excessive gold
- Pure black everywhere
- Glassmorphism everywhere
- Excessive shadows

Gold should be an ACCENT, not the dominant color.

---

# TYPOGRAPHY

Use a sophisticated typography pairing.

Suggested:

Heading:
- Playfair Display / Cormorant Garamond / similar elegant serif

Body/UI:
- Inter / Manrope / DM Sans / similar modern sans-serif

Do not use too many fonts.

Create a clear hierarchy:

Display
H1
H2
H3
Body
Caption
Button
Navigation

---

# BRAND FEEL

The brand should communicate:

- Voice
- Leadership
- Democracy
- Diplomacy
- Debate
- Youth
- Prestige
- Intellectualism
- Institutional credibility

Use visual motifs subtly:

- Microphone
- Parliament architecture
- Globe
- Documents
- Gavel
- Editorial lines
- Conference photography

Do not overuse these motifs.

---

# HOMEPAGE

Design the homepage as a high-conversion event landing page.

## HERO

The hero should immediately communicate:

VASANT VAANI SANSAD 2.0

"Where Voices Become Leaders."

26–27 September 2026

Vasant Kanya Mahavidyalaya, Kammacha, Varanasi

Primary CTA:

REGISTER NOW

Secondary CTA:

EXPLORE COMMITTEES

Include an elegant event countdown.

The hero should be visually strong without becoming cluttered.

Consider:

- Large editorial typography
- High-quality conference/parliament image
- Subtle gold accent line
- Minimal motion
- Strong CTA

---

# EVENT STATS

Immediately after the hero:

300+
DELEGATES

40+
AWARDS

2
DAYS

Use animated counters only if they improve the experience.

Do not over-animate.

---

# ABOUT VVS

Create a strong editorial section:

"A Platform Where Voices Become Leaders"

Explain what VVS is using the exact information and positioning from the PRD.

Do not add unsupported claims.

Use a split layout:

Text + visual/photo.

Add small supporting points:

- Public Speaking
- Critical Thinking
- Diplomacy
- Leadership

---

# COMMITTEE EXPERIENCE

This should be one of the strongest sections of the website.

Do NOT present committees as boring text cards.

Create three categories:

YOUTH PARLIAMENT

- Lok Sabha
- AIPPM
- UPLA

GLOBAL DIPLOMACY

- UNHRC
- UNCSW

MEDIA

- Press Conclave

Use visually distinct but cohesive committee cards.

Each card should show:

- Committee name
- Category
- Short agenda
- Explore button

The actual committee data must come from the backend/API.

DO NOT hardcode committee information in the frontend.

---

# COMMITTEE DETAIL PAGE

Design a premium committee detail page.

Structure:

Committee category

Committee name

Agenda

About the committee

Portfolio selection information

Background guide

Rules of procedure

Chairperson information

REGISTER / SELECT AS PREFERENCE

Again:

ALL OF THIS MUST BE ADMIN-MANAGED.

---

# CRITICAL DYNAMIC CONTENT REQUIREMENT

This is extremely important.

The frontend must NOT hardcode VVS event data.

Do NOT create frontend arrays such as:

const committees = [...]

or:

const portfolios = [...]

Instead:

Frontend
↓
API
↓
Backend
↓
MongoDB
↓
Admin-managed data

The admin should be able to create/edit/delete/activate/deactivate:

- Committees
- Portfolios
- Agendas
- Committee descriptions
- Chairpersons
- Awards
- Prize amounts
- Schedule
- Registration fee
- Accommodation information
- FAQs
- Announcements
- Documents
- Team members
- Gallery
- Event settings

The same platform should be reusable for VVS 3.0.

---

# REGISTRATION UX

The registration experience should be significantly better than the existing Google Form.

Create a modern multi-step registration flow.

STEP 1
Personal Details

STEP 2
Committee Preferences

STEP 3
Portfolio Preferences

STEP 4
Additional Information

STEP 5
Payment

STEP 6
Review & Submit

Show a clear progress indicator.

---

# REGISTRATION DESIGN

The registration interface should feel like a premium SaaS onboarding flow rather than a Google Form.

Use:

- Large input fields
- Clear labels
- Inline validation
- Helpful error messages
- Progress indicator
- Back/Next navigation
- Autosave where appropriate
- Mobile-first design

Do not make the form visually overwhelming.

---

# COMMITTEE PREFERENCE UX

Committee selection should use visual cards.

Example:

Lok Sabha
Youth Parliament

AIPPM
Youth Parliament

UNHRC
Global Diplomacy

etc.

Allow:

Preference 1
Preference 2

Prevent duplicate committee selection.

---

# PORTFOLIO UX

Portfolio options must be dynamically loaded based on the selected committee.

Example:

Committee:
UNHRC

Portfolio Preference 1:
[ Select Portfolio ]

Portfolio Preference 2:
[ Select Portfolio ]

The actual portfolio list must come from the backend.

Admin controls the portfolio list.

If the organizer changes portfolios in the Admin Portal, the registration form should automatically reflect the change.

---

# PAYMENT UI

Registration fee should be dynamically loaded from event settings.

Current known value:

₹599 per delegate

But do NOT hardcode ₹599 into the frontend.

Instead:

GET /api/event/settings

Then display the current registration fee.

Payment UI should support:

- UPI QR
- UPI ID
- Transaction ID
- Payment screenshot
- Payment status

Design it clearly and professionally.

---

# ADMIN PORTAL

The Admin Portal should have a completely separate dashboard design.

It should be functional, clean and information-dense.

Sidebar:

Dashboard
Registrations
Payments
Committees
Portfolios
Allocations
Accommodation
Documents
Announcements
Schedule
Team
Gallery
FAQs
Event Settings

---

# ADMIN DASHBOARD

Create summary cards:

Total Registrations
Payment Verified
Payment Pending
Accommodation Requests
Pending Allocations

Then:

Recent Registrations

Payment Verification Queue

Committee Distribution

Registration Trend

Keep analytics useful.

Do not add meaningless charts just to make the dashboard look complex.

---

# COMMITTEE MANAGEMENT

Admin should be able to:

Create Committee

Edit Committee

Delete Committee

Activate / Deactivate

Set category

Set agenda

Set description

Upload logo

Add chairpersons

Set capacity

Manage portfolios

---

# PORTFOLIO MANAGEMENT

This is critical.

Admin should be able to:

Create portfolio

Edit portfolio

Delete portfolio

Activate/deactivate

Assign to committee

See allocation status

Example:

UNHRC

India
United States
China
Japan
...

The actual portfolio names must NOT be invented.

They will be entered through the Admin Portal.

---

# ALLOCATION SYSTEM

Admin should be able to see:

Delegate

Preference 1

Preference 2

Portfolio preferences

Payment status

Accommodation

Then manually assign:

Final Committee

Final Portfolio

The system should prevent assigning an already-allocated portfolio.

After allocation:

Send delegate notification.

---

# DELEGATE DASHBOARD

Create a premium delegate dashboard.

Show:

Registration ID

Registration status

Payment status

Committee

Portfolio

Accommodation status

Documents

Announcements

Schedule

Important updates

The dashboard should feel polished but simple.

---

# VVS 1.0 SECTION

Create a visually impressive section showing the previous edition.

Use:

"The Beginning of a Legacy"

Then photographs from VVS 1.0.

Create an editorial timeline:

VVS 1.0 → VVS 2.0

Do not invent statistics or achievements for VVS 1.0.

Only use information provided in the PRD/source material.

---

# AWARDS & BENEFITS

Create a premium section showing:

Cash Prizes

Certificates

Trophies & Awards

Delegate Kit

Networking

Workshops

Recognition

Leadership / Public Speaking / Negotiation development

Do not invent prize amounts if they are not provided.

---

# CORE TEAM

Create an elegant leadership section.

Use:

Secretary General
Co-Secretary General
Director General
Chef D Cabinet
Charge D'Affairs

Display actual names only when provided in the PRD.

Make the design feel like a professional conference leadership page.

---

# SCHEDULE

Create a modern conference schedule.

Use:

Day 1
Day 2

Timeline-style design.

IMPORTANT:

The exact schedule should be admin-managed.

Do not invent event timings.

If schedule data is unavailable, show a polished "Schedule Coming Soon" state.

---

# FAQ

Create an elegant FAQ accordion.

Questions should come from admin-managed content.

The admin should be able to:

Add FAQ
Edit FAQ
Delete FAQ
Reorder FAQ
Activate/deactivate FAQ

---

# CONTACT

Create a clean contact section with:

Email

Phone contacts

WhatsApp

Venue

Instagram

Use only verified information from the PRD.

---

# FOOTER

Footer should include:

VVS 2.0

Quick links

Committees

Registration

Contact

Instagram

Venue

Copyright

Keep it minimal.

---

# RESPONSIVE DESIGN

The website MUST be designed mobile-first.

Pay special attention to:

- Registration
- Committee selection
- Payment
- Dashboard
- Admin tables

The registration process should be comfortable on a phone.

---

# ANIMATIONS

Use Framer Motion or equivalent.

Animations should be:

- Subtle
- Fast
- Purposeful

Good examples:

- Hero text reveal
- Scroll reveal
- Committee card hover
- Counter animation
- Page transitions
- Button interaction

Avoid:

- Constant floating objects
- Excessive parallax
- Slow page transitions
- Huge 3D effects
- Animation on every element

The site should still feel fast.

---

# IMAGE DIRECTION

Use high-quality imagery related to:

- Youth Parliament
- Parliamentary debate
- MUN
- Diplomacy
- Students debating
- VVS 1.0

Prefer authentic VVS photography wherever available.

Do not use random generic stock photos if actual event photos are provided.

---

# UX RULES

Follow these principles:

1. Registration should always be easy to find.
2. Committee information should be easy to compare.
3. Event dates and venue should always be visible.
4. Don't bury important information under animations.
5. Don't use huge paragraphs where cards or bullets work better.
6. Don't overload the homepage.
7. Keep the interface accessible.
8. Maintain excellent contrast.
9. Make mobile registration extremely easy.
10. Every important action should have clear feedback.

---

# ACCESSIBILITY

Implement:

- Keyboard navigation
- Visible focus states
- Proper labels
- ARIA where necessary
- Sufficient color contrast
- Accessible form errors
- Alt text for meaningful images
- Reduced motion support

---

# SEO

Design the architecture so the public pages can be SEO optimized.

Important pages:

/
/about
/committees
/committees/:slug
/awards
/schedule
/team
/faq
/contact
/registration

Use semantic HTML.

---

# TECHNICAL EXPECTATIONS

If implementation is approved, preferred stack:

Frontend:
React
Vite
Tailwind CSS
React Router
Framer Motion
Lucide React

Backend:
Node.js
Express

Database:
MongoDB

Storage:
Cloudinary or equivalent

Email:
Resend or equivalent

Deployment:
Vercel + Railway/Render + MongoDB Atlas

Use clean component architecture.

Avoid unnecessary dependencies.

---

# IMPORTANT DEVELOPMENT RULE

Do NOT build the entire system in one giant step.

First produce:

1. Sitemap
2. User flows
3. Design system
4. Component architecture
5. Page architecture
6. Database schema
7. API architecture
8. Admin architecture
9. Registration architecture
10. Development milestones

Then wait for approval.

After approval, implement incrementally.

---

# CODE QUALITY REQUIREMENTS

When implementation begins:

- Use reusable components
- Use proper folder structure
- Avoid duplicated UI
- Avoid hardcoded event data
- Keep API logic separate from UI
- Keep business logic out of React components
- Validate data on frontend AND backend
- Use proper loading states
- Use proper error states
- Use empty states
- Use reusable form components
- Keep admin and public UI logically separated

Do not generate hundreds of unnecessary files.

Do not create placeholder functionality that pretends to work.

---

# IMPORTANT SOURCE RULE

The attached PRD and source materials are the source of truth for VVS-specific information.

If something is not specified:

DO NOT INVENT IT.

Mark it as:

"Organizer Confirmation Required"

Examples:

- Portfolio lists
- Prize amounts
- Accommodation pricing
- Exact schedule
- Committee capacity
- Eligibility
- Refund policy
- Rules
- Payment gateway
- Chairpersons

---

# FINAL OUTPUT FOR THIS STAGE

Before writing implementation code, give me:

## 1. Design Concept

Explain the visual direction.

## 2. Sitemap

Complete website structure.

## 3. User Flows

Prospective delegate
Registered delegate
Admin

## 4. Design System

Colors
Typography
Spacing
Buttons
Cards
Forms
Tables
Navigation

## 5. Component Architecture

Reusable frontend components.

## 6. Database Architecture

Collections and relationships.

## 7. API Architecture

Endpoints and responsibilities.

## 8. Admin Portal Architecture

Complete admin modules.

## 9. Registration Architecture

Complete multi-step flow.

## 10. Missing Information

Clearly list everything that requires organizer confirmation.

## 11. Development Plan

Break implementation into logical milestones.

DO NOT START FULL IMPLEMENTATION UNTIL THIS ANALYSIS IS COMPLETE.

The goal is to build a production-quality VVS 2.0 platform, not a quick demo.