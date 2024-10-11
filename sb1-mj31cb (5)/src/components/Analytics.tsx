import React, { useState, useEffect } from 'react'
import { BarChart2, TrendingUp, Clock, DollarSign } from 'lucide-react'
import { Bar, Line } from 'react-chartjs-2'
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js'
import { useProjectContext } from '../contexts/ProjectContext'

ChartJS.register(CategoryScale, LinearScale, BarElement, PointElement, LineElement, Title, Tooltip, Legend)

const Analytics = () => {
  const { projects } = useProjectContext()
  const [projectStats, setProjectStats] = useState({ total: 0, completed: 0, inProgress: 0 })
  const [equipmentUsage, setEquipmentUsage] = useState([])
  const [revenueData, setRevenueData] = useState({ labels: [], data: [] })

  useEffect(() => {
    // Calculate project statistics
    const total = projects.length
    const completed = projects.filter(p => p.status === 'Completed').length
    const inProgress = projects.filter(p => p.status === 'In Progress').length
    setProjectStats({ total, completed, inProgress })

    // Calculate equipment usage
    const usage = {}
    projects.forEach(project => {
      project.dryingChambers.forEach(chamber => {
        chamber.equipment.forEach(eq => {
          usage[eq.type] = (usage[eq.type] || 0) + 1
        })
      })
    })
    setEquipmentUsage(Object.entries(usage).map(([type, count]) => ({ type, count })))

    // Simulate revenue data (replace with actual data in a real application)
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun']
    const data = months.map(() => Math.floor(Math.random() * 50000) + 10000)
    setRevenueData({ labels: months, data })
  }, [projects])

  const projectCompletionData = {
    labels: ['Completed', 'In Progress'],
    datasets: [
      {
        data: [projectStats.completed, projectStats.inProgress],
        backgroundColor: ['#4CAF50', '#FFC107'],
      },
    ],
  }

  const equipmentUsageData = {
    labels: equipmentUsage.map(eq => eq.type),
    datasets: [
      {
        label: 'Equipment Usage',
        data: equipmentUsage.map(eq => eq.count),
        backgroundColor: 'rgba(54, 162, 235, 0.6)',
      },
    ],
  }

  const revenueChartData = {
    labels: revenueData.labels,
    datasets: [
      {
        label: 'Revenue',
        data: revenueData.data,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1,
      },
    ],
  }

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-6">Analytics</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-2 flex items-center">
            <BarChart2 className="w-5 h-5 mr-2 text-blue-500" />
            Total Projects
          </h2>
          <p className="text-3xl font-bold">{projectStats.total}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-2 flex items-center">
            <TrendingUp className="w-5 h-5 mr-2 text-green-500" />
            Completed Projects
          </h2>
          <p className="text-3xl font-bold">{projectStats.completed}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-2 flex items-center">
            <Clock className="w-5 h-5 mr-2 text-yellow-500" />
            In Progress Projects
          </h2>
          <p className="text-3xl font-bold">{projectStats.inProgress}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-2 flex items-center">
            <DollarSign className="w-5 h-5 mr-2 text-purple-500" />
            Average Project Value
          </h2>
          <p className="text-3xl font-bold">${Math.floor(Math.random() * 10000) + 5000}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Project Completion Status</h2>
          <Bar data={projectCompletionData} options={{ responsive: true, plugins: { legend: { display: false } } }} />
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Equipment Usage</h2>
          <Bar data={equipmentUsageData} options={{ responsive: true }} />
        </div>
      </div>

      <div className="mt-8 bg-white p-4 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4">Revenue Trend</h2>
        <Line data={revenueChartData} options={{ responsive: true }} />
      </div>
    </div>
  )
}

export default Analytics