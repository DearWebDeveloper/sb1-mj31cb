import React, { useState } from 'react'
import { Camera, Upload, Trash2 } from 'lucide-react'

const PhotoManagement = () => {
  const [photos, setPhotos] = useState([
    { id: 1, name: 'Initial Damage.jpg', date: '2023-04-01' },
    { id: 2, name: 'Water Extraction.jpg', date: '2023-04-02' },
    { id: 3, name: 'Drying Process.jpg', date: '2023-04-03' },
  ])

  const deletePhoto = (id) => {
    setPhotos(photos.filter(photo => photo.id !== id))
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Photo Management</h1>
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Project Photos</h2>
          <button className="bg-blue-500 text-white px-4 py-2 rounded flex items-center">
            <Upload className="w-5 h-5 mr-2" />
            Upload Photos
          </button>
        </div>
        <ul className="space-y-4">
          {photos.map(photo => (
            <li key={photo.id} className="flex items-center justify-between bg-gray-100 p-3 rounded">
              <div className="flex items-center">
                <Camera className="w-6 h-6 text-gray-500 mr-3" />
                <div>
                  <p className="font-medium">{photo.name}</p>
                  <p className="text-sm text-gray-500">{photo.date}</p>
                </div>
              </div>
              <button
                onClick={() => deletePhoto(photo.id)}
                className="text-red-500 hover:text-red-700"
              >
                <Trash2 className="w-5 h-5" />
              </button>
            </li>
          ))}
        </ul>
      </div>
      <div className="mt-6 bg-blue-100 border-l-4 border-blue-500 p-4 rounded">
        <p className="text-blue-700">
          Tip: Take photos at consistent intervals to document the progress of the restoration process.
        </p>
      </div>
    </div>
  )
}

export default PhotoManagement