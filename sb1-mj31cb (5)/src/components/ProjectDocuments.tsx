import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { FileText, Upload, Trash2, Download } from 'lucide-react'

const ProjectDocuments = () => {
  const { id } = useParams()
  const [documents, setDocuments] = useState([])

  useEffect(() => {
    // Fetch project documents
    // This is a placeholder for the API call
    const fetchProjectDocuments = async () => {
      // Simulated API call
      const documentsData = [
        { id: 1, name: 'Work Authorization.pdf', date: '2023-04-01', type: 'Work Authorization' },
        { id: 2, name: 'Equipment Responsibility.pdf', date: '2023-04-02', type: 'Customer Equipment Responsibility' },
        { id: 3, name: 'Allergy Notice.pdf', date: '2023-04-03', type: 'Allergy Notice' },
        { id: 4, name: 'Certificate of Completion.pdf', date: '2023-04-10', type: 'Certificate of Completion' },
        { id: 5, name: 'Estimate_v1.pdf', date: '2023-04-05', type: 'Estimate' },
      ]
      setDocuments(documentsData)
    }

    fetchProjectDocuments()
  }, [id])

  const deleteDocument = (id) => {
    setDocuments(documents.filter(doc => doc.id !== id))
  }

  const uploadDocument = (event) => {
    const file = event.target.files[0]
    if (file) {
      const newDocument = {
        id: documents.length + 1,
        name: file.name,
        date: new Date().toISOString().split('T')[0],
        type: 'Other', // You might want to add a way to select the document type
      }
      setDocuments([...documents, newDocument])
    }
  }

  const downloadDocument = (document) => {
    // In a real application, this would trigger a download of the actual file
    console.log(`Downloading ${document.name}`)
  }

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-6">Project Documents</h1>
      <div className="mb-4">
        <input
          type="file"
          onChange={uploadDocument}
          className="hidden"
          id="document-upload"
        />
        <label htmlFor="document-upload" className="bg-blue-500 text-white px-4 py-2 rounded cursor-pointer flex items-center inline-block">
          <Upload className="w-5 h-5 mr-2" />
          Upload Document
        </label>
      </div>
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold mb-4">Document List</h2>
        <ul className="space-y-4">
          {documents.map(doc => (
            <li key={doc.id} className="flex items-center justify-between bg-gray-100 p-3 rounded">
              <div className="flex items-center">
                <FileText className="w-6 h-6 text-blue-500 mr-3" />
                <div>
                  <p className="font-medium">{doc.name}</p>
                  <p className="text-sm text-gray-500">{doc.date} - {doc.type}</p>
                </div>
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => downloadDocument(doc)}
                  className="text-blue-500 hover:text-blue-700"
                >
                  <Download className="w-5 h-5" />
                </button>
                <button
                  onClick={() => deleteDocument(doc.id)}
                  className="text-red-500 hover:text-red-700"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default ProjectDocuments