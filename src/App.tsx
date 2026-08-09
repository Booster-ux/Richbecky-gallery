import React from 'react';
import { GalleryProvider, useGallery } from './context/GalleryContext';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { ToastNotification } from './components/ToastNotification';

// Pages
import { HomePage } from './pages/HomePage';
import { CataloguePage } from './pages/CataloguePage';
import { ArtworkDetailsPage } from './pages/ArtworkDetailsPage';
import { ArtistProfilePage } from './pages/ArtistProfilePage';
import { CartPage } from './pages/CartPage';
import { CheckoutPage } from './pages/CheckoutPage';
import { CustomerAccountPage } from './pages/CustomerAccountPage';
import { WishlistPage } from './pages/WishlistPage';
import { AboutPage } from './pages/AboutPage';
import { JournalPage } from './pages/JournalPage';
import { ArtistRegisterPage } from './pages/ArtistRegisterPage';
import { ArtistDashboardPage } from './pages/ArtistDashboardPage';
import { AddArtworkPage } from './pages/AddArtworkPage';
import { AdminDashboardPage } from './pages/AdminDashboardPage';
import { OrderConfirmationPage } from './pages/OrderConfirmationPage';

const AppContent: React.FC = () => {
  const { activePage } = useGallery();

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
      case 'account':
        return <CustomerAccountPage />;
      case 'wishlist':
        return <WishlistPage />;
      case 'about':
        return <AboutPage />;
      case 'journal':
        return <JournalPage />;
      case 'artist-register':
        return <ArtistRegisterPage />;
      case 'artist-dashboard':
        return <ArtistDashboardPage />;
      case 'add-artwork':
        return <AddArtworkPage />;
      case 'admin-dashboard':
        return <AdminDashboardPage />;
      case 'order-confirmation':
        return <OrderConfirmationPage />;
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
