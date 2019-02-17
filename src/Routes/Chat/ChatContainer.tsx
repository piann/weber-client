import React from "react";
import { RouteComponentProps } from 'react-router';
import ChatPresenter from "./ChatPresenter";
import { getChat, getChatVariables, userProfile, sendMessage} from 'src/types/api';
import {Query, Mutation, MutationFn} from "react-apollo";
import { GET_CHAT, SEND_MESSAGE, SUBSCRIBE_TO_MESSAGES } from './ChatQueries';
import { USER_PROFILE } from 'src/sharedQueries';
import { SubscribeToMoreOptions } from 'apollo-client';

interface IProps extends RouteComponentProps<any>{}
interface IState {
    message: string;
}
  
class ChatQuery extends Query<getChat, getChatVariables>{
}
class ProfileQuery extends Query<userProfile>{
}
class SendMessageMutation extends Mutation<sendMessage>{
}


class ChatContainer extends React.Component<IProps, IState>{
    public sendMessageFn:MutationFn;
    constructor(props:IProps){
        super(props);
        if(!props.match.params.chatId){
            props.history.push("/");
        }
        this.state = {
            message: ""
          };
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
                    <SendMessageMutation mutation={SEND_MESSAGE}>
                        {
                            (SendMessageMutationFn)=>{
                                this.sendMessageFn = SendMessageMutationFn;

                                return(
                                <ChatQuery query={GET_CHAT} variables={{chatId:parsedChatId}}>
                                { ({data, loading, subscribeToMore})=>{
                                    const subscribeToMoreOpt:SubscribeToMoreOptions = {
                                        document:SUBSCRIBE_TO_MESSAGES,
                                        updateQuery:(prev, {subscriptionData})=>{
                                            if(!subscriptionData.data){
                                                return prev;
                                            }
                                            const {data:{MessageSubscription}} = subscriptionData;
                                            const {GetChat:{chat:{messages}}} = prev;
                                            if (messages.length > 0) {
                                                const newMessageId = MessageSubscription.id;
                                                const latestMessageId = messages[messages.length-1].id;
                                                if(newMessageId === latestMessageId){
                                                return;
                                                }
                                            }

                                            const newObject = Object.assign({},prev,{
                                                GetChat:{
                                                    ...prev.GetChat,
                                                    chat:{
                                                        ...prev.GetChat.chat,
                                                        messages:[...prev.GetChat.chat.messages, subscriptionData.data.MessageSubscription, ]
                                                    }
                                                }
                                            });
                                            return newObject;
                                        }
                                    };
                                    subscribeToMore(subscribeToMoreOpt);
                                    return(
                                <ChatPresenter data={data} loading={loading} userData={userData} 
                                messageText={this.state.message} 
                                onInputChange={this.onInputChange} 
                                onSubmit={this.onSubmit}/>
                                )}
                                }
                                </ChatQuery>
                            );}
                        }
                    </SendMessageMutation>
                )
            }
            </ProfileQuery>
        
        )

    }
    public onInputChange: React.ChangeEventHandler<HTMLInputElement> = ev =>{
        const{
            target:{name, value}
        } = ev;
        this.setState({
            [name]:value
        }as any);
    
    }
    public onSubmit:React.FormEventHandler = (ev) => {
        const {message} = this.state;
        const {match:{params:{chatId}}} = this.props;
        const parsedChatId = parseInt(chatId, 10);
        if(message !== ""){
        
        this.sendMessageFn({
            variables:{
                text:message,
                chatId:parsedChatId
            }
        });
        this.setState({
            message:""
        });
        }
        return
    }
}

export default ChatContainer;