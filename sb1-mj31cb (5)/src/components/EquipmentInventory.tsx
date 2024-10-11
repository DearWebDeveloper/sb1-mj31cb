import React, { useState, useEffect } from 'react'
import { Plus, Edit, Trash, Search, Wrench } from 'lucide-react'
import { useProjectContext } from '../contexts/ProjectContext'

// ... rest of the component remains the same

const EquipmentInventory = () => {
  // ... existing code

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-6 flex items-center">
        <Wrench className="w-8 h-8 mr-2" />
        Equipment Inventory
      </h1>
      
      {/* ... rest of the component remains the same */}
    </div>
  )
}

export default EquipmentInventory