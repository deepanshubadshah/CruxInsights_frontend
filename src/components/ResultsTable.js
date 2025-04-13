// src/components/ResultsTable.js
import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Box
} from '@mui/material';

const ResultsTable = ({ results }) => {
  if (!results || results.length === 0) return null;

  return (
    <Box marginTop={4}>
      <Typography variant="h6" gutterBottom>
        Results
      </Typography>
      <TableContainer component={Paper}>
        <Table aria-label="crux results table">
          <TableHead>
            <TableRow>
              <TableCell>URL</TableCell>
              <TableCell>Metrics</TableCell>
              <TableCell>Histograms</TableCell>
              <TableCell>Percentiles</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {results.map((data, idx) => (
              <TableRow key={idx}>
                <TableCell>{data.url}</TableCell>
                <TableCell>
                  {data.metrics &&
                    Object.keys(data.metrics).map((metric) => (
                      <div key={metric}>
                        <strong>{metric}</strong>
                      </div>
                    ))}
                </TableCell>
                <TableCell>
                  {data.metrics &&
                    Object.keys(data.metrics).map((metric) => (
                      <div key={metric}>
                        {JSON.stringify(data.metrics[metric].histogram)}
                      </div>
                    ))}
                </TableCell>
                <TableCell>
                  {data.metrics &&
                    Object.keys(data.metrics).map((metric) => (
                      <div key={metric}>
                        {JSON.stringify(data.metrics[metric].percentiles)}
                      </div>
                    ))}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default ResultsTable;