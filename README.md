# Individual Client Onboarding

## Description

This project is a multi-step web application designed to streamline the onboarding process for individual clients. It guides users through several stages, including Know Your Customer (KYC) forms, Suitability Assessments, Client Classification, FATCA and W8BEN-E tax forms, and finally, document uploads.

The application provides a user-friendly interface with clear progression indicators to ensure a smooth onboarding experience.

## Features

*   **Multi-Step Onboarding Process:** Guides users sequentially through all required onboarding stages.
*   **Progress Tracking:** Visual indicators show the current step, completed steps, and pending steps.
*   **Dynamic Form Rendering:** Displays the relevant form section based on the active step.
*   **Comprehensive Form Inputs:** Includes a variety of input fields such as text boxes, date pickers, radio buttons, dropdown selectors, checkboxes, and file upload areas.
*   **Client-Side Navigation:** Allows users to move between previous and next steps (where applicable).
*   **Dedicated Sections for:**
    *   KYC (Know Your Customer)
    *   Suitability Assessment
    *   Client Classification
    *   FATCA (Foreign Account Tax Compliance Act)
    *   W8BEN-E Form
    *   Document Upload
*   **Document Upload Functionality:** Allows users to select document types and upload multiple files.

## Technologies Used

*   **React:** A JavaScript library for building user interfaces.
*   **TypeScript:** A typed superset of JavaScript that compiles to plain JavaScript.
*   **Tailwind CSS:** A utility-first CSS framework for rapid UI development (inferred from className syntax).
*   **React Router DOM:** For handling navigation within the application (inferred from the use of `<Link>`).

## Setup and Installation

1.  **Clone the repository (if applicable):**
    ```bash
    git clone <repository-url>
    cd <project-directory>
    ```

2.  **Install dependencies:**
    It's assumed this project uses either npm or yarn.
    ```bash
    npm install
    # or
    yarn install
    ```

## Running the Application

To run the application in a development environment:

```bash
npm run dev
# or
yarn dev
```

This will typically start a development server, and you can view the application in your browser at `http://localhost:5173` (or another port if configured differently).

## Folder Structure (Partial Overview)

```
/src
|-- /components
|   |-- Navbar.tsx       # Navigation bar component
|   |-- Footer.tsx       # Footer component
|   `-- /ui
|       `-- button.tsx   # Button UI component
|-- /pages
|   |-- IndividualOnboarding.tsx  # Main component for the onboarding flow
# ... other files and folders
```

## Key Components

*   **`IndividualOnboarding.tsx`**: This is the central component orchestrating the entire individual client onboarding process. It manages the state of the active step, renders the corresponding forms, and handles navigation between steps.
*   **`Navbar.tsx`**: Provides the main navigation for the application.
*   **`Footer.tsx`**: Contains footer information and links.

## Onboarding Steps Overview

The `IndividualOnboarding` component manages the following steps:

1.  **KYC Form:** Collects client identification details, document details, nature of relationship, employment details, political exposure declaration, and client declaration. Includes a checklist for required documents and a privacy notice.
2.  **Suitability:** Presents a suitability assessment questionnaire covering investment objectives, investment stage, product knowledge/experience, response to market decline, risk tolerance, investment time horizon, volatility preferences, assets under advice, liquidity preference, income stability, financial situation, and leverage.
3.  **Client Classification:** Allows clients to classify themselves as Professional Clients (Assessed or Deemed) or understand Retail Client/Market Counterparty classifications, based on DFSA Rulebook criteria.
4.  **FATCA:** Provides an OECD CRS and U.S. FATCA Self-Certification Form for individuals to declare their tax residency and U.S. person status.
5.  **W8BEN-E Form:** Instructs users to download, complete, and upload the W-8BEN-E form (Certificate of Foreign Status of Beneficial Owner for United States Tax Withholding and Reporting).
6.  **Upload Documents:** A section for users to upload various required documents, select document types, and manage their uploads. Includes a list of generally required documents.

Each step is designed to collect specific information necessary for the onboarding process, with clear instructions and input fields.

## Compliance Notice

Hilbert Investment Solutions Ltd is regulated by the Dubai Financial Services Authority (DFSA) for the conduct of its business in and from the Dubai International Financial Centre (DIFC).
