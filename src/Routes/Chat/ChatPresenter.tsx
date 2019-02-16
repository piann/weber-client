import React from "react";
import { getChat, userProfile } from 'src/types/api';
import styled from '../../typed-components';
import HeaderBar from 'src/Components/HeaderBar';
import Message from 'src/Components/Message';

const Container = styled.div`

`;


interface IProps{
    data?:getChat
    userData?:userProfile
    loading:boolean
}

const ChatPresenter:React.SFC<IProps> = ({data:{GetChat:{chat=null}={}}={},
    userData:{GetMyProfile:{user=null}={}}={},
    loading})=>{

    return (<Container>
        {!loading && <HeaderBar backTo={`/ride/${chat!.rideId}`} />}
        {!loading && chat && user && <React.Fragment>
            {chat.messages &&
            chat.messages.map(message => {
                if(message){
                    return(
                        <Message key={message.id} text={message.text} mine={user.id===message.userId}/>
                    );
                } else {
                    return null;
                }
            })}
        </React.Fragment>}
    </Container>);
}


export default ChatPresenter;