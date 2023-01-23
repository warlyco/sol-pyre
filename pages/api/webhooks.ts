// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  success: boolean;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  console.log("webhook called");

  if (req.method !== "POST") {
    res.status(405).json({ success: false });
    return;
  }
  const { body } = req;
  if (!body) {
    res.status(400).json({ success: false });
    return;
  }

  if (body[0]?.type === "TRANSFER") {
    console.log("transfer");
    const tx = body[0].nativeTransfers.find((x: any) => x.fromUserAccount);
    console.log("tx", tx);
    // handle burn and reward
  }

  if (body?.[0]) {
    console.log("body.0", body[0]);
  } else if (body) {
    console.log("body", body);
  }
  res.status(200).json({ success: true });
}
