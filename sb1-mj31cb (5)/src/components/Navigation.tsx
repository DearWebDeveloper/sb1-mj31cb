import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { Home, Clipboard, Settings, LogOut, Wrench, FileText, AlertTriangle, Users, BarChart2 } from 'lucide-react'

const Navigation = () => {
  const { user, logout } = useAuth()
  const location = useLocation()

  const isActive = (path) => {
    return location.pathname === path ? 'bg-blue-700' : ''
  }

  return (
    <nav className="bg-blue-600 text-white w-64 space-y-6 py-7 px-2 flex flex-col h-screen">
      <div className="text-2xl font-semibold text-center mb-6">AquaRestore</div>
      <ul className="flex-grow">
        <li>
          <Link to="/" className={`flex items-center space-x-2 py-2 px-4 rounded hover:bg-blue-700 ${isActive('/')}`}>
            <Home className="w-5 h-5" />
            <span>Dashboard</span>
          </Link>
        </li>
        <li>
          <Link to="/projects" className={`flex items-center space-x-2 py-2 px-4 rounded hover:bg-blue-700 ${isActive('/projects')}`}>
            <Clipboard className="w-5 h-5" />
            <span>Projects</span>
          </Link>
        </li>
        <li>
          <Link to="/equipment" className={`flex items-center space-x-2 py-2 px-4 rounded hover:bg-blue-700 ${isActive('/equipment')}`}>
            <Wrench className="w-5 h-5" />
            <span>Equipment</span>
          </Link>
        </li>
        <li>
          <Link to="/reports" className={`flex items-center space-x-2 py-2 px-4 rounded hover:bg-blue-700 ${isActive('/reports')}`}>
            <FileText className="w-5 h-5" />
            <span>Reports</span>
          </Link>
        </li>
        <li>
          <Link to="/compliance" className={`flex items-center space-x-2 py-2 px-4 rounded hover:bg-blue-700 ${isActive('/compliance')}`}>
            <AlertTriangle className="w-5 h-5" />
            <span>Compliance</span>
          </Link>
        </li>
        <li>
          <Link to="/analytics" className={`flex items-center space-x-2 py-2 px-4 rounded hover:bg-blue-700 ${isActive('/analytics')}`}>
            <BarChart2 className="w-5 h-5" />
            <span>Analytics</span>
          </Link>
        </li>
        {user && user.role === 'admin' && (
          <li>
            <Link to="/users" className={`flex items-center space-x-2 py-2 px-4 rounded hover:bg-blue-700 ${isActive('/users')}`}>
              <Users className="w-5 h-5" />
              <span>User Management</span>
            </Link>
          </li>
        )}
      </ul>
      <div className="mt-auto">
        <Link to="/settings" className={`flex items-center space-x-2 py-2 px-4 rounded hover:bg-blue-700 ${isActive('/settings')}`}>
          <Settings className="w-5 h-5" />
          <span>Settings</span>
        </Link>
        {user && (
          <div className="flex items-center justify-between px-4 py-2 mt-2 border-t border-blue-500">
            <span className="text-sm">{user.email}</span>
            <button onClick={logout} className="flex items-center text-white hover:text-gray-200">
              <LogOut className="w-5 h-5 mr-2" />
              Logout
            </button>
          </div>
        )}
      </div>
    </nav>
  )
}

export default Navigation