# Platobot - Nyenrode Leiderschapscoach

## Project Overview
Platobot is an AI-powered leadership coach for Nyenrode Business University students and professionals. It helps users develop their leadership skills through Socratic dialogue, focusing on:

- **Zelfreflectie** (Self-reflection) - Using STARR method and Korthagen model
- **Samenwerken** (Collaboration) - Using PMC methodology
- **Ethisch handelen** (Ethical action) - Through Socratic dialogue
- **Presenteren** (Presentation skills) - Using the rhetorical triangle
- **Besluitvorming** (Decision making) - Using the BOB model

## Technology Stack
- **Frontend**: React + TypeScript, Tailwind CSS, Shadcn UI components
- **Backend**: Express.js with TypeScript
- **AI**: GPT-5 via Replit AI Integrations (OpenAI-compatible API)
- **Design**: Nyenrode Business University Huisstijlhandboek (Corporate Identity)

## Key Features
- Real-time chat interface with GPT-5 reasoning
- Conversation history management
- Professional Nyenrode branding with corporate blue palette
- Socratic methodology for leadership development
- Dutch language interface

## Project Structure
```
├── client/                 # Frontend React application
│   ├── src/
│   │   ├── components/     # Reusable React components
│   │   │   ├── Header.tsx
│   │   │   ├── HeroSection.tsx
│   │   │   ├── ChatInterface.tsx
│   │   │   └── Footer.tsx
│   │   ├── pages/          # Page components
│   │   │   └── home.tsx
│   │   └── index.css       # Nyenrode color palette
│   └── index.html
├── server/                 # Backend Express application
│   ├── routes.ts           # API routes
│   ├── storage.ts          # In-memory conversation storage
│   └── openai.ts           # GPT-5 integration with system prompt
└── shared/
    └── schema.ts           # Shared TypeScript types
```

## Color Palette (Nyenrode Corporate)
- **Corporate Blue**: #5E7291 (RGB: 94, 114, 145)
- **Corporate Dark**: #355071 (RGB: 53, 80, 113)
- **Corporate Accent**: #FBBA20 (RGB: 251, 187, 32)

## API Endpoints
- `POST /api/chat` - Send message and receive AI response
  - Request: `{ message: string, conversationId?: string }`
  - Response: `{ response: string, conversationId: string }`

## Development
The application runs on port 5000 with hot-reload enabled:
- Frontend: Vite dev server
- Backend: Express with tsx

## AI Integration
Uses Replit AI Integrations for OpenAI access:
- No API key required
- Charges billed to Replit credits
- Model: GPT-5 (latest reasoning model)
- System prompt: Comprehensive leadership coaching methodology

## Methodology Framework
The coaching follows established frameworks:
1. **STARR**: Situation, Task, Action, Result, Reflection
2. **Korthagen**: Environment, Behavior, Competencies, Beliefs, Identity, Involvement
3. **Socratic Dialogue**: Question, Concretize, Shift perspective, Argumentation, Essence
4. **Rhetorical Triangle**: Logos, Pathos, Ethos
5. **BOB Model**: Image, Judgment, Decision
6. **PMC**: Collaboration methodology

## Recent Changes
- Built custom chat interface replacing Copilot Studio iframe
- Implemented GPT-5 with comprehensive Dutch leadership coaching system prompt
- Applied Nyenrode Corporate Identity following Huisstijlhandboek
- Added conversation history management
- Integrated Plato and Socrates imagery
