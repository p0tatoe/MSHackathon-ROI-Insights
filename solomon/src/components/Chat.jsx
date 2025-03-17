import React, { useState, useEffect, useRef } from 'react';
import style from '../chat.module.css'; // Assuming you have your styles here
import logo from '/android-chrome-512x512.png'; // Import your logo

function Chat() {
  // State to store the chat messages
  const [messages, setMessages] = useState([
  ]);

  // State for the current input message
  const [inputMessage, setInputMessage] = useState('');

  // Reference for the message container to auto-scroll to bottom
  const messageContainerRef = useRef(null);

  // Reference for the textarea to auto-resize
  const textareaRef = useRef(null);

  // State to control the initial greeting display
  const [showGreeting, setShowGreeting] = useState(true);

  // Function to handle sending messages
  const handleSendMessage = () => {
    if (inputMessage.trim() === '') return;

    // Add user message to the chat
    const newMessages = [...messages, { text: inputMessage, sender: 'user' }];
    setMessages(newMessages);

    // Clear the input field
    setInputMessage('');

    // Hide the greeting after the first user message
    setShowGreeting(false);

    // Simulate a bot response after a small delay
    setTimeout(() => {
      const botResponse = getBotResponse(inputMessage);
      setMessages([...newMessages, { text: botResponse, sender: 'bot' }]);
    }, 1000);
  };

  // Function to handle input change
  const handleInputChange = (e) => {
    setInputMessage(e.target.value);

    // Auto-resize the textarea
    adjustTextareaHeight();
  };

  // Function to adjust textarea height based on content
  const adjustTextareaHeight = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 150)}px`;
    }
  };

  // Function to handle key press (send on Enter, but allow Shift+Enter for new line)
  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  // Simple bot response logic - this can be expanded or connected to an actual API
  const getBotResponse = (userMessage) => {
    const lowerCaseMessage = userMessage.toLowerCase();

    if (lowerCaseMessage.includes('hello') || lowerCaseMessage.includes('hi')) {
      return "Hello! How can I assist with your business today?";
    } else if (lowerCaseMessage.includes('business') && lowerCaseMessage.includes('transformation')) {
      return "Business transformation involves reimagining and redesigning core business processes. I can help you identify opportunities, develop strategies, and implement solutions. What specific aspect are you interested in?";
    } else if (lowerCaseMessage.includes('thank')) {
      return "You're welcome! Is there anything else you'd like to discuss?";
    } else {
      return "That's an interesting point. Could you elaborate more on what you're looking to achieve?";
    }
  };

  // Auto-scroll to the latest message when messages change
  useEffect(() => {
    if (messageContainerRef.current) {
      messageContainerRef.current.scrollTop = messageContainerRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div>
      {showGreeting && messages.length === 0 && (
        <div className={style.greetingContainer}>
          <img src={logo} alt="Logo" className={style.logo} />
          <h2>
            Solomon
          </h2>
          <h3 >
            Your AI Partner for Business Transformation
          </h3>
        </div>
      )}

      {!showGreeting && (
        <div className={style.chatView}>
          <div className={style.messageContainer} ref={messageContainerRef}>
            {messages.map((message, index) => (
              <div
                key={index}
                className={`${style.message} ${message.sender === 'bot' ? style.botMessage : style.userMessage}`}
              >
                {message.text}
              </div>
            ))}
          </div>
        </div>
      )}

      <div className={style.inputContainer}>
        <textarea
          className={style.messageInput}
          id="messageInput"
          placeholder="How can I help?"
          rows="1"
          value={inputMessage}
          onChange={handleInputChange}
          onKeyPress={handleKeyPress}
          ref={textareaRef}
          autoFocus
        />
        {inputMessage.trim() !== '' && (
          <button
            className={style.sendButton}
            id="sendButton"
            onClick={handleSendMessage}
          >
            &#10148;
          </button>
        )}
      </div>
    </div>
  );
}

export default Chat;