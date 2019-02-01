import React from "react";
import AddPlacePresenter from "./AddPlacePresenter";
import { RouteComponentProps } from 'react-router';
import {Mutation} from "react-apollo";
import { addPlace, addPlaceVariables } from 'src/types/api';
import {ADD_PLACE} from "./AddPlaceQueries";
import { toast } from 'react-toastify';
import {css} from "glamor";
import {GET_PLACES} from "../../sharedQueries";

interface IState{
    name:string
    address:string
    lat:number
    lng:number
}
interface IProps extends RouteComponentProps<any>{}

class AddPlaceMutation extends Mutation<addPlace, addPlaceVariables>{}

class AddPlaceContainer extends React.Component<IProps, IState>{
    constructor(props){
        super(props);
        const {location:{state = {}}={}} = this.props;
        const {history} = this.props;
        
        if(state==={} || state===undefined){
            toast.error("Pick the place first!",{hideProgressBar:true, className: css({
                background: "#efeff2 !important",
                color:"#a1887f",
                fontSize:14
            })} );
            history.push("/find-address");
        }

        this.state = {
            name:"",
            address:state.address||"",
            lat:state.lat||0,
            lng:state.lng||0
        };
    }

    public render(){
        const {name, address, lat, lng} = this.state
        const {history} = this.props;
        return(
            <AddPlaceMutation mutation={ADD_PLACE}
            variables={{name,address,lat,lng,isFav:false}}
            refetchQueries={[{ query: GET_PLACES }]}
            onCompleted={(data)=>{
                const {AddPlace} = data;
                if(AddPlace.ok){
                    toast.success("Place successfully added!",{hideProgressBar:true, className: css({
                        background: "#efeff2 !important",
                        color:"#a1887f",
                        fontSize:14
                    })})
                    setTimeout(()=>{
                        history.push("/places");
                    },1000);
                } else {
                    toast.error(AddPlace.error, {hideProgressBar:true});

                }
            }

            }
            >
                {(addPlaceMutationFn,{loading}) =>{
                    return(
                    <AddPlacePresenter
                    loading={loading}
                    name={name}
                    address={address}
                    onChange={this.onInputChange}
                    onSubmit={addPlaceMutationFn}
                    isAddressPicked={lat !==0 && lng !==0}/>)
                }

                }
                
            </AddPlaceMutation>
        );
    }

    public onInputChange:React.ChangeEventHandler<HTMLInputElement> = async (ev)=>{
        const {target:{name, value}} = ev;
        this.setState({
            [name] : value
        }as any);

    }


}


export default AddPlaceContainer;