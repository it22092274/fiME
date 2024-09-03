import { Routes, Route } from 'react-router-dom'
import Homepage from "./pages/HomePage.tsx";
import Dashboard from "./pages/Dashboard.tsx";
import Analytics from "./pages/Analytics.tsx";
import History from "./pages/History.tsx";
import Settings from "./pages/Settings.tsx";
import Profile from "./pages/Profile.tsx";
import Transactions from "./pages/Transactions.tsx";

const FrontendRoutes = () => {
    return(
        <Routes>
            <Route path='/' element={<Homepage />} />
            <Route path='/dashboard' element={<Dashboard />} />
            <Route path='/analytics' element={<Analytics />} />
            <Route path='/history' element={<History />} />
            <Route path='/settings' element={<Settings />} />
            <Route path='/profile' element={<Profile />} />
            <Route path='/transactions' element={<Transactions />} />
        </Routes>
    )
}

export default  FrontendRoutes