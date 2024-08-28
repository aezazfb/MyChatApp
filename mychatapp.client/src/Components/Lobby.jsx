import { useState } from "react";
import { Button, Form } from "react-bootstrap"

const Lobby = ({ getInTheRoom }) => {
    const [user, setUSer] = useState();
    const [room, setRoom] = useState();
    return <Form className="lobby" onSubmit={
        e => {
            e.preventDefault();
            getInTheRoom(user, room);
        }

    }>
        <Form.Group>
            <Form.Control placeholder="name" onChange={e => {
                setUSer(e.target.value);
                localStorage.setItem("userName", e.target.value);
            }} />
            <Form.Control placeholder="room" onChange={e => setRoom(e.target.value)}></Form.Control>
        </Form.Group>
        <Button variant="success" type="submit" disabled={!user || !room}>Get In!</Button>
    </Form>
}

export default Lobby;