import React from "react";
import HomePresenter from './HomePresenter';
import { RouteComponentProps } from 'react-router';
import {Query} from "react-apollo";
import { userProfile } from 'src/types/api';
import { USER_PROFILE } from 'src/sharedQueries';

interface IState{
    isMenuOpen: boolean;
}

interface IProps extends RouteComponentProps<any>{}

class ProfileQuery extends Query<userProfile>{

}

class HomeContainer extends React.Component<IProps,IState>{
    public state ={
        isMenuOpen:false
    }
    render(){
        const {isMenuOpen} = this.state;
        return(
            <ProfileQuery query={USER_PROFILE}>
                {
                    
                ({loading}) =>(<HomePresenter isMenuOpen={isMenuOpen} toggleMenu={this.toggleMenu} loading={loading}/>)
                }
            </ProfileQuery>        
        )
    }
    public toggleMenu = () => {
        this.setState(state =>{
            return {
                isMenuOpen: !state.isMenuOpen
            };
        });
    }

    
}

export default HomeContainer;