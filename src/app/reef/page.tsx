"use client";
import Chart, { Location } from "@/components/Chart";
import React, { useState } from "react";
import { getGroqCompletion } from "@/ai/groq";
import { generateImageFal, generateVoice } from "@/ai/fal";
import './page.css';

interface ButtonInfo {
  name: string;
  prompt: string;
  x: string;
  y: string;
}
const buttonsInfo = [
  { name: "Surgeonfish", prompt: "Describe a Surgeonfish and share a fun fact.", x: '11%', y: '49%' },
  { name: "Coral Trout", prompt: "Provide details about Coral Trout's habitat.", x: '76%', y: '47%' },
  { name: "Parrotfish", prompt: "Explain the role of Parrotfish in coral reefs.", x: '29%', y: '39%' },
  { name: "Angelfish", prompt: "Describe Angelfish interactions with other fish.", x: '38%', y: '35.5%' },
  { name: "Turtle", prompt: "What is unique about Turtle’s diet?", x: '60%', y: '50%' },
  { name: "Coral", prompt: "Tell a imagination story of Coral world.", x: '40%', y: '75%' },
  { name: "Coral", prompt: "Tell a imagination story , Coral is narrative living under the sea", x: '67%', y: '83%' },
  { name: "Coral", prompt: "Describe the life cycle of Coral.", x: '95%', y: '69%' }
];


//Demo of generating a map of coordinates that can be selected
export default function MapPage() {
  
  const [response, setResponse] = useState("");
  const [img, setImg] = useState<string>("");
  const [responseAudio, setResponseAudio] = useState<string>("");

  const fetchDescriptionAndImage = async (prompt: string) => {
    setResponse("Generating description...");
    try {
      const description = await getGroqCompletion(prompt, 64); // Fetch description using GROQ
      setResponse(description); // Set the fetched description as response

      const imageUrl = await generateImageFal(description, "landscape_16_9"); // Generate image from the description
      setImg(imageUrl); // Update the state with the new image URL
    } catch (error) {
      setResponse("Failed to fetch description and generate image.");
      console.error("Error:", error);
    }
  };
    

  return (
    <main className="fullscreen-bg">
    <div className="content-container flex flex-col items-center justify-center h-screen font-tahoma">
      
      <div className="translucent-box p-8 mb-4 text-lg text-white text-center w-full">
        <h1 className="quest-map-text text-5xl font-bold mb-8">
          REEF VIEW
        </h1>
        <p className="instructions">
          Get ready to dive into an underwater adventure. Click on the dots overlaying the vivid scenes from the Great Barrier Reef. With each click, you'll summon a detailed description of one of the amazing creatures living in this colorful ecosystem.
          Listen carefully as the narrator unveils the species' identifying characteristics, then accurately log the creature in your digital taxonomy collection.
          The more species descriptions you correctly document, the more complete your catalog of reef biodiversity will become. Let your adventure of discovery begin!
        </p>
      </div>
      <div className="map-buttons">
          {buttonsInfo.map((button, index) => (
            <button
              key={index}
              className="map-button"
              style={{ position: 'absolute', top: button.y, left: button.x }}
              onClick={() => fetchDescriptionAndImage(button.prompt)}
            >
              
            </button>
          ))}
        </div>
        <div className="description-box">
          <span className="text-xl">{response}</span>
        </div>
        
        {img && <img src={img} alt="Generated from description" />}
      </div>
    </main>
  );
}
