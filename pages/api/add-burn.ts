import type { NextApiRequest, NextApiResponse } from "next";
import request from "graphql-request";
import { ADD_BURN } from "graphql/mutations/add-burn";

type Data =
  | {
      burnRewardId: string;
      mintIds: string[];
      userPublicKey: string;
      burnTxAddress: string;
    }
  | { error: unknown };

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  console.log("add-burn called", req.body);

  const {
    burnRewardId,
    mintIds,
    userPublicKey,
    burnTxAddress,
    rewaredTxAddress,
  } = req.body;

  if (
    !burnRewardId ||
    !mintIds ||
    !userPublicKey ||
    !burnTxAddress ||
    !rewaredTxAddress
  ) {
    console.log("Missing required fields", {
      burnRewardId,
      mintIds,
      userPublicKey,
      burnTxAddress,
      rewaredTxAddress,
    });
    res.status(400).json({ error: "Missing required fields" });
    return;
  }

  try {
    console.log("Adding burn to database");
    const { insert_burns_one } = await request({
      url: process.env.NEXT_PUBLIC_GRAPHQL_API_ENDPOINT!,
      document: ADD_BURN,
      variables: {
        rewaredTxAddress,
        burnRewardId,
        mintIds,
        userPublicKey,
        burnTxAddress: burnTxAddress || "fake-burn-tx-address",
      },
      requestHeaders: {
        "x-hasura-admin-secret": process.env.HASURA_GRAPHQL_ADMIN_SECRET!,
      },
    });
  } catch (error: unknown) {
    console.log(error);
    res.status(500).json({ error });
  }

  console.log("Burn added to database");

  res.status(200).json({ burnRewardId, mintIds, userPublicKey, burnTxAddress });
}
