import React from 'react'
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom'
import { AuthProvider, useAuth } from './contexts/AuthContext'
import { ProjectProvider } from './contexts/ProjectContext'
import { RoleProvider } from './contexts/RoleContext'
import { SubscriptionProvider } from './contexts/SubscriptionContext'
import { NotificationProvider } from './contexts/NotificationContext'
import Navigation from './components/Navigation'
import Dashboard from './components/Dashboard'
import ProjectList from './components/ProjectList'
import ProjectDetail from './components/ProjectDetail'
import ProjectScope from './components/ProjectScope'
import EquipmentDryingDetails from './components/EquipmentDryingDetails'
import DailyMoistureReadings from './components/DailyMoistureReadings'
import ComplianceChecks from './components/ComplianceChecks'
import ProjectReportGenerator from './components/ProjectReportGenerator'
import Settings from './components/Settings'
import EquipmentInventory from './components/EquipmentInventory'
import EquipmentMaintenance from './components/EquipmentMaintenance'
import UserManagement from './components/UserManagement'
import Login from './components/Login'
import ProjectTimeline from './components/ProjectTimeline'
import Analytics from './components/Analytics'

const PrivateRoute = ({ children }) => {
  const { isAuthenticated } = useAuth()
  return isAuthenticated ? children : <Navigate to="/login" />
}

function App() {
  return (
    <AuthProvider>
      <SubscriptionProvider>
        <RoleProvider>
          <ProjectProvider>
            <NotificationProvider>
              <Router>
                <div className="flex h-screen bg-gray-100">
                  <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route
                      path="*"
                      element={
                        <PrivateRoute>
                          <div className="flex h-screen bg-gray-100">
                            <Navigation />
                            <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100">
                              <div className="container mx-auto px-6 py-8">
                                <Routes>
                                  <Route path="/" element={<Dashboard />} />
                                  <Route path="/projects" element={<ProjectList />} />
                                  <Route path="/project/:id" element={<ProjectDetail />} />
                                  <Route path="/project/:id/scope" element={<ProjectScope />} />
                                  <Route path="/project/:id/drying-details" element={<EquipmentDryingDetails />} />
                                  <Route path="/project/:id/moisture-readings" element={<DailyMoistureReadings />} />
                                  <Route path="/project/:id/report-generator" element={<ProjectReportGenerator />} />
                                  <Route path="/project/:id/timeline" element={<ProjectTimeline />} />
                                  <Route path="/compliance" element={<ComplianceChecks />} />
                                  <Route path="/settings" element={<Settings />} />
                                  <Route path="/equipment" element={<EquipmentInventory />} />
                                  <Route path="/equipment-maintenance" element={<EquipmentMaintenance />} />
                                  <Route path="/users" element={<UserManagement />} />
                                  <Route path="/analytics" element={<Analytics />} />
                                </Routes>
                              </div>
                            </main>
                          </div>
                        </PrivateRoute>
                      }
                    />
                  </Routes>
                </div>
              </Router>
            </NotificationProvider>
          </ProjectProvider>
        </RoleProvider>
      </SubscriptionProvider>
    </AuthProvider>
  )
}

export default App