// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { executeTransaction } from "utils/transactions";
import {
  Connection,
  Keypair,
  PublicKey,
  sendAndConfirmTransaction,
  Transaction,
} from "@solana/web3.js";
import { RPC_ENDPOINT } from "constants/constants";
import { base58 } from "ethers/lib/utils";
import type { NextApiRequest, NextApiResponse } from "next";
import {
  createBurnCheckedInstruction,
  getAssociatedTokenAddress,
} from "@solana/spl-token";
import { asWallet } from "utils/as-wallet";

type Data = {
  success: boolean;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  console.log("webhook called");

  if (req.method !== "POST") {
    res.status(405).json({ success: false });
    return;
  }

  const { body } = req;

  if (!body || !process.env.PRIVATE_KEY) {
    res.status(400).json({ success: false });
    return;
  }

  const connection = new Connection(RPC_ENDPOINT);
  const keypair = Keypair.fromSecretKey(base58.decode(process.env.PRIVATE_KEY));
  const publicKey = new PublicKey(keypair.publicKey.toString());

  if (body[0]?.type === "TRANSFER") {
    console.log("transfer");
    // handle burn and reward
    const { tokenTransfers } = body[0];
    const mint = tokenTransfers[0]?.mint;
    const toTokenAccount = tokenTransfers[0]?.toTokenAccount;

    const tokenAccountAddress = await getAssociatedTokenAddress(
      new PublicKey(mint),
      publicKey
    );

    if (!mint) {
      res.status(400).json({ success: false });
      return;
    }
    console.log("burning mint:", mint);

    try {
      const latestBlockhash = await connection.getLatestBlockhash();
      const transaction = new Transaction({ ...latestBlockhash });

      console.log({
        mint,
        toTokenAccount,
        getAssociatedTokenAddress: tokenAccountAddress.toString(),
        publicKey,
      });

      transaction.add(
        createBurnCheckedInstruction(
          new PublicKey(toTokenAccount),
          new PublicKey(mint),
          publicKey,
          1,
          0
        )
      );

      transaction.feePayer = publicKey;

      const confirmation = await sendAndConfirmTransaction(
        connection,
        transaction,
        [keypair],
        {
          commitment: "confirmed",
          maxRetries: 2,
        }
      );

      console.log("burned", confirmation);
    } catch (error) {
      console.log("error", error);
    }
  }

  if (body?.[0]) {
    console.log("body.0", body[0]);
    const tx = body[0].nativeTransfers.find((x: any) => x.fromUserAccount);
    console.log("tx", tx);
  } else if (body) {
    console.log("body", body);
  }
  res.status(200).json({ success: true });
}
