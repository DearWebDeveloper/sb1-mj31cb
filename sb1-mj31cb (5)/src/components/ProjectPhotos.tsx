import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { Camera, Upload, Trash2 } from 'lucide-react'

const ProjectPhotos = () => {
  const { id } = useParams()
  const [photos, setPhotos] = useState([])

  useEffect(() => {
    // Fetch project photos
    // This is a placeholder for the API call
    const fetchProjectPhotos = async () => {
      // Simulated API call
      const photosData = [
        { id: 1, name: 'Initial Damage.jpg', date: '2023-04-01', url: 'https://example.com/photo1.jpg' },
        { id: 2, name: 'Water Extraction.jpg', date: '2023-04-02', url: 'https://example.com/photo2.jpg' },
        { id: 3, name: 'Drying Process.jpg', date: '2023-04-03', url: 'https://example.com/photo3.jpg' },
      ]
      setPhotos(photosData)
    }

    fetchProjectPhotos()
  }, [id])

  const deletePhoto = (id) => {
    setPhotos(photos.filter(photo => photo.id !== id))
  }

  const uploadPhoto = (event) => {
    const file = event.target.files[0]
    if (file) {
      const newPhoto = {
        id: photos.length + 1,
        name: file.name,
        date: new Date().toISOString().split('T')[0],
        url: URL.createObjectURL(file),
      }
      setPhotos([...photos, newPhoto])
    }
  }

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-6">Project Photos</h1>
      <div className="mb-4">
        <input
          type="file"
          accept="image/*"
          onChange={uploadPhoto}
          className="hidden"
          id="photo-upload"
        />
        <label htmlFor="photo-upload" className="bg-blue-500 text-white px-4 py-2 rounded cursor-pointer flex items-center inline-block">
          <Upload className="w-5 h-5 mr-2" />
          Upload Photo
        </label>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {photos.map(photo => (
          <div key={photo.id} className="bg-white rounded-lg shadow-md overflow-hidden">
            <img src={photo.url} alt={photo.name} className="w-full h-48 object-cover" />
            <div className="p-4">
              <p className="font-semibold">{photo.name}</p>
              <p className="text-sm text-gray-500">{photo.date}</p>
              <button
                onClick={() => deletePhoto(photo.id)}
                className="mt-2 text-red-500 hover:text-red-700"
              >
                <Trash2 className="w-5 h-5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ProjectPhotos