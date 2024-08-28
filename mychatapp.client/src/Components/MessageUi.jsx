import { useEffect, useRef } from "react";

const MessageContainer = ({ theMsgs }) => {
    const msgRef = useRef();
    let currentUser = localStorage.getItem('userName');

    useEffect(() => {
        if (msgRef && msgRef.current) {
            const { scrollHeight, clientHeight } = msgRef.current;
            msgRef.current.scrollTo({
                left: 0, top: scrollHeight - clientHeight,
                behavior: "smooth"
            })
        }
    }, [theMsgs])
    return <div ref={msgRef} className="message-container">
        {theMsgs.map(
            (theMsgObj, theMsgIndex) => {
                return <div key={theMsgIndex} className="user-message">
                    {currentUser === theMsgObj.user ? <div style={{ textAlign: 'left' }}>
                        <div className="message" style={{ backgroundColor: '#73d32a' }}> {theMsgObj.message} </div>
                        <div className="from-user"> {theMsgObj.user} </div>
                    </div>
                        :
                        <div>
                            <div className="message bg-primary"> {theMsgObj.message} </div>
                            <div className="from-user"> {theMsgObj.user} </div>
                        </div>}
                </div>
            }
        )}
    </div>
}

export default MessageContainer;