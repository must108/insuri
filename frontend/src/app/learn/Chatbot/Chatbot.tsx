"use client";
import React, { useState } from 'react';
import axios from 'axios'
import './Chatbot.css'

type Message= {
    text: string;
    user: 'me' | 'bot';
}

const Chatbot = () => {
    const[messages, setMessages] = useState<Message[]>([]);
    const[input, setInput] = useState('');
    const [isOpen, setIsOpen] = useState(false);

    const handleSend = async () => {
        if (input.trim()){
            const newMessages: Message[] = [...messages, {text: input, user: 'me'}]
            setMessages(newMessages);
            setInput('');

            try {
                const response = await axios.post('http://0.0.0.0:5001/chat',{text:input});
                const botMessage = response.data.response;
                setMessages([...newMessages, {text: botMessage, user: 'bot'}]);
            }catch (error){
                console.error('Error sending message', error);
                setMessages([...newMessages, {text: 'Error: Could not send message', user: 'bot'}]);
            }
        }
    };
    return (
        <div className={`chatbot-container ${isOpen ? 'open' : 'closed'}`}>
            <div className = "chatbot-toggle" onClick={() => setIsOpen(!isOpen)}>
                Chat
                </div>
                {isOpen && (
                    <div className="chatbot">
                        <div className="chatbot-header">
                            <span>Chatbot</span>
                            <button className="chatbot-close" onClick={() => setIsOpen(false)}>✖</button>
                        </div>
                        <div className="chatbot-messages">
                            {messages.map((msg, index) => (
                            <div key={index} className={'chatbot-message ${msg.user}'}>
                                <div className="chatbot-avatar">{msg.user == 'me' ? '👤' : '🤖'}</div>
                                <div className="chatbot-text">{msg.text}</div>
                            </div>
                        ))}
                    </div>
                    <div className='chatbot-input'>
                        <input
                        type="text"
                        value={input}               
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Type a message..."
                    />
                    <button onClick={handleSend}>Send</button>
                </div>
            </div>
            )}
        </div>
    );
};

export default Chatbot;