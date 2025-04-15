import 'dotenv/config';
import { BetaAnalyticsDataClient } from '@google-analytics/data';
import fs from 'fs';
import { Temporal } from 'temporal-polyfill';

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

export async function analyticsShortcodeFunction() {
  const humanReadableTime = (seconds) => {
    const duration = Temporal.Duration.from({ seconds });

    // More than an hour
    if (seconds >= 60 * 60) {
      const roundedDuration = duration.round({
        largestUnit: 'hours',
        smallestUnit: 'hours',
        roundingIncrement: seconds >= 60 * 60,
      });
      const hours = roundedDuration.hours;
      return `${hours} hour${hours > 1 ? 's' : ''}`;
    }

    // More than 15 minutes, 15 minute increments
    if (seconds >= 60 * 15) {
      const roundedDuration = duration.round({
        largestUnit: 'minutes',
        smallestUnit: 'minutes',
        roundingIncrement: 15,
      });
      const minutes = roundedDuration.minutes;
      return `${minutes} minute${minutes > 1 ? 's' : ''}`;
    }

    // More than 1 minutes, 1 minute increments
    if (seconds >= 60) {
      const roundedDuration = duration.round({
        largestUnit: 'minutes',
        smallestUnit: 'minutes',
        roundingIncrement: 1,
      });
      const minutes = roundedDuration.minutes;
      return `${minutes} minute${minutes > 1 ? 's' : ''}`;
    }

    // More than 15 seconds, 15 second increments
    if (seconds >= 15) {
      const roundedDuration = duration.round({
        largestUnit: 'seconds',
        smallestUnit: 'seconds',
        roundingIncrement: 15,
      });
      const secs = roundedDuration.seconds;
      return `${secs} second${secs > 1 ? 's' : ''}`;
    }

    // Less than 15 seconds
    return `${seconds} second${seconds > 1 ? 's' : ''}`;
  };

  // Get today's date
  const today = Temporal.Now.plainDateISO();

  // Calculate yesterday
  const yesterday = today.subtract({ days: 1 });

  // Calculate one month ago
  const oneMonthAgo = today.subtract({ months: 1 });

  const startDate = oneMonthAgo;
  const endDate = yesterday;

  const siteEngagementTime = await getEngagementTime(startDate, endDate);
  const pageEngagementTime = await getEngagementTime(
    startDate,
    endDate,
    this.page.url
  );

  return `
    <div>
      <p><img src="https://www.google.com/s2/favicons?sz=16&domain_url=https%3A%2F%2Fanalytics.google.com%2F" alt="Google Analytics Logo"> Analytics</p>
      <div>Total humans' lives squandered browsing ${
        Temporal.PlainDate.compare(
          today,
          Temporal.PlainDate.from({ year: today.year, month: 3, day: 14 })
        ) > 0
          ? '(last month)'
          : '(since 14 Feb)'
      }:</div>
       <div class="analytics-stats-container">
        <div class="analytics-stats">
            <div class="analytics-stats-key">Website:</div>
            <div class="analytics-stats-value">${humanReadableTime(
              siteEngagementTime
            )}</div> 
            <div class="analytics-stats-key">Webpage ${
              this.page.url || 'url not found'
            }: </div>
            <div class="analytics-stats-value">${humanReadableTime(
              pageEngagementTime
            )}</div>
        </div>
      </div>
      
     <p><center>Last checked: ${endDate}</center></p>
    </div>
  `;
}

export default getEngagementTime;
