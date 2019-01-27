import {gql} from "apollo-boost";

export const TOGGLE_DRIVING = gql`
    mutation toggleDriving{
        ToggleDrivingMode {
            ok
            error
        }
    }
`;

export const MODIFY_DRIVING_STATUS = gql`
    mutation modifyDrivingStatus($driverModeOn:Boolean, $isDriving:Boolean){
        ModifyDrivingStatus(driverModeOn:$driverModeOn, isDriving:$isDriving){
            ok
            error
        }
    }
`;