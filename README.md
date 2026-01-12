# Demo E Land System

## Project Overview

**Demo E Land System** is a comprehensive, modernized web portal designed for the Land Registry Department. This pilot project demonstrates a digital solution for deed registration, land management, and ownership verification, specifically tailored for the context of land administration in Sri Lanka.

The system integrates traditional database management with a **blockchain-based integrity layer**, ensuring that once a deed is registered, its record is immutable and easily verifiable.

## Key Features

- **Deed Registration Wizard**: A streamlined, multi-step process for registering new land deeds, capturing land details, owner information, and deed specifics.
- **Blockchain Registry**: Implements a transparent, immutable ledger view where every registered deed is hashed and "chained" to ensure data integrity.
- **Ownership Transfer**: Secure workflows for transferring land ownership from one party to another, maintaining a clear history of previous owners (Chain of Title).
- **Deed Verification**: Public-facing or official tools to verify the authenticity of a deed using its unique ID and cryptographic hash.
- **Interactive Dashboard**: Real-time insights into system activity, registration statistics, and recent transactions.
- **Secure Authentication**: Protected access for department officials to manage sensitive records.
- **Audit Logging**: Comprehensive logs of all critical actions (Create, Update, Transfer) for accountability.

## Technology Stack

### Frontend
- **Framework**: [React](https://react.dev/) (via Vite)
- **Language**: TypeScript
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **UI Components**: [shadcn/ui](https://ui.shadcn.com/)
- **Icons**: Lucide React
- **State Management**: React Query (TanStack Query)

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: PostgreSQL
- **ORM/Querying**: `pg` (node-postgres)
- **Security**: CORS, Dotenv

### Database Schema
The project uses a relational PostgreSQL database with the following core tables:
- `lands`: Stores physical land details (District, Division, Area).
- `owners`: Manages identity information of land owners (NIC, Name, Address).
- `deeds`: Links owners to lands with registration details and status.
- `audit_logs`: Tracks system usage and modifications.

## Getting Started

Follow these instructions to set up the project locally.

### Prerequisites
- **Node.js** (v18 or higher recommended)
- **npm** (Node Package Manager)
- **PostgreSQL** (Local installation or a cloud instance like Supabase/Neon)

### Installation

1.  **Clone the repository**
    ```bash
    git clone <YOUR_GIT_URL>
    cd land-ledger-guard
    ```

2.  **Install Frontend Dependencies**
    ```bash
    npm install
    ```

3.  **Install Backend Dependencies**
    ```bash
    cd server
    npm install
    cd ..
    ```

### Database Setup

1.  Create a new PostgreSQL database (e.g., `land_ledger_db`).
2.  Run the provided schema script located at `database/schema.sql` to create the necessary tables and indexes.
    ```bash
    psql -U postgres -d land_ledger_db -f database/schema.sql
    ```
    *(Or use a GUI tool like pgAdmin / DBeaver to run the SQL script)*

3.  (Optional) Run `database/seed.sql` to populate some initial test data.

### Configuration

1.  **Backend Config**: Ensure your server connects to the correct database. Check `server/config/db.js` or create a `.env` file in the `server/` directory with your database credentials:
    ```env
    DB_USER=postgres
    DB_PASSWORD=your_password
    DB_HOST=localhost
    DB_PORT=5432
    DB_NAME=land_ledger_db
    PORT=3000
    ```

### Running the Application

1.  **Start the Backend Server**
    Open a terminal in the root directory:
    ```bash
    cd server
    npm start
    ```
    The server typically runs on `http://localhost:3000`.

2.  **Start the Frontend Development Server**
    Open a second terminal in the root directory:
    ```bash
    npm run dev
    ```
    The application will be available at `http://localhost:8080` (or the port shown in your terminal).

## Project Structure

```
land-ledger-guard/
├── database/           # SQL schema and seed files
├── public/             # Static assets
├── server/             # Node.js/Express Backend
│   ├── config/         # Database configuration
│   ├── routes/         # API endpoints (deeds, lands, owners)
│   └── index.js        # Server entry point
├── src/                # React Frontend Source
│   ├── components/     # Reusable UI & Feature components
│   │   ├── blockchain/ # Blockchain visualization components
│   │   ├── deeds/      # Deed management forms & lists
│   │   └── verify/     # Verification tools
│   ├── hooks/          # Custom React hooks
│   ├── lib/            # Utilities (Hashing, Types)
│   └── pages/          # Application routes/pages
└── ...config files
```

## Contributing

1.  Fork the repository.
2.  Create your feature branch (`git checkout -b feature/AmazingFeature`).
3.  Commit your changes (`git commit -m 'Add some AmazingFeature'`).
4.  Push to the branch (`git push origin feature/AmazingFeature`).
5.  Open a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Authors

- Land Registry Department Development Team
- Government of Sri Lanka - Ministry of Lands
