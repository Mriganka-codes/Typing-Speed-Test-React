import React from 'react';
import './History.css';
import { Link } from 'react-router-dom';

function History() {
  const user = localStorage.getItem('user');
  const results = JSON.parse(localStorage.getItem(user)) || [];

  return (
    <div className="container">
      <h1>Typing Test History</h1>
      {results.length > 0 ? (
        <table className="table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Speed (WPM)</th>
            </tr>
          </thead>
          <tbody>
            {results.map((result, index) => (
              <tr key={index}>
                <td>{result.date}</td>
                <td>{result.Speed}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No typing test results found.</p>
      )}
      <br/>
      <div className="button-container">
        <Link to="/main" className="main-button">
          Go to Main Page
        </Link>
      </div>
    </div>
  );
}

export default History;
