import { gql } from "apollo-boost";

export const USER_PROFILE = gql`
  query userProfile {
    GetMyProfile {
      ok
      error
      user {
        id
        firstName
        lastName
        email
        profilePhoto
        fullName
        driverModeOn
        isDriving
      }
    }
  }
`;

export const GET_PLACES = gql`
  query getPlaces {
    GetMyPlace {
      ok
      error
      places {
        id
        name
        address
        isFav
      }
    }
  }
`;