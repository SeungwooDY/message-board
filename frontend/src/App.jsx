import { useState, useEffect } from 'react'
import './App.css'

export default function App() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchMessages = async () => {
    try {
      const response = await fetch('http://localhost:5000/messages');
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      const data = await response.json();
      setMessages(data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchMessages();
  }, []);

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error: {error}</p>

  return (
    <>
      <div>
        <input type="text" placeholder='Your name'/>
        <input type="text" placeholder='Message'/>
        <button>Submit</button>
      </div>
        <br />
      <div>
        <ul>
          {messages.map(msg => (
            <li key={msg.id}>
              <strong>{msg.name}:</strong> {msg.message}
            </li>
          ))}
        </ul>
      </div>
    </>
  )
}