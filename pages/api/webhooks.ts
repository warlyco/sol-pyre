// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { executeTransaction } from "utils/transactions";
import {
  Connection,
  Keypair,
  PublicKey,
  sendAndConfirmTransaction,
  Transaction,
  TransactionInstructionCtorFields,
} from "@solana/web3.js";
import { REWARD_TOKEN_MINT_ADDRESS, RPC_ENDPOINT } from "constants/constants";
import { base58 } from "ethers/lib/utils";
import type { NextApiRequest, NextApiResponse } from "next";
import {
  createAssociatedTokenAccountInstruction,
  createBurnCheckedInstruction,
  createTransferInstruction,
  getAssociatedTokenAddress,
} from "@solana/spl-token";
import { asWallet } from "utils/as-wallet";

type Data = {
  success: boolean;
  burnTxSignature?: string;
  rewardTxSignature?: string;
};

import { JsonMetadata, Metaplex } from "@metaplex-foundation/js";
import { Metadata } from "@metaplex-foundation/mpl-token-metadata";

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

  if (body[0]?.type === "TRANSFER") {
    console.log("transfer");
    // handle burn and reward
    const { tokenTransfers } = body[0];
    const mint = tokenTransfers[0]?.mint;
    const tokenAccountAddress = tokenTransfers[0]?.toTokenAccount;
    const toTokenAccountAddress = tokenTransfers[0]?.fromTokenAccount;
    const metaplex = Metaplex.make(connection);

    if (!mint) {
      res.status(400).json({ success: false });
      return;
    }
    console.log("burning mint:", mint);

    try {
      // const latestBlockhash = await connection.getLatestBlockhash();
      // const transaction = new Transaction({ ...latestBlockhash });

      // console.log({
      //   mint,
      //   tokenAccountAddress,
      //   firePublicKey,
      // });

      // transaction.add(
      //   createBurnCheckedInstruction(
      //     new PublicKey(tokenAccountAddress),
      //     new PublicKey(mint),
      //     firePublicKey,
      //     1,
      //     0
      //   )
      // );

      // transaction.feePayer = firePublicKey;

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

      console.log("sending reward");

      const nftMetasFromMetaplex = await metaplex
        .nfts()
        .findAllByOwner({ owner: rewardPublicKey });

      const { address: mintAddress } = nftMetasFromMetaplex[0];

      console.log("tokenTransfers[0]", tokenTransfers[0]);
      // console.log("first nft mint", mintAddress);
      // console.log("first nft", nftMetasFromMetaplex[0]);

      const fromTokenAccountAddress = await getAssociatedTokenAddress(
        mintAddress,
        rewardPublicKey
      );

      console.log("fromTokenAccountAddress", fromTokenAccountAddress);

      const toTokenAccountAddress = await getAssociatedTokenAddress(
        mintAddress,
        new PublicKey(tokenTransfers[0]?.fromUserAccount)
      );

      console.log("toTokenAccountAddress", toTokenAccountAddress);

      const associatedDestinationTokenAddr = await getAssociatedTokenAddress(
        mintAddress,
        new PublicKey(tokenTransfers[0]?.fromUserAccount)
      );

      console.log(
        "associatedDestinationTokenAddr",
        associatedDestinationTokenAddr
      );

      const receiverAccount = await connection.getAccountInfo(
        associatedDestinationTokenAddr
      );

      console.log("receiverAccount", receiverAccount);

      const latestBlockhash2 = await connection.getLatestBlockhash();
      const rewardTransaction = new Transaction({ ...latestBlockhash2 });

      const instructions: TransactionInstructionCtorFields[] = [];

      if (!receiverAccount) {
        instructions.push(
          createAssociatedTokenAccountInstruction(
            rewardPublicKey,
            associatedDestinationTokenAddr,
            new PublicKey(tokenTransfers[0]?.fromUserAccount),
            mintAddress
          )
        );
      }

      console.log("receiverAccount try 2", receiverAccount);

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

  if (body?.[0]) {
    // console.log("body.0", body[0]);
    const tx = body[0].nativeTransfers.find((x: any) => x.fromUserAccount);
    console.log("tx", tx);
  } else if (body) {
    console.log("body", body);
  }
  res.status(200).json({ success: true, burnTxSignature, rewardTxSignature });
}
