import React from "react";
import Form from "../../Components/Form";
import HeaderBar from "../../Components/HeaderBar";
import Input from "../../Components/Input";
import Message from "../../Components/Message";
import styled from "../../typed-components";
import { getChat, userProfile } from "../../types/api";

const Container = styled.div``;

const Chat = styled.div`
  height: 76vh;
  overflow: scroll;
  padding: 0 20px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const InputCont = styled.div`
  padding: 0 20px;
`;

interface IProps {
  data?: getChat;
  userData?: userProfile;
  loading: boolean;
  messageText?: string;
  onSubmit: (ev:any) => void;
  onInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const ChatPresenter: React.SFC<IProps> = ({
  loading,
  data: { GetChat: { chat = null } = {} } = {},
  userData: { GetMyProfile: { user = null } = {} } = {},
  messageText,
  onInputChange,
  onSubmit
}) => (
  <Container>
    {!loading && chat && <HeaderBar backTo={`/ride/${chat.rideId}`} text={"Chat"} />}
    {!loading &&
      chat &&
      user && (
        <React.Fragment>
          <Chat>
            {chat.messages &&
              chat.messages.map(message => {
                if (message) {
                  return (
                    <Message
                      key={message.id}
                      text={message.text}
                      mine={user.id === message.userId}
                    />
                  );
                }
                return null;
              })}
          </Chat>
          <InputCont>
            <Form submitFn={onSubmit}>
              <Input
                value={messageText}
                placeholder={"Type your message"}
                onChange={onInputChange}
                name={"message"}
              />
            </Form>
          </InputCont>
        </React.Fragment>
      )}
  </Container>
);

export default ChatPresenter;