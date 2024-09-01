# job-app

 This is a full-stack job application system built with React for the frontend and a Node.js/Express server for the backend. The application allows users to view, apply for, and filter job openings, while administrators can post, edit, and delete job listings.

### 🔗 Hosted link: [Job App](https://job-app-sandy.vercel.app/)

## 🧑‍💻Screenshots
<img src="https://github.com/AniketMujbaile/job-app/blob/main/Img/Img1.png" width="500px">
<hr/>
<img src="https://github.com/AniketMujbaile/job-app/blob/main/Img/Img2.png" width="500px">
<hr/>
<img src="https://github.com/AniketMujbaile/job-app/blob/main/Img/Img3.png" width="500px">
<hr/>
<img src="https://github.com/AniketMujbaile/job-app/blob/main/Img/Img4.png" width="500px">
<hr/>

## ✨Features

- User Authentication: Signup and login functionality with JWT.
- Role-based Access: Admins (domain: @alphaware.com) and Users (other domains).
- Job Management: Admins can create, update, and delete job postings.
- Job Application: Users can apply for jobs and view their applied jobs.
- Search and Filtering: Users can search and filter jobs based on company name, location, and contract type.
- Responsive Design: The application is designed to be responsive and user-friendly.

## 🛠️Getting Started

### Installation

## Frontend
1. Clone the repository:
git clone https://github.com/AniketMujbaile/job-app.git

```bash
cd client
```

2. Install dependencies:
```bash
npm install
```

3. Run the Client:
```bash
npm start
```

4. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## Backend

1. Clone the Repository

```bash
cd server
```

2. Install Dependencies

```bash
npm install
```

3. Set Up Environment Variables

Create a .env file in the root directory and add the following variables:
 
 ```bash
PORT=5000
MONGODB_URI=<your-mongodb-uri>
JWT_SECRET=<your-jwt-secret>
```

4. Run the Server

```bash
npm start
```

## API Endpoints

1. Auth

- `POST /api/auth/signup` - Sign up a new user.
- `POST /api/auth/login` - Log in a user.

2. Jobs

- `GET /api/jobs` - Fetch all job listings.
- `POST /api/jobs` - Post a new job (Admin only).
- `PUT /api/jobs/:jobId` - Update a job (Admin only).
- `DELETE /api/jobs/:jobId` - Delete a job (Admin only).
- `POST /api/jobs/:jobId/apply` - Apply for a job (User only).
 
## Acknowledgments

- Create React App: For bootstrapping the frontend.
- Redux Toolkit: For simplified Redux state management.
- Tailwind CSS: For styling.
- Express: For server-side routing and middleware.
- MongoDB: For database management.
