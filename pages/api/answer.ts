export const config = {
  runtime: "edge",
};

const handler = async (req: Request): Promise<Response> => {
  try {
    const { prompt } = (await req.json()) as { prompt: string };
  } catch (e) {
    return new Response("Error", { status: 500 });
  }
};

export default handler;
