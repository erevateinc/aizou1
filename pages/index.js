import { useState } from 'react';

export default function Home() {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);

  const sendMessage = async () => {
    const res = await fetch('/api/chat', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({ message: input })
    });
    const data = await res.json();
    setMessages([...messages, { user: input, bot: data.response }]);
    setInput('');
  };

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto', fontFamily: 'Arial, sans-serif' }}>
      <h1>Supec Assistant</h1>
      <div>
        {messages.map((msg, i) => (
          <div key={i} style={{ marginBottom: '10px' }}>
            <p><strong>You:</strong> {msg.user}</p>
            <p><strong>Bot:</strong> {msg.bot}</p>
          </div>
        ))}
      </div>
      <input 
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="質問を入力..."
        style={{ width: '80%', padding: '8px' }}
      />
      <button onClick={sendMessage} style={{ padding: '8px 16px' }}>送信</button>
    </div>
  );
}