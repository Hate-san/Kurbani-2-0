import React, { useState } from 'react';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { CartModal } from './components/CartModal';
import { Animal } from './types';

// Pages
import { Home } from './pages/Home';
import { AnimalMarket } from './pages/AnimalMarket';
import { AnimalDetailModal } from './pages/AnimalDetailModal';
import { HowItWorks } from './pages/HowItWorks';
import { MyOrders } from './pages/MyOrders';
import { FarmerDashboard } from './pages/FarmerDashboard';
import { AdminDashboard } from './pages/AdminDashboard';
import { AuthPage } from './pages/AuthPage';

export function MainApp() {
  const [activeTab, setActiveTab] = useState<string>('home');
  const [selectedAnimal, setSelectedAnimal] = useState<Animal | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const handleOrderSuccess = (_order: any) => {
    setActiveTab('my-orders');
  };

  return (
    <div className="min-h-screen bg-slate-100 font-sans text-slate-900 flex flex-col justify-between selection:bg-emerald-500 selection:text-white">
      <div>
        <Navbar
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          openCart={() => setIsCartOpen(true)}
        />

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 sm:pt-8">
          {activeTab === 'home' && (
            <Home
              onSelectAnimal={(animal) => setSelectedAnimal(animal)}
              onNavigate={(tab) => setActiveTab(tab)}
            />
          )}

          {activeTab === 'animals' && (
            <AnimalMarket
              onSelectAnimal={(animal) => setSelectedAnimal(animal)}
            />
          )}

          {activeTab === 'how-it-works' && <HowItWorks />}

          {activeTab === 'my-orders' && <MyOrders />}

          {activeTab === 'farmer' && <FarmerDashboard />}

          {activeTab === 'admin' && <AdminDashboard />}

          {activeTab === 'login' && (
            <AuthPage onSuccess={() => setActiveTab('home')} />
          )}
        </main>
      </div>

      <Footer />

      {/* Animal Details Modal */}
      <AnimalDetailModal
        animal={selectedAnimal}
        onClose={() => setSelectedAnimal(null)}
        onOpenCart={() => setIsCartOpen(true)}
      />

      {/* Cart & Checkout Modal */}
      <CartModal
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        onOrderSuccess={handleOrderSuccess}
      />
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <MainApp />
      </CartProvider>
    </AuthProvider>
  );
}
