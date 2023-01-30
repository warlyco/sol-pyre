import {
  Connection,
  Keypair,
  PublicKey,
  sendAndConfirmTransaction,
  Transaction,
  TransactionInstructionCtorFields,
} from "@solana/web3.js";
import {
  BASE_URL,
  PLATFORM_TOKEN_MINT_ADDRESS,
  RPC_ENDPOINT,
} from "constants/constants";
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
  burnTxAddress?: string;
  rewardTxAddress?: string;
};

import { Metaplex, Nft } from "@metaplex-foundation/js";
import axios from "axios";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  console.log("webhook called");

  if (
    req.method !== "POST" ||
    !process.env.NEXT_PUBLIC_REWARD_TOKEN_MINT_ADDRESS
  ) {
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
  let burnTxAddress;
  let rewardTxAddress;

  if (
    body[0]?.type === "TRANSFER" &&
    body[0]?.tokenTransfers[0].toUserAccount === firePublicKey.toString()
  ) {
    // handle burn and reward
    const { tokenTransfers } = body[0];
    const mints = tokenTransfers.map((transfer: Nft) => transfer.mint);
    const tokenAccountAddress = tokenTransfers[0]?.toTokenAccount;
    const metaplex = Metaplex.make(connection);

    if (!mints.length) {
      res.status(400).json({ success: false });
      return;
    }
    console.log("burning mints:", mints);

    try {
      // const latestBlockhash = await connection.getLatestBlockhash();
      // const transaction = new Transaction({ ...latestBlockhash });

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

      // burnTxAddress = await sendAndConfirmTransaction(
      //   connection,
      //   transaction,
      //   [fireKeypair],
      //   {
      //     commitment: "confirmed",
      //     maxRetries: 2,
      //   }
      // );

      // console.log("burned", burnTxAddress);
      console.log("rewarding");

      // const nftMetasFromMetaplex = await metaplex
      //   .nfts()
      //   .findAllByOwner({ owner: rewardPublicKey });

      // Send reward
      const rewardMintAddress = new PublicKey(
        process.env.NEXT_PUBLIC_REWARD_TOKEN_MINT_ADDRESS
      );

      const fromTokenAccountAddress = await getAssociatedTokenAddress(
        rewardMintAddress,
        rewardPublicKey
      );

      const toTokenAccountAddress = await getAssociatedTokenAddress(
        rewardMintAddress,
        new PublicKey(tokenTransfers[0]?.fromUserAccount)
      );

      const associatedDestinationTokenAddress = await getAssociatedTokenAddress(
        rewardMintAddress,
        new PublicKey(tokenTransfers[0]?.fromUserAccount)
      );

      const receiverAccount = await connection.getAccountInfo(
        associatedDestinationTokenAddress
      );

      const latestBlockhash2 = await connection.getLatestBlockhash();
      const rewardTransaction = new Transaction({ ...latestBlockhash2 });

      const instructions: TransactionInstructionCtorFields[] = [];

      if (!receiverAccount) {
        instructions.push(
          createAssociatedTokenAccountInstruction(
            rewardPublicKey,
            associatedDestinationTokenAddress,
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

      // Send platform reward
      const platformTokenMintAddress = new PublicKey(
        PLATFORM_TOKEN_MINT_ADDRESS
      );

      const fromPlatformTokenAccountAddress = await getAssociatedTokenAddress(
        platformTokenMintAddress,
        rewardPublicKey
      );

      const toPlatformTokenAccountAddress = await getAssociatedTokenAddress(
        platformTokenMintAddress,
        new PublicKey(tokenTransfers[0]?.fromUserAccount)
      );

      const associatedDestinationPlatformTokenAddress =
        await getAssociatedTokenAddress(
          platformTokenMintAddress,
          new PublicKey(tokenTransfers[0]?.fromUserAccount)
        );

      const receiverPlatformTokenAccount = await connection.getAccountInfo(
        associatedDestinationPlatformTokenAddress
      );

      if (!receiverPlatformTokenAccount) {
        instructions.push(
          createAssociatedTokenAccountInstruction(
            rewardPublicKey,
            associatedDestinationPlatformTokenAddress,
            new PublicKey(tokenTransfers[0]?.fromUserAccount),
            platformTokenMintAddress
          )
        );
      }

      instructions.push(
        createTransferInstruction(
          fromPlatformTokenAccountAddress,
          toPlatformTokenAccountAddress,
          rewardPublicKey,
          1e9 * mints.length // 1e8 = 9 decimals
        )
      );

      rewardTransaction.add(...instructions);

      rewardTxAddress = await sendAndConfirmTransaction(
        connection,
        rewardTransaction,
        [rewardKeypair],
        {
          commitment: "confirmed",
          maxRetries: 2,
        }
      );

      const payload = {
        burnTxAddress: burnTxAddress || "fake-burn-tx-address",
        rewardTxAddress,
        userPublicKey: tokenTransfers[0]?.fromUserAccount,
        mintIds: mints,
        burnRewardId: "8dca45c9-6d55-4cd6-8103-b24e25c8d335", // LUPERS Free mint
      };

      console.log("rewarded", rewardTxAddress);
      console.log(`saving to db ${BASE_URL}/api/add-burn`, payload);
      console.log("tokenTransfers[0]", tokenTransfers[0]);

      const res = await axios.post(`${BASE_URL}/api/add-burn`, payload);

      console.log(`posted to ${BASE_URL}/api/add-burn`, res);
    } catch (error) {
      console.log("error", error);
    }
  }

  res.status(200).json({ success: true, burnTxAddress, rewardTxAddress });
}
