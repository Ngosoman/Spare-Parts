import React from 'react';
import { useMessage } from '../context/MessageContext';

const Toast = () => {
  const { messages, removeMessage } = useMessage();

  return (
    <div className="fixed top-4 right-4 z-50 space-y-2">
      {messages.map((msg) => (
        <div
          key={msg.id}
          className={`p-4 rounded-lg shadow-lg text-white flex justify-between items-center ${
            msg.type === 'success' ? 'bg-green-500' : 'bg-red-500'
          }`}
        >
          <span>{msg.text}</span>
          <button
            onClick={() => removeMessage(msg.id)}
            className="ml-4 text-white hover:text-gray-200"
          >
            ×
          </button>
        </div>
      ))}
    </div>
  );
};

export default Toast;
