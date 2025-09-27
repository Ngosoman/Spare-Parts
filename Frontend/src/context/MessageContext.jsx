import React, { createContext, useContext, useState, useCallback } from 'react';

const MessageContext = createContext();

export const useMessage = () => {
  const context = useContext(MessageContext);
  if (!context) {
    throw new Error('useMessage must be used within a MessageProvider');
  }
  return context;
};

export const MessageProvider = ({ children }) => {
  const [messages, setMessages] = useState([]);

  const removeMessage = useCallback((id) => {
    setMessages((prev) => prev.filter((msg) => msg.id !== id));
  }, []);

  const setMessage = useCallback(({ type, text }) => {
    const id = Date.now();
    setMessages((prev) => [...prev, { id, type, text }]);
    // Auto-remove after 3 seconds
    setTimeout(() => {
      removeMessage(id);
    }, 3000);
  }, [removeMessage]);

  return (
    <MessageContext.Provider value={{ messages, setMessage, removeMessage }}>
      {children}
    </MessageContext.Provider>
  );
};
export default MessageContext;