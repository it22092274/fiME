import { BrowserRouter as Router } from 'react-router-dom'
import './App.css'
import FrontendRoutes from "./FrontendRoutes.tsx";

function App() {

  return (
    <Router>
        <FrontendRoutes />
    </Router>
  )
}

export default App
