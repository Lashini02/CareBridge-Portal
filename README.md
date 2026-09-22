# CareBridge Healthcare Access Portal

A secure, Role-Based Access Control (RBAC) healthcare web application demonstrating modern identity security patterns using WSO2 Asgardeo Identity Platform and React.

## 🌟 Overview

The CareBridge Portal demonstrates authentication and authorization mechanisms for sensitive clinical domains. Using Asgardeo's OpenID Connect (OIDC) authentication flow with PKCE (Proof Key for Code Exchange), the portal segregates views and functions between different user roles (such as Doctors and Patients).

### Key Features

- **OIDC Authentication with PKCE**: Secure Single-Page Application (SPA) authentication without exposing client secrets.
- **Role-Based Access Control (RBAC)**: Restricts doctor dashboards and patient health records based on authenticated user tokens.
- **Dynamic Token Claims Decoding**: Inspects and parses decoded OIDC ID token claims in real time.
- **Diagnostic & Demo Mode**: Built-in testing override controls for quick evaluation without manual identity reconfiguration.

## 🏗️ Architecture & Tech Stack

- **Frontend**: React, Vite, Modern CSS
- **Identity Provider (IdP)**: WSO2 Asgardeo
- **Auth Protocol**: OAuth 2.0 / OpenID Connect (OIDC) with Authorization Code Flow + PKCE

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or higher recommended)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)
- An active [WSO2 Asgardeo](https://asgardeo.io/) account

### 1. Clone the Repository

```bash
git clone https://github.com/Lashini02/CareBridge-Portal.git
cd CareBridge-Portal
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Asgardeo Configuration

1. Log in to the Asgardeo Console.
2. Navigate to **Applications** > **New Application** > **Single-Page Application**.
3. Configure the following protocol settings:
   - **Allowed Grant Types**: Code, Refresh Token
   - **Authorized Redirect URLs**: `http://localhost:5173`
   - **Allowed Origins**: `http://localhost:5173`
   - **PKCE**: Mandatory
4. Under **User Attributes**, ensure **Roles** and **Groups** attributes are marked as Requested.
5. Under **User Management** > **Roles**, create:
   - **Doctor** (Assign to doctor accounts)
   - **Patient** (Assign to patient accounts)

### 4. Configure Environment Variables

Create a `.env` file in the root directory:

```env
VITE_ASGARDEO_CLIENT_ID=<YOUR_ASGARDEO_CLIENT_ID>
VITE_ASGARDEO_BASE_URL=https://api.asgardeo.io/t/<YOUR_ORG_HANDLE>
VITE_ASGARDEO_REDIRECT_URL=http://localhost:5173
```

### 5. Run the Application

```bash
npm run dev
```

Visit `http://localhost:5173` in your browser.

## 🧪 Test Accounts

| Role | Test Username | Permissions / Access |
| --- | --- | --- |
| **Doctor** | `doctor@carebridge.test` | Clinical diagnosis, patient list, care notes |
| **Patient** | `patient@carebridge.test` | Personal health records, lab reports |

## 📁 Project Structure

```
├── src/
│   ├── components/      # Reusable UI components
│   ├── pages/           # Doctor, Patient, and Login pages
│   ├── App.jsx          # Route configurations and access guards
│   ├── main.jsx         # Application entry point
│   └── index.css
├── .gitignore
├── index.html
├── package.json
├── README.md
└── vite.config.js
```

## 🛡️ License

Distributed under the MIT License. See `LICENSE` for more information.
