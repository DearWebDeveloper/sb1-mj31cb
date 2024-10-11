import React from 'react'
import { Link } from 'react-router-dom'
import { Home, Clipboard, Thermometer, Droplet, CheckSquare, Camera, FileText, BarChart, MessageCircle } from 'lucide-react'

const Sidebar: React.FC = () => {
  return (
    <div className="bg-gray-800 text-white w-64 flex-shrink-0">
      <div className="p-4">
        <h1 className="text-2xl font-bold">Water Damage Pro</h1>
      </div>
      <nav>
        <ul>
          <li>
            <Link to="/" className="flex items-center px-4 py-2 hover:bg-gray-700">
              <Home className="mr-2" />
              Dashboard
            </Link>
          </li>
          <li>
            <Link to="/project/1" className="flex items-center px-4 py-2 hover:bg-gray-700">
              <Clipboard className="mr-2" />
              Project Overview
            </Link>
          </li>
          <li>
            <Link to="/equipment/1" className="flex items-center px-4 py-2 hover:bg-gray-700">
              <Thermometer className="mr-2" />
              Equipment Placement
            </Link>
          </li>
          <li>
            <Link to="/readings/1" className="flex items-center px-4 py-2 hover:bg-gray-700">
              <Droplet className="mr-2" />
              Daily Readings
            </Link>
          </li>
          <li>
            <Link to="/moisture/1" className="flex items-center px-4 py-2 hover:bg-gray-700">
              <Droplet className="mr-2" />
              Moisture Mapping
            </Link>
          </li>
          <li>
            <Link to="/compliance/1" className="flex items-center px-4 py-2 hover:bg-gray-700">
              <CheckSquare className="mr-2" />
              Compliance Tasks
            </Link>
          </li>
          <li>
            <Link to="/photos/1" className="flex items-center px-4 py-2 hover:bg-gray-700">
              <Camera className="mr-2" />
              Photo Documentation
            </Link>
          </li>
          <li>
            <Link to="/forms/1" className="flex items-center px-4 py-2 hover:bg-gray-700">
              <FileText className="mr-2" />
              Forms & Signatures
            </Link>
          </li>
          <li>
            <Link to="/reports/1" className="flex items-center px-4 py-2 hover:bg-gray-700">
              <BarChart className="mr-2" />
              Customized Reports
            </Link>
          </li>
          <li>
            <Link to="/communication/1" className="flex items-center px-4 py-2 hover:bg-gray-700">
              <MessageCircle className="mr-2" />
              Homeowner Communication
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  )
}

export default Sidebar