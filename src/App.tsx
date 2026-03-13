import './App.css'
import ErrorBoundary from '../ErrorBoundary';
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import LandingPage from './components/neca_components/Landingpage';
import AboutUs from './components/neca_components/AboutUs';
import Whatwedo from './components/neca_components/Whatwedo';
import Newsandevents from './components/neca_components/Newsandevents';
import ContactUs from './components/neca_components/ContactUs';
import Membershipform from './components/neca_components/Membershipform';

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
            <Route path="*" element={<Navigate to="/home" />} />
          </Routes>
        </BrowserRouter>
      </ErrorBoundary>



    </>
  )
}

export default App
