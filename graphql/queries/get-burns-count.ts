import { gql } from "@apollo/client";

export const GET_BURNS_COUNT = gql`
  query GET_BURNS_COUNT {
    burns_aggregate {
      aggregate {
        count
      }
    }
  }
`;
