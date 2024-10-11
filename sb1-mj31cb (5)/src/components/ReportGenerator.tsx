import React, { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { FileText, Download, Calendar } from 'lucide-react'

const ReportGenerator = () => {
  const { id: projectId } = useParams()
  const [project, setProject] = useState(null)
  const [reportType, setReportType] = useState('')
  const [dateRange, setDateRange] = useState({ start: '', end: '' })
  const [generatedReports, setGeneratedReports] = useState([])

  useEffect(() => {
    // Fetch project details
    const fetchProjectDetails = async () => {
      // Simulated API call
      const projectData = {
        id: projectId,
        name: 'Water Damage Restoration - 123 Main St',
        // Add other relevant project details
      }
      setProject(projectData)
    }

    fetchProjectDetails()
  }, [projectId])

  const generateReport = (e) => {
    e.preventDefault()
    // In a real application, this would trigger an API call to generate the report
    const newReport = {
      id: Date.now(),
      type: reportType,
      dateGenerated: new Date().toISOString(),
      dateRange: dateRange,
      fileName: `${reportType.replace(/\s+/g, '-').toLowerCase()}-${dateRange.start}-${dateRange.end}.pdf`
    }
    setGeneratedReports([...generatedReports, newReport])
    // Reset form
    setReportType('')
    setDateRange({ start: '', end: '' })
  }

  const downloadReport = (report) => {
    // In a real application, this would trigger the download of the actual file
    console.log(`Downloading report: ${report.fileName}`)
  }

  if (!project) {
    return <div>Loading...</div>
  }

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-6">Report Generator</h1>
      <p className="mb-4">Project: {project.name}</p>
      <Link to={`/project/${projectId}`} className="text-blue-500 hover:underline mb-4 inline-block">
        &larr; Back to Project Details
      </Link>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Generate New Report</h2>
          <form onSubmit={generateReport}>
            <div className="mb-4">
              <label htmlFor="reportType" className="block text-sm font-medium text-gray-700">
                Report Type
              </label>
              <select
                id="reportType"
                value={reportType}
                onChange={(e) => setReportType(e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                required
              >
                <option value="">Select a report type</option>
                <option value="Initial Assessment">Initial Assessment</option>
                <option value="Daily Progress">Daily Progress</option>
                <option value="Equipment Usage">Equipment Usage</option>
                <option value="Moisture Readings">Moisture Readings</option>
                <option value="Final Report">Final Report</option>
              </select>
            </div>
            <div className="mb-4">
              <label htmlFor="dateRange" className="block text-sm font-medium text-gray-700">
                Date Range
              </label>
              <div className="grid grid-cols-2 gap-4">
                <input
                  type="date"
                  value={dateRange.start}
                  onChange={(e) => setDateRange({ ...dateRange, start: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                  required
                />
                <input
                  type="date"
                  value={dateRange.end}
                  onChange={(e) => setDateRange({ ...dateRange, end: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                  required
                />
              </div>
            </div>
            <button
              type="submit"
              className="w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 flex items-center justify-center"
            >
              <FileText className="w-5 h-5 mr-2" />
              Generate Report
            </button>
          </form>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Generated Reports</h2>
          <ul className="space-y-4">
            {generatedReports.map(report => (
              <li key={report.id} className="flex items-center justify-between bg-gray-100 p-3 rounded">
                <div className="flex items-center">
                  <FileText className="w-6 h-6 text-blue-500 mr-3" />
                  <div>
                    <p className="font-medium">{report.type}</p>
                    <p className="text-sm text-gray-500">
                      Generated: {new Date(report.dateGenerated).toLocaleString()}
                    </p>
                    <p className="text-sm text-gray-500">
                      Date Range: {report.dateRange.start} to {report.dateRange.end}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => downloadReport(report)}
                  className="text-blue-500 hover:text-blue-700 flex items-center"
                >
                  <Download className="w-5 h-5 mr-1" />
                  Download
                </button>
              </li>
            ))}
          </ul>
          {generatedReports.length === 0 && (
            <p className="text-gray-500 italic">No reports generated yet.</p>
          )}
        </div>
      </div>
    </div>
  )
}

export default ReportGenerator