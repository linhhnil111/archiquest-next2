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

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
        <div className="flex flex-col">
          <input
            className="p-2 rounded-lg w-full"
            type="text"
            onChange={(e) => setMapDescription(e.target.value)}
            placeholder="What do you want to do?"
          />
          <button className="p-4" onClick={() => setMapPrompt(mapDescription)}>
            Explore 
          </button>
          <div>
          {/* Background Map Image */}
          
          <div className="image-container" >
          <img
            className="background-image"
            src="https://r2.erweima.ai/midjourney/1713864574_24953fcb5b334147936fdead86a911fb.png"
            alt="Reef View"
          />
          </div>
          <span className="text-xl">{selectedLocation?.description}</span>
          <Chart
            prompt={mapPrompt}
            onSelect={(location: Location) => setSelectedLocation(location)}
          />
        </div>
      </div>
      </div>
    </main>
  );
}
