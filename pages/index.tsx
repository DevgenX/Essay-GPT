import { PGChunk } from "@/types";
import Head from "next/head";
import { useState } from "react";

export default function Home() {
  const [query, setQuery] = useState("");
  const [answer, setAnswer] = useState("");
  const [chunks, setChunks] = useState<PGChunk[]>([]);
  const [loading, setLoading] = useState(false);

  const handleAnswer = async () => {
    const searchResponse = await fetch("/api/search", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ query }),
    });

    if (!searchResponse.ok) {
      return;
    }

    const results: PGChunk[] = await searchResponse.json();
    setChunks(results);
    console.log(results);
  };

  return (
    <>
      <Head>
        <title>Paul Graham GPT</title>
        <meta
          name="description"
          content="ChatGPT AI BOT for Paul Graham's Essay"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="flex flex-col w-[350px] justify-center items-">
        <input
          className="border text-black"
          type="text"
          placeholder="Ask Paul Graham"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={handleAnswer}
        >
          Submit
        </button>
      </div>
    </>
  );
}
