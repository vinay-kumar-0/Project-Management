import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import EmployeeDashboard from './pages/EmployeeDashboard';
import ManagerDashboard from './pages/ManagerDashboard';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Route */}
        <Route path="/" element={<Login />} />

        {/* Protected Employee Routes */}
        <Route element={<ProtectedRoute allowedRoles={['employee']} />}>
          <Route path="/employee" element={<EmployeeDashboard />} />
        </Route>

        {/* Protected Manager Routes */}
        <Route element={<ProtectedRoute allowedRoles={['manager']} />}>
          <Route path="/manager" element={<ManagerDashboard />} />
        </Route>

        {/* Catch-all redirect */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;