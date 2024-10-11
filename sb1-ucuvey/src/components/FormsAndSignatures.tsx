import React, { useState } from 'react'
import { FileText, Download, Upload } from 'lucide-react'

interface Form {
  id: number
  name: string
  status: 'Pending' | 'Signed' | 'Completed'
  date: string
}

const FormsAndSignatures: React.FC = () => {
  const [forms, setForms] = useState<Form[]>([
    { id: 1, name: 'Initial Assessment Form', status: 'Completed', date: '2023-04-01' },
    { id: 2, name: 'Customer Authorization', status: 'Signed', date: '2023-04-02' },
    { id: 3, name: 'Equipment Placement Agreement', status: 'Pending', date: '2023-04-03' },
    { id: 4,name: 'Final Inspection Report', status: 'Pending', date: '2023-04-08' },
  ])

  const updateFormStatus = (formId: number, newStatus: Form['status']) => {
    setForms(forms.map(form => 
      form.id === formId ? { ...form, status: newStatus } : form
    ))
  }

  const getStatusColor = (status: Form['status']) => {
    switch (status) {
      case 'Completed':
        return 'text-green-600'
      case 'Signed':
        return 'text-blue-600'
      case 'Pending':
        return 'text-yellow-600'
    }
  }

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Forms and Signatures</h1>
      <div className="bg-white p-4 rounded-lg shadow">
        <ul className="divide-y divide-gray-200">
          {forms.map(form => (
            <li key={form.id} className="py-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <FileText className="h-5 w-5 text-gray-400 mr-3" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">{form.name}</p>
                    <p className="text-sm text-gray-500">{form.date}</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <span className={`mr-4 text-sm font-medium ${getStatusColor(form.status)}`}>
                    {form.status}
                  </span>
                  <select
                    value={form.status}
                    onChange={(e) => updateFormStatus(form.id, e.target.value as Form['status'])}
                    className="block w-32 pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                  >
                    <option value="Pending">Pending</option>
                    <option value="Signed">Signed</option>
                    <option value="Completed">Completed</option>
                  </select>
                  <button className="ml-4 p-2 text-gray-400 hover:text-gray-500">
                    <Download className="h-5 w-5" />
                  </button>
                  <button className="ml-2 p-2 text-gray-400 hover:text-gray-500">
                    <Upload className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default FormsAndSignatures