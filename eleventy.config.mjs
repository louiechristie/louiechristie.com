import 'dotenv/config';
import Image from '@11ty/eleventy-img';
import { eleventyImageTransformPlugin } from '@11ty/eleventy-img';
import { EleventyHtmlBasePlugin } from '@11ty/eleventy';

const isProductionBuild = process.env.ELEVENTY_RUN_MODE === 'build';

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
  eleventyConfig.addPassthroughCopy('images');
  eleventyConfig.addPassthroughCopy('images/lc-icon.svg'); // for memes subdirectory
  eleventyConfig.addPassthroughCopy('browserconfig.xml');
  eleventyConfig.addPassthroughCopy('site.webmanifest');
  eleventyConfig.addPlugin(eleventyImageTransformPlugin, {
    formats: ['avif', 'webp', 'svg'],
    svgShortCircuit: true,
    failOnError: false,
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
    baseHref: config.pathPrefix,
    extensions: 'html',
  });
}
