import { useState } from "react";
import { Button, Form, FormControl, InputGroup } from "react-bootstrap"

const SendFormModule = ({ sendMessagefn }) => {
    const [msg, setMsg] = useState("");
    return <Form onSubmit={e => {
        e.preventDefault();
        sendMessagefn(msg);
        setMsg("");
    }}>
        <InputGroup>
            <FormControl placeholder="..Message" onChange={e => { setMsg(e.target.value) }} value={msg} />
            <div className="input-group-append">
                <Button variant="primary" type="submit" disabled={!msg}>Send Msg</Button>
            </div>
        </InputGroup>
    </Form>
}

export default SendFormModule;