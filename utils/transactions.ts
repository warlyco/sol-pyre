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

export const executeTransaction = async (
  connection: Connection,
  wallet: Wallet,
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
  }
): Promise<string> => {
  let txid = "";
  try {
    transaction.feePayer = wallet.publicKey;
    const latestBlockHash = await connection.getLatestBlockhash();

    await wallet.signTransaction(transaction);
    const signature = await connection.sendRawTransaction(
      transaction.serialize()
    );

    const confirmStrategy: BlockheightBasedTransactionConfirmationStrategy = {
      blockhash: latestBlockHash.blockhash,
      lastValidBlockHeight: latestBlockHash.lastValidBlockHeight,
      signature: signature,
    };

    const result = await connection.confirmTransaction(confirmStrategy);

    console.log("Successful tx", result);
  } catch (e) {
    console.log("Failed transaction: ", e, (e as SendTransactionError).logs);
    console.log(e);
  } finally {
    config.callback && config.callback();
  }
  return txid;
};
