# Mobile Menu Plan

Prepared for: kefas4plateau.com  
Date: 2026-05-31  
Scope: Mobile navigation pattern, layout, behaviour, colours, accessibility, and component structure.

## Mobile Menu Goal

The mobile menu should feel official, fast, and easy to operate with one hand. It should help visitors reach the main content areas without visual clutter.

Primary user tasks:

- Read the candidate profile
- Browse public-service projects
- Explore issue areas
- Check news and updates
- Contact the team

## Simplicity Rules

- Do not add decorative pills, badges, chips, or repeated status rows.
- Do not add a second logo subtitle if the header becomes crowded.
- Do not duplicate the Contact action in several places; use one clear button in the drawer.
- Use plain rows and accordions, not visual flourishes.

## Recommended Pattern

Use a right-side slide-in drawer.

Why this works:

- Keeps the header compact
- Gives enough room for grouped links
- Feels familiar on mobile
- Lets the menu include contact/social information without crowding the header

Alternative acceptable pattern:

- Full-screen overlay menu

Avoid:

- Tiny dropdown-only menu
- Multi-column mobile menus
- Mega menu on mobile
- Bottom navigation, because the site has too many sections for it

## Header Bar

### Layout

Height: `64px`

```text
┌───────────────────────────────┐
│ Kefas Ropshik             ☰  │
└───────────────────────────────┘
```

Left:

- Text logo / wordmark

Right:

- Icon button for menu toggle

Optional:

- `3px` top stripe in PDP green
- Tiny red accent line under active section only

### Header Styling

```css
.mobile-header {
  height: 64px;
  background: #ffffff;
  border-bottom: 1px solid #d9e5de;
  border-top: 3px solid #008751;
}
```

Logo text:

- `Kefas Ropshik`
- Colour: `#005F39`
- Weight: `700`
- Size: `17px`
- Line-height: `1`

Avoid a second header subtitle on small screens unless the client specifically requires the popular name to remain visible.

## Menu Toggle Button

Use a standard icon button.

Closed state:

- Icon: menu
- Label for screen readers: `Open menu`

Open state:

- Icon: X
- Label for screen readers: `Close menu`

Size:

- Button: `44px x 44px`
- Icon: `24px`

Colours:

- Default icon: `#005F39`
- Hover/pressed background: `#E6F4EE`
- Focus ring: `2px solid #D71920`

## Drawer Layout

### Position

Right-side drawer.

```css
.mobile-drawer {
  position: fixed;
  top: 0;
  right: 0;
  width: min(88vw, 380px);
  height: 100dvh;
  background: #ffffff;
  border-left: 1px solid #d9e5de;
  box-shadow: -24px 0 60px rgba(0, 0, 0, 0.18);
}
```

### Overlay

Use a dim overlay behind the drawer.

```css
.mobile-menu-overlay {
  position: fixed;
  inset: 0;
  background: rgba(23, 35, 29, 0.42);
}
```

Overlay behaviour:

- Tap overlay to close
- Press `Escape` to close
- Prevent body scroll while drawer is open

## Drawer Structure

```text
┌─────────────────────────────┐
│ Kefas Ropshik          [X] │
│ Kefiano                     │
├─────────────────────────────┤
│ Home                        │
│ About                       │
│ Public Service          +   │
│ Projects                    │
│ Agenda                  +   │
│ News                        │
│ Gallery                     │
│ Contact                     │
├─────────────────────────────┤
│ [Contact Team]              │
│ Media enquiries             │
│ Social links                │
└─────────────────────────────┘
```

### Drawer Sections

1. Drawer header
2. Primary nav list
3. Contact button
4. Small contact/social area

## Drawer Header

Height: about `76px`

Content:

- Wordmark
- Subname `Kefiano`
- Close button

Styling:

- Background: white
- Bottom border: `1px solid #d9e5de`
- Top accent: `4px solid #008751`

## Primary Nav List

### Main Links

Recommended mobile menu order:

1. Home
2. About
3. Public Service
4. Projects
5. Agenda
6. News
7. Gallery
8. Contact

### Link Styling

Default:

```css
.mobile-nav-link {
  min-height: 48px;
  padding: 0 20px;
  color: #17231d;
  font-size: 16px;
  font-weight: 650;
}
```

Active:

```css
.mobile-nav-link[data-active="true"] {
  color: #005f39;
  background: #e6f4ee;
  border-left: 4px solid #d71920;
}
```

Hover/pressed:

```css
.mobile-nav-link:active {
  background: #f7faf8;
}
```

## Expandable Groups

Use expandable accordions for:

- Public Service
- Agenda

Do not open nested pages as hover dropdowns on mobile.

### Public Service Group

Parent:

```text
Public Service
```

Children:

- Healthcare
- Youth & Innovation
- Community Support
- Enterprise Support

### Agenda Group

Parent:

```text
Agenda
```

Children:

- Security & Peace
- Youth Empowerment
- Jobs & Enterprise
- Healthcare
- Agriculture & Industry
- Infrastructure

### Accordion Behaviour

- Tap parent row once to expand/collapse.
- Parent rows expand/collapse; include an `Overview` child link for the group landing page.
- Chevron rotates `180deg` when open.
- Keep only one group open at a time unless the implementation is simpler with multiple open groups.
- If current route is inside a group, open that group by default.

### Accordion Styling

Child links:

```css
.mobile-subnav-link {
  min-height: 42px;
  padding-left: 36px;
  padding-right: 20px;
  color: #647067;
  font-size: 14px;
  font-weight: 600;
}
```

Active child:

```css
.mobile-subnav-link[data-active="true"] {
  color: #005f39;
  background: #f7faf8;
}
```

## Contact Area

Place near the bottom of the drawer.

Primary button:

```text
Contact Team
```

Button style:

- Background: `#008751`
- Text: white
- Height: `46px`
- Radius: `6px`
- Full width within drawer padding

Secondary text:

```text
Media enquiries and official contact details
```

Only show phone/email/social icons after the client confirms them.

## Drawer Footer

Small text:

```text
Chief Kefas Wungak Ropshik
Public profile and official updates
```

Optional verified social links:

- Facebook
- X
- Instagram
- YouTube

Icon colour:

- Default: `#005F39`
- Hover/pressed: `#D71920`

## Mobile Menu Colours

| Element | Colour |
| --- | --- |
| Header background | `#FFFFFF` |
| Drawer background | `#FFFFFF` |
| Overlay | `rgba(23, 35, 29, 0.42)` |
| Primary text | `#17231D` |
| Secondary text | `#647067` |
| Active background | `#E6F4EE` |
| Primary green | `#008751` |
| Dark green | `#005F39` |
| Red accent | `#D71920` |
| Border | `#D9E5DE` |

## Motion

Drawer animation:

- Duration: `220ms`
- Easing: `cubic-bezier(0.22, 1, 0.36, 1)`
- Transform from `translateX(100%)` to `translateX(0)`

Overlay animation:

- Fade in/out
- Duration: `180ms`

Respect reduced motion:

```css
@media (prefers-reduced-motion: reduce) {
  .mobile-drawer,
  .mobile-menu-overlay {
    transition: none;
  }
}
```

## Accessibility Requirements

- Toggle button must use `aria-expanded`.
- Toggle button must use `aria-controls`.
- Drawer should use `role="dialog"` or `role="navigation"` with clear label.
- Use `aria-label="Mobile navigation"`.
- Trap focus while drawer is open.
- Return focus to menu button after close.
- Close on `Escape`.
- Close menu after clicking a route link.
- Do not rely on red alone for active states.
- All tap targets should be at least `44px` high.

## Suggested Component State

```ts
type MobileMenuState = {
  isOpen: boolean;
  openGroup: "public-service" | "agenda" | null;
};
```

## Suggested Navigation Data

```ts
export const mobileNavItems = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  {
    label: "Public Service",
    href: "/public-service",
    key: "public-service",
    children: [
      { label: "Overview", href: "/public-service" },
      { label: "Healthcare", href: "/public-service/healthcare" },
      { label: "Youth & Innovation", href: "/public-service/youth-innovation" },
      { label: "Community Support", href: "/public-service/community-support" },
      { label: "Enterprise Support", href: "/public-service/enterprise-support" }
    ]
  },
  { label: "Projects", href: "/projects" },
  {
    label: "Agenda",
    href: "/agenda",
    key: "agenda",
    children: [
      { label: "Overview", href: "/agenda" },
      { label: "Security & Peace", href: "/agenda/security-peace" },
      { label: "Youth Empowerment", href: "/agenda/youth-empowerment" },
      { label: "Jobs & Enterprise", href: "/agenda/jobs-enterprise" },
      { label: "Healthcare", href: "/agenda/healthcare" },
      { label: "Agriculture & Industry", href: "/agenda/agriculture-industry" },
      { label: "Infrastructure", href: "/agenda/infrastructure" }
    ]
  },
  { label: "News", href: "/news" },
  { label: "Gallery", href: "/gallery" },
  { label: "Contact", href: "/contact" }
];
```

## Suggested Markup Shape

```tsx
<header className="mobile-header">
  <a href="/" className="mobile-logo" aria-label="Kefas Ropshik home">
    <span>Kefas Ropshik</span>
    <small>Kefiano</small>
  </a>

  <button
    type="button"
    className="mobile-menu-button"
    aria-label={isOpen ? "Close menu" : "Open menu"}
    aria-expanded={isOpen}
    aria-controls="mobile-navigation"
  >
    {isOpen ? <X /> : <Menu />}
  </button>
</header>

{isOpen && (
  <>
    <button className="mobile-menu-overlay" aria-label="Close menu" />
    <nav
      id="mobile-navigation"
      className="mobile-drawer"
      aria-label="Mobile navigation"
    >
      ...
    </nav>
  </>
)}
```

## Interaction Details

### Opening

1. User taps menu icon.
2. Overlay fades in.
3. Drawer slides in from right.
4. Focus moves to close button or first nav link.

### Closing

Close when:

- User taps X.
- User taps overlay.
- User presses Escape.
- User selects a route link.

### Accordion

1. User taps parent row.
2. Chevron rotates.
3. Children expand below parent.
4. Active child uses green text and soft background.

## Implementation Checklist

- Build `MobileHeader` component.
- Build `MobileDrawer` component.
- Add body scroll lock.
- Add focus trap.
- Add Escape key close.
- Add active route detection.
- Auto-open active group.
- Close drawer on route change.
- Confirm contact/social data before showing it.
- Test at 320px, 375px, 430px, and tablet widths.
