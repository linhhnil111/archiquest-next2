"use client";
import Chart, { Location } from "@/components/Chart";
import { useState } from "react";
import './page.css';

//Demo of generating a map of coordinates that can be selected
export default function MapPage() {
  const [mapDescription, setMapDescription] = useState<string>("");
  const [mapPrompt, setMapPrompt] = useState<string>("");
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(
    null
  );
  const handleFixedButtonSelect = (description: string) => {
    setSelectedLocation({ description, coordinates: { x: 0, y: 0 } }); // Example coordinates, adjust as needed
  };


  return (
    <main className="fullscreen-bg">
      <div className="content-container flex flex-col items-center justify-center h-screen font-tahoma">
        
        <h1 className="quest-map-text text-5xl font-bold text-white mb-8">
          REEF VIEW
        </h1>
        <div className="instructions-map-text translucent-box2 p-8 mb-4 text-lg text-white text-center">
          <p>
            Get ready to dive into an underwater adventure..Click on the dots overlaying the vivid scenes from the Great Barrier Reef. With each click, you'll summon a detailed description of one of the amazing creatures living in this colorful ecosystem.
            Listen carefully as the narrator unveils the species' identifying characteristics, then accurately log the creature in your digital taxonomy collection.
            The more species descriptions you correctly document, the more complete your catalog of reef biodiversity will become. Let your adventure of discovery begin!
          </p>
        </div>
        
        <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
        <div className="flex flex-col">
          <input
            className="p-2 rounded-lg w-full"
            type="text"
            onChange={(e) => setMapDescription(e.target.value)}
            placeholder="What do you want to do?"
          />
          <button className="reef-button p-4" onClick={() => setMapPrompt(mapDescription)}>
            Explore
          </button>
          <span className="text-xl">{selectedLocation?.description}</span>
          <Chart
            prompt={mapPrompt}
            onSelect={(location: Location) => setSelectedLocation(location)}
          />
        </div>
      </div>
        <div className="map-buttons">
          <button
            className="map-button"
            style={{ position: 'absolute', top: '10%', left: '10%' }}
            onClick={() => handleFixedButtonSelect("Description for top-left button")}
          >
            Clownfish
          </button>
          <button
            className="map-button"
            style={{ position: 'absolute', top: '20%', left: '20%' }}
            onClick={() => handleFixedButtonSelect("Description for bottom-right button")}
          >
            Coral Trout
          </button>
          <button
            className="map-button"
            style={{ position: 'absolute', top: '30%', left: '30%' }}
            onClick={() => handleFixedButtonSelect("Description for bottom-right button")}
          >
            Parrotfish
          </button>
          <button
            className="map-button"
            style={{ position: 'absolute', top: '40%', left: '40%' }}
            onClick={() => handleFixedButtonSelect("Description for bottom-right button")}
          >
            Angelfish
          </button>
          <button
            className="map-button"
            style={{ position: 'absolute', top: '50%', left: '50%' }}
            onClick={() => handleFixedButtonSelect("Description for bottom-right button")}
          >
            Surgeonfish
          </button>
          <button
            className="map-button"
            style={{ position: 'absolute', top: '46%', left: '75%' }}
            onClick={() => handleFixedButtonSelect("Description for bottom-right button")}
          >
            Seahorse
          </button>
          <button
            className="map-button"
            style={{ position: 'absolute', top: '50%', left: '58%' }}
            onClick={() => handleFixedButtonSelect("Description for bottom-right button")}
          >
            Turtle
          </button>
          <button
            className="map-button"
            style={{ position: 'absolute', top: '82%', left: '64%' }}
            onClick={() => handleFixedButtonSelect("Description for bottom-right button")}
          >
            Coral
          </button>
          <button
            className="map-button"
            style={{ position: 'absolute', top: '68%', left: '92.5%' }}
            onClick={() => handleFixedButtonSelect("Description for bottom-right button")}
          >
            Coral
          </button>
          <button
            className="map-button"
            style={{ position: 'absolute', top: '24%', left: '8.5%' }}
            onClick={() => handleFixedButtonSelect("Description for bottom-right button")}
          >
            Coral
          </button>
        </div>
        
      </div>
      
    </main>
  );
}
