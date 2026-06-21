# The Royals Restaurant Management System

A comprehensive, full-stack restaurant management application designed to streamline operations for "The Royals." This system features role-based access, including a customer-facing menu and booking system, a live Kitchen Display System (KDS) for chefs, and a management dashboard for administrators.

---

## 🌟 Key Features

### 🛒 Customer Portal
*   **Dynamic Menu:** Interactive menu with real-time "Add to Cart" functionality.
*   **Online Table Reservation:** Seamless booking system allowing customers to reserve tables in advance.
*   **Off-Canvas Cart:** Modern, sliding cart drawer for a spacious and clean user experience.

### 🍳 Chef Dashboard (KDS - Kitchen Display System)
*   **Live Order Queue:** Real-time dashboard displaying incoming orders automatically without page reloads.
*   **Status Toggles:** Interactive buttons to change order statuses from "Received" to "Preparing" and "Ready".
*   **Special Instructions:** Clearly highlighted customer notes (e.g., "Extra spicy") for precise order fulfillment.

### 🔐 Admin Dashboard
*   **Menu Management (CRUD):** Secure portal for admins to Create, Read, Update, and Delete menu items directly from the database.
*   **Reservation Management:** Overview of all incoming table reservations.
*   **Secure Authentication:** Environment variable-based basic authentication protecting the staff and admin portals.

### 💳 Billing & POS (Point of Sale) System
*   **Order Creation:** Fast interface for waitstaff to create new orders.
*   **Invoice Generation:** Automatic calculation of subtotals, taxes, and grand totals.

---

## 💻 Tech Stack

| Area | Technology |
| :--- | :--- |
| **Frontend** | EJS (Embedded JavaScript Templating), Tailwind CSS, Vanilla JavaScript |
| **Backend** | Node.js, Express.js |
| **Database** | MongoDB, Mongoose |

---

## 📂 Project Structure

The application follows a standard MVC (Model-View-Controller) architecture.

*   `models/`: Contains Mongoose schemas (`MenuItem.js`, `Order.js`, `Reservation.js`).
*   `routes/`: Express routers for handling application logic (`index.js`, `admin.js`, `chef.js`).
*   `views/`: EJS templates for the frontend, separated by roles (`home.ejs`, `menu.ejs`, `admin/`, `chef/`, `partials/`).
*   `public/images/`: Static visual assets used across the site (e.g., `mainlogo.png`, `t_BigThali.jpg`).
*   `server.js`: The main Express server entry point.
*   `seed.js`: Database seeding script for initial menu population.
*   `.env`: Environment variables (not tracked in Git).

---

## 🚀 Installation and Setup

Follow these steps to run the project locally on your machine.

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/varshneyprm/The-Royals-Restaurant-Management-System.git
    cd The-Royals-Restaurant-Management-System
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Configure Environment Variables:**
    Create a `.env` file in the root directory and add your secure credentials:
    ```env
    MONGO_URI=your_mongodb_connection_string
    ADMIN_USER=admin
    ADMIN_PASS=your_admin_password
    CHEF_USER=chef
    CHEF_PASS=your_chef_password
    ```

4.  **Seed the Database (Optional):**
    Run the seed script to populate the database with the initial menu items.
    ```bash
    node seed.js
    ```

5.  **Start the server:**
    ```bash
    npm run dev
    # or
    node server.js
    ```

**Note:** Once the server is running, the application will be accessible at `http://localhost:3000`. Staff portals can be accessed at `/admin` and `/chef`.
