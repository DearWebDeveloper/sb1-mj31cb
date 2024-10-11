import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useProjectContext } from '../contexts/ProjectContext'
import { MessageSquare, Plus, Trash } from 'lucide-react'

const ProjectNotes = () => {
  const { id } = useParams()
  const { projects, updateProject } = useProjectContext()
  const [project, setProject] = useState(null)
  const [newNote, setNewNote] = useState('')

  useEffect(() => {
    const foundProject = projects.find(p => p.id === parseInt(id))
    if (foundProject) {
      setProject(foundProject)
    }
  }, [id, projects])

  const addNote = () => {
    if (!newNote.trim()) return

    const updatedProject = {
      ...project,
      notes: [
        ...(project.notes || []),
        { id: Date.now(), content: newNote, createdAt: new Date().toISOString() }
      ]
    }
    updateProject(updatedProject)
    setProject(updatedProject)
    setNewNote('')
  }

  const deleteNote = (noteId) => {
    const updatedProject = {
      ...project,
      notes: project.notes.filter(note => note.id !== noteId)
    }
    updateProject(updatedProject)
    setProject(updatedProject)
  }

  if (!project) return <div>Loading...</div>

  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <h2 className="text-2xl font-bold mb-4 flex items-center">
        <MessageSquare className="w-6 h-6 mr-2" />
        Project Notes
      </h2>
      <div className="mb-4">
        <textarea
          value={newNote}
          onChange={(e) => setNewNote(e.target.value)}
          placeholder="Add a new note..."
          className="w-full p-2 border rounded-md"
          rows={3}
        />
        <button
          onClick={addNote}
          className="mt-2 bg-blue-500 text-white px-4 py-2 rounded-md flex items-center"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Note
        </button>
      </div>
      <div className="space-y-4">
        {project.notes && project.notes.map(note => (
          <div key={note.id} className="bg-gray-100 p-4 rounded-md">
            <div className="flex justify-between items-start">
              <p className="text-gray-800">{note.content}</p>
              <button
                onClick={() => deleteNote(note.id)}
                className="text-red-500 hover:text-red-700"
              >
                <Trash className="w-4 h-4" />
              </button>
            </div>
            <p className="text-sm text-gray-500 mt-2">
              {new Date(note.createdAt).toLocaleString()}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ProjectNotes