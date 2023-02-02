import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AuthProvider } from './contexts/AuthContext.jsx';
import { Toaster } from 'react-hot-toast';
import PrivateRoute from './components/PrivateRoute.jsx';
import Navbar from './components/Navbar.jsx';
import Home from './pages/Home.jsx'
import Login from './pages/Login.jsx'
import Register from './pages/Register.jsx'
// import Profile from './pages/Profile.jsx'
import Profile from './pages/Pro.jsx'
import BuyPass from './pages/BuyPass';
import Footer from './components/Footer';
import Inertia from './pages/Inertia';
import Swoosh from './pages/Swoosh';
import KalaKriti from './pages/KalaKriti';
import PrivacyPolicy from './pages/PrivacyPolicy';
import PaymentSuccess from './pages/PaymentSuccess';
import PaymentFail from './pages/PaymentFail'
import TermCondition from './pages/TermCondition';
import RefundPolicy from './pages/RefundPolicy';
import Countdown from './pages/Countdown';
import ContactUs from './pages/ContactUs';
import AboutUs from './pages/AboutUs';


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <Toaster />
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<PrivateRoute element={<Profile />} />} />
          <Route path="/buypass" element={<BuyPass />} />
          <Route path="/inertia" element={<Inertia />} />
          <Route path="/swoosh" element={<Swoosh />} />
          <Route path="/kalakriti" element={<KalaKriti />} />
          <Route path="/privacypolicy" element={<PrivacyPolicy />} />
          <Route path="/paymentsuccess" element={<PrivateRoute element={<PaymentSuccess />} />} />
          <Route path="/paymentfail" element={<PrivateRoute element={<PaymentFail />} />} />
          <Route path="*" element={<h1>404 Not Found</h1>} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/term&condition" element={<TermCondition />} />
          <Route path="/refund-policy" element={<RefundPolicy />} />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/contact-us" element={<ContactUs />} />
          <Route path="/cd" element={<Countdown />} />

        </Routes>
      </BrowserRouter>
      <Footer />
    </AuthProvider>
  </React.StrictMode>
)
