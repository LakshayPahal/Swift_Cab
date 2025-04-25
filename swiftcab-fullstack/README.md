# SwiftCab - Full-Stack Cab Booking App

A modern, responsive cab booking application built with React, Node.js, Express, and MongoDB.

## Features

- **Responsive Design**: Works on desktop, tablet, and mobile devices
- **Booking Management**: Create, view, and cancel cab bookings
- **Ride Status Tracking**: Track your ride status (Pending, On The Way, Arrived, Completed)
- **Fare Estimation**: Calculate fare estimates before booking
- **Multiple Cab Types**: Choose from Mini, Sedan, or SUV

## Tech Stack

### Frontend
- React (Create React App)
- React Router for navigation
- Context API for state management
- Tailwind CSS for styling
- Axios for API communication
- React Toastify for notifications

### Backend
- Node.js
- Express framework
- MongoDB database
- Mongoose ODM
- Cors for cross-origin support
- Dotenv for environment variables

## Project Structure
```
swiftcab-fullstack/
├── frontend/             # React frontend
│   ├── public/           # Static files
│   └── src/              # React source code
│       ├── components/   # Reusable components
│       ├── context/      # React Context for state
│       ├── pages/        # Page components
│       └── App.js        # Main App component
│
└── backend/              # Express backend
    ├── controllers/      # Route controllers
    ├── models/           # Mongoose models
    ├── routes/           # API routes
    └── server.js         # Entry point
```

## Getting Started

### Prerequisites
- Node.js (v14 or later)
- MongoDB (local or Atlas)

### Installation

1. Clone the repository:
```
git clone https://github.com/yourusername/swiftcab-fullstack.git
cd swiftcab-fullstack
```

2. Install backend dependencies:
```
cd backend
npm install
```

3. Set up environment variables:
   - Create a `.env` file in the backend directory
   - Add the following variables:
   ```
   PORT=5000
   MONGO_URI=mongodb://localhost:27017/swiftcab
   NODE_ENV=development
   ```

4. Install frontend dependencies:
```
cd ../frontend
npm install
```

5. Create environment variables for frontend:
   - Create a `.env` file in the frontend directory
   - Add the following:
   ```
   REACT_APP_API_URL=http://localhost:5000/api
   ```

### Running the App

1. Start the backend server:
```
cd backend
npm run dev
```

2. Start the frontend development server:
```
cd frontend
npm start
```

3. Open your browser and navigate to `http://localhost:3000`

## API Endpoints

- **POST /api/bookings** - Book a ride
- **GET /api/bookings** - Get all bookings
- **GET /api/bookings/:id** - Get a specific booking
- **DELETE /api/bookings/:id** - Cancel a booking
- **PATCH /api/bookings/:id/status** - Update booking status

## Deployment

### Frontend
The frontend can be deployed to Vercel:
1. Push your code to a GitHub repository
2. Connect the repository to Vercel
3. Set the build command to `npm run build`
4. Set the environment variables

### Backend
The backend can be deployed to Render:
1. Push your code to a GitHub repository
2. Create a new Web Service on Render
3. Connect to your repository
4. Set the build command to `npm install`
5. Set the start command to `node server.js`
6. Add environment variables

## Future Enhancements

- User authentication and profiles
- Payment integration
- Real-time ride tracking with maps
- Driver app interface
- Ratings and reviews
- Push notifications

## License

This project is licensed under the MIT License. 