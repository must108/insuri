import type { NextApiRequest, NextApiResponse } from "next";

type ClaimData = {
	test: string;
}

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
	const payload = req.body as ClaimData;
    // Process a POST request
  } else {
    // Handle any other HTTP method
  }
}
