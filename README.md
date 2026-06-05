Markdown
# SDLC Workspace: Role-Based Project Management

A full-stack project management dashboard built to track Software Development Life Cycle (SDLC) phases. 

Instead of traditional passwords, this app uses a highly secure, passwordless **Email OTP (One-Time Password)** flow. It features strict Role-Based Access Control (RBAC), providing entirely different UI experiences and permissions depending on whether the user is a Project Manager or an Employee.

## Features

* **Passwordless Authentication:** Secure login via 6-digit email OTPs using JSON Web Tokens (JWT).
* **Role-Based Routing:** Protected React routes that automatically redirect users based on database clearance.
* **Manager Dashboard:** A high-level overview featuring a native HTML5 drag-and-drop Kanban board to manage tasks across SDLC phases.
* **Employee Workspace:** A focused, restricted dashboard where employees can only see and update tasks assigned specifically to them.
* **RESTful API:** Protected Node/Express endpoints using custom middleware to verify JWTs and user roles.

## Tech Stack

* **Frontend:** React (Vite), Tailwind CSS v4, React Router DOM, Axios, Lucide React (Icons).
* **Backend:** Node.js, Express.js.
* **Database:** MongoDB & Mongoose.
* **Authentication & Security:** JWT, bcrypt (for hashing OTPs), Nodemailer.

---

## Local Development Setup

To run this project locally, you will need two terminal windows—one for the backend server and one for the frontend React app.

### 1. Clone the repository
```bash
git clone <your-repo-url>
cd PROJECT-MANAGEMENT
2. Backend Setup
Navigate into the backend folder and install the necessary dependencies:

Bash
cd backend
npm install
Environment Variables:
You must create a .env file inside the backend/ directory. Do not skip this step, or the server will crash.

Create a file named .env in backend/ and add the following variables:

Code snippet
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=generate_a_long_random_string_here
EMAIL_USER=your_gmail_address@gmail.com
EMAIL_PASS=your_16_character_gmail_app_password
Note: For EMAIL_PASS, you cannot use your standard Gmail password. You must generate a 16-character "App Password" in your Google Account Security settings.

Start the backend server:

Bash
npm start
The server should report: "Server running on port 5000" and "MongoDB Connected".

3. Frontend Setup
Open a new terminal window, navigate to the frontend folder, and install the dependencies:

Bash
cd frontend
npm install
Start the Vite development server:

Bash
npm run dev
The frontend will be available at http://localhost:5173.

## Seeding the Database (How to test Manager features)
Because the application is locked down, new users who sign up via email are automatically assigned the default employee role. There is no public UI to sign up as a manager.

To test the Manager Dashboard and drag-and-drop Kanban board, you must manually promote your first user via your database:

Go to http://localhost:5173 and log in with your email address. This creates your user document in MongoDB.

Open MongoDB Compass or MongoDB Atlas in your browser.

Navigate to the users collection inside your database.

Find your email document and edit the role field. Change it from "employee" to "manager".

Save the document.

Go back to the React app, Logout, and log back in. The routing engine will detect your new clearance and redirect you to the Manager Dashboard.

Once you are a Manager, you can log in with a second email address in an incognito window to create an Employee account. You can then use the Manager Dashboard to assign tasks to that employee.

## License
This project is open-source and available under the MIT License. Feel free to use it for your portfolio or resume.