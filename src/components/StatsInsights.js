import React from 'react';
import {
  Typography,
  Paper,
  Box,
  Grid,
  Divider,
  Card,
  CardContent,
  Tooltip,
  List,
  ListItem,
  ListItemText,
} from '@mui/material';
import InsightsIcon from '@mui/icons-material/Insights';
import LeaderboardIcon from '@mui/icons-material/Leaderboard';
import RecommendIcon from '@mui/icons-material/Recommend';

// Helper to format keys (e.g., "largest_contentful_paint_p75" becomes "Largest Contentful Paint P75")
const formatKey = (key) =>
  key.replace(/_/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase());

// Helper to format a value for rendering in JSX
const formatValue = (value) => {
  if (Array.isArray(value)) {
    return value.join(', ');
  }
  if (typeof value === 'object' && value !== null) {
    // For nested objects, we'll assume they should be unwrapped (handled in renderInsightContent)
    return value;
  }
  return value;
};

// Helper to render insight content. If insight is an object with only a numeric key, unwrap it.
const renderInsightContent = (insight) => {
  if (typeof insight === 'object' && insight !== null) {
    const keys = Object.keys(insight);
    // If there is exactly one key and it is numeric, unwrap the inner object
    if (keys.length === 1 && !isNaN(keys[0])) {
      return renderInsightContent(insight[keys[0]]);
    }
    // Otherwise, render a bullet list of key-value pairs
    return (
      <List dense>
        {Object.entries(insight).map(([key, value]) => (
          <ListItem key={key} disableGutters>
            <ListItemText
              primary={`${formatKey(key)}: ${formatValue(value)}`}
              primaryTypographyProps={{ variant: 'body2' }}
            />
          </ListItem>
        ))}
      </List>
    );
  }
  // If it's not an object, just return the value as text.
  return (
    <Typography variant="body2" sx={{ whiteSpace: 'pre-line' }}>
      {insight}
    </Typography>
  );
};

// Reusable component for each statistic tile
const StatCard = ({ label, value }) => {
  return (
    <Card
      variant="outlined"
      sx={{
        bgcolor: 'background.default',
        borderColor: 'grey.300',
        height: '100%',
      }}
    >
      <CardContent>
        <Tooltip title={label}>
          <Typography variant="subtitle2" color="textSecondary" noWrap>
            {formatKey(label)}
          </Typography>
        </Tooltip>
        <Divider sx={{ my: 1 }} />
        {typeof value === 'object' && value !== null ? (
          Object.entries(value).map(([subKey, subVal]) => (
            <Box key={subKey} mb={0.5}>
              <Typography variant="body2">
                <strong>{formatKey(subKey)}:</strong> {formatValue(subVal)}
              </Typography>
            </Box>
          ))
        ) : (
          <Typography variant="body1">{formatValue(value)}</Typography>
        )}
      </CardContent>
    </Card>
  );
};

// Enhanced component for each insight tile with improved styling and unwrapping for single URLs
const InsightCard = ({ insight, index }) => (
  <Card
    variant="outlined"
    sx={{
      borderColor: 'primary.main',
      bgcolor: '#e3f2fd', // light blue background for recommendations
      boxShadow: 3,
      borderRadius: 2,
      height: '100%',
    }}
  >
    <CardContent>
      <Box display="flex" alignItems="center" mb={1}>
        <RecommendIcon sx={{ color: 'primary.main', mr: 1 }} />
        <Typography variant="subtitle1" fontWeight="bold">
          Insight #{index + 1}
        </Typography>
      </Box>
      <Divider sx={{ my: 1 }} />
      {renderInsightContent(insight)}
    </CardContent>
  </Card>
);

const StatsInsights = ({ statistics, insights }) => {
  return (
    <Box mt={4}>
      {/* Aggregated Statistics Section */}
      {statistics && (
        <Box mb={4}>
          <Typography
            variant="h6"
            gutterBottom
            display="flex"
            alignItems="center"
          >
            <LeaderboardIcon sx={{ mr: 1 }} />
            Aggregated Statistics
          </Typography>
          <Paper elevation={3} sx={{ p: 2 }}>
            <Grid container spacing={2}>
              {Object.entries(statistics).map(([key, value]) => (
                <Grid item xs={12} sm={6} md={4} key={key}>
                  <StatCard label={key} value={value} />
                </Grid>
              ))}
            </Grid>
          </Paper>
        </Box>
      )}

      {/* Insights & Recommendations Section */}
      {insights && insights.length > 0 && (
        <Box>
          <Typography
            variant="h6"
            gutterBottom
            display="flex"
            alignItems="center"
          >
            <InsightsIcon sx={{ mr: 1 }} />
            Insights & Recommendations
          </Typography>
          <Grid container spacing={2}>
            {insights.map((insight, index) => (
              <Grid item xs={12} md={6} key={index}>
                <InsightCard insight={insight} index={index} />
              </Grid>
            ))}
          </Grid>
        </Box>
      )}
    </Box>
  );
};

export default StatsInsights;