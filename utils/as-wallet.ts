import type { Wallet } from "@project-serum/anchor/dist/cjs/provider";
import type { WalletContextState } from "@solana/wallet-adapter-react";

export const asWallet = (wallet: WalletContextState): Wallet => {
  return {
    signTransaction: wallet.signTransaction!,
    signAllTransactions: wallet.signAllTransactions!,
    publicKey: wallet.publicKey!,
  };
};
