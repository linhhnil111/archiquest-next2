"use client";
import Experts from "@/components/Experts";
import { useState } from "react";

const initState = {
  location: "Oregon Forests",
  year: 2024,
  planatationArea: "2000 acres",
  species: "Douglas Fir",
  processingCapacity: "1000 acres",
  processingTime: "1 year",
  processingCost: "$10M",
  revenue: "$20M",
  economicChallenges: "",
  environmentalChallenges: "",
  economicMitigation: "",
  environmentalMitigation: "",
};

const systemPrompts = [
  "based on the current state of the project, predict likely changes in the global economy that may impact project revenue over the next 3 years",
  "based on the current state of the project, predict likely infrastructure costs required to increase supply output by 15% over the next 3 years",
  "based on current state of the project, predict bottlenecks in supply logistics over the next 3 years",
];

//Demo of generating a forecast
export default function ForecastPage() {
  //converting the object to a string just because this is a lot more robust for sending to groq and updating.
  //If you wanted to actually use the object values in the rest of your app you would need to parse the string as JSON.
  const [state, setState] = useState<any>(initState);

  function handleResponse(newState: any) {
    //do something with the new state
    newState.year += 3;
    setState(newState);
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
        <div className="flex flex-col">
          <div>
            {Object.keys(state).map((key) => (
              <div className="flex justify-between" key={key}>
                <span className="font-semibold">{key}: </span>
                <span>{state[key]}</span>
              </div>
            ))}
          </div>
          <Experts
            initState={state}
            systemPrompts={systemPrompts}
            maxTokens={256}
            handleResponse={handleResponse}
          />
        </div>
      </div>
    </main>
  );
}
