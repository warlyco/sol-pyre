import { gql } from "graphql-request";

export const ADD_BURN = gql`
  mutation ADD_BURN(
    $burnRewardId: uuid
    $mintIds: jsonb
    $transactionAddress: String
    $userPublicKey: String
  ) {
    insert_burns_one(
      object: {
        burnRewardId: $burnRewardId
        mintIds: $mintIds
        userPublicKey: $userPublicKey
        transactionAddress: $transactionAddress
      }
    ) {
      burnRewardId
      id
      mintIds
      transactionAddress
      userPublicKey
    }
  }
`;
