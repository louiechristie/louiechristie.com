import 'dotenv/config';
import analytics from './analytics.cjs';
import Image from '@11ty/eleventy-img';
import Cache from '@11ty/eleventy-cache-assets';
import { Temporal } from 'temporal-polyfill';
import { eleventyImageTransformPlugin } from '@11ty/eleventy-img';
import { EleventyHtmlBasePlugin } from '@11ty/eleventy';
import eleventyAutoCacheBuster from 'eleventy-auto-cache-buster';

const isProduction = process.env.ELEVENTY_RUN_MODE === 'build';

const baseUrl = 'https://www.louiechristie.com';

export const config = {
  pathPrefix: '/',
};

export default function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy('stylesheets');
  eleventyConfig.addPassthroughCopy('mstile-*.png');
  eleventyConfig.addPassthroughCopy('favicon*');
  eleventyConfig.addPassthroughCopy('android-chrome*');
  eleventyConfig.addPassthroughCopy('apple-touch-icon*');
  eleventyConfig.addPassthroughCopy('img');
  eleventyConfig.addPassthroughCopy('browserconfig.xml');
  eleventyConfig.addPassthroughCopy('site.webmanifest');
  eleventyConfig.addPassthroughCopy({ '_tmp/bak/blog': 'blog' });
  eleventyConfig.addPassthroughCopy({
    '_tmp/bak/intro-to-web-dev-course': 'intro-to-web-dev-course',
  });
  eleventyConfig.addPassthroughCopy({
    '_tmp/bak/trivia-trundle': 'trivia-trundle',
  });
  eleventyConfig.addPassthroughCopy({ '_tmp/bak/weeks-to-go': 'weeks-to-go' });

  eleventyConfig.addPlugin(eleventyImageTransformPlugin, {
    formats: ['avif', 'webp', 'svg'],
    svgShortCircuit: true,
    outputDir: '/img/',
    failOnError: true,
    transformOnRequest: false,
    widths: ['auto', 400, 800, 1200],
    htmlOptions: {
      imgAttributes: {
        sizes: '(min-width: 1024em) 400px, 100vw',
        loading: 'lazy',
        decoding: 'async',
      },
    },
  });

  eleventyConfig.addPlugin(EleventyHtmlBasePlugin, {
    baseHref: isProduction ? baseUrl : config.pathPrefix,
    extensions: 'html',
  });

  eleventyConfig.addPlugin(eleventyAutoCacheBuster);

  eleventyConfig.addShortcode('analytics', async function () {
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

    const siteEngagementTime = await analytics(startDate, endDate);
    const pageEngagementTime = await analytics(
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
  });

  eleventyConfig.addShortcode('performance', async function () {
    const fullUrl = `${baseUrl}${this.page.url}`;

    const params = new URLSearchParams();
    params.append('url', fullUrl);
    params.append('key', process.env.PAGESPEED_API_KEY);
    // We use the fields query string param to ask the Google API to only
    // return the data we need - a score and title for each category in the
    // Lighthouse test. Without this, the API returns a *lot* of data, which
    // isn't the end of the world but is also unnecessary.
    params.append(
      'fields',
      'lighthouseResult.categories.*.score,lighthouseResult.categories.*.title,lighthouseResult.fetchTime'
    );
    params.append('prettyPrint', false);
    // I use the mobile strategy, but `desktop` is a valid value too.
    params.append('strategy', 'mobile');
    // I've not used the PWA category, but you could if it is relevant to your site.
    params.append('category', 'PERFORMANCE');
    params.append('category', 'ACCESSIBILITY');
    params.append('category', 'BEST-PRACTICES');
    params.append('category', 'SEO');

    let data = await Cache(
      `https://www.googleapis.com/pagespeedonline/v5/runPagespeed?${params.toString()}`,
      {
        duration: '10m',
        type: 'json',
      }
    );

    const categoriesObject = data.lighthouseResult.categories;

    const getGrade = function (score) {
      if (score < 0.5) {
        return 'bad';
      }
      if (score < 0.9) {
        return 'ok';
      }
      return 'good';
    };

    const categories = Object.keys(categoriesObject).map(function (key) {
      return {
        title: categoriesObject[key].title,
        score: categoriesObject[key].score,
        percentage: (categoriesObject[key].score * 100).toFixed(),
        grade: getGrade(categoriesObject[key].score),
      };
    });

    function renderCategory(category) {
      return `
      <div class='score-container'>
        <div
          class='arc ${category.grade}'
          style="mask:
            linear-gradient(#0000 0 0) content-box intersect,
            conic-gradient(#000 ${category.score}turn, #0000 0);">
        </div>
        <div class='overlay'>
          ${category.percentage}%
        </div>
      </div>`;
    }

    return `
    <div class='lighthouse-scores'>
      <p>
        <a href="https://developers.google.com/speed/pagespeed/insights/?url=${fullUrl}">
          <img
            eleventy:ignore
            alt='Lighthouse icon'
            src='https://github.com/GoogleChrome/lighthouse/raw/refs/heads/main/assets/lh_favicon.svg'
            width='16'
            height='16'
          ></a>
        Page performance:
      </p>
      <div class='lighthouse-grid-container'>
        <div class='lighthouse-scores-grid'>
          ${categories
            .map((category) => {
              return renderCategory(category);
            })
            .join('')}

          ${categories
            .map((category) => {
              return `<div class='category-title'>${category.title}</div>`;
            })
            .join('')}    
        </div>
      </div>

      <p><center>Last checked: ${Temporal.Instant.from(
        data.lighthouseResult.fetchTime
      )
        .toZonedDateTimeISO('Europe/London')
        .toPlainDate()}
        | <a href="https://developers.google.com/speed/pagespeed/insights/?url=${fullUrl}">check</a><center></p>
    </div>
  `;
  });

  return {
    markdownTemplateEngine: 'njk',
    htmlTemplateEngine: 'njk',
    dataTemplateEngine: 'njk',
  };
}
