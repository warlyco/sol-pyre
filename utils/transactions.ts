import { useMutation } from "@apollo/client";
import type { Wallet } from "@saberhq/solana-contrib";
import type {
  BlockheightBasedTransactionConfirmationStrategy,
  ConfirmOptions,
  Connection,
  SendTransactionError,
  Signer,
  Transaction,
} from "@solana/web3.js";
import { sendAndConfirmRawTransaction } from "@solana/web3.js";
import { log } from "next-axiom";

export const executeTransaction = async (
  connection: Connection,
  transaction: Transaction,
  config: {
    silent?: boolean;
    signers?: Signer[];
    confirmOptions?: ConfirmOptions;
    notificationConfig?: {
      message?: string;
      errorMessage?: string;
      description?: string;
    };
    callback?: () => void;
    successCallback?: () => void;
  },
  wallet?: Wallet,
  addBurnAttempt?: any,
  mintIds?: []
): Promise<string> => {
  let txid = "";
  try {
    if (wallet) {
      transaction.feePayer = wallet.publicKey;
      await wallet.signTransaction(transaction);
    }
    const latestBlockHash = await connection.getLatestBlockhash();

    const signature = await connection.sendRawTransaction(
      transaction.serialize()
    );

    const confirmStrategy: BlockheightBasedTransactionConfirmationStrategy = {
      blockhash: latestBlockHash.blockhash,
      lastValidBlockHeight: latestBlockHash.lastValidBlockHeight,
      signature,
    };

    const result = await connection.confirmTransaction(confirmStrategy);

    console.log("Successful tx", signature);
    if (!!addBurnAttempt && !!wallet) {
      addBurnAttempt({
        variables: {
          txAddress: signature,
          walletAddress: wallet.publicKey,
          mintIds,
        },
      });
    }

    config.successCallback && config.successCallback();
  } catch (error) {
    log.debug("error sending reward to burning wallet", { error });
  } finally {
    config.callback && config.callback();
  }
  return txid;
};
