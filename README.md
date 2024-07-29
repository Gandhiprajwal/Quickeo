# Video Conference Web Application

This is a full-featured video conferencing web application built using React.js, Node.js, MongoDB, and ZEGOCLOUD. It facilitates real-time audio and video communication, allowing users to create, schedule, and manage meetings.

## Features

- **Real-Time Communication**: Supports audio and video meetings using ZEGOCLOUD for seamless interaction.
- **User Authentication**: Implemented with Google Firebase, allowing secure login and registration.
- **Meeting Management**: Users can create meetings for future dates, start instant meetings, and view a list of previous and upcoming meetings.
- **Custom Hooks**: Includes hooks for authentication and displaying the current time and date.
- **State Management**: Utilizes Redux Toolkit for efficient and scalable state management.

## Technologies Used

- **Frontend**: React.js
- **Backend**: Node.js
- **Database**: MongoDB
- **Real-Time Communication**: ZEGOCLOUD
- **Authentication**: Google Firebase
- **State Management**: Redux Toolkit

## Getting Started

### Prerequisites

- Node.js and npm (Node Package Manager) installed on your machine.
- MongoDB database setup.
- ZEGOCLOUD account for real-time communication services.
- Firebase project setup for authentication.

### Installation

1. Clone the repository:

   ```bash
   git clone <repository-url>
   cd video-conference-app
2. Install dependencies for both the frontend and backend:
   ```bash
   npm install
   cd client
   npm install
3. Configure environment variables:
   - Create a `.env` file in the root and client directories.
   - Add the necessary configuration details for MongoDB, Firebase, and ZEGOCLOUD.
4. Run the application:
   - In the root directory, start the backend server:
     ```bash
     node server.js
   - In the client directory, start the frontend development server:
     ```bash
     npm run dev
     
## Usage
  - **Create a Meeting**: Schedule meetings for a future date and time.
  - **Start an Instant Meeting**: Quickly start a meeting with a unique meeting ID.
  - **View Meetings**: See a list of all your previous and upcoming meetings.

## Contact
   - For any questions or inquiries, please contact [Prajwal Gandhi] at [prajwalgandhi20@gmail.com].
