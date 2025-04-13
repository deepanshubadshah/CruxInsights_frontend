// src/App.js
import React, { useState } from 'react';
import { Container, Typography, Box } from '@mui/material';
import api from './api'; // Our Axios instance from api.js
import UrlInput from './components/UrlInput';
import ResultsTable from './components/ResultsTable';
import StatsInsights from './components/StatsInsights';

function App() {
  const [results, setResults] = useState([]);
  const [statistics, setStatistics] = useState(null);
  const [insights, setInsights] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Callback to handle search that receives an object with URL list and extra parameters.
  const searchCruxData = async ({ urlList, sortBy, sortOrder, filterThreshold }) => {
    setError('');
    setLoading(true);
    setResults([]);
    setStatistics(null);
    setInsights([]);

    // Determine API endpoint and payload based on the number of URLs.
    let endpoint, payload;
    if (urlList.length === 1) {
      endpoint = '/api/crux-data/';
      payload = { url: urlList[0] };
    } else {
      endpoint = '/api/multi-url-crux-data/';
      // Include filtering/sorting options only for multi-url requests.
      payload = {
        urls: urlList,
        sort_by: sortBy,
        sort_order: sortOrder,
        // Only include filter_threshold if provided (non-empty).
        ...(filterThreshold !== undefined && { filter_threshold: filterThreshold }),
      };
    }

    try {
      const response = await api.post(endpoint, payload);
      if (urlList.length === 1) {
        // Wrap single record in an array for table consistency.
        setResults([response.data]);
        setStatistics(null);
        setInsights(response.data.insights ? [response.data.insights] : []);
      } else {
        setResults(response.data.url_data);
        setStatistics(response.data.statistics);
        setInsights(response.data.insights);
      }
    } catch (err) {
      console.error('API call error:', err);
      const errMsg =
        err.response && err.response.data && err.response.data.error
          ? err.response.data.error
          : 'An unexpected error occurred. Please try again later.';
      setError(errMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="md" style={{ marginTop: 20 }}>
      <Typography variant="h4" gutterBottom>
        CrUX Data Explorer
      </Typography>
      <UrlInput onSearch={searchCruxData} loading={loading} />
      
      {error && (
        <Box marginTop={2}>
          <Typography color="error">{error}</Typography>
        </Box>
      )}

      <ResultsTable results={results} />
      <StatsInsights statistics={statistics} insights={insights} />
    </Container>
  );
}

export default App;