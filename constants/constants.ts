import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
export const CREATOR_ADDRESS: string =
  process.env.NEXT_PUBLIC_CREATOR_ADDRESS || "";
export const CLUSTER: string =
  process.env.NEXT_PUBLIC_CLUSTER || "mainnet-beta";
export const GRAPHQL_API_ENDPOINT: string =
  process.env.NEXT_PUBLIC_GRAPHQL_API_ENDPOINT || "";
export const RPC_ENDPOINT: string = process.env.NEXT_PUBLIC_RPC_ENDPOINT || "";
export const MINTING_WALLET_ADDRESS: string =
  process.env.NEXT_PUBLIC_MINTING_WALLET_ADDRESS || "";
export const BASE_URL: string = process.env.NEXT_PUBLIC_BASE_URL || "";
export const DOMAIN_MINT_COST_IN_SOL: string =
  process.env.NEXT_PUBLIC_DOMAIN_MINT_COST_IN_SOL || "";
export const PRIMARY_TOKEN_SYMBOL =
  process.env.NEXT_PUBLIC_PRIMARY_TOKEN_SYMBOL || "";
export const PRIMARY_TOKEN_MINT_ADDRESS =
  process.env.NEXT_PUBLIC_PRIMARY_TOKEN_MINT_ADDRESS || "";
export const MINT_WALLET_ADDRESS =
  process.env.NEXT_PUBLIC_MINT_WALLET_ADDRESS || "";
export const REWARD_WALLET_ADDRESS =
  process.env.NEXT_PUBLIC_REWARD_WALLET_ADDRESS || "";
export const BURNING_WALLET_ADDRESS =
  process.env.NEXT_PUBLIC_BURNING_WALLET_ADDRESS || "";
export const REWARD_TOKEN_MINT_ADDRESS =
  process.env.NEXT_PUBLIC_REWARD_TOKEN_MINT_ADDRESS || "";
export const PLATFORM_TOKEN_MINT_ADDRESS =
  process.env.NEXT_PUBLIC_PLATFORM_TOKEN_MINT_ADDRESS || "";
export const COLLECTION_WALLET_ADDRESS =
  process.env.NEXT_PUBLIC_COLLECTION_WALLET_ADDRESS || "";
