import React from 'react';


function OvrdUserChatMessage(props) {
   const { message } = props;
    
    // var[date,setDate]=useState(new Date());
    var date= new Date();

    return (
    <div>
      <div className="react-chatbot-kit-user-chat-message">
        {message}      
      <div className="react-chatbot-kit-user-chat-message-arrow"></div>      
    </div>
    <div className='user-chat-message-datetime'>
    
  {date.toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric' })} </div>

  </div>
    );
    }

  export default OvrdUserChatMessage;