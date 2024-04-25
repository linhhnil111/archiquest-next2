import { getGroqCompletion } from "@/ai/groq";
import { useEffect, useState } from "react";

//function that runs multiple prompts for expert analysis and updates a given state object
export default function Experts({
  initState,
  systemPrompts,
  maxTokens,
  handleResponse,
}: {
  initState: any;
  systemPrompts: string[];
  maxTokens: number;
  handleResponse: (response: any) => void;
}) {
  const [state, setState] = useState<any>(initState);
  const [analysis, setAnalysis] = useState<string[]>([]);
  const [generating, setGenerating] = useState<boolean>(false);

  const runPrompts = async () => {
    setGenerating(true);

    //this makes a groq request for each system prompt
    const responses = await Promise.all(
      systemPrompts.map(async (systemPrompt) => {
        return getGroqCompletion(
          JSON.stringify(state),
          maxTokens,
          systemPrompt
        );
      })
    );

    //then we have another function that updates our state based on all of the responses
    const newState = await updateAnalysis(responses);
    setState(newState);
    setAnalysis(responses);
    handleResponse(newState);
    setGenerating(false);
  };

  const updateAnalysis = async (analysis: string[]) => {
    //Dumb system prompt to try to incorporate all of the analysis into the updated state
    const stateString = JSON.stringify(state);
    const newState = await getGroqCompletion(
      `State JSON: ${stateString}, Analysis: ${analysis.join(",")}`,
      maxTokens,
      "Use the analysis to update the values in the state JSON object. Only return the JSON object with no other text or explanation.",
      true
    );
    return JSON.parse(newState);
  };

  return (
    <div className="flex flex-col w-full">
      <button
        className="p-2 bg-white rounded-lg my-4"
        onClick={() => runPrompts()}
      >
        {generating ? "Generating..." : "Analyze"}
      </button>
      <div className="flex justify-between w-full flex-wrap">
        {analysis.map((t, i) => (
          <div
            key={i}
            className="flex flex-col rounded-lg bg-white p-2 hover:shadow m-2"
          >
            <span className="font-semibold my-2">
              Prompt: {systemPrompts[i]}
            </span>
            <span>{t}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
