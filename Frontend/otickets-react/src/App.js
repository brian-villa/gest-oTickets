import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Signin from './pages/Signin'; // Página de login
import Signup from './pages/Signup'; // Página de registro

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </Router>
  );
}

export default App;
