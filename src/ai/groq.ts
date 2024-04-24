"use server";
import Groq from "groq-sdk";

const groq_key = process.env.GROQ;

const groq = new Groq({
  apiKey: groq_key,
});

export type Message = {
  content: string;
  role: "user" | "assistant" | "system";
};

type GroqRequest = {
  response_format?: { type: "json_object" };
  messages: Message[];
  max_tokens: number;
  model: string;
};

//We can call the Groq API and pass our user prompt, max tokens and system prompt.
export async function getGroqCompletion(
  userPrompt: string,
  max_tokens: number,
  systemPrompt: string = "",
  jsonOnly: boolean = false
) {
  const body = {
    messages: [
      { role: "system", content: systemPrompt },
      {
        role: "user",
        content: userPrompt,
      },
    ],
    model: "llama3-70b-8192",
    max_tokens: max_tokens,
  } as GroqRequest;
  if (jsonOnly) body.response_format = { type: "json_object" };

  const completion = await groq.chat.completions.create(body);
  return (
    completion.choices[0]?.message?.content || "Oops, something went wrong."
  );
}

//We can call the Groq API and pass our user prompt, max tokens and system prompt.
export async function getGroqChat(max_tokens: number, messages: Message[]) {
  const completion = await groq.chat.completions.create({
    messages: messages,
    model: "llama3-70b-8192",
    max_tokens: max_tokens,
  });
  return (
    completion.choices[0]?.message?.content || "Oops, something went wrong."
  );
}
