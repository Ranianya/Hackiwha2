import { BrowserRouter as Router, Routes, Route, Navigate, Outlet, useLocation } from 'react-router-dom';
import { useState } from 'react';
import { Menu, LogOut } from 'lucide-react';

import Dashboard1 from './components/Dashboard1';
import PatientList from './components/PatientList';
import Planning from './components/Planning';
import EmergencyManagement from './components/EmergencyManagement';
import Sidebar from './components/Sidebar';
import Accueil from './components/Accueil';

function DoctorInterface() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const getPageTitle = () => {
    if (location.pathname.includes('/planning')) return 'Planning';
    if (location.pathname.includes('/patients')) return 'Liste des patients';
    return 'Tableau de bord';
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar component */}
      <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Navbar */}
        <header className="bg-white shadow-sm">
          <div className="flex items-center justify-between px-4 py-3">
            <div className="flex items-center">
              <button onClick={toggleSidebar} className="text-gray-600 md:hidden">
                <Menu size={24} />
              </button>
              <h1 className="ml-4 text-xl font-semibold text-gray-800 md:ml-0">{getPageTitle()}</h1>
            </div>
            
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto p-6 bg-gray-100">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/Accueil" replace />} />
        <Route path="/Accueil" element={<Accueil/>} />
        <Route element={<DoctorInterface />}>
          <Route path="/dashboard1" element={<Dashboard1/>} />
          <Route path="/planning" element={<Planning />} />
          <Route path="/patients" element={<PatientList />} />
          <Route path="/patients/:id/emergency" element={<EmergencyManagement />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App; 