import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Import pages
import Home from './pages/Home';
import BookingForm from './pages/BookingForm';
import Bookings from './pages/Bookings';
import BookingDetails from './pages/BookingDetails';
import NotFound from './pages/NotFound';

// Import components
import Header from './components/Header';
import Footer from './components/Footer';

// Import context
import { BookingProvider } from './context/BookingContext';

function App() {
  return (
    <BookingProvider>
      <Router>
        <div className="flex flex-col min-h-screen bg-light">
          <Header />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/book" element={<BookingForm />} />
              <Route path="/bookings" element={<Bookings />} />
              <Route path="/bookings/:id" element={<BookingDetails />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
          <Footer />
          <ToastContainer position="bottom-right" />
        </div>
      </Router>
    </BookingProvider>
  );
}

export default App; 