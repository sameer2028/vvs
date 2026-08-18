# Product Requirements Document (PRD)

## Vasant Vaani Sansad 2.0 — Official Website & Delegate Management Platform

**Version:** 1.0  
**Event:** Vasant Vaani Sansad 2.0  
**Event Dates:** 26–27 September 2026  
**Venue:** Vasant Kanya Mahavidyalaya, Kammacha, Varanasi, Uttar Pradesh  
**Registration Fee:** ₹599 per delegate  
**Expected Delegates:** 300+  
**Awards:** 40+  
**Primary Contact:** vasantvaanisansad@gmail.com  
**Instagram:** @ig._vvs  

---

# 1. Executive Summary

Vasant Vaani Sansad (VVS) 2.0 is the flagship Youth Parliament and Model United Nations conference of Vasant Kanya Mahavidyalaya, Banaras Hindu University.

The event is positioned as a platform where students debate, collaborate, engage with real-world political and international issues, and develop leadership, public speaking, diplomacy, negotiation and critical-thinking skills.

The objective of this project is to create an official, modern and responsive digital platform for VVS 2.0 that serves two purposes:

1. **Public-facing event website**
   - Promote VVS 2.0
   - Explain committees and agendas
   - Showcase the event's credibility
   - Provide event information
   - Drive registrations

2. **Delegate registration and management platform**
   - Replace the existing Google Form
   - Collect structured delegate information
   - Capture committee and portfolio preferences
   - Manage payment verification
   - Manage accommodation requests
   - Allocate committees and portfolios
   - Provide delegate status and documents
   - Give organizers an administrative dashboard

The website should not simply reproduce the brochure digitally. It should transform the information in the brochure into a useful conference platform.

---

# 2. Product Vision

## Vision

Create a premium, trustworthy and easy-to-use digital platform that represents Vasant Vaani Sansad as a serious Youth Parliament, MUN and media conference while simplifying the complete delegate journey.

### Core principle

> **Discover → Explore → Register → Pay → Get Allocated → Prepare → Attend**

The website should minimize friction at every step.

---

# 3. Product Goals

## Primary Goals

### G1 — Establish VVS as a credible conference

The website should communicate:

- Institutional backing
- Event scale
- Committee quality
- Professional organization
- Previous edition experience
- Awards and recognition
- Clear event information

VVS 2.0 is advertised as having 300+ delegates, 40+ awards and two impactful days.

---

### G2 — Increase registrations

The website should make the path from discovering VVS to registering extremely short.

Primary CTA:

**REGISTER NOW**

The registration fee is currently specified as ₹599 per delegate.

---

### G3 — Replace the Google Form

The existing registration form should be replaced with a dedicated registration experience.

The new system should preserve the information currently collected while making it easier to complete and easier for organizers to manage.

---

### G4 — Centralize delegate management

Organizers should be able to manage:

- Registrations
- Payments
- Committee preferences
- Portfolio preferences
- Committee allocation
- Portfolio allocation
- Accommodation requests
- Documents
- Announcements
- Delegate records

from one admin dashboard.

---

### G5 — Provide a delegate portal

After registration, delegates should have access to their registration status and eventually:

- Committee allocation
- Portfolio allocation
- Background guides
- Rules
- Conference documents
- Announcements
- Event schedule
- Certificate information

---

# 4. Target Users

## 4.1 Prospective Delegate

A student who discovers VVS and wants to understand:

- What VVS is
- Which committees exist
- Which agenda interests them
- What the event offers
- How much it costs
- How to register

---

## 4.2 Registered Delegate

A participant who has already registered and needs to:

- Check registration status
- Check payment status
- View committee allocation
- View portfolio allocation
- Download documents
- View announcements
- View schedule
- Access event information

---

## 4.3 Organizer/Admin

The VVS organizing team needs to:

- View registrations
- Verify payments
- Manage committees
- Manage portfolios
- Allocate delegates
- Manage accommodation
- Upload documents
- Publish announcements
- Export data

---

# 5. Event Information

## 5.1 Event Name

**Vasant Vaani Sansad 2.0**

---

## 5.2 Tagline

**A Platform Where Voices Become Leaders.**

The brochure positions VVS as a platform for debate, collaboration and leadership.

---

## 5.3 Event Dates

**26th & 27th September 2026**

---

## 5.4 Venue

**Vasant Kanya Mahavidyalaya  
Kammacha, Varanasi**



---

## 5.5 Registration Fee

**₹599 per delegate**

---

## 5.6 Scale

- 300+ delegates
- 40+ awards
- 2 days

---

# 6. Website Information Architecture

The public website should contain:

```text
/
├── Home
├── About
├── Committees
│   ├── Lok Sabha
│   ├── AIPPM
│   ├── UPLA
│   ├── UNHRC
│   ├── UNCSW
│   └── Press Conclave
├── Schedule
├── Awards & Benefits
├── Team
├── VVS 1.0
├── FAQ
├── Contact
├── Registration
└── Login
    └── Delegate Dashboard
```

Admin:

```text
/admin
├── Dashboard
├── Registrations
├── Payments
├── Committees
├── Portfolios
├── Allocations
├── Accommodation
├── Documents
├── Announcements
├── Schedule
├── Team
├── Gallery
└── Settings
```

---

# 7. Homepage Requirements

## 7.1 Hero Section

The hero section must immediately communicate:

**VASANT VAANI SANSAD 2.0**

**Where Voices Become Leaders**

**26–27 September 2026**

**Vasant Kanya Mahavidyalaya, Kammacha, Varanasi**

Primary CTA:

**REGISTER NOW**

Secondary CTA:

**EXPLORE COMMITTEES**

Optional:

**COUNTDOWN TO VVS 2.0**

---

## 7.2 Event Statistics

Display:

### 300+
Delegates

### 40+
Awards

### 2
Days

These statistics are directly stated in the brochure.

---

## 7.3 About VVS

Short explanation:

VVS is the flagship Youth Parliament and Model United Nations conference of Vasant Kanya Mahavidyalaya, bringing students together to debate, collaborate and engage with real-world issues.

Display core outcomes:

- Critical Thinking
- Public Speaking
- Diplomacy
- Leadership
- Negotiation
- Policy Awareness

---

# 8. About the Host

Create a dedicated section for:

## Vasant Kanya Mahavidyalaya

The brochure states that VKM:

- Was established in 1954
- Was inspired by Dr. Annie Besant
- Was founded by Dr. Rohit Mehta of the Theosophical Society
- Is focused on women's education
- Promotes holistic learning
- Emphasizes culture, modernity and nation-building
- Has the motto "Education as Service"



The website should summarize this information rather than copying the entire brochure paragraph.

---

# 9. Electoral Literacy Club Section

VVS's background should include the Electoral Literacy Club.

The brochure states that the ELC was created on 3 November 2023 by students of the Department of Political Science at Vasant Kanya Mahavidyalaya.

Its stated objectives include:

- Electoral awareness
- Democratic values
- Civic responsibility
- Understanding voter rights
- Critical analysis of election-related information
- Distinguishing facts from misinformation



This should be presented as organizational context rather than making the website feel like an ELC website.

---

# 10. Committee Section

The committee section is one of the most important parts of the website.

Committees should be categorized into:

## Youth Parliament

### Lok Sabha

Agenda:

Discussion on the constitutional, political and electoral implications of delimitation in India, with special reference to:

- Women's representation
- Federal balance
- Regional equity
- Representation of marginalised communities



---

### AIPPM

Agenda:

Deliberation on the crisis in India's public examination and recruitment system, with special emphasis on:

- Examination paper leaks
- Nationwide student protests



---

### UPLA

Agenda:

Discussion on the transparency and accountability of public donations to religious institutions within the state.



---

# 11. Global Diplomacy

## UNHRC

Agenda:

Protecting human rights in the development and deployment of autonomous weapons systems and military artificial intelligence.



---

## UNCSW

Agenda:

Eliminating child, early and forced marriage, with special emphasis on strengthening global action in line with SDG 5.3.



---

# 12. Press Conclave

## Agenda

**The Ethics of Real-Time Crisis Reporting During Political Unrest and Civil Protests.**

The brochure states that on Day 2, Press Conclave participants can take on roles beyond the committee, including:

- Journalism
- Report writing
- Photography
- Conference-wide media coverage

The exact workflow and operational details are to be explained during the mandatory e-Orientation Workshop.

The website should therefore have a dedicated Press Conclave page.

---

# 13. Committee Detail Page

Each committee page should contain:

- Committee name
- Category
- Committee description
- Agenda
- Committee logo
- Chairpersons, if provided
- Portfolio list, when provided
- Background guide
- Rules of procedure
- Experience level, if provided
- Registration CTA

Example:

```text
UNHRC

GLOBAL DIPLOMACY

Protecting Human Rights in the
Development and Deployment of
Autonomous Weapons Systems
and Military Artificial Intelligence.

[ VIEW BACKGROUND GUIDE ]

[ SELECT AS PREFERENCE ]
```

---

# 14. Registration System

The Google Form currently establishes the baseline registration fields.

The custom system should include:

## Step 1 — Personal Information

Required:

- Email
- Full Name
- Phone Number
- School/College/Institution
- Class/Year

---

## Step 2 — Identity Verification

Student ID Card upload.

Accepted formats:

- JPG
- JPEG
- PNG
- PDF

Recommended maximum:

**5 MB**

---

# 15. Committee Preferences

The registration system must support:

### Committee Preference 1

Options:

- Lok Sabha
- AIPPM
- UPLA
- UNHRC
- UNCSW
- Press Conclave

### Committee Preference 2

Same options, but the system must prevent duplicate selection.

Example:

If Preference 1 = UNHRC

UNHRC should be disabled for Preference 2.

---

# 16. Portfolio Preferences

For each committee preference, the system should collect:

- Portfolio Preference 1
- Portfolio Preference 2

However, portfolio options should be **admin-managed**.

Do not hardcode portfolios into the frontend.

Admin should be able to create:

```text
Committee
↓
Available Portfolios
↓
Delegate Preferences
↓
Final Allocation
```

The actual portfolio lists are **not specified in the brochure**, so they must be supplied by the VVS organizers before implementation.

---

# 17. MUN Experience

The existing form collects MUN experience.

The custom website may use:

- First MUN
- 1–2 conferences
- 3–5 conferences
- 5+ conferences

Alternatively, preserve a free-text field if organizers specifically require it.

---

# 18. Referral Code

Optional field:

**Referral Code**

The system should support referral codes.

Potential functionality:

```text
Referral Code
↓
Validate
↓
Track registration source
↓
Attribute delegate to referrer
```

The exact reward/incentive associated with referral codes is not specified and must be confirmed.

---

# 19. Marketing Source

The current form asks:

**How did you get to know about our event?**

Options include:

- Instagram
- WhatsApp
- Personal Contact
- Other

The custom platform should preserve this field for marketing analytics.

Admin should eventually be able to see:

```text
Instagram     42%
WhatsApp      31%
Personal      19%
Other          8%
```

---

# 20. Accommodation

Required field:

**Do you require accommodation?**

Options:

- Yes
- No

The website should not promise accommodation pricing, availability or facilities until the organizers provide confirmed details.

---

# 21. Payment

Registration fee:

**₹599**

The existing form uses a UPI QR payment mechanism.

The custom website should support one of two approaches.

### Phase 1

Manual UPI:

```text
₹599
↓
Display QR
↓
Delegate pays
↓
Transaction ID
↓
Payment screenshot
↓
Admin verification
```

### Phase 2

Optional payment gateway:

```text
₹599
↓
Payment Gateway
↓
Automatic verification
↓
Registration confirmed
```

The payment gateway should only be introduced if the organizers require automated payment verification.

---

# 22. Payment Verification

Admin must be able to see:

- Delegate
- Registration ID
- Amount
- Transaction ID
- Payment screenshot
- Payment status
- Submission date

Statuses:

```text
PENDING
VERIFIED
REJECTED
```

Admin actions:

**VERIFY**

**REJECT**

If rejected, the system should allow an optional reason.

---

# 23. Registration Status

Every registration receives a unique registration ID.

Example:

**VVS26-00482**

Possible registration statuses:

```text
DRAFT
SUBMITTED
PAYMENT_PENDING
PAYMENT_VERIFIED
PAYMENT_REJECTED
COMMITTEE_PENDING
ALLOCATED
CANCELLED
```

---

# 24. Registration Confirmation

After successful submission:

Display:

## Registration Submitted Successfully

Show:

- Registration ID
- Name
- Payment status
- Committee preference 1
- Committee preference 2
- Accommodation status
- Event dates
- Venue

Provide:

**DOWNLOAD RECEIPT**

**GO TO DELEGATE DASHBOARD**

---

# 25. Email Notifications

The system should send transactional emails.

## Registration Received

Subject:

**VVS 2.0 — Registration Received**

Contents:

- Name
- Registration ID
- Registration status
- Event dates
- Venue
- Next steps

---

## Payment Verified

Subject:

**VVS 2.0 — Payment Verified**

---

## Payment Rejected

Subject:

**VVS 2.0 — Payment Verification Required**

Include reason if provided.

---

## Committee Allocated

Subject:

**VVS 2.0 — Committee Allocation**

Include:

- Committee
- Portfolio
- Next steps
- Relevant documents

---

# 26. Delegate Dashboard

Every registered delegate should eventually have a dashboard.

## Dashboard Sections

### Registration

```text
Registration ID
VVS26-00482

Status
✓ Confirmed
```

### Payment

```text
₹599
✓ Verified
```

### Preferences

```text
1. UNHRC
2. Lok Sabha
```

### Allocation

```text
Committee
UNHRC

Portfolio
India
```

### Documents

- Background Guide
- Delegate Handbook
- Rules of Procedure
- Other conference documents

### Schedule

Day 1  
Day 2

### Announcements

Latest organizer announcements.

---

# 27. Admin Dashboard

## Dashboard Overview

Show:

- Total registrations
- Payment verified
- Payment pending
- Payment rejected
- Committee allocation pending
- Allocated delegates
- Accommodation requests

Example:

```text
Total Delegates       347
Payment Verified      291
Payment Pending        56
Accommodation         103
Allocated              240
```

---

# 28. Registration Management

Admin table:

| Registration ID | Name | Institution | Preference 1 | Preference 2 | Payment | Accommodation |
|---|---|---|---|---|---|---|

Features:

- Search
- Filter
- Sort
- View details
- Edit
- Export
- Payment verification
- Allocation

---

# 29. Committee Management

Admin should be able to:

- Create committee
- Edit committee
- Change agenda
- Upload logo
- Add description
- Enable/disable registration
- Configure portfolio list
- Upload background guide

Example:

```text
Committee: UNHRC

Status: Active

Agenda:
[................]

Portfolios:
[ Manage ]

Background Guide:
[ Upload ]

[ SAVE ]
```

---

# 30. Portfolio Management

Admin:

```text
UNHRC
├── India
├── USA
├── China
├── ...
```

Features:

- Add portfolio
- Remove portfolio
- Disable portfolio
- Mark portfolio as allocated
- View assigned delegate

The actual portfolios are not contained in the provided brochure and therefore should be added by the organizers.

---

# 31. Committee Allocation

Admin should see:

```text
Delegate

Preference 1
UNHRC

Preference 2
Lok Sabha

Portfolio Preference 1
India

Portfolio Preference 2
USA

────────────────

FINAL ALLOCATION

Committee
[ UNHRC ]

Portfolio
[ India ]

[ ALLOCATE ]
```

Once allocated:

- Update delegate
- Mark portfolio unavailable
- Send email
- Show allocation in dashboard

---

# 32. Accommodation Management

Admin dashboard should show:

```text
Total Accommodation Requests

YES: 103
NO: 244
```

Filter by:

- Registration
- Gender, only if organizers legitimately collect it
- Institution
- Payment status

Do not collect unnecessary personal information.

---

# 33. Document Management

Admin should be able to upload:

- Background guides
- Rules of procedure
- Delegate handbook
- Schedule
- Notices
- Other conference documents

Documents can be associated with:

- Entire conference
- Specific committee
- Specific delegate

---

# 34. Announcement System

Admins should be able to publish:

### Example

**Important Update**

UNHRC background guide has been released.

**Published:** 10 September 2026

Delegates should see the announcement in their dashboard.

---

# 35. Schedule Management

The brochure confirms the event is two days but does not provide the detailed timetable.

Therefore the schedule must be admin-managed.

Admin can create:

```text
Date
Time
Session
Committee
Room
Description
```

Example:

```text
26 September

09:00
Registration

10:00
Opening Ceremony

11:00
Committee Session I
```

Actual times should only be added after organizer confirmation.

---

# 36. Core Committee Page

Display:

- Udita Rathi — Secretary General
- Somya Subham — Co-Secretary General
- Shubhangi Chakrawal — Director General
- Shreya Singh — Chef D Cabinet
- Preeti Soren — Charge D'Affairs

These are the core committee members listed in the brochure.

---

# 37. Advisory Committee

The brochure also lists an advisory committee consisting of 13 members, along with:

- Nodal Officer — Dr. Ashish Kumar Sonkar
- Mentor — Prof. Rachna Srivastava
- Patron — Smt. Uma Bhattacharya

The website may include this under:

**Leadership & Institutional Support**

rather than making it a prominent homepage section.

---

# 38. VVS 1.0 Gallery

Create a dedicated:

## VVS 1.0 — The Beginning of a Legacy

section.

Use photographs from the previous edition to establish:

- Previous conference activity
- Delegate participation
- Committee sessions
- Awards
- Community
- Event atmosphere

The brochure explicitly presents VVS 1.0 as the beginning of the VVS legacy.

---

# 39. Awards & Benefits

Display:

- Cash prizes
- Certificates
- Trophies
- Delegate kit
- Networking
- Workshops
- Social-media recognition
- Skill development
- Future VVS benefits

These are stated in the brochure.

The website must **not invent exact cash-prize amounts** because the brochure does not specify them.

---

# 40. FAQ

Recommended questions:

### Event

- What is VVS 2.0?
- When is VVS 2.0?
- Where is VVS 2.0?
- Who can participate?

### Registration

- What is the registration fee?
- How do I register?
- Can I edit my registration?
- How are committee preferences handled?

### Committees

- Which committees are available?
- What are the agendas?
- How are portfolios assigned?
- Can I change my preference?

### Payment

- How do I pay?
- How long does verification take?
- What happens if my payment is rejected?

### Accommodation

- Is accommodation available?
- What does accommodation cost?
- What does accommodation include?

Only publish answers after organizer confirmation where the brochure/form does not provide the information.

---

# 41. Contact Section

Display:

**Vasant Vaani Sansad 2.0**

Vasant Kanya Mahavidyalaya  
Kammacha, Varanasi

**Email:**  
vasantvaanisansad@gmail.com

**Contacts:**

Preeti Soren  
9631897232

Shreya Singh  
9305786651

WhatsApp  
9450378138

The brochure provides these contact details.

---

# 42. Instagram Integration

Official social handle:

**@ig._vvs**

Website should include:

- Instagram CTA
- Previous event gallery
- Social media updates
- Event announcements

The website should not depend on Instagram's API for its core functionality.

---

# 43. Design System

The website should take visual inspiration from the brochure without copying the brochure literally.

## Primary Visual Identity

### Colors

- Deep Navy / Blue
- Gold
- White / Off-white
- Subtle grey

### Typography

Use:

- Elegant serif font for major headings
- Clean sans-serif for body/UI

The design should communicate:

**Institutional + Premium + Youthful + Diplomatic**

---

# 44. Design Principles

## Do

- Large typography
- Strong visual hierarchy
- Generous whitespace
- Subtle animations
- High-quality photography
- Gold accent details
- Modern committee cards
- Clear CTAs
- Responsive design

## Don't

- Copy every decorative element from the brochure
- Use excessive gold borders
- Fill every section with text
- Use excessive animations
- Make the site look like a PDF
- Hide registration behind multiple pages

The brochure's visual identity should be translated into a modern web design rather than reproduced literally.

---

# 45. Responsive Requirements

The website must work on:

- Desktop
- Laptop
- Tablet
- Mobile

Registration should be especially optimized for mobile because many delegates will likely register from their phones.

Mobile requirements:

- Sticky Register button
- Large touch targets
- Mobile-friendly file upload
- Responsive committee cards
- Simple multi-step navigation
- Progress indicator

---

# 46. Registration UX

Registration should show:

```text
Step 1 of 5
Personal Details
```

Progress:

```text
●────○────○────○────○
1    2    3    4    5
```

Users should be able to:

- Go back
- Edit previous information
- See validation errors
- Save progress if authentication/session design supports it

---

# 47. Validation

Frontend and backend validation are both required.

### Email

Valid email format.

### Phone

Valid Indian phone format.

### Name

Minimum character validation.

### Institution

Required.

### Committee

At least one preference required.

### Committee duplication

Preference 1 ≠ Preference 2.

### Portfolio

Cannot select the same portfolio twice.

### Student ID

Allowed file formats and size validation.

### Payment

Transaction ID required when manual payment is selected.

---

# 48. Security Requirements

Because the system will collect student IDs and payment information, security is important.

Requirements:

- HTTPS
- Secure authentication
- HTTP-only cookies for admin authentication
- Password hashing
- Role-based access control
- File type validation
- File size validation
- Rate limiting
- Input sanitization
- API authorization
- Secure admin routes
- No sensitive data exposed in frontend responses
- No direct public access to private student documents

Admin access should be restricted.

---

# 49. Roles & Permissions

## Super Admin

Full access.

Can:

- Manage admins
- Manage committees
- Manage registrations
- Manage payments
- Manage allocations
- Manage documents
- Manage announcements

---

## Organizer

Can:

- View registrations
- Verify payments
- Allocate delegates
- Manage committees
- Publish announcements

---

## Content Manager

Can:

- Edit event information
- Manage gallery
- Manage schedule
- Upload documents

Cannot modify financial data unless explicitly permitted.

---

# 50. Database Collections

Recommended MongoDB collections:

```text
users
delegates
registrations
committees
portfolios
payments
allocations
documents
announcements
schedule
team_members
referral_codes
gallery
admin_users
```

Avoid creating unnecessary collections until the actual requirements justify them.

---

# 51. API Structure

Recommended backend structure:

```text
/api/auth
/api/registrations
/api/committees
/api/portfolios
/api/payments
/api/allocations
/api/documents
/api/announcements
/api/schedule
/api/team
/api/gallery
/api/admin
```

Example:

```text
POST /api/registrations
GET  /api/registrations/:id
PUT  /api/registrations/:id
```

Admin:

```text
GET  /api/admin/registrations
PUT  /api/admin/payments/:id/verify
PUT  /api/admin/allocations/:id
```

---

# 52. Recommended Technology Stack

## Frontend

- React
- Vite
- Tailwind CSS
- React Router
- Framer Motion
- Lucide React

## Backend

- Node.js
- Express.js

## Database

- MongoDB
- MongoDB Atlas

## File Storage

- Cloudinary or equivalent object storage

## Email

- Resend / SMTP provider

## Deployment

Frontend:

**Vercel**

Backend:

**Railway / Render**

Database:

**MongoDB Atlas**

---

# 53. SEO Requirements

The public website should include:

### Title

**Vasant Vaani Sansad 2.0 | Youth Parliament & MUN | Varanasi**

### Meta description

A concise description covering:

- VVS 2.0
- Youth Parliament
- MUN
- Varanasi
- Dates
- Registration

### SEO pages

Individual committee pages should be indexable.

Examples:

```text
/committees/lok-sabha
/committees/aippm
/committees/upla
/committees/unhrc
/committees/uncsw
/committees/press-conclave
```

---

# 54. Performance Requirements

Target:

- Fast first load
- Optimized images
- Lazy-loaded gallery
- WebP/AVIF where appropriate
- Minimal JavaScript on public pages
- Responsive images
- Good Core Web Vitals

Avoid loading enormous brochure images as full-resolution backgrounds.

---

# 55. Analytics

Track:

- Homepage visits
- Committee page views
- Registration CTA clicks
- Registration starts
- Registration completions
- Payment completion
- Committee preference distribution
- Traffic source
- Referral code usage

This is particularly valuable because the current form already asks how users discovered the event.

---

# 56. Registration Funnel Analytics

Admin should eventually be able to see:

```text
Visitors
  ↓
Registration Page
  ↓
Started Registration
  ↓
Completed Details
  ↓
Payment Initiated
  ↓
Payment Submitted
  ↓
Payment Verified
```

This allows the organizers to identify where people abandon registration.

---

# 57. MVP Scope

The first version should include:

### Public

- Homepage
- About
- Committees
- Agendas
- Awards
- Team
- VVS 1.0 gallery
- FAQ
- Contact
- Registration CTA

### Registration

- Personal details
- Student ID upload
- Committee preferences
- Portfolio preferences
- MUN experience
- Referral code
- Marketing source
- Accommodation
- ₹599 payment
- Transaction ID
- Payment screenshot
- Confirmation

### Admin

- Login
- Registration management
- Payment verification
- Committee management
- Portfolio management
- Delegate allocation
- CSV export

---

# 58. Phase 2

After MVP:

- Delegate dashboard
- Automated emails
- Background guides
- Rules of procedure
- Announcements
- Schedule
- Certificate generation
- Accommodation management
- Advanced analytics
- Referral analytics
- QR-based delegate check-in

---

# 59. Phase 3

Optional advanced functionality:

### On-site conference system

QR check-in:

```text
Delegate QR
     ↓
Scan
     ↓
Attendance
     ↓
Committee
     ↓
Session
```

Potential features:

- Attendance
- Session tracking
- Digital ID
- Delegate notifications
- Live announcements
- Emergency announcements
- Certificate download

---

# 60. Out of Scope for MVP

Unless organizers explicitly request them:

- Hotel booking
- Travel booking
- Social networking between delegates
- Live video streaming
- Chat system
- AI chatbot
- Automated MUN judging
- Automated award scoring
- Complex payment reconciliation
- Public delegate directory

These would increase development complexity without being necessary for launch.

---

# 61. Important Missing Information

Before development reaches the registration stage, VVS organizers must provide the following.

## Registration

- Exact phone-number requirement
- Registration deadline
- Eligibility criteria
- Cancellation/refund policy
- Whether registration can be edited
- Whether registration can be transferred

## Committees

- Exact portfolio lists
- Committee capacities
- Chairperson names
- Vice-chair/rapporteur details
- Committee-specific rules

## Payment

- Official UPI ID
- Payment verification procedure
- Refund procedure
- Payment failure procedure
- Whether payment gateway is required

## Accommodation

- Availability
- Price
- Number of nights
- Check-in/check-out
- Facilities
- Capacity
- Eligibility

## Conference

- Exact timetable
- Room allocation
- Dress code
- Food arrangements
- Transportation
- Orientation schedule
- Background guide release date
- Position-paper requirements
- Rules of procedure

## Awards

- Exact prize amounts
- Award categories
- Certificate types
- Award criteria

**Do not invent these details on the website.**

---

# 62. Success Metrics

The website should be considered successful if:

### Registration

- Delegates can complete registration in under 5–7 minutes.
- Registration works smoothly on mobile.
- Payment status can be tracked.
- Organizers no longer need Google Forms for primary registration.

### Administration

- Organizers can search registrations quickly.
- Payment verification is centralized.
- Committee allocation can be done without spreadsheet manipulation.
- Data can be exported.

### Marketing

- Visitors understand VVS within 10 seconds.
- Committee agendas are easy to discover.
- Registration CTA is always accessible.
- Traffic sources can be measured.

---

# 63. Key User Journey

## New Delegate

```text
Instagram / WhatsApp / Direct Link
              ↓
          VVS Website
              ↓
          Learn About VVS
              ↓
       Explore Committees
              ↓
         View Agendas
              ↓
          Register Now
              ↓
       Personal Details
              ↓
     Committee Preferences
              ↓
     Portfolio Preferences
              ↓
      Additional Details
              ↓
           ₹599 Payment
              ↓
          Submit Proof
              ↓
      Registration Created
              ↓
       Confirmation Email
              ↓
       Delegate Dashboard
              ↓
       Committee Allocation
              ↓
       Portfolio Allocation
              ↓
       Documents & Updates
```

---

# 64. Organizer Journey

```text
Admin Login
     ↓
Dashboard
     ↓
View Registrations
     ↓
Verify Payments
     ↓
Manage Committee Capacity
     ↓
Allocate Committees
     ↓
Allocate Portfolios
     ↓
Publish Documents
     ↓
Publish Announcements
     ↓
Manage Schedule
     ↓
Export Final Delegate Data
```

---

# 65. Design Philosophy

The website should feel like:

**Parliamentary institution**
+
**Premium conference**
+
**Modern youth event**
+
**Professional MUN platform**

The brochure's blue/gold identity should be retained, but the website should not literally reproduce the PDF's heavy borders, dense typography and decorative elements.

The website should be cleaner, more spacious and interactive.

---

# 66. Final Product Definition

The finished product should not be described as merely:

> "VVS event website."

It should be treated as:

> **Vasant Vaani Sansad 2.0 — Official Conference Website & Delegate Management Platform**

It has three major systems:

### 1. Marketing Website

Used to attract and inform delegates.

### 2. Registration System

Used to collect and process delegate registrations and payments.

### 3. Conference Management Portal

Used by organizers and delegates to manage allocations, documents, announcements and event participation.

---

# 67. MVP Priority Order

If development time is limited, build in this exact order:

### P0 — Critical

1. Homepage
2. Committee pages
3. Registration
4. Payment submission
5. Admin authentication
6. Registration dashboard
7. Payment verification
8. Committee allocation
9. Portfolio allocation

### P1 — Important

10. Delegate dashboard
11. Email notifications
12. Documents
13. Schedule
14. Announcements
15. FAQ
16. Gallery

### P2 — Nice to have

17. Referral analytics
18. Certificate generation
19. QR check-in
20. Advanced analytics
21. Live conference features

---

# 68. Core Product Principle

The most important requirement is:

> **The website should reduce work for both delegates and organizers.**

A beautiful landing page is not enough.

The actual value of your implementation is that VVS can move from:

**Google Form → Google Sheets → Manual Payment Checking → Manual Allocation → WhatsApp Updates**

toward:

**Website → Structured Registration → Payment Verification → Allocation → Delegate Dashboard → Automated Communication**

That is the difference between an event website and an actual conference platform.