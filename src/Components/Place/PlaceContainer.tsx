import React from "react";
import PlacesPresenter from './PlacePresenter';
import {Mutation} from "react-apollo";
import { editPlace } from 'src/types/api';
import { EDIT_PLACE } from './PlaceQueries';
import { GET_PLACES } from 'src/sharedQueries';

class EditPlaceMutation extends Mutation<editPlace, any>{}

interface IProps{
    fav:boolean
    name:string
    address:string
    id:number
} 

class PlaceContainer extends React.Component<IProps>{

    
    public render(){
        const {id, fav, name, address} = this.props;
        return(
            <EditPlaceMutation mutation={EDIT_PLACE} variables={{isFav:!fav, placeId:id}} refetchQueries={[{query:GET_PLACES}]}>
             {(editPlaceMutationFn,{loading}) =>(
             <PlacesPresenter onStarPress={editPlaceMutationFn} fav={fav} name={name} address={address}/>
             )
             }   
            </EditPlaceMutation>
        );
    }
}

export default PlaceContainer;