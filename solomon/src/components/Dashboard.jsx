import React, { useState } from 'react';
import styles from '../dashboard.module.css';

function Dashboard() {
  const [similarCases, setSimilarCases] = useState([]);
  const [relevantNews, setRelevantNews] = useState([]);
  const [isLoadingCases, setIsLoadingCases] = useState(false);
  const [isLoadingNews, setIsLoadingNews] = useState(false);
  
  // Real API calls to external webhooks
  const fetchFromAPI = async (endpoint) => {
    try {
      const response = await fetch(endpoint, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      if (!response.ok) {
        throw new Error(`API responded with status: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error(`Error fetching from ${endpoint}:`, error);
      throw error;
    }
  };

  // API URLs for the webhooks
  const API_ENDPOINTS = {
    similarCases: 'https://n8n-5qbd6-u37268.vm.elestio.app/webhook/similarcases',
    relevantNews: 'https://n8n-5qbd6-u37268.vm.elestio.app/webhook/relevantnews'
  };

  // Fetch similar cases when the Generate button is clicked
  const handleGenerateCases = async () => {
    try {
      setIsLoadingCases(true);
      const casesResponse = await fetchFromAPI(API_ENDPOINTS.similarCases);
      
      // Extract the output array from the response
      const casesData = casesResponse && casesResponse.output ? casesResponse.output : [];
      setSimilarCases(casesData);
    } catch (error) {
      console.error('Error fetching similar cases:', error);
      // Handle error state - could set an error message state variable here
      setSimilarCases([]);
      throw error; // Re-throw for the error handler
    } finally {
      setIsLoadingCases(false);
    }
  };

  // Fetch relevant news when the Generate button is clicked
  const handleGenerateNews = async () => {
    try {
      setIsLoadingNews(true);
      const newsResponse = await fetchFromAPI(API_ENDPOINTS.relevantNews);
      
      // Extract the output array from the response
      const newsData = newsResponse && newsResponse.output ? newsResponse.output : [];
      setRelevantNews(newsData);
    } catch (error) {
      console.error('Error fetching relevant news:', error);
      // Handle error state - could set an error message state variable here
      setRelevantNews([]);
      throw error; // Re-throw for the error handler
    } finally {
      setIsLoadingNews(false);
    }
  };

  // State for error messages
  const [casesError, setCasesError] = useState(null);
  const [newsError, setNewsError] = useState(null);

  // Updated handler functions to handle errors
  const handleGenerateCasesWithErrorHandling = async () => {
    setCasesError(null); // Clear previous errors
    try {
      await handleGenerateCases();
    } catch (error) {
      setCasesError("Failed to fetch similar cases. Please try again later.");
    }
  };

  const handleGenerateNewsWithErrorHandling = async () => {
    setNewsError(null); // Clear previous errors
    try {
      await handleGenerateNews();
    } catch (error) {
      setNewsError("Failed to fetch relevant news. Please try again later.");
    }
  };

  return (
    <div className={styles.dashboardView}>
      <div className={styles.dashboardContainer}>
        <div className={styles.dashboardSection}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Similar Cases</h2>
            <button 
              className={styles.generateButton} 
              onClick={handleGenerateCasesWithErrorHandling}
              disabled={isLoadingCases}
            >
              {isLoadingCases ? 'Generating...' : 'Generate'}
            </button>
          </div>
          {isLoadingCases ? (
            <p className={styles.loadingMessage}>Loading similar cases...</p>
          ) : casesError ? (
            <p className={styles.errorMessage}>{casesError}</p>
          ) : similarCases.length > 0 ? (
            <ul className={styles.itemList}>
              {similarCases.map((caseItem) => (
                <li key={caseItem.id} className={styles.listItem}>
                  <a 
                    href={caseItem.url || `/cases/${caseItem.id}`} 
                    className={styles.itemLink}
                    target="_blank" 
                    rel="noopener noreferrer"
                  >
                    <h3 className={styles.itemTitle}>{caseItem.title}</h3>
                    <p className={styles.itemContent}>{caseItem.summary}</p>
                  </a>
                </li>
              ))}
            </ul>
          ) : (
            <p className={styles.loadingMessage}>No similar cases generated yet</p>
          )}
        </div>
        <div className={styles.dashboardSection}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Relevant News</h2>
            <button 
              className={styles.generateButton} 
              onClick={handleGenerateNewsWithErrorHandling}
              disabled={isLoadingNews}
            >
              {isLoadingNews ? 'Generating...' : 'Generate'}
            </button>
          </div>
          {isLoadingNews ? (
            <p className={styles.loadingMessage}>Loading relevant news...</p>
          ) : newsError ? (
            <p className={styles.errorMessage}>{newsError}</p>
          ) : relevantNews.length > 0 ? (
            <ul className={styles.itemList}>
              {relevantNews.map((newsItem) => (
                <li key={newsItem.id} className={styles.listItem}>
                  <a 
                    href={newsItem.url || `/news/${newsItem.id}`} 
                    className={styles.itemLink}
                    target="_blank" 
                    rel="noopener noreferrer"
                  >
                    <h3 className={styles.itemTitle}>{newsItem.title}</h3>
                    <p className={styles.itemContent}>{newsItem.summary}</p>
                  </a>
                </li>
              ))}
            </ul>
          ) : (
            <p className={styles.loadingMessage}>No relevant news generated yet</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;