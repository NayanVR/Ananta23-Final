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
import Profile from './pages/Profile.jsx'
import Pro from './pages/Pro.jsx'
import BuyPass from './pages/BuyPass';
import Footer from './components/Footer';
import Inertia from './pages/Inertia';
import PaymentSuccess from './pages/PaymentSuccess';
import PaymentFail from './pages/PaymentFail';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermCondition from './pages/TermCondition';
import RefundPolicy from './pages/RefundPolicy';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <Navbar />
      <Toaster />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<PrivateRoute element={<Profile />} />} />
          <Route path="/pro" element={<PrivateRoute element={<Pro />} />} />
          <Route path="/buypass" element={<BuyPass />} />
          <Route path="/inertia" element={<Inertia />} />
          <Route path="/paymentsuccess/:value" element={<PaymentSuccess />} />
          <Route path="/paymentfail" element={<PaymentFail />} />
          <Route path="*" element={<h1>404 Not Found</h1>} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/term&condition" element={<TermCondition />} />
          <Route path="/refund-policy" element={<RefundPolicy />} />

        </Routes>
      </BrowserRouter>
      <Footer />
    </AuthProvider>
  </React.StrictMode>
)
