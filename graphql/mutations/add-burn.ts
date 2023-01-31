import { gql } from "graphql-request";

export const ADD_BURN = gql`
  mutation ADD_BURN(
    $userPublicKey: String
    $rewardTxAddress: String
    $burnTxAddress: String
    $burnRewardId: uuid
    $mintIds: jsonb
    $projectId: uuid
  ) {
    insert_burns_one(
      object: {
        burnRewardId: $burnRewardId
        burnTxAddress: $burnTxAddress
        mintIds: $mintIds
        rewardTxAddress: $rewardTxAddress
        userPublicKey: $userPublicKey
        projectId: $projectId
      }
    ) {
      projectId
      burnRewardId
      burnTxAddress
      id
      rewardTxAddress
      userPublicKey
    }
  }
`;
