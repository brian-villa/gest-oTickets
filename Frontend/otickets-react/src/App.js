import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Signin from './pages/Signin'; 
import Signup from './pages/Signup'; 
import Main from './pages/Main';
import TicketComposer from './components/TicketComposer'; // Importando o TicketComposer como sub-rota
import Profile from './pages/Profile'
import UserDashboard from './pages/UserDashboard';
import Department from './pages/Departments';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/main/*" element={<Main />}>
          {/* Subrotas Main */}
          <Route path="ticket-composer" element={<TicketComposer />} />
        </Route>
        <Route path="profile" element={<Profile/>} />
        <Route path="user-dashboard" element={<UserDashboard />} />
        <Route path="departments" element={<Department/>} />
      </Routes>
    </Router>
  );
}

export default App;
