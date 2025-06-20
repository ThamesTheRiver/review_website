import React, { useState } from 'react';
import axios from 'axios';
import AdminDashboard from './AdminDashboard';

function App() {
  const [review, setReview] = useState('');
  const [status, setStatus] = useState('');
  const [result, setResult] = useState(null);
  const [view, setView] = useState('submit'); // 'submit' or 'admin'

  const handleSubmit = async () => {
    if (!review.trim()) {
      setStatus("Review can't be empty");
      return;
    }

    setStatus("Submitting...");
    try {
      const response = await axios.post('http://localhost:5000/api/reviews', {
        text: review,
      });
      setResult(response.data);
      setStatus("Review submitted successfully!");
      setReview('');
    } catch (err) {
      console.error(err);
      setStatus("Submission failed.");
    }
  };

  if (view === 'admin') {
    return (
      <div style={{ padding: '1rem' }}>
        <button onClick={() => setView('submit')}>← Back to Review Form</button>
        <AdminDashboard />
      </div>
    );
  }

  return (
    <div style={{ padding: '2rem' }}>
      <h2>Submit a Review</h2>
      <textarea
        rows="4"
        cols="50"
        placeholder="Write your review here..."
        value={review}
        onChange={(e) => setReview(e.target.value)}
      />
      <br />
      <button onClick={handleSubmit}>Submit</button>
      <button onClick={() => setView('admin')} style={{ marginLeft: '1rem' }}>
        View Admin Dashboard
      </button>
      <p>{status}</p>

      {result && (
        <div style={{ marginTop: '1rem' }}>
          <h3>AI Analysis Result:</h3>
          <p><strong>Sentiment:</strong> {result.sentiment}</p>
          <p><strong>Keywords:</strong> {result.keywords.join(', ')}</p>
        </div>
      )}
    </div>
  );
}

export default App;
