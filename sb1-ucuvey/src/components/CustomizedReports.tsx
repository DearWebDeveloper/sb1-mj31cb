import React, { useState } from 'react'
import { FileText, Download, Settings } from 'lucide-react'

interface ReportOption {
  id: string
  label: string
  checked: boolean
}

const CustomizedReports: React.FC = () => {
  const [reportOptions, setReportOptions] = useState<ReportOption[]>([
    { id: 'project_summary', label: 'Project Summary', checked: true },
    { id: 'moisture_readings', label: 'Moisture Readings', checked: true },
    { id: 'equipment_log', label: 'Equipment Log', checked: false },
    { id: 'photo_documentation', label: 'Photo Documentation', checked: true },
    { id: 'daily_notes', label: 'Daily Notes', checked: false },
    { id: 'compliance_checklist', label: 'Compliance Checklist', checked: true },
  ])

  const toggleOption = (id: string) => {
    setReportOptions(reportOptions.map(option => 
      option.id === id ? { ...option, checked: !option.checked } : option
    ))
  }

  const generateReport = () => {
    const selectedOptions = reportOptions.filter(option => option.checked)
    console.log('Generating report with options:', selectedOptions)
    // Here you would typically call an API to generate the report
  }

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Customized Reports</h1>
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4">Report Options</h2>
        <div className="space-y-4 mb-6">
          {reportOptions.map(option => (
            <div key={option.id} className="flex items-center">
              <input
                type="checkbox"
                id={option.id}
                checked={option.checked}
                onChange={() => toggleOption(option.id)}
                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
              />
              <label htmlFor={option.id} className="ml-3 block text-sm font-medium text-gray-700">
                {option.label}
              </label>
            </div>
          ))}
        </div>
        <div className="flex justify-between items-center">
          <button
            onClick={generateReport}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            <FileText className="mr-2 h-5 w-5" />
            Generate Report
          </button>
          <div className="flex space-x-4">
            <button className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
              <Download className="mr-2 h-5 w-5" />
              Download Template
            </button>
            <button className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
              <Settings className="mr-2 h-5 w-5" />
              Configure
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CustomizedReports