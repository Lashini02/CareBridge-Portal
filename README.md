# CareBridge - Role-Based Healthcare Access Portal with WSO2 Asgardeo

CareBridge is a lightweight React application demonstrating Role-Based Access Control (RBAC) using **WSO2 Asgardeo Identity Platform**. It restricts interface views and routes based on user roles (`Doctor` vs `Patient`) extracted directly from decoded OpenID Connect (OIDC) ID tokens.

---

## 🌟 Features

- **OIDC Authentication:** Secure Login/Logout flow using `@asgardeo/auth-react` SDK with Authorization Code Flow + PKCE.
- **Role-Based Routing:** Route-level guards protecting `/doctor` and `/patient` paths.
- **Token Claims Viewer:** Real-time decoding and display of OIDC ID token claims.
- **Access Control Enforcement:** Automatic redirection to an `Unauthorized (403)` view on permission mismatch.
- **Diagnostic & Demo Override Mode:** Built-in testing controls for quick evaluation without manual identity reconfiguration.

---

## 🏗️ Architecture Flow

```
[ User Browser ]
       |
       v
[ React (Vite) App ]  <--- `@asgardeo/auth-react` SDK --->  [ WSO2 Asgardeo Cloud ]
       |                                                            |
       |-- 1. Redirect to Asgardeo Login -------------------------->|
       |-- 2. Authenticate & Grant Consent ------------------------>|
       |<-- 3. Return Authorization Code (PKCE) -------------------|
       |-- 4. Exchange Code for ID & Access Tokens ---------------->|
       |
  (Extract Claims: roles / groups)
       |
       +---> Role == 'Doctor'  ---> Render <DoctorDashboard />
       +---> Role == 'Patient' ---> Render <PatientDashboard />
       +---> Role Mismatch     ---> Redirect <Unauthorized />
```

---

## 🔑 Asgardeo Setup Details

1. **Application Type:** Single-Page Application (SPA)
2. **Authorized Redirect URL:** `http://localhost:5173`
3. **User Roles Configured:** `Doctor`, `Patient`
4. **Token Claim Attribute Mapping:** `roles` and `groups` included in ID Token attributes.

---

## 📸 Screenshots

1. **Asgardeo Hosted Login Screen**
   <img width="1322" height="846" alt="Screenshot 2026-09-23 000309" src="https://github.com/user-attachments/assets/f49bb08e-cca8-4caf-a9bc-4e56962c3d7d" />

2. **Decoded Claims View (Home Page)**
   <img width="1850" height="863" alt="image" src="https://github.com/user-attachments/assets/f19d78c7-4d1f-44f3-be85-2ca3109bbfbb" />

3. **Doctor Dashboard (`/doctor`)**
   <img width="1915" height="787" alt="image" src="https://github.com/user-attachments/assets/643aa342-76e0-4dbf-848c-2df71304aa0d" />

4. **Patient Dashboard (`/patient`)**
   <img width="1908" height="712" alt="image" src="https://github.com/user-attachments/assets/40474479-708b-45fe-9f2b-47b5564898e5" />

5. **Unauthorized Access Fallback (403)**
   <img width="986" height="717" alt="Screenshot 2026-09-22 223729" src="https://github.com/user-attachments/assets/e953fea9-8ef2-4010-bfa7-dc49a6aff6f5" />


---

## 🚀 Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) (v18+)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)
- Active [WSO2 Asgardeo](https://asgardeo.io/) Account

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/Lashini02/CareBridge-Portal.git
   cd CareBridge-Portal
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```

Visit `http://localhost:5173` in your browser.

---

## 🧪 Test Accounts

| Role | Test Username | Access Permissions |
| --- | --- | --- |
| **Doctor** | `doctor@carebridge.test` | Clinical diagnosis, patient list, care notes |
| **Patient** | `patient@carebridge.test` | Personal health records, lab reports |

---

## 📁 Project Structure

```
├── src/
│   ├── components/      # Reusable UI components (Navbar, ProtectedRoute)
│   ├── pages/           # Doctor, Patient, Home, and Unauthorized pages
│   ├── App.jsx          # Route configurations and access guards
│   ├── main.jsx         # Application entry point with AuthProvider
│   └── index.css        # Global CSS styles
├── .gitignore           # Git ignore rules
├── index.html           # HTML template
├── netlify.toml         # Netlify build & SPA routing configuration
├── package.json         # Dependencies and scripts
├── README.md            # Documentation
└── vite.config.js       # Vite configuration
```

---

## 🛡️ License

Distributed under the MIT License. See `LICENSE` for more information.
