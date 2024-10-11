import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Dashboard from './components/Dashboard'
import ProjectOverview from './components/ProjectOverview'
import EquipmentPlacement from './components/EquipmentPlacement'
import DailyReadings from './components/DailyReadings'
import MoistureMapping from './components/MoistureMapping'
import ComplianceTaskManager from './components/ComplianceTaskManager'
import PhotoDocumentation from './components/PhotoDocumentation'
import FormsAndSignatures from './components/FormsAndSignatures'
import CustomizedReports from './components/CustomizedReports'
import HomeownerCommunication from './components/HomeownerCommunication'
import Sidebar from './components/Sidebar'

function App() {
  return (
    <Router>
      <div className="flex h-screen bg-gray-100">
        <Sidebar />
        <div className="flex-1 overflow-auto">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/project/:id" element={<ProjectOverview />} />
            <Route path="/equipment/:id" element={<EquipmentPlacement />} />
            <Route path="/readings/:id" element={<DailyReadings />} />
            <Route path="/moisture/:id" element={<MoistureMapping />} />
            <Route path="/compliance/:id" element={<ComplianceTaskManager />} />
            <Route path="/photos/:id" element={<PhotoDocumentation />} />
            <Route path="/forms/:id" element={<FormsAndSignatures />} />
            <Route path="/reports/:id" element={<CustomizedReports />} />
            <Route path="/communication/:id" element={<HomeownerCommunication />} />
          </Routes>
        </div>
      </div>
    </Router>
  )
}

export default App