import { useState, useEffect } from 'react'
import './App.css'

export default function App() {
  const [messages, setMessages] = useState([]);
  const [uploadName, setUploadName] = useState("");
  const [uploadMessage, setUploadMessage] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editingMessage, setEditingMessage] = useState("");

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

  const handleSubmit = async() => {
    if (uploadName === "") { 
      console.log("Must enter a name"); 
      return;
    }
    if (uploadMessage === "") { 
      console.log("Must enter a message"); 
      return;
    }
    
    try {
      const response = await fetch('http://localhost:5000/messages/upload', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }, 
        body: JSON.stringify({ name: uploadName, message: uploadMessage })
      });
      if (!response.ok) throw new Error(`HTTP ${response.status}`);

      setUploadMessage("");
      setUploadName("");
      fetchMessages();
    } catch (error) {
      console.error(error);
    }
  }

  const handleDelete = async (id) => {
    try {
      const message = await fetch('http://localhost:5000/messages/delete', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify({ id })
      });
      if (!message.ok) throw new Error(`HTTP ${message.status}`);
    } catch (error) {
      console.error(error);
    }
    fetchMessages();
  }

  const handleEdit = async (id) => {
    try {
      const edit = await fetch('http://localhost:5000/messages/edit', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json'}, 
        body: JSON.stringify({ id, edits: {message: editingMessage } })
      });
      if (!edit.ok) throw new Error(`HTTP ${edit.status}`);
    } catch (error) {
      console.error(error);
    }
    setEditingId(null);
    setEditingMessage("");
    fetchMessages();
  }

  useEffect(() => {
    fetchMessages();
  }, []);

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error: {error}</p>

  return (
    <>
      <div>
        <input 
          type="text" 
          placeholder='Your name'
          value={uploadName}
          onChange={(e) => 
            setUploadName(e.target.value)
          }
        />
        <input 
          type="text" 
          placeholder='Message'
          value={uploadMessage}
          onChange={(e) => 
            setUploadMessage(e.target.value)
          }
        />
        <button onClick={handleSubmit}>Submit</button>
      </div>
        <br />
      <div>
        <ul>
          {messages.map(msg => (
            <li key={msg.id}>
              <strong>{msg.name}:</strong>
              {editingId === msg.id ? (
                <>
                  <input value={editingMessage} onChange={(e) => setEditingMessage(e.target.value)} />
                  <button onClick={() => handleEdit(msg.id)}>Save</button>
                  <button onClick={() => setEditingId(null)}>Cancel</button>
                </>
              ) : (
                <>
                  {msg.message}
                  <button onClick={() => { setEditingId(msg.id); setEditingMessage(msg.message); }}>Edit</button>
                  <button onClick={() => handleDelete(msg.id)}>Delete</button>
                </>
              )}
            </li>
          ))}
        </ul>
      </div>
    </>
  )
}