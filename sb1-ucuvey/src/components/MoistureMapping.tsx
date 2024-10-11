import React, { useState } from 'react'
import { Stage, Layer, Rect, Text } from 'react-konva'

const MoistureMapping: React.FC = () => {
  const [selectedArea, setSelectedArea] = useState<string | null>(null)

  const roomLayout = [
    { x: 50, y: 50, width: 200, height: 150, name: 'Living Room', moisture: 65 },
    { x: 300, y: 50, width: 150, height: 150, name: 'Bedroom', moisture: 45 },
    { x: 50, y: 250, width: 150, height: 100, name: 'Kitchen', moisture: 55 },
    { x: 250, y: 250, width: 100, height: 100, name: 'Bathroom', moisture: 70 },
  ]

  const getMoistureColor = (moisture: number) => {
    if (moisture < 30) return 'green'
    if (moisture < 60) return 'yellow'
    return 'red'
  }

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Moisture Mapping</h1>
      <div className="bg-white p-4 rounded-lg shadow">
        <Stage width={500} height={400}>
          <Layer>
            {roomLayout.map((room, index) => (
              <React.Fragment key={index}>
                <Rect
                  x={room.x}
                  y={room.y}
                  width={room.width}
                  height={room.height}
                  fill={getMoistureColor(room.moisture)}
                  stroke="black"
                  strokeWidth={1}
                  onMouseEnter={() => setSelectedArea(room.name)}
                  onMouseLeave={() => setSelectedArea(null)}
                />
                <Text
                  x={room.x + 5}
                  y={room.y + 5}
                  text={room.name}
                  fontSize={14}
                  fill="black"
                />
              </React.Fragment>
            ))}
          </Layer>
        </Stage>
        <div className="mt-4">
          <h2 className="text-lg font-semibold">Moisture Levels:</h2>
          <ul>
            {roomLayout.map((room, index) => (
              <li key={index} className={`${selectedArea === room.name ? 'font-bold' : ''}`}>
                {room.name}: {room.moisture}%
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}

export default MoistureMapping