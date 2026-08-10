import React from 'react';
import { GalleryProvider, useGallery } from './context/GalleryContext';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { ToastNotification } from './components/ToastNotification';

// Public Pages
import { HomePage } from './pages/HomePage';
import { CataloguePage } from './pages/CataloguePage';
import { ArtworkDetailsPage } from './pages/ArtworkDetailsPage';
import { ArtistProfilePage } from './pages/ArtistProfilePage';
import { CartPage } from './pages/CartPage';
import { CheckoutPage } from './pages/CheckoutPage';
import { WishlistPage } from './pages/WishlistPage';
import { AboutPage } from './pages/AboutPage';
import { JournalPage } from './pages/JournalPage';
import { ContactAdvisoryPage } from './pages/ContactAdvisoryPage';
import { PolicyPage } from './pages/PolicyPage';
import { OrderConfirmationPage } from './pages/OrderConfirmationPage';

// Customer Auth & Account
import { CustomerLoginPage } from './pages/CustomerLoginPage';
import { CustomerRegisterPage } from './pages/CustomerRegisterPage';
import { CustomerAccountPage } from './pages/CustomerAccountPage';

// Artist Auth, Application & Studio
import { ArtistLandingPage } from './pages/ArtistLandingPage';
import { ArtistApplicationPage } from './pages/ArtistApplicationPage';
import { ArtistStatusPage } from './pages/ArtistStatusPage';
import { ArtistLoginPage } from './pages/ArtistLoginPage';
import { ArtistDashboardPage } from './pages/ArtistDashboardPage';
import { AddArtworkPage } from './pages/AddArtworkPage';

// Admin Governance
import { AdminLoginPage } from './pages/AdminLoginPage';
import { AdminDashboardPage } from './pages/AdminDashboardPage';

const AppContent: React.FC = () => {
  const { activePage, isAuthenticated, currentUser, artistApprovalStatus } = useGallery();

  const renderActivePage = () => {
    switch (activePage) {
      case 'home':
        return <HomePage />;
      case 'catalogue':
        return <CataloguePage />;
      case 'artwork-detail':
        return <ArtworkDetailsPage />;
      case 'artist-profile':
        return <ArtistProfilePage />;
      case 'cart':
        return <CartPage />;
      case 'checkout':
        return <CheckoutPage />;
      case 'wishlist':
        return <WishlistPage />;
      case 'about':
        return <AboutPage />;
      case 'journal':
        return <JournalPage />;
      case 'contact-advisory':
        return <ContactAdvisoryPage />;
      case 'policies':
        return <PolicyPage />;
      case 'order-confirmation':
        return <OrderConfirmationPage />;

      // Customer Auth & Account
      case 'login':
        return <CustomerLoginPage />;
      case 'register':
        return <CustomerRegisterPage />;
      case 'account':
        if (!isAuthenticated || !currentUser) return <CustomerLoginPage />;
        return <CustomerAccountPage />;

      // Artist Representation & Studio
      case 'artist-landing':
      case 'artist-register':
        return <ArtistLandingPage />;
      case 'artist-application':
        return <ArtistApplicationPage />;
      case 'artist-status':
        return <ArtistStatusPage />;
      case 'artist-login':
        return <ArtistLoginPage />;
      case 'artist-dashboard':
        if (!isAuthenticated || currentUser?.role !== 'artist') return <ArtistLoginPage />;
        if (artistApprovalStatus !== 'Approved' && currentUser?.artistApprovalStatus !== 'Approved') return <ArtistStatusPage />;
        return <ArtistDashboardPage />;
      case 'add-artwork':
        if (!isAuthenticated || currentUser?.role !== 'artist') return <ArtistLoginPage />;
        return <AddArtworkPage />;

      // Admin Governance
      case 'admin-login':
        return <AdminLoginPage />;
      case 'admin-dashboard':
        if (!isAuthenticated || currentUser?.role !== 'admin') return <AdminLoginPage />;
        return <AdminDashboardPage />;

      default:
        return <HomePage />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-ivory-100 text-neutral-800 selection:bg-gold-500 selection:text-white">
      <Header />
      <main className="flex-1">
        {renderActivePage()}
      </main>
      <Footer />
      <ToastNotification />
    </div>
  );
};

export function App() {
  return (
    <GalleryProvider>
      <AppContent />
    </GalleryProvider>
  );
}

export default App;
