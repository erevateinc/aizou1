import { useState } from 'react';

export default function Home() {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);

  const sendMessage = async () => {
    if (!input.trim()) return;
    const res = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: input })
    });
    const data = await res.json();
    setMessages([...messages, { user: input, bot: data.response }]);
    setInput('');
  };

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      minHeight: '100vh',
      backgroundColor: '#343541',
      color: 'white',
      fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif',
      padding: '20px'
    }}>
      <img src="/logo.png" alt="Logo" style={{ width: '80px', marginBottom: '20px' }} />
      <h1 style={{ marginBottom: '20px', fontSize: '24px' }}>Supec Assistant</h1>

      <div style={{
        width: '100%',
        maxWidth: '600px',
        backgroundColor: '#444654',
        borderRadius: '8px',
        padding: '20px',
        boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
        marginBottom: '20px',
        flexGrow: 1
      }}>
        <div style={{ maxHeight: '300px', overflowY: 'auto', marginBottom: '15px' }}>
          {messages.map((msg, i) => (
            <div key={i} style={{ marginBottom: '10px' }}>
              <p><strong>You:</strong> {msg.user}</p>
              <p><strong>Supec:</strong> {msg.bot}</p>
            </div>
          ))}
        </div>

        <div style={{ display: 'flex' }}>
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="メッセージを入力..."
            style={{
              flexGrow: 1,
              padding: '10px',
              borderRadius: '4px',
              border: 'none',
              marginRight: '10px',
              backgroundColor: '#555',
              color: 'white'
            }}
          />
          <button
            onClick={sendMessage}
            style={{
              padding: '10px 16px',
              borderRadius: '4px',
              backgroundColor: '#19c37d',
              border: 'none',
              color: 'white',
              fontWeight: 'bold'
            }}
          >
            送信
          </button>
        </div>
      </div>
    </div>
  );
}