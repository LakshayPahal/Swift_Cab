import React from 'react';
import { Link } from 'react-router-dom';
import image from '../assets/Taxi_Service.jpg'

const Home = () => {
  return (
    <div>
      {/* Hero Section */}
      <section className="py-16 md:py-24 bg-gradient-to-r from-light to-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-10 md:mb-0 md:pr-10">
              <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight text-dark">
                Get to Your Destination <span className="text-primary">Swiftly</span>
              </h1>
              <p className="text-xl text-gray mb-8 max-w-lg">
                Reliable, safe and comfortable cab service at your fingertips. Book your ride in minutes!
              </p>
              <div className="flex flex-wrap gap-4">
                <Link to="/book" className="btn btn-primary">
                  <i className="fas fa-taxi mr-2"></i> Book a Cab
                </Link>
                <Link to="/bookings" className="btn btn-secondary">
                  <i className="fas fa-list mr-2"></i> My Bookings
                </Link>
              </div>
            </div>
            <div className="md:w-1/2">
              <img 
                src={image}
                alt="Taxi cab" 
                className="rounded-xl shadow-lg w-full h-auto object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-light">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="section-title mx-auto">Why Choose SwiftCab?</h2>
            <p className="text-gray max-w-2xl mx-auto">Experience the best cab service with our user-friendly platform and professional drivers</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-md text-center transition-all duration-300 hover:-translate-y-2 hover:shadow-lg">
              <div className="feature-icon">
                <i className="fas fa-map-marker-alt"></i>
              </div>
              <h3 className="text-xl font-bold mb-3 text-dark">Easy Booking</h3>
              <p className="text-gray">Book your ride in just a few taps with our intuitive interface</p>
            </div>
            
            <div className="bg-white p-8 rounded-xl shadow-md text-center transition-all duration-300 hover:-translate-y-2 hover:shadow-lg">
              <div className="feature-icon">
                <i className="fas fa-taxi"></i>
              </div>
              <h3 className="text-xl font-bold mb-3 text-dark">Multiple Cab Options</h3>
              <p className="text-gray">Choose from Mini, Sedan or SUV based on your needs and group size</p>
            </div>
            
            <div className="bg-white p-8 rounded-xl shadow-md text-center transition-all duration-300 hover:-translate-y-2 hover:shadow-lg">
              <div className="feature-icon">
                <i className="fas fa-shield-alt"></i>
              </div>
              <h3 className="text-xl font-bold mb-3 text-dark">Safe & Secure</h3>
              <p className="text-gray">All our rides are monitored and our drivers are vetted for your safety</p>
            </div>
            
            <div className="bg-white p-8 rounded-xl shadow-md text-center transition-all duration-300 hover:-translate-y-2 hover:shadow-lg">
              <div className="feature-icon">
                <i className="fas fa-dollar-sign"></i>
              </div>
              <h3 className="text-xl font-bold mb-3 text-dark">Affordable Rates</h3>
              <p className="text-gray">Competitive pricing with transparent fare breakdown and no hidden costs</p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="section-title mx-auto">How It Works</h2>
            <p className="text-gray max-w-2xl mx-auto">Book your ride in 3 simple steps</p>
          </div>
          
          <div className="flex flex-col md:flex-row items-center justify-between max-w-4xl mx-auto">
            <div className="text-center mb-8 md:mb-0">
              <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4">1</div>
              <h3 className="text-xl font-bold mb-2 text-dark">Enter Details</h3>
              <p className="text-gray max-w-xs mx-auto">Enter your pickup and drop locations along with date and time</p>
            </div>
            
            <div className="hidden md:block text-primary text-4xl">
              <i className="fas fa-chevron-right"></i>
            </div>
            
            <div className="text-center mb-8 md:mb-0">
              <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4">2</div>
              <h3 className="text-xl font-bold mb-2 text-dark">Choose Cab</h3>
              <p className="text-gray max-w-xs mx-auto">Select the cab type that suits your requirements</p>
            </div>
            
            <div className="hidden md:block text-primary text-4xl">
              <i className="fas fa-chevron-right"></i>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4">3</div>
              <h3 className="text-xl font-bold mb-2 text-dark">Confirm Booking</h3>
              <p className="text-gray max-w-xs mx-auto">Confirm your booking and get ready for your ride</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-primary to-dark text-white">
        <div className="container mx-auto px-4">
          <div className="text-center p-10 md:p-16 rounded-xl">
            <h2 className="text-3xl font-bold mb-6">Ready to book your ride?</h2>
            <p className="text-xl mb-8 max-w-3xl mx-auto opacity-90">
              Experience the convenience and comfort of SwiftCab. Book your ride now and enjoy a seamless journey.
            </p>
            <Link to="/book" className="btn bg-white text-primary hover:bg-gray-100 shadow-lg hover:shadow-xl inline-block">
              <i className="fas fa-taxi mr-2"></i> Book Now
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home; 