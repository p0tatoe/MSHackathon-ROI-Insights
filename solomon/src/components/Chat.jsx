import React, { useState, useEffect, useRef } from 'react';
import style from '../chat.module.css';
import logo from '/android-chrome-512x512.png';


function Chat() {

  const webhookUrl = "https://n8n-5qbd6-u37268.vm.elestio.app/webhook/2e247cb1-f244-41f1-a5ce-65e1c07d24b7"

  // State to store the chat messages
  const [messages, setMessages] = useState([]);

  // State for the current input message
  const [inputMessage, setInputMessage] = useState('');
  
  // State to track when the bot is typing
  const [isLoading, setIsLoading] = useState(false);

  // Reference for the message container to auto-scroll to bottom
  const messageContainerRef = useRef(null);

  // Reference for the textarea to auto-resize
  const textareaRef = useRef(null);

  // State to control the initial greeting display
  const [showGreeting, setShowGreeting] = useState(true);

  // Function to handle sending messages
  const handleSendMessage = async () => {
    if (inputMessage.trim() === '') return;

    // Add user message to the chat
    const newMessages = [...messages, { text: inputMessage, sender: 'user' }];
    setMessages(newMessages);

    // Clear the input field
    setInputMessage('');

    // Hide the greeting after the first user message
    setShowGreeting(false);
    
    // Set loading state to true
    setIsLoading(true);

    try {
      // Send message to webhook
      const response = await fetch(webhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: inputMessage,
          // You can include additional metadata if needed
          timestamp: new Date().toISOString(),
          sessionId: localStorage.getItem('chatSessionId') || createSessionId(),
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      // Parse the response from the webhook
      const data = await response.json();
      
      // Add bot response to the chat
      setMessages([...newMessages, { text: data.output || data.message || "Sorry, I couldn't process that request.", sender: 'bot' }]);
    } catch (error) {
      console.error('Error sending message to webhook:', error);
      // Add error message to the chat
      setMessages([...newMessages, { text: "Sorry, there was an error connecting to the service. Please try again later.", sender: 'bot' }]);
    } finally {
      // Set loading state back to false
      setIsLoading(false);
    }
  };

  // Create a unique session ID for this chat
  const createSessionId = () => {
    const sessionId = 'session_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
    localStorage.setItem('chatSessionId', sessionId);
    return sessionId;
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

  // Handler for Upload Files button
  const handleUploadFiles = () => {
    // Implement file upload functionality here
    console.log('Upload Files button clicked');
  };

  // Handler for Prompt Settings button
  const handlePromptSettings = () => {
    // Implement prompt settings functionality here
    console.log('Prompt Settings button clicked');
  };

  // Auto-scroll to the latest message when messages change
  useEffect(() => {
    if (messageContainerRef.current) {
      messageContainerRef.current.scrollTop = messageContainerRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  // Initialize session ID if not exists
  useEffect(() => {
    if (!localStorage.getItem('chatSessionId')) {
      createSessionId();
    }
    
    // Optional: Load chat history from the server
    const loadChatHistory = async () => {
      try {
        const response = await fetch(`${webhookUrl}/history?sessionId=${localStorage.getItem('chatSessionId')}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        
        if (response.ok) {
          const data = await response.json();
          if (data.messages && data.messages.length > 0) {
            setMessages(data.messages);
            setShowGreeting(false);
          }
        }
      } catch (error) {
        console.error('Error loading chat history:', error);
      }
    };
    
    // Uncomment the line below if you want to load chat history when the component mounts
    // loadChatHistory();
  }, [webhookUrl]);

  return (
    <div>
      {showGreeting && messages.length === 0 && (
        <div className={style.greetingContainer}>
          <img src={logo} alt="Logo" className={style.logo} />
          <h2>
            Solomon
          </h2>
          <h3>
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
            
            {isLoading && (
              <div className={`${style.message} ${style.botMessage} ${style.loadingMessage}`}>
                <div className={style.typingIndicator}>
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </div>
            )}
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
          disabled={isLoading}
        />
        {inputMessage.trim() !== '' && !isLoading && (
          <button
            className={style.sendButton}
            id="sendButton"
            onClick={handleSendMessage}
          >
            &#10148;
          </button>
        )}
      </div>
      
      <div className={style.buttonContainer}>
        <button 
          onClick={handleUploadFiles}
        >
          Upload Files
        </button>
        <button 
          onClick={handlePromptSettings}
        >
          Prompt Settings
        </button>
        <button 
          
        >
          Voice Mode
        </button>
      </div>
    </div>
  );
}

export default Chat;