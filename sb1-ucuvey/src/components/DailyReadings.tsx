import React, { useState } from 'react'
import { Line } from 'react-chartjs-2'
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js'

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend)

const DailyReadings: React.FC = () => {
  const [selectedRoom, setSelectedRoom] = useState('Living Room')

  const rooms = ['Living Room', 'Bedroom', 'Kitchen']

  const mockData = {
    'Living Room': {
      labels: ['Day 1', 'Day 2', 'Day 3', 'Day 4', 'Day 5'],
      datasets: [
        {
          label: 'Moisture (%)',
          data: [80, 70, 60, 50, 40],
          borderColor: 'rgb(53, 162, 235)',
          backgroundColor: 'rgba(53, 162, 235, 0.5)',
        },
        {
          label: 'Temperature (°F)',
          data: [72, 73, 71, 70, 72],
          borderColor: 'rgb(255, 99, 132)',
          backgroundColor: 'rgba(255, 99, 132, 0.5)',
        },
      ],
    },
    'Bedroom': {
      labels: ['Day 1', 'Day 2', 'Day 3', 'Day 4', 'Day 5'],
      datasets: [
        {
          label: 'Moisture (%)',
          data: [75, 65, 55, 45, 35],
          borderColor: 'rgb(53, 162, 235)',
          backgroundColor: 'rgba(53, 162, 235, 0.5)',
        },
        {
          label: 'Temperature (°F)',
          data: [70, 71, 72, 71, 70],
          borderColor: 'rgb(255, 99, 132)',
          backgroundColor: 'rgba(255, 99, 132, 0.5)',
        },
      ],
    },
    'Kitchen': {
      labels: ['Day 1', 'Day 2', 'Day 3', 'Day 4', 'Day 5'],
      datasets: [
        {
          label: 'Moisture (%)',
          data: [85, 75, 65, 55, 45],
          borderColor: 'rgb(53, 162, 235)',
          backgroundColor: 'rgba(53, 162, 235, 0.5)',
        },
        {
          label: 'Temperature (°F)',
          data: [73, 74, 72, 71, 73],
          borderColor: 'rgb(255, 99, 132)',
          backgroundColor: 'rgba(255, 99, 132, 0.5)',
        },
      ],
    },
  }

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Daily Readings',
      },
    },
  }

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Daily Readings</h1>
      <div className="mb-4">
        <label htmlFor="room-select" className="block text-sm font-medium text-gray-700">Select Room</label>
        <select
          id="room-select"
          className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
          value={selectedRoom}
          onChange={(e) => setSelectedRoom(e.target.value)}
        >
          {rooms.map((room) => (
            <option key={room} value={room}>{room}</option>
          ))}
        </select>
      </div>
      <div className="bg-white p-4 rounded-lg shadow">
        <Line options={options} data={mockData[selectedRoom as keyof typeof mockData]} />
      </div>
    </div>
  )
}

export default DailyReadings