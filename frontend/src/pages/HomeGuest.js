import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';

function HomeGuest() {
  return (
    <div className="container text-center mt-5">
        <h1 className="display-4 text-primary">Welcome to Our Driving School</h1>
        <p className="lead text-secondary">Your path to safe and confident driving!</p>
        
        <div className="card mb-4">
          <img src="https://via.placeholder.com/800x400" className="card-img-top" alt="Driving School" />
          <div className="card-body">
            <p className="card-text">
              Don't think twice! Go to the SignUp page and join us. Start your journey today to becoming a safe and confident driver.
            </p>
            <a href="/signup" className="btn btn-success btn-lg">Join Us Now</a>
          </div>
        </div>
        
        <footer className="mt-5">
          <p className="text-muted">Contact us for more information or visit our services page for more details.</p>
        </footer>
    </div>
  )
}

export default HomeGuest;
