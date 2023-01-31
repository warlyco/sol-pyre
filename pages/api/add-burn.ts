import type { NextApiRequest, NextApiResponse } from "next";
import request from "graphql-request";
import { ADD_BURN } from "graphql/mutations/add-burn";
import { log } from "next-axiom";

type Data =
  | {
      burnRewardId: string;
      mintIds: string[];
      userPublicKey: string;
      burnTxAddress: string;
      projectId: string;
      transferTxAddress: string;
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
    rewardTxAddress,
    projectId,
    transferTxAddress,
  } = req.body;

  if (
    !burnRewardId ||
    !mintIds ||
    !userPublicKey ||
    !burnTxAddress ||
    !rewardTxAddress ||
    !projectId ||
    !transferTxAddress
  ) {
    console.log("Missing required fields", {
      burnRewardId,
      mintIds,
      userPublicKey,
      burnTxAddress,
      rewardTxAddress,
      projectId,
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
        rewardTxAddress,
        burnRewardId,
        mintIds,
        userPublicKey,
        burnTxAddress,
        projectId,
        transferTxAddress,
      },
      requestHeaders: {
        "x-hasura-admin-secret": process.env.HASURA_GRAPHQL_ADMIN_SECRET!,
      },
    });
  } catch (error: unknown) {
    log.debug("Error adding burn to database", { error });
    // @ts-ignore
    console.log(error?.response?.errors);
    // @ts-ignore
    console.log(error?.message);
    res.status(500).json({ error });
    return;
  }

  console.log("Burn added to database");

  res.status(200).json({
    burnRewardId,
    mintIds,
    userPublicKey,
    burnTxAddress,
    projectId,
    transferTxAddress,
  });
}
