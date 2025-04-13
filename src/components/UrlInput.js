import React, { useState } from 'react';
import {
  Box, TextField, Button, Typography,
  MenuItem, Select, InputLabel, FormControl
} from '@mui/material';

const metricOptions = [
  { label: 'FCP (p75)', value: 'first_contentful_paint_p75' },
  { label: 'LCP (p75)', value: 'largest_contentful_paint_p75' },
  { label: 'CLS (p75)', value: 'cumulative_layout_shift_p75' },
  { label: 'INP (p75)', value: 'interaction_to_next_paint_p75' },
  { label: 'TTFB (p75)', value: 'experimental_time_to_first_byte_p75' }
];

const thresholdOptions = [
  { label: 'No Threshold', value: '' },
  { label: '1', value: 1 },
  { label: '2.5', value: 2.5 },
  { label: '4', value: 4 },
  { label: '100', value: 100 }
];

const UrlInput = ({ onSearch }) => {
  const [urls, setUrls] = useState('');
  const [sortBy, setSortBy] = useState('');
  const [sortOrder, setSortOrder] = useState('asc');
  const [threshold, setThreshold] = useState('');

  const handleSubmit = () => {
    const urlList = (urls || '')
      .split('\n')
      .map(url => url.trim())
      .filter(Boolean);

    if (!urlList || urlList.length === 0) {
      return;
    }

    // Match the structure expected in App.js
    const payload = {
      urlList,
      sortBy: sortBy || undefined,
      sortOrder: sortOrder || undefined,
      filterThreshold: threshold || undefined
    };

    onSearch(payload);
  };

  return (
    <Box sx={{ maxWidth: 800, mx: 'auto', mt: 4, p: 3, border: '1px solid #ccc', borderRadius: 2 }}>
      <Typography variant="h5" gutterBottom>CrUX Performance Checker</Typography>

      <TextField
        label="Enter one or more URLs (one per line)"
        placeholder="https://example.com"
        multiline
        minRows={3}
        value={urls}
        onChange={(e) => setUrls(e.target.value)}
        fullWidth
        margin="normal"
      />

      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: 2,
          mt: 2
        }}
      >
        <FormControl sx={{ minWidth: 180 }} size="small">
          <InputLabel>Sort By</InputLabel>
          <Select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            label="Sort By"
          >
            {metricOptions.map(opt => (
              <MenuItem key={opt.value} value={opt.value}>{opt.label}</MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl sx={{ minWidth: 150 }} size="small">
          <InputLabel>Sort Order</InputLabel>
          <Select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
            label="Sort Order"
          >
            <MenuItem value="asc">Ascending</MenuItem>
            <MenuItem value="desc">Descending</MenuItem>
          </Select>
        </FormControl>

        <FormControl sx={{ minWidth: 150 }} size="small">
          <InputLabel>Threshold</InputLabel>
          <Select
            value={threshold}
            onChange={(e) => setThreshold(e.target.value)}
            label="Threshold"
          >
            {thresholdOptions.map(opt => (
              <MenuItem key={opt.label} value={opt.value}>{opt.label}</MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>

      <Box mt={3}>
        <Button variant="contained" color="primary" onClick={handleSubmit} fullWidth>
          Search
        </Button>
      </Box>
    </Box>
  );
};

export default UrlInput;