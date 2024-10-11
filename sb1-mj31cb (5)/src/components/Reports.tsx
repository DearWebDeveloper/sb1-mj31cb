import React, { useState } from 'react'
import { FileText, Download, Calendar } from 'lucide-react'

const Reports = () => {
  const [reportType, setReportType] = useState('')
  const [dateRange, setDateRange] = useState({ start: '', end: '' })

  const reports = [
    { id: 1, name: 'Initial Assessment Report', date: '2023-04-01' },
    { id: 2, name: 'Progress Report - Week 1', date: '2023-04-08' },
    { id: 3, name: 'Equipment Usage Log', date: '2023-04-15' },
    { id: 4, name: 'Final Restoration Report', date: '2023-04-22' },
  ]

  const generateReport = (e) => {
    e.preventDefault()
    // Here you would typically make an API call to generate the report
    console.log('Generating report:', { reportType, dateRange })
    // After generating, you might add the new report to the list
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Reports</h1>
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold mb-4">Generated Reports</h2>
        <ul className="space-y-4">
          {reports.map(report => (
            <li key={report.id} className="flex items-center justify-between bg-gray-100 p-3 rounded">
              <div className="flex items-center">
                <FileText className="w-6 h-6 text-blue-500 mr-3" />
                <div>
                  <p className="font-medium">{report.name}</p>
                  <p className="text-sm text-gray-500">{report.date}</p>
                </div>
              </div>
              <button className="text-blue-500 hover:text-blue-700 flex items-center">
                <Download className="w-5 h-5 mr-1" />
                Download
              </button>
            </li>
          ))}
        </ul>
      </div>
      <div className="mt-6">
        <h2 className="text-xl font-semibold mb-4">Generate New Report</h2>
        <div className="bg-white rounded-lg shadow-md p-6">
          <form onSubmit={generateReport} className="space-y-4">
            <div>
              <label htmlFor="reportType" className="block text-sm font-medium text-gray-700">
                Report Type
              </label>
              <select
                id="reportType"
                value={reportType}
                onChange={(e) => setReportType(e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
              >
                <option value="">Select a report type</option>
                <option value="progress">Progress Report</option>
                <option value="equipment">Equipment Usage Log</option>
                <option value="moisture">Moisture Reading Summary</option>
                <option value="final">Final Restoration Report</option>
              </select>
            </div>
            <div>
              <label htmlFor="dateRange" className="block text-sm font-medium text-gray-700">
                Date Range
              </label>
              <div className="flex space-x-4">
                <input
                  type="date"
                  value={dateRange.start}
                  onChange={(e) => setDateRange({ ...dateRange, start: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                />
                <input
                  type="date"
                  value={dateRange.end}
                  onChange={(e) => setDateRange({ ...dateRange, end: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                />
              </div>
            </div>
            <button
              type="submit"
              className="w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 flex items-center justify-center"
            >
              <Calendar className="w-5 h-5 mr-2" />
              Generate Report
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Reports