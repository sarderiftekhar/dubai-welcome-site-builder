# Dubai Welcome Site Builder

## Project Overview
This is a client onboarding application for Hilbert Investment Solutions, built to facilitate the onboarding process for different types of clients (Individual, Corporate, and Counterparty). The application provides a user-friendly interface for clients to complete their registration and classification processes.

## Features
- **Multi-client Support**: Handles different onboarding flows for individual clients, corporate entities, and counterparties
- **Corporate Onboarding**: Complete workflow for corporate client registration and documentation
- **Client Classification**: Process for classifying clients according to regulatory requirements
- **Responsive Design**: Mobile-friendly interface that works across all device sizes
- **Modern UI**: Clean, professional interface built with React and Tailwind CSS

## Tech Stack
- **Frontend Framework**: React 18 with TypeScript
- **Routing**: React Router 6
- **Styling**: Tailwind CSS with shadcn/ui components
- **State Management**: React Query for server state
- **Form Handling**: React Hook Form with Zod validation
- **Build Tool**: Vite
- **Package Manager**: npm/bun

## Project Structure
```
dubai-welcome-site-builder/
├── public/                 # Static assets
├── src/                    # Source code
│   ├── components/         # Reusable UI components
│   ├── hooks/              # Custom React hooks
│   ├── lib/                # Utility functions and shared code
│   ├── pages/              # Page components
│   │   ├── Index.tsx                  # Landing page
│   │   ├── ClientClassification.tsx   # Client classification process
│   │   ├── CorporateOnboarding.tsx    # Corporate client onboarding
│   │   └── NotFound.tsx               # 404 page
│   ├── styles/             # CSS and style-related files
│   ├── App.tsx             # Main application component and routing
│   └── main.tsx            # Application entry point
├── index.html              # HTML template
├── tailwind.config.ts      # Tailwind CSS configuration
├── tsconfig.json           # TypeScript configuration
├── vite.config.ts          # Vite configuration
└── package.json            # Project dependencies and scripts
```

## Main Pages
1. **Landing Page**: Welcome screen with options to select client type (Individual, Corporate, or Counterparty)
2. **Corporate Onboarding**: Multi-step form for corporate client registration
3. **Client Classification**: Process to classify clients according to regulatory requirements
4. **404 Page**: Custom not found page

## Getting Started

### Prerequisites
- Node.js (v16 or later)
- npm or bun

### Installation
1. Clone the repository
   ```bash
   git clone https://github.com/your-username/dubai-welcome-site-builder.git
   cd dubai-welcome-site-builder
   ```

2. Install dependencies
   ```bash
   npm install
   # or
   bun install
   ```

3. Start the development server
   ```bash
   npm run dev
   # or
   bun run dev
   ```

4. Open your browser and navigate to `http://localhost:5173`

### Build
To build the project for production:
```bash
npm run build
# or
bun run build
```

## Deployment
The built files will be in the `dist` directory. These can be deployed to any static hosting service like Vercel, Netlify, or a traditional web server.

## Compliance Notice
Hilbert Investment Solutions Ltd is regulated by the Dubai Financial Services Authority (DFSA) for the conduct of its business in and from the Dubai International Financial Centre (DIFC).

## License
[Include license information here]

## Contact
[Include contact information for project maintainers]
