/**
 * Root Application Component & Router Configuration
 */
import { Routes, Route } from 'react-router-dom';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import AdminUpdates from './pages/AdminUpdates';
import AdminGallery from './pages/AdminGallery';

// Layout Imports
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';

// Page Imports
import Home from './pages/Home';
import About from './pages/About';
import Programs from './pages/Programs';
import Impact from './pages/Impact';
import Gallery from './pages/Gallery';
import Updates from './pages/Updates';
import Support from './pages/Support';

export default function App() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Navbar />
      <main style={{ flex: 1 }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/programs" element={<Programs />} />
          <Route path="/impact" element={<Impact />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/updates" element={<Updates />} />
          <Route path="/support" element={<Support />} />
          <Route path="/admin" element={<AdminLogin />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/updates" element={<AdminUpdates />} />
        <Route path="/admin/gallery" element={<AdminGallery />} />
      </Routes>
      </main>
      <Footer />
    </div>
  );
}
