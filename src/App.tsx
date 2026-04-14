import './App.css';

import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import ErrorBoundary from '../ErrorBoundary';
import AboutUs from './components/neca_components/AboutUs';
import ContactUs from './components/neca_components/ContactUs';
import LandingPage from './components/neca_components/Landingpage';
import MemberProfile from './components/neca_components/MemberProfile';
import Membershipform from './components/neca_components/Membershipform';
import Newsandevents from './components/neca_components/Newsandevents';
import Whatwedo from './components/neca_components/Whatwedo';
import AdminLogin from './components/neca_admin/AdminLogin';
import AdminDashboard from './components/neca_admin/AdminDashboard';

function App() {

  return (
    <>

      <ErrorBoundary>
        <BrowserRouter>
          <Routes>
            <Route path="/" index element={<LandingPage />} />
            <Route path="/home" index element={<LandingPage />} />
            <Route path="/about" element={<AboutUs />} />
            <Route path="/what-we-do" element={<Whatwedo />} />
            <Route path="/events" element={<Newsandevents />} />
            <Route path="/contact" element={<ContactUs />} />
            <Route path="/membership" element={<Membershipform />} />
            <Route path="/member/:id" element={<MemberProfile />} />
            <Route path="*" element={<Navigate to="/home" />} />
            <Route path="/adminlogin" element={<AdminLogin />} />
            <Route path="/dashboard" element={<AdminDashboard />} />
          </Routes>
        </BrowserRouter>
      </ErrorBoundary>



    </>
  )
}

export default App
