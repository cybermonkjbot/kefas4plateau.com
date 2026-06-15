# Responsive Component Plan

Prepared for: kefas4plateau.com  
Date: 2026-05-31  
Scope: How major components should feel and look on mobile compared with desktop.

## Overall Responsive Principle

Desktop should feel broad, composed, and editorial. Mobile should feel focused, sequential, and easy to operate with one thumb.

The same visual identity should carry across both:

- PDP green as the main identity colour
- Red as a small accent
- White/off-white as the dominant surface
- Real photography as the main visual asset
- Calm, civic typography

The difference is density and sequencing:

- Desktop can show relationships side-by-side.
- Mobile should reveal one idea at a time.

## Simplicity Rules

- Avoid pill-shaped UI, decorative badges, chip rows, and filler metadata.
- Avoid eyebrow labels; make the heading and first sentence carry the context.
- Avoid repeated summary strips and duplicate actions in the same viewport.
- Prefer direct headings, direct links, and components that carry real content.
- Cards should be reserved for repeated content items such as projects or articles.

## Breakpoints

Recommended breakpoints:

```css
--bp-sm: 480px;
--bp-md: 768px;
--bp-lg: 1024px;
--bp-xl: 1280px;
```

Suggested behaviour:

- `0-767px`: mobile-first stacked layout
- `768-1023px`: tablet, 2-column where useful
- `1024px+`: desktop layout

## Shared Spacing Rules

### Desktop

- Page section padding: `80px 0`
- Inner container: `min(1200px, calc(100% - 48px))`
- Grid gap: `28px-40px`
- Header height: `76px`

### Mobile

- Page section padding: `48px 0`
- Inner container: `calc(100% - 32px)`
- Grid gap: `16px-24px`
- Header height: `64px`

Mobile should never feel like a squeezed desktop page. It should read like a clear story.

## Typography Feel

### Desktop

- Hero headline: `56px-72px`
- Section heading: `36px-44px`
- Body: `17px-18px`
- Cards/metadata: `14px-16px`
- More generous line lengths

### Mobile

- Hero headline: `38px-44px`
- Section heading: `28px-34px`
- Body: `16px`
- Cards/metadata: `14px-15px`
- Shorter line lengths
- More vertical rhythm

Do not scale type with viewport units. Use fixed responsive steps.

## Component 1: Main Header

### Desktop Feel

The desktop header should feel official and settled, like a civic institution site:

- Full navigation visible
- Wordmark left
- Nav links in one row
- One restrained Contact button
- Thin green border or top stripe
- White background

Desktop layout:

```text
[Wordmark]     Home About Public Service Projects Agenda News Gallery     [Contact]
```

### Mobile Feel

The mobile header should feel compact and practical:

- Wordmark left
- Menu icon right
- No visible nav links
- Sticky top
- Clear tap target
- Green top stripe for identity

Mobile layout:

```text
[Kefas Ropshik]                                      [Menu]
```

Mobile change:

- Hide desktop nav.
- Hide desktop Contact button.
- Use drawer menu.
- Keep logo shorter if needed.

## Component 2: Mobile Drawer Menu

### Desktop Equivalent

Desktop uses visible nav links and small dropdowns.

### Mobile Feel

The drawer should feel like a focused control panel:

- Right-side slide-in
- White surface
- Strong but calm green identity
- Large rows
- Accordion groups for deeper pages
- Contact button near bottom

Mobile interaction:

- Tap opens drawer
- Tap overlay closes
- Accordions expand Public Service and Agenda
- Active item has green soft background and red left border

Mobile should avoid:

- Mega-menu panels
- Tiny links
- Hover-only interactions
- Multi-column navigation

## Component 3: Hero

### Desktop Feel

The hero should feel spacious, confident, and photographic:

- Text and portrait/public image side-by-side
- Large name headline
- Two buttons plus one text link
- Next section peeks below fold

Desktop layout:

```text
┌────────────────────────────────────────────────────┐
│ Chief Kefas Wungak Ropshik       [Portrait/Image]  │
│ Intro copy                                          │
│ [Explore Projects] [Read Biography] Latest Updates │
└────────────────────────────────────────────────────┘
```

### Mobile Feel

The mobile hero should feel direct and personal:

- One-column layout
- Headline first
- Portrait close to the top, not buried
- Buttons stacked or wrapped
- Keep hero shorter than full screen

Mobile layout:

```text
Chief Kefas Wungak Ropshik
Short intro copy
[Portrait/Image]
[Explore Projects]
[Read Biography]
```

Mobile changes:

- Reduce intro copy length if needed.
- Use one primary button full-width.
- Secondary button can be outline full-width.
- Avoid side-by-side content.
- Image aspect ratio: `4 / 5` or `3 / 4`.
- Do not add a separate trust strip below the hero.

## Component 4: Public Service Snapshot

### Desktop Feel

Desktop should feel like a concise dashboard of the public record:

- Section heading and intro
- Four feature blocks in one row
- Icons and short descriptions
- Links to category pages

Desktop layout:

```text
Public Service Snapshot
[Healthcare] [Youth & Innovation] [Community Support] [Enterprise]
```

### Mobile Feel

Mobile should feel scannable and thumb-friendly:

- Heading and intro stacked
- Feature blocks in one column or two-column compact grid
- Each block has icon, title, one sentence, arrow
- No tiny text

Recommended mobile layout:

```text
Public Service Snapshot
Intro copy

[Icon] Healthcare
Short text

[Icon] Youth & Innovation
Short text

[Icon] Community Support
Short text

[Icon] Enterprise
Short text
```

Mobile changes:

- Use full-width touch rows if content is long.
- Keep icon size around `22px`.
- Keep block padding `16px`.
- Avoid four small cards squeezed into a row.

## Component 5: Featured Project

### Desktop Feel

Desktop should feel editorial and evidence-led:

- Large image left
- Project copy right
- Metadata row
- Buttons
- Off-white band

Desktop layout:

```text
[Project Image]     Featured Project
                    JUTH Accident And Emergency Unit
                    Body copy
                    Category | Location | Status
                    [View Project] [See Public Service]
```

### Mobile Feel

Mobile should feel like a project story:

- Image first
- Heading below
- Metadata stacked as plain rows
- One full-width primary button
- Secondary link below

Mobile layout:

```text
[Project Image]
Featured Project
JUTH Accident And Emergency Unit
Body copy
Category: Healthcare
Location: Jos
Status: Reported completed
[View Project]
See Public Service
```

Mobile changes:

- Image aspect ratio: `16 / 10`.
- Metadata becomes stacked.
- Body copy max: 2 short paragraphs.
- Buttons full-width or one button plus text link.

## Component 6: Youth And Creative Economy

### Desktop Feel

Desktop should feel energetic but still official:

- Text and facts on one side
- Training photo or image grid on the other
- Clear data points
- Green bullets

Desktop layout:

```text
Youth And Creative Economy       [Photo Grid]
Body copy                        [Training Image]
- Creative and digital skills
- Reported 119 youth trainees
- Jos-based hub
[Explore Youth Projects]
```

### Mobile Feel

Mobile should feel practical and inspiring through real images:

- Heading first
- Short body copy
- Fact list
- Image after facts
- Full-width button

Mobile layout:

```text
Youth And Creative Economy
Body copy
[Fact] Creative and digital skills
[Fact] Reported 119 youth trainees
[Fact] Jos-based hub
[Image]
[Explore Youth Projects]
```

Mobile changes:

- Use single strong image instead of grid if space is tight.
- Facts should become compact rows.
- Avoid dense paragraphs.
- Keep red accents minimal.

## Component 7: Community Outreach And Issue Areas

### Desktop Feel

Desktop should feel like a strong closing band:

- Dark green background
- Two columns
- White text
- Links in each column
- Two actions

Desktop layout:

```text
┌──────────────────────────────────────────────────────┐
│ Community Outreach       Public Issue Areas          │
│ Copy                     Copy                        │
│ Links                    Links                       │
│ [View All Projects] [Read Latest News]               │
└──────────────────────────────────────────────────────┘
```

### Mobile Feel

Mobile should feel like two clear panels in a stacked closing section:

- Dark green band
- Community Outreach block first
- Issue Areas block second
- Links stacked
- Buttons full-width

Mobile layout:

```text
Community Outreach
Copy
Widows Support
Food Relief
Enterprise Support

Public Issue Areas
Copy
Security & Peace
Jobs & Enterprise
Agriculture & Industry

[View All Projects]
[Read Latest News]
```

Mobile changes:

- Add more vertical spacing between the two blocks.
- Use white links with red underline on hover/focus.
- Keep paragraphs short.
- Ensure button text does not wrap awkwardly.

## Component 8: Project Cards

### Desktop Feel

Project cards should feel structured and archival:

- 3-column grid
- Image top
- Category text
- Title
- Short summary
- Metadata
- Link

Desktop layout:

```text
[Card] [Card] [Card]
[Card] [Card] [Card]
```

### Mobile Feel

Project cards should feel like a clean list of records:

- One card per row
- Image remains visible
- Summary trimmed
- Metadata appears as short rows
- Entire card or clear link is tappable

Mobile layout:

```text
[Image]
Healthcare
JUTH Accident And Emergency Unit
Short summary
Jos | 2024
View Project →
```

Mobile changes:

- One column.
- Card radius max `8px`.
- Stable image height/aspect ratio.
- No hover-only reveals.
- Keep summary under 3 lines.

## Component 9: Agenda / Issue Cards

### Desktop Feel

Agenda cards should feel policy-oriented:

- 2 or 3 columns
- Icon
- Issue title
- Short description
- Link to detail page

### Mobile Feel

Agenda cards should feel like a readable issue list:

- Single-column rows
- Icon left, text right if concise
- Otherwise icon top, text below
- Active/focus state visible

Mobile changes:

- Prefer row layout for short issue names.
- Use green icon on soft-green background.
- Use red accent only for active/focus.

## Component 10: News Cards

### Desktop Feel

Desktop news should feel like a press archive:

- Featured article large
- Recent articles in grid/list
- Outlet/date visible
- Category text only when it adds useful context

### Mobile Feel

Mobile news should feel like a timeline:

- One article per row
- Date and source first
- Headline
- Short excerpt
- Link

Mobile changes:

- Hide large excerpts after 2 lines.
- Avoid tiny outlet logos.
- Dates should remain readable.
- Use simple list dividers for density.

## Component 11: Gallery

### Desktop Feel

Desktop gallery can use a masonry-like or even grid:

- 3 or 4 columns
- Filters by category
- Lightbox on click

### Mobile Feel

Mobile gallery should use a simple 2-column grid:

- Square or `4 / 3` thumbnails
- Tap opens full-screen lightbox
- Swipe between images if supported

Mobile changes:

- Use lazy loading.
- Avoid masonry on mobile; it creates awkward scroll jumps.
- Keep captions short.

## Component 12: Footer

### Desktop Feel

The desktop footer should feel like a civic information hub:

- Four columns
- Brand/about
- Explore links
- Public-service links
- Contact
- Lower copyright strip
- Dark green background

Desktop layout:

```text
Brand/About | Explore | Public Service | Contact
Lower footer bar
```

### Mobile Feel

The mobile footer should feel like a compact directory:

- Stacked sections
- Brand intro first
- Accordion-style link groups optional
- Contact details last
- Copyright at bottom

Mobile layout:

```text
Chief Kefas W. Ropshik
Short profile

Explore
Links...

Public Service
Links...

Contact
Details...

© 2026 ...
```

Mobile changes:

- Stack all columns.
- Increase link tap height to `40px`.
- Keep footer text readable on dark green.
- Do not cram social icons into one tight row if labels are needed.

## Component 13: Buttons

### Desktop Feel

Buttons should be compact and intentional:

- Primary green filled
- Secondary white/outline
- Inline text links for tertiary actions

### Mobile Feel

Buttons should be easy to tap:

- Full-width when used in hero and major sections
- Minimum height `46px`
- Text centered
- Spacing between buttons `10px-12px`

Mobile changes:

- Convert side-by-side buttons to stacked buttons below `480px`.
- Keep labels short.
- Avoid more than two buttons in one mobile section.

## Component 14: Forms

### Desktop Feel

Forms should be calm and businesslike:

- Two-column fields where appropriate
- Message field full-width
- Contact details beside form

### Mobile Feel

Forms should be single-column:

- Labels above inputs
- Full-width fields
- Large tap targets
- Submit button full-width

Mobile changes:

- No side-by-side first/last name unless very wide.
- Add enough vertical spacing.
- Keep helper/error text near the field.

## Responsive Image Rules

### Desktop

- Use larger crops and side-by-side composition.
- Show environmental context where available.
- Maintain consistent aspect ratios across repeated cards.

### Mobile

- Use closer crops with clear faces/actions.
- Avoid wide group shots where people become too small.
- Use one strong image instead of complex image grids.
- Keep image focal point centered or slightly top-centered.

Recommended aspect ratios:

- Hero portrait: `4 / 5`
- Featured project: `16 / 10`
- Project cards: `4 / 3`
- Gallery thumbnails: `1 / 1` or `4 / 3`

## Responsive Colour Feel

### Desktop

Can use more white space and subtle colour bands:

- White header
- Off-white hero
- White content sections
- Off-white featured project
- Dark green closing section/footer

### Mobile

Use colour to orient users:

- Green top stripe in header
- Soft-green active states
- Dark green closing/footer sections
- Red only for thin active markers and accents

Mobile should not alternate too many background colours. Keep transitions calm.

## Responsive Interaction Rules

Desktop:

- Hover states
- Dropdowns
- Larger click areas
- Side-by-side comparison

Mobile:

- Tap states
- Accordions
- Drawer
- Full-width buttons
- One-column reading flow

Avoid on mobile:

- Hover-only content
- Small inline links buried in paragraphs
- Horizontal scrolling except where the content itself requires it
- Sticky elements that cover too much content

## Page-Level Mobile Flow

Recommended mobile homepage flow:

1. Header
2. Hero text
3. Hero image
4. Primary actions
5. Trust strip
6. Public Service Snapshot
7. Featured Project
8. Youth And Creative Economy
9. Community Outreach And Issue Areas
10. Footer

This should feel like a story, not a dashboard.

## Implementation Checklist

- Build mobile-first CSS, then enhance for desktop.
- Use CSS grid/flex only where layout truly changes.
- Test at `320px`, `375px`, `430px`, `768px`, `1024px`, and desktop.
- Ensure no section heading wraps into awkward single-word lines.
- Ensure buttons fit longest labels.
- Ensure image crops still show the important subject on mobile.
- Ensure tap targets are at least `44px`.
- Ensure mobile menu does not hide behind browser UI.
- Ensure footer remains readable on dark green.
- Ensure no desktop-only hover content is required on mobile.
