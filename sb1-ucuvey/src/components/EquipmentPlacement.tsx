import React, { useState } from 'react'
import { DragDropContext, Droppable, Draggable, DroppableProvided, DraggableProvided } from 'react-beautiful-dnd'
import { Fan, Droplet, Wind } from 'lucide-react'

interface Equipment {
  id: string
  type: string
  icon: JSX.Element
}

interface Room {
  id: string
  name: string
  equipment: Equipment[]
}

const EquipmentPlacement: React.FC = () => {
  const [rooms, setRooms] = useState<Room[]>([
    {
      id: 'room1',
      name: 'Living Room',
      equipment: [
        { id: 'dehumidifier1', type: 'Dehumidifier', icon: <Droplet className="h-6 w-6" /> },
        { id: 'airmover1', type: 'Air Mover', icon: <Fan className="h-6 w-6" /> },
      ],
    },
    {
      id: 'room2',
      name: 'Bedroom',
      equipment: [
        { id: 'airmover2', type: 'Air Mover', icon: <Fan className="h-6 w-6" /> },
      ],
    },
    {
      id: 'room3',
      name: 'Kitchen',
      equipment: [
        { id: 'airscrubber1', type: 'Air Scrubber', icon: <Wind className="h-6 w-6" /> },
      ],
    },
  ])

  const onDragEnd = (result: any) => {
    const { source, destination } = result

    if (!destination) {
      return
    }

    const sourceRoom = rooms.find(room => room.id === source.droppableId)
    const destRoom = rooms.find(room => room.id === destination.droppableId)

    if (sourceRoom && destRoom) {
      const newRooms = [...rooms]
      const sourceRoomIndex = newRooms.findIndex(room => room.id === sourceRoom.id)
      const destRoomIndex = newRooms.findIndex(room => room.id === destRoom.id)

      const [movedEquipment] = newRooms[sourceRoomIndex].equipment.splice(source.index, 1)
      newRooms[destRoomIndex].equipment.splice(destination.index, 0, movedEquipment)

      setRooms(newRooms)
    }
  }

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Equipment Placement</h1>
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {rooms.map((room) => (
            <Droppable droppableId={room.id} key={room.id}>
              {(provided: DroppableProvided) => (
                <div
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  className="bg-white p-4 rounded-lg shadow"
                >
                  <h2 className="text-xl font-semibold mb-4">{room.name}</h2>
                  {room.equipment.map((item, index) => (
                    <Draggable key={item.id} draggableId={item.id} index={index}>
                      {(provided: DraggableProvided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          className="bg-gray-100 p-3 mb-2 rounded flex items-center"
                        >
                          {item.icon}
                          <span className="ml-2">{item.type}</span>
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          ))}
        </div>
      </DragDropContext>
    </div>
  )
}

export default EquipmentPlacement