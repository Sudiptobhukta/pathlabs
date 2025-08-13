// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Register from './pages/Register';
import BookAppointment from './pages/BookAppointment';
import Settings from './pages/Settings';
import TestHistory from './pages/TestResults';
import Notifications from './pages/Notifications';
import Chatbot from './components/Chatbot';
import BookingHistory from './pages/BookingHistory';
import TestAppointment from './pages/TestAppointment';
import AdminDashboard from './pages/AdminDashboard';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/dash" element={<Dashboard />} />
        <Route path= "admin-dash" element={<AdminDashboard/>} />
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/book-appointment" element={<BookAppointment />} />
        <Route path="/bookinghistory" element={<BookingHistory />} />
        <Route path="/test-results" element={<TestHistory />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/notifications" element={<Notifications />} />
        <Route path="/chatbot" element={<Chatbot />} />
        <Route path='/test-appointment' element={<TestAppointment/>}/>
      </Routes>
    </Router>
  );
}

export default App;
