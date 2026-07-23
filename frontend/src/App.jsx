import { useState, useEffect } from 'react';
import Catalog from './pages/Catalog.jsx';
import WatchlistPage from './pages/WatchlistPage.jsx';
import BookmarksPage from './pages/BookmarksPage.jsx';

import Login from './pages/Login.jsx';
import Signup from './pages/Signup.jsx';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const TABS = [
  { id: 'catalog', label: 'Catalog' },
  { id: 'watchlist', label: 'Watchlist' },
  { id: 'bookmarks', label: 'Bookmarks' }
];

function App() {
  const [activeTab, setActiveTab] = useState('login');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // ✅ Check login on refresh
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
      setActiveTab("catalog");
    }
  }, []);

  // ✅ AUTH SCREEN
  if (!isLoggedIn) {
    return (
      <div className="app">
        <header className="app-header">
          <h1 className="brand">
            Movie <span>Companion</span>
          </h1>
        </header>

        <main className="app-main">
          {activeTab === 'login' && (
            <Login 
              setActiveTab={setActiveTab}
              setIsLoggedIn={setIsLoggedIn}
            />
          )}

          {activeTab === 'signup' && (
            <Signup setActiveTab={setActiveTab} />
          )}
        </main>

        <ToastContainer position="top-right" autoClose={2000} theme="dark" />
      </div>
    );
  }

  // ✅ MAIN APP
  return (
    <div className="app">
      <header className="app-header">
        <div className="header-inner">
          <h1 className="brand">
            Movie <span>Companion</span>
          </h1>

          <nav className="tabs">
            {TABS.map((tab) => (
              <button
                key={tab.id}
                className={activeTab === tab.id ? 'tab active' : 'tab'}
                onClick={() => setActiveTab(tab.id)}
              >
                {tab.label}
              </button>
            ))}

            {/* ✅ Logout */}
            <button
              className="tab"
              onClick={() => {
                localStorage.removeItem("token");
                setIsLoggedIn(false);
                setActiveTab("login");
              }}
            >
              Logout
            </button>
          </nav>
        </div>
      </header>

      <main className="app-main">
        {activeTab === 'catalog' && <Catalog />}
        {activeTab === 'watchlist' && <WatchlistPage />}
        {activeTab === 'bookmarks' && <BookmarksPage />}
      </main>

      <ToastContainer position="top-right" autoClose={2000} theme="dark" />
    </div>
  );
}

export default App;