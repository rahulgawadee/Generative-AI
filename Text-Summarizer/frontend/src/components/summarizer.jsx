import { useState } from 'react';
import axios from 'axios';

function Summarizer() {
  const [text, setText] = useState('');
  const [summary, setSummary] = useState('');
  const [error, setError] = useState('');

  const handleSummarize = async () => {
    try {
      const response = await axios.post('http://localhost:5000/summarize', { text });
      setSummary(response.data.summary);
    } catch (error) {
      console.error('Error during summarization:', error.response ? error.response.data : error.message);
      setError('Error during summarization. Please try again.');
    }
  };

  return (
    <div>
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        rows="6"
        cols="60"
        placeholder="Enter text to summarize"
      />
      <button onClick={handleSummarize}>Summarize</button>

      {summary && (
        <div>
          <h3>Summary:</h3>
          <p>{summary}</p>
        </div>
      )}

      {error && <p>{error}</p>}
    </div>
  );
}

export default Summarizer;
