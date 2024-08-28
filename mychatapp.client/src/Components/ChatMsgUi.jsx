import { Button } from "react-bootstrap";
import MessageContainer from "./MessageUi";
import SendFormModule from "./SendMessageUi";
import RoomUsers from "./UsersInRoomUI";

const TheChat = ({ msgs, sendMessage, leaveRoom, roomUsers }) => {
    return (
        <div>
            <div className="leave-room">
                <Button onClick={() => leaveRoom()} variant="danger">Elude!</Button>
            </div>
            <RoomUsers users={roomUsers} />
            <div className="chat">
                <MessageContainer theMsgs={msgs} />
                <SendFormModule sendMessagefn={sendMessage} />
            </div>
        </div>
    )
}

export default TheChat;