import React from 'react'
import { Save } from 'lucide-react'

const Settings = () => {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Settings</h1>
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold mb-4">Application Settings</h2>
        <form className="space-y-6">
          <div>
            <label htmlFor="companyName" className="block text-sm font-medium text-gray-700">
              Company Name
            </label>
            <input
              type="text"
              id="companyName"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
            />
          </div>
          <div>
            <label htmlFor="notificationPreference" className="block text-sm font-medium text-gray-700">
              Notification Preference
            </label>
            <select
              id="notificationPreference"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
            >
              <option>Email</option>
              <option>SMS</option>
              <option>Push Notification</option>
            </select>
          </div>
          <div>
            <label className="flex items-center">
              <input
                type="checkbox"
                className="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
              />
              <span className="ml-2 text-sm text-gray-600">Enable offline mode</span>
            </label>
          </div>
          <div>
            <button
              type="submit"
              className="w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 flex items-center justify-center"
            >
              <Save className="w-5 h-5 mr-2" />
              Save Settings
            </button>
          </div>
        </form>
      </div>
      <div className="mt-6 bg-gray-100 rounded-lg p-4">
        <h3 className="text-lg font-semibold mb-2">About AquaRestore</h3>
        <p className="text-sm text-gray-600">
          Version 1.0.0<br />
          © 2023 AquaRestore Inc. All rights reserved.<br />
          For support, contact: support@aquarestore.com
        </p>
      </div>
    </div>
  )
}

export default Settings