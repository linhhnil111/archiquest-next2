"use client";
import Chart, { Location } from "@/components/Chart";
import React, { useState } from "react";
import { getGroqCompletion } from "@/ai/groq";
import './page.css';

const buttonsInfo = [
  { name: "Clownfish", prompt: "Describe a Clownfish and share a fun fact.", x: '10%', y: '10%' },
  { name: "Coral Trout", prompt: "Provide details about Coral Trout's habitat.", x: '20%', y: '20%' },
  { name: "Parrotfish", prompt: "Explain the role of Parrotfish in coral reefs.", x: '30%', y: '30%' },
  { name: "Angelfish", prompt: "Describe Angelfish interactions with other fish.", x: '40%', y: '40%' },
  { name: "Surgeonfish", prompt: "What is unique about Surgeonfish’s diet?", x: '50%', y: '50%' },
  { name: "Seahorse", prompt: "Highlight interesting facts about Seahorse reproduction.", x: '46%', y: '75%' },
  { name: "Turtle", prompt: "Discuss threats facing marine Turtles today.", x: '50%', y: '58%' },
  { name: "Coral", prompt: "Describe the life cycle of Coral.", x: '82%', y: '64%' }
];


//Demo of generating a map of coordinates that can be selected
export default function MapPage() {
  const [mapDescription, setMapDescription] = useState<string>("");
  const [mapPrompt, setMapPrompt] = useState<string>("");
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(
    null
  );
  const [response, setResponse] = useState("");

  const fetchDescription = async (prompt) => {
    setResponse("Generating description...");
    try {
      const description = await getGroqCompletion(prompt, 64);
      setResponse(description);
    } catch (error) {
      setResponse("Failed to fetch description.");
      console.error("Error fetching description:", error);
    }
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
          {buttonsInfo.map((button, index) => (
            <button
              key={index}
              className="map-button"
              style={{ position: 'absolute', top: button.y, left: button.x }}
              onClick={() => fetchDescription(button.prompt)}
            >
              {button.name}
            </button>
          ))}
        </div>
        <div className="description-box">
          <span className="text-xl">{response}</span>
        </div>
        
      </div>
      
    </main>
  );
}
