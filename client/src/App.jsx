import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useApp } from './context/AppContext';
import { HomePage } from './pages/HomePage';
import { AdminDashboardPage } from './pages/AdminDashboardPage';
import { WelcomePage } from './pages/WelcomePage';
import { ChatPage } from './pages/ChatPage';

function App() {
  const { isAuthenticated, user } = useApp();

  return (
    <Router>
      <Routes>
        {/* --- Public Route --- */}
        {/* If not authenticated, always show the HomePage */}
        <Route path="/" element={!isAuthenticated ? <HomePage /> : <Navigate to="/navigate" />} />

        {/* --- Navigation Route (A temporary "sorting hat") --- */}
        {/* After login, redirect to the correct page based on role */}
        <Route path="/navigate" element={
            isAuthenticated ? (user.role === 'admin' ? <Navigate to="/dashboard" /> : <Navigate to="/welcome" />) : <Navigate to="/" />
        } />
        
        {/* --- Protected Routes --- */}
        {/* These routes are only accessible if the user is authenticated */}
        <Route path="/dashboard" element={isAuthenticated && user.role === 'admin' ? <AdminDashboardPage /> : <Navigate to="/" />} />
        <Route path="/welcome" element={isAuthenticated && user.role === 'friend' ? <WelcomePage /> : <Navigate to="/" />} />
        <Route path="/chat/:conversationId" element={isAuthenticated ? <ChatPage /> : <Navigate to="/" />} />

        {/* --- Catch-all Route --- */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;