// pages/api/suggest.ts
import { NextApiRequest, NextApiResponse } from "next";
import OpenAI from "openai";

const ai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { pastReviews } = req.body; // e.g. [ {brandName, rating, feedback} ]
  const prompt = `Based on these past reviews:\n${JSON.stringify(pastReviews)}\nSuggest 3 campaign types I should apply to next.`;
  const completion = await ai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [{ role: "user", content: prompt }],
  });
  res.status(200).json({ suggestions: completion.choices[0].message?.content });
}