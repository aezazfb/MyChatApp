// import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import Lobby from './Components/Lobby';
import { HubConnectionBuilder, LogLevel } from '@microsoft/signalr';
import { useState } from 'react';
import TheChat from './Components/ChatMsgUi';

function App() {

    const [cnnction, setConnection] = useState();
    const [messagesRcvd, setMessagesRcvd] = useState([]);
    const [usersList, setUsersList] = useState([]);


    const getInTheRoom = async (user, room) => {
        try {
            const connection = new HubConnectionBuilder()
                .withUrl("chatHub")
                .configureLogging(LogLevel.Information)
                .build();

            connection.on("GotMessage", (user, message) => {
                console.log("message received: ", message);
                setMessagesRcvd(mssgs => [...mssgs, { user, message }]);
            });

            connection.on("GetUsersInRoom", (users) => {
                setUsersList(users);
            });

            connection.onclose(theEvent => {
                setConnection();
                setMessagesRcvd([]);
                setUsersList([]);
            });
            // connection.on("ReceiveMessage", ({user, usr2}, message) => {
            //   let msg = 'Notification received: ' + message + ' by ' + user + " " + usr2;
            //   console.log(msg);
            // });
            await connection.start();
            await connection.invoke("JoinRoom", { user, room });
            setConnection(connection);
        } catch (e) {
            console.log(e);
        }
    }

    const leaveRoomFn = async () => {
        try {
            await cnnction.stop();
        }
        catch (e) {
            console.log(e);
        }
    }

    const sendMsg = async (message) => {
        try {
            await cnnction.invoke("SendMessage", message)
        } catch (e) {
            console.log(e);
        }
    }
    return (
        <div className='app'>
            <h2>MyChat!</h2>
            <hr className='line'></hr>
            {!cnnction ? <Lobby getInTheRoom={getInTheRoom} />
                : <TheChat msgs={messagesRcvd} sendMessage={sendMsg} leaveRoom={leaveRoomFn} roomUsers={usersList} />
            }
        </div>
    );
}

export default App;
