import React, { useState, useEffect } from 'react';

function Dashboard() {
  const [similarCases, setSimilarCases] = useState([]);
  const [relevantNews, setRelevantNews] = useState([]);

  useEffect(() => {
    // Simulate fetching similar cases and relevant news from an AI API.
    // Replace this with your actual API calls.
    const fetchAIResults = async () => {
      try {
        // Simulate API call for similar cases
        const casesResponse = await simulateAIAPI('similarCases');
        setSimilarCases(casesResponse);

        // Simulate API call for relevant news
        const newsResponse = await simulateAIAPI('relevantNews');
        setRelevantNews(newsResponse);
      } catch (error) {
        console.error('Error fetching AI results:', error);
        // Handle error (e.g., display an error message)
      }
    };

    fetchAIResults();
  }, []);

  // Simulate an AI API call (replace with your actual API integration)
  const simulateAIAPI = async (type) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        if (type === 'similarCases') {
          resolve([
            { id: 1, title: 'Case A', summary: 'Summary of Case A...' },
            { id: 2, title: 'Case B', summary: 'Summary of Case B...' },
            { id: 3, title: 'Case C', summary: 'Summary of Case C...' },
          ]);
        } else if (type === 'relevantNews') {
          resolve([
            { id: 1, title: 'News 1', description: 'Description of News 1...' },
            { id: 2, title: 'News 2', description: 'Description of News 2...' },
            { id: 3, title: 'News 3', description: 'Description of News 3...' },
          ]);
        }
      }, 500); // Simulate network latency
    });
  };

  return (
    <div className="dashboard-view">
      <div style={{ display: 'flex' }}>
        <div style={{ flex: 1, padding: '10px', borderRight: '1px solid #ccc' }}>
          <h2>Similar Cases</h2>
          {similarCases.length > 0 ? (
            <ul>
              {similarCases.map((caseItem) => (
                <li key={caseItem.id}>
                  <h3>{caseItem.title}</h3>
                  <p>{caseItem.summary}</p>
                </li>
              ))}
            </ul>
          ) : (
            <p>Loading similar cases...</p>
          )}
        </div>
        <div style={{ flex: 1, padding: '10px' }}>
          <h2>Relevant News</h2>
          {relevantNews.length > 0 ? (
            <ul>
              {relevantNews.map((newsItem) => (
                <li key={newsItem.id}>
                  <h3>{newsItem.title}</h3>
                  <p>{newsItem.description}</p>
                </li>
              ))}
            </ul>
          ) : (
            <p>Loading relevant news...</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;