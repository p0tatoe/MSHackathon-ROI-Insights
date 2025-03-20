import React, { useState, useEffect } from 'react';
import styles from '../dashboard.module.css';

function Dashboard() {
  const [similarCases, setSimilarCases] = useState([]);
  const [relevantNews, setRelevantNews] = useState([]);
  const [isLoadingCases, setIsLoadingCases] = useState(true);
  const [isLoadingNews, setIsLoadingNews] = useState(true);
  
  useEffect(() => {
    // Simulate fetching similar cases and relevant news from an AI API.
    const fetchAIResults = async () => {
      try {
        // Simulate API call for similar cases
        setIsLoadingCases(true);
        const casesResponse = await simulateAIAPI('similarCases');
        setSimilarCases(casesResponse);
        setIsLoadingCases(false);
        
        // Simulate API call for relevant news
        setIsLoadingNews(true);
        const newsResponse = await simulateAIAPI('relevantNews');
        setRelevantNews(newsResponse);
        setIsLoadingNews(false);
      } catch (error) {
        console.error('Error fetching AI results:', error);
        setIsLoadingCases(false);
        setIsLoadingNews(false);
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
    <div className={styles.dashboardView}>
      <div className={styles.dashboardContainer}>
        <div className={styles.dashboardSection}>
          <h2 className={styles.sectionTitle}>Similar Cases</h2>
          {isLoadingCases ? (
            <p className={styles.loadingMessage}>Loading similar cases...</p>
          ) : similarCases.length > 0 ? (
            <ul className={styles.itemList}>
              {similarCases.map((caseItem) => (
                <li key={caseItem.id} className={styles.listItem}>
                  <h3 className={styles.itemTitle}>{caseItem.title}</h3>
                  <p className={styles.itemContent}>{caseItem.summary}</p>
                </li>
              ))}
            </ul>
          ) : (
            <p className={styles.loadingMessage}>No similar cases found</p>
          )}
        </div>
        <div className={styles.dashboardSection}>
          <h2 className={styles.sectionTitle}>Relevant News</h2>
          {isLoadingNews ? (
            <p className={styles.loadingMessage}>Loading relevant news...</p>
          ) : relevantNews.length > 0 ? (
            <ul className={styles.itemList}>
              {relevantNews.map((newsItem) => (
                <li key={newsItem.id} className={styles.listItem}>
                  <h3 className={styles.itemTitle}>{newsItem.title}</h3>
                  <p className={styles.itemContent}>{newsItem.description}</p>
                </li>
              ))}
            </ul>
          ) : (
            <p className={styles.loadingMessage}>No relevant news found</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;