//Component for generating a map of coordinates

import { getGroqCompletion } from "@/ai/groq";
import { generateCoordinatesPrompt } from "@/ai/prompts";
import { useEffect, useState } from "react";
export type Location = {
    id: string;
    name: string;
    description: string;
    coordinates: { x: number; y: number };
  };
  interface ChartProps {
    locations: Location[];
    onSelect: (location: Location) => void;
  }
  export default function ChartFixed({ locations, onSelect }: ChartProps) {
    return (
      <div className="map-container" style={{ position: 'relative', height: '500px', width: '100%', background: '#ccc' }}>
        {locations.map((location, index) => (
          <button
            key={index}
            className="location-button"
            style={{
              position: 'absolute',
              top: `${location.coordinates.y}%`,
              left: `${location.coordinates.x}%`,
              cursor: 'pointer'
            }}
            onClick={() => onSelect(location)}
          >
            {location.name}
          </button>
        ))}
      </div>
    );
  }
