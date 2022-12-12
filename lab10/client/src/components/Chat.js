import { useEffect, useState } from "react";

const Chat = ({socket,room,login}) => {

    const [currentMessage,setCurrentMessage] = useState("")
    const [messages,setMessages] = useState([])

    const sendMessage = async () => {
        if (currentMessage !== "") {
            const messageData = {
                room: room,
                author: login,
                message: currentMessage,
                time: new Date(Date.now()).getHours() + ":" + new Date(Date.now()).getMinutes()

            };
            await socket.emit("send_message", messageData);
        }
    }

    useEffect(() => {
        socket.on("receive_message", (data) => {
            setMessages([...messages,data]);
        });
    },[socket])
    return ( 
        <div className="chat">
            <div className="chat-header">
                <p>live chat</p>
            </div>
            <div className="chat-body">
                {
                    messages.map((message,index) => {
                        return (
                            <div key={index} className="message">
                                {/* <p className="message-author">{message.author}</p> */}
                                <p className="message-content">{message.message}</p>
                                {/* <p className="message-time">{message.time}</p> */}
                            </div>
                        )
                    }
                    )
                }
            </div>
            <div className="chat-footer">
                <input type="text" placeholder="msg" onChange={(e) => setCurrentMessage(e.target.value)}/>
                <button onClick={sendMessage}>send</button>
            </div>
        </div>
     );
}
 
export default Chat;