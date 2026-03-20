# Educational Chatbot Builder

You are helping the user create or repurpose an educational Socratic chatbot based on the Platobot template in this repository.

## Step 1: Gather Context

Before making ANY changes, ask the user the following questions using AskUserQuestion (ask all 4 in one call):

1. **Target audience** — Who will use this chatbot? (e.g. university students, high school, corporate training, teachers)
2. **Learning goal** — What should participants learn or reflect on? What are the key discussion questions or themes?
3. **Educational setting** — How will this be used?
   - Group exercise (like current Platobot — multiple people around one device)
   - Individual self-study
   - Online/remote (each participant on their own device)
   - Hybrid
4. **Language** — What language should the chatbot communicate in? (Current default is Dutch)

## Step 2: Design the Chatbot

Once you have the answers, design the chatbot by planning changes to these files:

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

## Step 4: Verify

After implementing, summarize what was changed and remind the user to:
- Test the conversation flow
- Verify the bot stays in character and uses Socratic method
- Check that all UI text matches the new theme
- Deploy and test on the target platform
