import React from "react";
import { RouteComponentProps } from 'react-router';
import ChatPresenter from "./ChatPresenter";
import { getChat, getChatVariables, userProfile} from 'src/types/api';
import {Query} from "react-apollo";
import { GET_CHAT } from './ChatQueries';
import { USER_PROFILE } from 'src/sharedQueries';

interface IProps extends RouteComponentProps<any>{}

class ChatQuery extends Query<getChat, getChatVariables>{

}
class ProfileQuery extends Query<userProfile>{

}


class ChatContainer extends React.Component<IProps>{
    constructor(props:IProps){
        super(props);
        if(!props.match.params.chatId){
            props.history.push("/");
        }
    }

    public render(){
        const {match:{params:{chatId}}} = this.props;
        const parsedChatId = parseInt(chatId, 10);
        const {history} = this.props;
        console.log("In ChatContainer");
        console.log(history);
        return (
            <ProfileQuery query={USER_PROFILE}>
            {
                ({data:userData})=>(
                    <ChatQuery query={GET_CHAT} variables={{chatId:parsedChatId}}>
                    { ({data, loading})=>(
                    <ChatPresenter data={data} loading={loading} userData={userData}/>
                    )}
                    </ChatQuery>
                )
            }
            </ProfileQuery>
        
        )

    }
}

export default ChatContainer;