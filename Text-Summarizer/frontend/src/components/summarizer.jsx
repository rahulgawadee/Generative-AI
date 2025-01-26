import React, { useState, useCallback } from 'react';
import axios from 'axios';
import { Send, Loader2, FileText, AlertTriangle } from 'lucide-react';

const Summarizer = () => {
  const [text, setText] = useState('');
  const [summary, setSummary] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Memoized summarization handler to prevent unnecessary re-renders
  const handleSummarize = useCallback(async () => {
    // Trim and validate input
    const trimmedText = text.trim();
    if (!trimmedText) {
      setError('Please enter text to summarize.');
      return;
    }

    // Reset previous state
    setIsLoading(true);
    setError('');
    setSummary('');

    try {
      // Configure axios request with timeout and error handling
      const response = await axios.post('http://localhost:5000/summarize', 
        { text: trimmedText },
        { 
          timeout: 10000, // 10-second timeout
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );

      // Validate response
      if (!response.data.summary) {
        throw new Error('No summary generated');
      }

      setSummary(response.data.summary);
    } catch (error) {
      // Detailed error handling
      const errorMessage = error.response 
        ? error.response.data.message || 'Summarization failed'
        : error.message || 'Network error occurred';
      
      setError(errorMessage);
      console.error('Summarization Error:', error);
    } finally {
      setIsLoading(false);
    }
  }, [text]);

  // Handle textarea input with character limit
  const handleTextChange = (e) => {
    const inputText = e.target.value;
    const MAX_LENGTH = 5000; // Prevents extremely long inputs

    if (inputText.length <= MAX_LENGTH) {
      setText(inputText);
    }
  };

  return (
    <div className="container mx-auto max-w-2xl px-4 py-8">
      <div className="bg-white shadow-md rounded-xl p-6">
        <h2 className="text-2xl font-bold mb-4 flex items-center">
          <FileText className="mr-2 text-blue-500" />
          Text Summarizer
        </h2>

        <textarea
          value={text}
          onChange={handleTextChange}
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
          rows="6"
          placeholder="Enter text to summarize (max 5000 characters)..."
        />

        <div className="flex items-center justify-between mt-4">
          <p className="text-sm text-gray-500">
            {text.length}/5000 characters
          </p>

          <button 
            onClick={handleSummarize}
            disabled={!text.trim() || isLoading}
            className="flex items-center justify-center px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <Loader2 className="mr-2 animate-spin" size={20} />
            ) : (
              <Send className="mr-2" size={20} />
            )}
            Summarize
          </button>
        </div>

        {error && (
          <div className="mt-4 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg flex items-center">
            <AlertTriangle className="mr-2 text-red-500" size={20} />
            {error}
          </div>
        )}

        {summary && (
          <div className="mt-4 bg-blue-50 border border-blue-200 p-4 rounded-lg">
            <h3 className="text-lg font-semibold mb-2 text-blue-800">Summary:</h3>
            <p className="text-gray-700">{summary}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Summarizer;