require('dotenv').config();
const { BetaAnalyticsDataClient } = require('@google-analytics/data');
const fs = require('fs');

// Initialize the Analytics Data client
const analyticsDataClient = new BetaAnalyticsDataClient({
  credentials: JSON.parse(
    fs.readFileSync(process.env.GOOGLE_APPLICATION_CREDENTIALS, 'utf8')
  ),
});

// Function to get engagement time for a specific date range and page
async function getEngagementTime(startDate, endDate, pagePath = null) {
  const dimensions = pagePath ? [{ name: 'pagePath' }] : [];
  const [response] = await analyticsDataClient.runReport({
    property: `properties/${process.env.GA4_PROPERTY_ID}`,
    dateRanges: [{ startDate, endDate }],
    metrics: [{ name: 'userEngagementDuration' }],
    dimensions,
    dimensionFilter: pagePath
      ? {
          filter: {
            fieldName: 'pagePath',
            stringFilter: { matchType: 'EXACT', value: pagePath },
          },
        }
      : undefined,
  });

  if (response && response.rows.length > 0) {
    return response.rows[0].metricValues[0].value;
  } else {
    return 0;
  }
}

module.exports = getEngagementTime;
