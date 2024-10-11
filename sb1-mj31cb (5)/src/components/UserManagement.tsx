import React, { useState, useEffect } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { Plus, Edit, Trash, Check, X } from 'lucide-react'

const UserManagement = () => {
  const { user } = useAuth()
  const [users, setUsers] = useState([])
  const [newUser, setNewUser] = useState({ email: '', role: 'technician' })
  const [editingUser, setEditingUser] = useState(null)

  useEffect(() => {
    // Fetch users (simulated API call)
    const fetchUsers = async () => {
      // In a real application, this would be an API call
      const usersData = [
        { id: 1, email: 'admin@example.com', role: 'admin' },
        { id: 2, email: 'tech1@example.com', role: 'technician' },
        { id: 3, email: 'tech2@example.com', role: 'technician' },
      ]
      setUsers(usersData)
    }

    fetchUsers()
  }, [])

  const addUser = () => {
    // In a real application, this would be an API call
    const newUserWithId = { ...newUser, id: Date.now() }
    setUsers([...users, newUserWithId])
    setNewUser({ email: '', role: 'technician' })
  }

  const updateUser = () => {
    // In a real application, this would be an API call
    setUsers(users.map(u => u.id === editingUser.id ? editingUser : u))
    setEditingUser(null)
  }

  const deleteUser = (id) => {
    // In a real application, this would be an API call
    setUsers(users.filter(u => u.id !== id))
  }

  if (user.role !== 'admin') {
    return <div>Access Denied</div>
  }

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-6">User Management</h1>
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold mb-4">Add New User</h2>
        <div className="flex space-x-4 mb-4">
          <input
            type="email"
            placeholder="Email"
            value={newUser.email}
            onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
            className="flex-grow p-2 border rounded"
          />
          <select
            value={newUser.role}
            onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
            className="p-2 border rounded"
          >
            <option value="technician">Technician</option>
            <option value="admin">Admin</option>
          </select>
          <button onClick={addUser} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
            <Plus className="w-5 h-5" />
          </button>
        </div>
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {users.map(user => (
              <tr key={user.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  {editingUser && editingUser.id === user.id ? (
                    <input
                      type="email"
                      value={editingUser.email}
                      onChange={(e) => setEditingUser({ ...editingUser, email: e.target.value })}
                      className="p-1 border rounded"
                    />
                  ) : (
                    user.email
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {editingUser && editingUser.id === user.id ? (
                    <select
                      value={editingUser.role}
                      onChange={(e) => setEditingUser({ ...editingUser, role: e.target.value })}
                      className="p-1 border rounded"
                    >
                      <option value="technician">Technician</option>
                      <option value="admin">Admin</option>
                    </select>
                  ) : (
                    user.role
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  {editingUser && editingUser.id === user.id ? (
                    <>
                      <button onClick={updateUser} className="text-green-600 hover:text-green-900 mr-2">
                        <Check className="w-5 h-5" />
                      </button>
                      <button onClick={() => setEditingUser(null)} className="text-red-600 hover:text-red-900">
                        <X className="w-5 h-5" />
                      </button>
                    </>
                  ) : (
                    <>
                      <button onClick={() => setEditingUser(user)} className="text-indigo-600 hover:text-indigo-900 mr-2">
                        <Edit className="w-5 h-5" />
                      </button>
                      <button onClick={() => deleteUser(user.id)} className="text-red-600 hover:text-red-900">
                        <Trash className="w-5 h-5" />
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default UserManagement