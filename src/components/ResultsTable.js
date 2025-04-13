import React from 'react';
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Paper,
  Box,
  Grid,
  Chip,
  Tooltip,
  Divider,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

// Helper to format metric keys
const formatKey = (key) =>
  key.replace(/_/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase());

// Render histogram data as color-coded chips with tooltips
const renderHistogram = (histogram) => (
  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
    {histogram.map((bucket, idx) => (
      <Tooltip
        key={idx}
        title={`Range: ${bucket.start} - ${bucket.end || '∞'}`}
        placement="top"
      >
        <Chip
          label={`${Math.round(bucket.density * 100)}%`}
          size="small"
          color={
            bucket.start < 1
              ? 'success'
              : bucket.start < 2.5
              ? 'warning'
              : 'error'
          }
        />
      </Tooltip>
    ))}
  </Box>
);

// Render percentiles as text
const renderPercentiles = (percentiles) =>
  Object.entries(percentiles).map(([key, value]) => (
    <Typography key={key} variant="body2">
      <strong>{key.toUpperCase()}:</strong> {value}
    </Typography>
  ));

const ResultsTable = ({ results }) => {
  if (!results || results.length === 0) return null;

  return (
    <Box mt={4}>
      <Typography variant="h6" gutterBottom>
        Results Summary
      </Typography>
      {results.map((data, idx) => (
        <Accordion key={idx} defaultExpanded>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls={`panel-${idx}-content`}
            id={`panel-${idx}-header`}
          >
            <Typography variant="subtitle1" fontWeight="bold">
              {data.url}
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            {data.metrics ? (
              Object.entries(data.metrics).map(([metric, metricData], mIdx) => (
                <Paper
                  key={mIdx}
                  sx={{
                    p: 2,
                    mb: 2,
                    backgroundColor: '#f9f9f9',
                    borderRadius: 1,
                  }}
                  elevation={1}
                >
                  <Typography variant="subtitle2" gutterBottom>
                    {formatKey(metric)}
                  </Typography>
                  <Divider sx={{ mb: 1 }} />
                  <Grid container spacing={2}>
                    <Grid item xs={12} md={6}>
                      <Typography variant="body2" fontWeight="bold" gutterBottom>
                        Histogram
                      </Typography>
                      {metricData.histogram && renderHistogram(metricData.histogram)}
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <Typography variant="body2" fontWeight="bold" gutterBottom>
                        Percentiles
                      </Typography>
                      {metricData.percentiles && renderPercentiles(metricData.percentiles)}
                    </Grid>
                  </Grid>
                </Paper>
              ))
            ) : (
              <Typography variant="body2">No metrics available.</Typography>
            )}
          </AccordionDetails>
        </Accordion>
      ))}
    </Box>
  );
};

export default ResultsTable;