import React, { useEffect, useState } from 'react';
import axios from 'axios';

function AdminDashboard() {
  const [reviews, setReviews] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [filter, setFilter] = useState('All');

  useEffect(() => {
    axios.get('http://localhost:5000/api/reviews')
      .then((res) => {
        setReviews(res.data);
        setFiltered(res.data);
      })
      .catch((err) => console.error("Error fetching reviews:", err));
  }, []);

  const applyFilter = (sentiment) => {
    setFilter(sentiment);
    if (sentiment === 'All') {
      setFiltered(reviews);
    } else {
      const filteredData = reviews.filter(r => r.sentiment === sentiment);
      setFiltered(filteredData);
    }
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h2>Admin Dashboard</h2>

      <div style={{ marginBottom: '1rem' }}>
        <label><strong>Filter by Sentiment: </strong></label>
        {['All', 'Positive', 'Negative', 'Neutral'].map((label) => (
          <button
            key={label}
            onClick={() => applyFilter(label)}
            style={{
              margin: '0 5px',
              padding: '5px 10px',
              background: filter === label ? '#007bff' : '#eee',
              color: filter === label ? 'white' : 'black',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            {label}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <p>No reviews found.</p>
      ) : (
        <table border="1" cellPadding="8" style={{ borderCollapse: 'collapse', marginTop: '1rem' }}>
          <thead>
            <tr>
              <th>Sentiment</th>
              <th>Keywords</th>
              <th>Review</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((r) => (
              <tr key={r.id}>
                <td>{r.sentiment}</td>
                <td>{r.keywords}</td>
                <td>{r.text}</td>
                <td>{new Date(r.created_at).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default AdminDashboard;
