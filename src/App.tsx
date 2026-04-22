import './App.css';

import { Toaster } from "@/components/ui/sonner";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import ErrorBoundary from '../ErrorBoundary';
import AboutUs from './components/neca_components/AboutUs';
import ContactUs from './components/neca_components/ContactUs';
import LandingPage from './components/neca_components/Landingpage';
import MemberProfile from './components/neca_components/MemberProfile';
import Membershipform from './components/neca_components/Membershipform';
import Newsandevents from './components/neca_components/Newsandevents';
import Whatwedo from './components/neca_components/Whatwedo';
import GalleryEvents from './components/neca_components/GalleryEvents';

function App() {

  return (
    <>
      <Toaster />
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
            <Route path="/gallery" element={<GalleryEvents />} />
          </Routes>
        </BrowserRouter>
      </ErrorBoundary>



    </>
  )
}

export default App
