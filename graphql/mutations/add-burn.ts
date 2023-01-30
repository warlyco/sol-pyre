import { gql } from "graphql-request";

export const ADD_BURN = gql`
  mutation ADD_BURN(
    $userPublicKey: String
    $rewaredTxAddress: String
    $burnTxAddress: String
    $burnRewardId: uuid
    $mintIds: jsonb
  ) {
    insert_burns_one(
      object: {
        burnRewardId: $burnRewardId
        burnTxAddress: $burnTxAddress
        mintIds: $mintIds
        rewaredTxAddress: $rewaredTxAddress
        userPublicKey: $userPublicKey
      }
    ) {
      burnRewardId
      burnTxAddress
      id
      rewaredTxAddress
      userPublicKey
    }
  }
`;
