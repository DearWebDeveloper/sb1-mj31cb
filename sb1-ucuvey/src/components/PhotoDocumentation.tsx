import React, { useState } from 'react'
import { Camera, Upload, X } from 'lucide-react'

interface Photo {
  id: number
  url: string
  description: string
  date: string
}

const PhotoDocumentation: React.FC = () => {
  const [photos, setPhotos] = useState<Photo[]>([
    { id: 1, url: 'https://source.unsplash.com/random/800x600?water', description: 'Initial water damage in living room', date: '2023-04-01' },
    { id: 2, url: 'https://source.unsplash.com/random/800x600?mold', description: 'Mold growth behind drywall', date: '2023-04-02' },
    { id: 3, url: 'https://source.unsplash.com/random/800x600?drying', description: 'Drying equipment setup', date: '2023-04-03' },
  ])

  const [newPhotoDescription, setNewPhotoDescription] = useState('')

  const addPhoto = () => {
    const newPhoto: Photo = {
      id: photos.length + 1,
      url: `https://source.unsplash.com/random/800x600?restoration&${Date.now()}`,
      description: newPhotoDescription,
      date: new Date().toISOString().split('T')[0],
    }
    setPhotos([...photos, newPhoto])
    setNewPhotoDescription('')
  }

  const removePhoto = (id: number) => {
    setPhotos(photos.filter(photo => photo.id !== id))
  }

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Photo Documentation</h1>
      <div className="mb-6 bg-white p-4 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4">Add New Photo</h2>
        <div className="flex items-center space-x-4">
          <div className="flex-grow">
            <input
              type="text"
              value={newPhotoDescription}
              onChange={(e) => setNewPhotoDescription(e.target.value)}
              placeholder="Enter photo description"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <button
            onClick={addPhoto}
            className="flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            <Upload className="h-5 w-5 mr-2" />
            Add Photo
          </button>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {photos.map(photo => (
          <div key={photo.id} className="bg-white rounded-lg shadow overflow-hidden">
            <img src={photo.url} alt={photo.description} className="w-full h-48 object-cover" />
            <div className="p-4">
              <p className="text-sm text-gray-500 mb-1">{photo.date}</p>
              <p className="text-gray-700">{photo.description}</p>
              <button
                onClick={() => removePhoto(photo.id)}
                className="mt-2 flex items-center text-red-600 hover:text-red-800"
              >
                <X className="h-4 w-4 mr-1" />
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default PhotoDocumentation