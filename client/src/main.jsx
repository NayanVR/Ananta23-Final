import React, { lazy, Suspense } from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster } from 'react-hot-toast';

import { AuthProvider } from './contexts/AuthContext.jsx';

import PrivateRoute from './components/PrivateRoute.jsx';
import AccessRoute from './components/AccessRoute.jsx';
import Navbar from './components/Navbar.jsx';
import ScrollToTop from './components/ScrollToTop.jsx';
import ComingSoon from './components/ComingSoon';
import Footer from './components/Footer';
import Loading from './components/Loading';
import FirebaseAnalytics from './components/FirebaseAnalytics';

// import Home from './pages/Home.jsx'
// import Login from './pages/Login.jsx'
// import Register from './pages/Register.jsx'
// import Profile from './pages/Pro.jsx'
// import BuyPass from './pages/BuyPass';
// import Inertia from './pages/Inertia';
// import Swoosh from './pages/Swoosh';
// import KalaKriti from './pages/KalaKriti';
// import PrivacyPolicy from './pages/PrivacyPolicy';
// import PaymentSuccess from './pages/PaymentSuccess';
// import PaymentFail from './pages/PaymentFail'
// import TermCondition from './pages/TermCondition';
// import RefundPolicy from './pages/RefundPolicy';
// import Countdown from './pages/Countdown';
// import ContactUs from './pages/ContactUs';
// import AboutUs from './pages/AboutUs';
// import Digitalpoint from './pages/Digitalpoint';
// import Equilibrium from './pages/Equilibrium';
// import Upshot from './pages/Upshot';
// import Zingaat from './pages/Zingaat';
// import Partners from './pages/Partners';
// import PageNotFound from './pages/PageNotFound';
// import Team from './pages/Team';
const Home = lazy(() => import('./pages/Home'));
const Login = lazy(() => import('./pages/Login'));
const Register = lazy(() => import('./pages/Register'));
const Profile = lazy(() => import('./pages/Pro'));
const BuyPass = lazy(() => import('./pages/BuyPass'));
const Inertia = lazy(() => import('./pages/Inertia'));
const Swoosh = lazy(() => import('./pages/Swoosh'));
const KalaKriti = lazy(() => import('./pages/KalaKriti'));
const PrivacyPolicy = lazy(() => import('./pages/PrivacyPolicy'));
const PaymentSuccess = lazy(() => import('./pages/PaymentSuccess'));
const PaymentFail = lazy(() => import('./pages/PaymentFail'));
const TermCondition = lazy(() => import('./pages/TermCondition'));
const RefundPolicy = lazy(() => import('./pages/RefundPolicy'));
const Countdown = lazy(() => import('./pages/Countdown'));
const ContactUs = lazy(() => import('./pages/ContactUs'));
const AboutUs = lazy(() => import('./pages/AboutUs'));
const Digitalpoint = lazy(() => import('./pages/Digitalpoint'));
const Equilibrium = lazy(() => import('./pages/Equilibrium'));
const Upshot = lazy(() => import('./pages/Upshot'));
const Zingaat = lazy(() => import('./pages/Zingaat'));
const Partners = lazy(() => import('./pages/Partners'));
const PageNotFound = lazy(() => import('./pages/PageNotFound'));
const Team = lazy(() => import('./pages/Team'));
const Hardworking = lazy(() => import('./pages/Hardworking'));
const MyEvents = lazy(() => import('./pages/MyEvents'));

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <Toaster />
      <BrowserRouter>
        <ScrollToTop />
        <Navbar />
        <FirebaseAnalytics />
        <Suspense fallback={<Loading />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<AccessRoute element={<Login />} />} />
            <Route path="/register" element={<AccessRoute element={<Register />} />} />
            <Route path="/profile" element={<PrivateRoute element={<Profile />} />} />
            <Route path="/buypass" element={<BuyPass />} />
            <Route path="/inertia" element={<Inertia />} />
            <Route path="/swoosh" element={<Swoosh />} />
            <Route path="/kalakriti" element={<KalaKriti />} />
            <Route path="/privacypolicy" element={<PrivacyPolicy />} />
            <Route path="/paymentsuccess" element={<PrivateRoute element={<PaymentSuccess />} />} />
            <Route path="/paymentfail" element={<PrivateRoute element={<PaymentFail />} />} />
            <Route path="*" element={<PageNotFound />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/term&condition" element={<TermCondition />} />
            <Route path="/refund-policy" element={<RefundPolicy />} />
            <Route path="/about-us" element={<AboutUs />} />
            <Route path="/contact-us" element={<ContactUs />} />
            <Route path="/cd" element={<Countdown />} />
            <Route path="/digital-point" element={<Digitalpoint />} />
            <Route path="/coming-soon" element={<ComingSoon />} />
            <Route path="/equilibrium" element={<Equilibrium />} />
            <Route path="/upshot" element={<Upshot />} />
            <Route path="/zingaat" element={<Zingaat />} />
            <Route path="/our-partners" element={<Partners />} />
            <Route path="/team" element={<Team />} />
            <Route path="/myevents" element={<PrivateRoute element={<MyEvents />} />} />
            <Route path="/hardworkers" element={<Hardworking />} />
          </Routes>
        </Suspense>
        <Footer />
      </BrowserRouter>
    </AuthProvider>
  </React.StrictMode>
)
