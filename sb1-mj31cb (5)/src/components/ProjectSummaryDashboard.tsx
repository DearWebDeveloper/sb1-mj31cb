import React from 'react'
import { useParams } from 'react-router-dom'
import { useProjectContext } from '../contexts/ProjectContext'
import { BarChart2, Clock, Droplet, Thermometer, Wrench } from 'lucide-react'
import { Line } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'

// ... rest of the imports and ChartJS registration

const ProjectSummaryDashboard = () => {
  // ... existing code

  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      {/* ... other dashboard items */}
      <div className="bg-purple-100 p-4 rounded-md">
        <h3 className="text-lg font-semibold mb-2 flex items-center">
          <Wrench className="w-5 h-5 mr-2" />
          Equipment Used
        </h3>
        <p className="text-2xl font-bold">
          {project.dryingChambers.reduce((sum, chamber) => sum + chamber.equipment.length, 0)}
        </p>
      </div>
      {/* ... rest of the dashboard */}
    </div>
  )
}

export default ProjectSummaryDashboard