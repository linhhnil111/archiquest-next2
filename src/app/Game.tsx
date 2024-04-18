"use client";

import { useState, useEffect } from "react";
import { getGroqCompletion, generateImageFal } from "./ai";
import {
  mainGamePrompt,
  describeImagePrompt,
  generateButtonPrompt,
} from "./prompts";

type SelectableButton = {
  text: string;
  selected: boolean;
};

export default function Game() {
  const [prompt, setPrompt] = useState<string>("");
  const [response, setResponse] = useState<string>(
    "Your game instructions go here..."
  );
  const [img, setImg] = useState<string>("");
  const [score, setScore] = useState<string>("0");
  const [buttonText, setButtonText] = useState<SelectableButton[]>([
    { text: "Option 1", selected: false },
    { text: "Option 1", selected: false },
  ]);

  async function handleClick() {
    setResponse("Generating...");
    const response = await getGroqCompletion(prompt, 128, generateButtonPrompt);

    const buttonOptions = response.split(",");
    setButtonText(
      buttonOptions.map((text) => ({ text: text, selected: false }))
    );
    //Prompt Groq again to decide what the new game state should be
    const newScore = await getGroqCompletion(
      `The following text describes the latest events in a game: ${response}. The players current score is: ${score}.`,
      4,
      "Update the player score based on the game events. If the player has successfully completed an action, award some points. If they failed, deduct some points. Only output the new score value with no explanation or other characters."
    );

    //update your game state however you want
    setScore(newScore);
  }

  async function generateImage() {
    //Prompt Groq again to get an image description
    const imageDescription = await getGroqCompletion(
      `Describe a scene using vivid imagery and descriptive language of the following text: ${response}`,
      64,
      describeImagePrompt
    );

    //Generate the image with Fal
    const url = await generateImageFal(imageDescription, "landscape_16_9");
    setImg(url);
  }

  const handleSelectButton = (buttonIndex: number) => {
    const newButtons = buttonText.map((b, i) => {
      if (i === buttonIndex) {
        return { text: b.text, selected: !b.selected };
      }
      return b;
    });
    setButtonText(newButtons);
    setResponse(
      buttonText
        .filter((b) => b.selected)
        .map((b) => b.text)
        .join(",")
    );
  };

  return (
    <div className="flex flex-col">
      <p> Score: {score}</p>
      <input
        className="p-2 mr-2"
        type="text"
        onChange={(e) => setPrompt(e.target.value)}
        placeholder="What do you want to do?"
      />
      <button className="p-4" onClick={handleClick}>
        Send
      </button>
      <div className="flex justify-between w-full flex-wrap">
        {buttonText.map((b, i) => (
          <button
            onClick={() => handleSelectButton(i)}
            key={i}
            className={`rounded-lg ${
              b.selected ? "bg-slate-500" : "bg-white"
            } p-2 hover:shadow m-2`}
          >
            {b.text}
          </button>
        ))}
      </div>
      <p className="py-2">{response}</p>
      <img src={img} />
    </div>
  );
}
