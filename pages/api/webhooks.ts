import {
  Connection,
  Keypair,
  PublicKey,
  sendAndConfirmTransaction,
  Transaction,
  TransactionInstructionCtorFields,
} from "@solana/web3.js";
import { RPC_ENDPOINT } from "constants/constants";
import { base58 } from "ethers/lib/utils";
import type { NextApiRequest, NextApiResponse } from "next";
import {
  createAssociatedTokenAccountInstruction,
  createBurnCheckedInstruction,
  createTransferInstruction,
  getAssociatedTokenAddress,
} from "@solana/spl-token";

type Data = {
  success: boolean;
  burnTxSignature?: string;
  rewardTxSignature?: string;
};

import { Metaplex } from "@metaplex-foundation/js";

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

  if (
    !body ||
    !process.env.FIRE_PRIVATE_KEY ||
    !process.env.REWARD_PRIVATE_KEY
  ) {
    res.status(400).json({ success: false });
    return;
  }

  const connection = new Connection(RPC_ENDPOINT);
  const fireKeypair = Keypair.fromSecretKey(
    base58.decode(process.env.FIRE_PRIVATE_KEY)
  );
  const rewardKeypair = Keypair.fromSecretKey(
    base58.decode(process.env.REWARD_PRIVATE_KEY)
  );
  const firePublicKey = new PublicKey(fireKeypair.publicKey.toString());
  const rewardPublicKey = new PublicKey(rewardKeypair.publicKey.toString());
  let burnTxSignature;
  let rewardTxSignature;

  if (
    body[0]?.type === "TRANSFER" &&
    body[0]?.tokenTransfers[0].toUserAccount === firePublicKey.toString()
  ) {
    // handle burn and reward
    const { tokenTransfers } = body[0];
    const mint = tokenTransfers[0]?.mint;
    const tokenAccountAddress = tokenTransfers[0]?.toTokenAccount;
    const metaplex = Metaplex.make(connection);

    if (!mint) {
      res.status(400).json({ success: false });
      return;
    }
    console.log("burning mint:", mint);

    try {
      const latestBlockhash = await connection.getLatestBlockhash();
      const transaction = new Transaction({ ...latestBlockhash });

      transaction.add(
        createBurnCheckedInstruction(
          new PublicKey(tokenAccountAddress),
          new PublicKey(mint),
          firePublicKey,
          1,
          0
        )
      );

      transaction.feePayer = firePublicKey;

      // burnTxSignature = await sendAndConfirmTransaction(
      //   connection,
      //   transaction,
      //   [fireKeypair],
      //   {
      //     commitment: "confirmed",
      //     maxRetries: 2,
      //   }
      // );

      // console.log("burned", burnTxSignature);

      const nftMetasFromMetaplex = await metaplex
        .nfts()
        .findAllByOwner({ owner: rewardPublicKey });

      // @ts-ignore
      const rewardMintAddress: PublicKey = nftMetasFromMetaplex[0].mintAddress;

      const fromTokenAccountAddress = await getAssociatedTokenAddress(
        rewardMintAddress,
        rewardPublicKey
      );

      const toTokenAccountAddress = await getAssociatedTokenAddress(
        rewardMintAddress,
        new PublicKey(tokenTransfers[0]?.fromUserAccount)
      );

      const associatedDestinationTokenAddr = await getAssociatedTokenAddress(
        rewardMintAddress,
        new PublicKey(tokenTransfers[0]?.fromUserAccount)
      );

      const receiverAccount = await connection.getAccountInfo(
        associatedDestinationTokenAddr
      );

      const latestBlockhash2 = await connection.getLatestBlockhash();
      const rewardTransaction = new Transaction({ ...latestBlockhash2 });

      const instructions: TransactionInstructionCtorFields[] = [];

      if (!receiverAccount) {
        instructions.push(
          createAssociatedTokenAccountInstruction(
            rewardPublicKey,
            associatedDestinationTokenAddr,
            new PublicKey(tokenTransfers[0]?.fromUserAccount),
            rewardMintAddress
          )
        );
      }

      instructions.push(
        createTransferInstruction(
          fromTokenAccountAddress,
          toTokenAccountAddress,
          rewardPublicKey,
          1
        )
      );

      rewardTransaction.add(...instructions);

      rewardTxSignature = await sendAndConfirmTransaction(
        connection,
        rewardTransaction,
        [rewardKeypair],
        {
          commitment: "confirmed",
          maxRetries: 2,
        }
      );

      console.log("rewarded", rewardTxSignature);
    } catch (error) {
      console.log("error", error);
    }
  }

  res.status(200).json({ success: true, burnTxSignature, rewardTxSignature });
}
