# Design Guidelines: Platobot - Nyenrode Leadership Coach

## Design Approach
**Nyenrode Corporate Identity** - Following the Nyenrode Business University Huisstijlhandboek for professional, academic excellence. Clean, structured layouts with the iconic Nyenrode blue palette and emphasis on thoughtful, Socratic dialogue.

## Core Design Elements

### Typography System
**Primary Font:** Calibri (Nyenrode standard for digital)
- Hero/Main Heading: text-4xl font-bold (36px)
- Section Headings: text-2xl font-bold (24px)
- Subheadings: text-lg font-bold (18px)
- Body Text: text-base font-normal (16px)
- Chat Messages: text-base (16px)
- Helper Text: text-sm (14px)

### Color Palette (Nyenrode Corporate)
**Primary Colors:**
- Corporate Blue: #5E7291 (RGB: 94, 114, 145) - Main brand color
- Corporate Dark: #355071 (RGB: 53, 80, 113) - Headers, text accents
- Corporate Accent: #FBBA20 (RGB: 251, 187, 32) - Highlights, CTAs

**Supporting Colors:**
- Background: White (#FFFFFF)
- Text: Dark gray (#1F2937)
- Muted text: Medium gray (#6B7280)

### Layout System
**Spacing Primitives:** Tailwind units of 4, 6, 8, 12
- Section padding: py-12 (desktop), py-8 (mobile)
- Component spacing: gap-6 between major elements
- Inner padding: p-6 for cards
- Tight spacing: gap-3 for related elements

**Container Structure:**
- Max-width: max-w-5xl for content sections
- Chat container: max-w-4xl mx-auto centered
- Blue bars with logo following Nyenrode guidelines

### Page Structure

**Hero Section (60vh):**
- Centered layout with max-w-4xl container
- Large heading explaining the chatbot's purpose
- Subtitle describing key capabilities
- CTA button "Start Chatting" that scrolls to chat interface
- Backdrop blur effect on CTA button for visual depth

**Chat Interface Section:**
- Prominent, full-width section with py-16 padding
- Centered container (max-w-4xl)
- Chat iframe embedded at 700px height (desktop), full height on mobile
- Rounded corners (rounded-xl) with subtle elevation
- Section heading above chat: "Chat with [Bot Name]"

**Features Grid (Optional but Recommended):**
- 3-column grid (lg:grid-cols-3 md:grid-cols-2 grid-cols-1)
- Feature cards with gap-8 spacing
- Each card: icon placeholder, heading (text-xl), description (text-base)
- Padding p-6 on each card, rounded-lg borders

**Footer:**
- Simple, centered layout with py-12 padding
- Links to privacy policy, terms of service
- Copyright notice
- Social links if applicable

### Component Library

**Navigation Header:**
- Fixed or sticky positioning
- Horizontal layout with logo left, nav items right
- Height: h-16
- Padding: px-6
- Navigation items: gap-8 spacing

**Chat Container:**
- Border treatment with rounded-xl
- Shadow elevation for depth
- Responsive height: h-[700px] desktop, h-[600px] tablet, h-[500px] mobile
- iframe styling: w-full h-full with frameborder="0"

**CTA Buttons:**
- Large size: px-8 py-4 text-lg
- Medium size: px-6 py-3 text-base
- Rounded corners: rounded-full for primary actions
- Backdrop blur for buttons over images: backdrop-blur-md bg-opacity-90

**Feature Cards:**
- Consistent padding: p-6
- Border radius: rounded-lg
- Icon container: w-12 h-12 rounded-lg (placeholder for icon library)
- Text hierarchy: heading (font-semibold text-xl), body (text-base)

### Icons
**Library:** Heroicons via CDN
- Use outline style for navigation and general UI
- Use solid style for feature highlights and primary actions
- Icon size: w-6 h-6 for navigation, w-12 h-12 for feature cards

### Responsive Behavior
**Breakpoints:**
- Mobile: Base styles, single column layouts
- Tablet (md:): 2-column grids, adjusted spacing
- Desktop (lg:): 3-column grids, full layout expansion

**Chat Interface Responsiveness:**
- Desktop: Fixed height container (700px)
- Tablet: Reduced height (600px)
- Mobile: Further reduced (500px) with full-width

### Images
**Hero Section Background:** Use a subtle, abstract tech/AI-themed image or gradient overlay. If using an image, apply overlay with backdrop-blur and opacity for text readability.

**No additional images required** - the chatbot interface is the primary visual element.

### Accessibility
- All interactive elements have adequate touch targets (min 44x44px)
- Form inputs and chat interface maintain consistent focus states
- Semantic HTML structure with proper heading hierarchy
- ARIA labels for chat iframe: aria-label="Chatbot conversation interface"

### Animation Guidelines
**Minimal animations only:**
- Smooth scroll behavior for anchor links
- Subtle fade-in for chat loading state
- Hover states on buttons (no custom animations beyond default)
- No scroll-triggered or complex animations

### Key Principles
1. **Chat-First Design:** The chatbot interface is the hero - make it prominent and accessible
2. **Professional Credibility:** Clean, corporate aesthetic that builds trust
3. **Minimal Distractions:** Focus user attention on the chat interaction
4. **Responsive Excellence:** Ensure chat works seamlessly across all devices
5. **Clear Hierarchy:** Guide users from introduction → engagement → interaction