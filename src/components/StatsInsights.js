import React from 'react';
import {
  Typography,
  Paper,
  Box,
  Grid,
  Divider,
  Card,
  CardContent,
} from '@mui/material';
import InsightsIcon from '@mui/icons-material/Insights';
import LeaderboardIcon from '@mui/icons-material/Leaderboard';

const formatKey = (key) => {
  return key
    .replace(/_/g, ' ')
    .replace(/\b\w/g, (l) => l.toUpperCase());
};

const renderValue = (value) => {
  if (typeof value === 'object' && value !== null) {
    return (
      <Box sx={{ pl: 1 }}>
        {Object.entries(value).map(([subKey, subVal]) => (
          <Typography key={subKey} variant="body2">
            <strong>{formatKey(subKey)}:</strong> {subVal}
          </Typography>
        ))}
      </Box>
    );
  }
  return <Typography variant="body1">{value}</Typography>;
};

const StatsInsights = ({ statistics, insights }) => {
  return (
    <>
      {statistics && (
        <Box mt={4}>
          <Typography variant="h6" gutterBottom display="flex" alignItems="center">
            <LeaderboardIcon sx={{ mr: 1 }} />
            Aggregated Statistics
          </Typography>
          <Paper elevation={3} sx={{ p: 2 }}>
            <Grid container spacing={2}>
              {Object.entries(statistics).map(([key, value]) => (
                <Grid item xs={12} sm={6} md={4} key={key}>
                  <Box sx={{ p: 1, borderRadius: 2, backgroundColor: '#f5f5f5' }}>
                    <Typography variant="subtitle2" color="textSecondary">
                      {formatKey(key)}
                    </Typography>
                    {renderValue(value)}
                  </Box>
                </Grid>
              ))}
            </Grid>
          </Paper>
        </Box>
      )}

      {insights && insights.length > 0 && (
        <Box mt={4}>
          <Typography variant="h6" gutterBottom display="flex" alignItems="center">
            <InsightsIcon sx={{ mr: 1 }} />
            Insights & Recommendations
          </Typography>
          <Grid container spacing={2}>
            {insights.map((insight, index) => (
              <Grid item xs={12} md={6} key={index}>
                <Card variant="outlined">
                  <CardContent>
                    <Typography variant="subtitle1" fontWeight="bold">
                      Insight #{index + 1}
                    </Typography>
                    <Divider sx={{ my: 1 }} />
                    <Typography variant="body2" sx={{ whiteSpace: 'pre-line' }}>
                      {typeof insight === 'string'
                        ? insight
                        : JSON.stringify(insight, null, 2)}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      )}
    </>
  );
};

export default StatsInsights;