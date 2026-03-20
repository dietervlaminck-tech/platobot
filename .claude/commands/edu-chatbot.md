# Educational Chatbot Builder

You are helping the user create or repurpose an educational Socratic chatbot based on the Platobot template in this repository.

## Step 1: Gather Context

Before making ANY changes, ask the user the following questions using AskUserQuestion (ask all in one call):

1. **Target audience** — Who will use this chatbot? (e.g. university students, high school, corporate training, teachers)
2. **Learning goal** — What should participants learn or reflect on? What are the key discussion questions or themes?
3. **Educational setting** — How will this be used?
   - Group exercise (like current Platobot — multiple people around one device)
   - Individual self-study
   - Online/remote (each participant on their own device)
   - Hybrid
4. **Language** — What language should the chatbot communicate in? (Current default is Dutch)

## Step 2: Design the Chatbot

Once you have the answers, design the chatbot by planning changes across content, UI text, and styling.

### System Prompt (the core personality & pedagogy)
The system prompt lives in three places that must stay in sync:
- `shared/system-prompt.ts` (source of truth)
- `api/chat/index.ts` (Vercel serverless — contains inline copy)
- `api/chat/stream.ts` (Vercel streaming — contains inline copy)

Key sections to rewrite:
- **Identity**: Name and role (line 1 area — "Je bent Platobot, een Socratische gesprekspartner voor...")
- **Context & Goal**: The educational setting, learning objectives, core discussion questions
- **Opening message**: The first message the bot sends to greet users
- **Core themes**: The subject-matter knowledge the bot should draw on
- **Behavioral rules**: Adjust for group vs individual, formality level, Socratic depth
- **Language directive**: Currently hardcoded to Dutch ("Communiceer UITSLUITEND in het Nederlands")

### UI Text & Branding
- `client/src/components/Header.tsx` — App name and tagline
- `client/src/components/HeroSection.tsx` — Landing page title, subtitle, and discussion questions
- `client/src/components/ChatInterface.tsx` — Chat title, subtitle, welcome message, placeholder text, loading text
- `client/src/components/Footer.tsx` — Brand name and description

### Styling & Visual Design

**IMPORTANT:** Always follow the Nyenrode corporate identity. Read `design_guidelines.md` in the project root for the full spec. The key principles below must be maintained:

#### Color System (Nyenrode Corporate — defined in `tailwind.config.ts` via CSS variables in `client/src/index.css`)
- **Primary** (headers, footers, buttons): HSL 213 23% 47% — muted blue-gray (#5E7291)
- **Primary Dark** (text accents): #355071
- **Accent** (highlights, CTAs, bullet points): HSL 44 96% 55% — golden yellow (#FBBA20)
- **Background**: White (#FFFFFF) / Dark mode: #121212
- **Foreground** (text): #1a1a1a / Dark: #F2F2F2
- **Card**: slightly off-white 0 0% 98% / Dark: 0 0% 9%
- **Muted**: gray 0 0% 92% / Dark: 0 0% 16%

Do NOT change these colors unless the user explicitly asks for a different brand identity. The Nyenrode palette is the default.

#### Typography (defined in `tailwind.config.ts` font families)
- **Sans**: Calibri → system-ui → sans-serif (Nyenrode standard for digital)
- **Serif**: Georgia
- **Mono**: Menlo
- Hero heading: `text-4xl font-bold`
- Section headings: `text-2xl font-bold`
- Body/chat: `text-base` (16px)
- Helper text: `text-sm` (14px)

#### Component Patterns (from `client/src/components/ui/`)
- **Buttons**: Use the existing `Button` component with CVA variants (default, destructive, outline, secondary, ghost). Sizes: default, sm, lg, icon. Include custom `hover-elevate` / `active-elevate-2` interaction effects.
- **Chat messages**: User messages get `bg-primary text-primary-foreground` (blue, right-aligned). Assistant messages get `bg-card text-card-foreground shadow-sm` (light card, left-aligned). Max width `max-w-[85%] sm:max-w-[80%]`.
- **Input area**: Uses `Textarea` component with `border-t bg-background/80 backdrop-blur-sm`.
- **Header**: `bg-primary` dark blue bar, white text, `flex h-20 items-center justify-between`, border bottom.
- **Footer**: `bg-primary py-8`, centered text, opacity variants (`text-primary-foreground/80`, `/60`).
- **Hero section**: Gradient `bg-gradient-to-b from-primary/5 to-background`, two-column grid on desktop, accent-colored bullet points.

#### Layout & Spacing
- Container max-widths: `max-w-5xl` (content), `max-w-4xl` (chat)
- Section padding: `py-12` desktop, `py-8` mobile
- Card padding: `p-6`, gaps: `gap-6` between major elements
- Chat container heights: 700px desktop, 600px tablet, 500px mobile
- Border radius: `rounded-xl` for chat container, `rounded-lg` for cards

#### Responsive Breakpoints
- Mobile: single column, base styles
- Tablet (md:): 2-column grids, adjusted spacing
- Desktop (lg:): full layout, 3-column feature grids

#### Animations
Keep animations minimal:
- Smooth scroll for anchor links
- Subtle fade-in for chat loading
- Hover states on buttons (via elevation system)
- No complex scroll-triggered animations

#### Accessibility
- Touch targets min 44x44px
- Consistent focus states on inputs
- Semantic HTML, proper heading hierarchy
- ARIA labels for chat interface

#### Dark Mode
The app supports class-based dark mode (`.dark` class). All colors have dark mode variants defined in CSS variables. Ensure any new components use the semantic color tokens (`bg-background`, `text-foreground`, `bg-card`, etc.) rather than hardcoded colors.

### Optional
- `platobot-qr.png` — Generate new QR code if the deployment URL changes
- Model selection in `api/chat/index.ts` and `api/chat/stream.ts` (currently claude-sonnet-4-20250514)

## Step 3: Implement

Write the system prompt following these Socratic chatbot design principles:
- Never give direct answers — always guide through questions
- Adapt complexity to the target audience
- For group settings: address "jullie" (you all), encourage discussion among participants
- For individual settings: address the single learner, be more personally engaging
- Include 2-4 core discussion questions that serve as conversation anchors
- Define a meta-goal (the deeper insight beyond the surface topic)
- Set clear boundaries on what topics the bot should deflect

Make ALL changes across all files, keeping the three system prompt copies in sync.

When updating UI components:
- Use ONLY the existing Tailwind classes and semantic color tokens (bg-primary, text-foreground, etc.)
- Do NOT introduce new colors or fonts outside the Nyenrode palette unless explicitly requested
- Maintain the existing component structure — edit text content, not layout patterns
- If the user wants a fundamentally different look, update the CSS variables in `client/src/index.css` and `tailwind.config.ts` rather than adding inline styles

## Step 4: Verify

After implementing, summarize what was changed and remind the user to:
- Test the conversation flow
- Verify the bot stays in character and uses Socratic method
- Check that all UI text matches the new theme
- Verify styling renders correctly on mobile, tablet, and desktop
- Confirm dark mode still works if applicable
- Deploy and test on the target platform
