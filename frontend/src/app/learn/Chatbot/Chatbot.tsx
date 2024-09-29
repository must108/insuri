"use client";
import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import 'daisyui';
import { ChatBubbleLeftRightIcon  } from '@heroicons/react/24/outline';

type Message = {
    text: string;
    user: 'me' | 'bot';
};

const Chatbot = () => {
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState('');
    const [isOpen, setIsOpen] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const handleSend = async () => {
        if (input.trim()) {
            const newMessages: Message[] = [...messages, { text: input, user: 'me' }];
            setMessages(newMessages);
            setInput('');
            try {
                const res = await axios.post('https://insurify-backend-production.up.railway.app/chat', { text: input });
                const botMessage = res.data.response;
                setMessages([...newMessages, { text: botMessage, user: 'bot' }]);
            } catch (error) {
                console.error('Error sending message', error);
                setMessages([...newMessages, { text: 'Error: Could not send message', user: 'bot' }]);
            }
        }
    };

    useEffect(() => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [messages]);

    return (
        <div className={`fixed bottom-4 right-4 z-50 ${isOpen ? 'open' : 'closed'}`}>
            <button className="btn btn-circle btn-primary btn-lg" onClick={() => setIsOpen(!isOpen)}>
                <ChatBubbleLeftRightIcon  className="h-12 w-100 text-white" />
            </button>
            {isOpen && (
                <div className="card w-[28rem] bg-base-100 shadow-xl">
                    <div className="card-body">
                        <div className="card-title flex justify-between">
                            <span>AI Agent</span>
                            <button className="btn btn-sm btn-circle btn-ghost" onClick={() => setIsOpen(false)}>✖</button>
                        </div>
                        <div className="overflow-y-auto h-64">
                            {messages.map((msg, index) => (
                                <div key={index} className={`chat ${msg.user === 'me' ? 'chat-end' : 'chat-start'}`}>
                                    <div className="chat-image avatar">
                                        <div className="w-10 rounded-full">
                                            {msg.user === 'me' ? '👤' : '🤖'}
                                        </div>
                                    </div>
                                    <div className="chat-bubble">{msg.text}</div>
                                </div>
                            ))}
                        <div ref={messagesEndRef} />
                        </div>
                        <div className="flex mt-4">
                            <input
                                type="text"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                placeholder="Type a message..."
                                className="input input-bordered w-full"
                            />
                            <button onClick={handleSend} className="btn btn-primary ml-2">Send</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Chatbot;
