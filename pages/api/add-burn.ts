import type { NextApiRequest, NextApiResponse } from "next";
import request from "graphql-request";
import { ADD_BURN } from "graphql/mutations/add-burn";

type Data =
  | {
      burnRewardId: string;
      mintIds: string[];
      userPublicKey: string;
      transactionAddress: string;
    }
  | { error: unknown };

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { burnRewardId, mintIds, userPublicKey, transactionAddress } = req.body;

  try {
    const { insert_burns_one } = await request({
      url: process.env.NEXT_PUBLIC_GRAPHQL_API_ENDPOINT!,
      document: ADD_BURN,
      variables: {
        burnRewardId,
        mintIds,
        userPublicKey,
        transactionAddress,
      },
      requestHeaders: {
        "x-hasura-admin-secret": process.env.HASURA_GRAPHQL_ADMIN_SECRET!,
      },
    });
  } catch (error: unknown) {
    console.log(error);
    res.status(500).json({ error });
  }

  res
    .status(200)
    .json({ burnRewardId, mintIds, userPublicKey, transactionAddress });
}
