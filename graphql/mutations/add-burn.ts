import { gql } from "graphql-request";

export const ADD_BURN = gql`
  mutation ADD_BURN(
    $mintIds: jsonb
    $transactionAddress: String
    $userPublicKey: String
  ) {
    insert_burns_one(
      object: {
        mintIds: $mintIds
        transactionAddress: $transactionAddress
        userPublicKey: $userPublicKey
      }
    ) {
      id
      transactionAddress
      userPublicKey
    }
  }
`;
