import { eleventyImageTransformPlugin } from '@11ty/eleventy-img';

export default async function (eleventyConfig) {
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
    outputDir: "/img/",
    failOnError: true,
    transformOnRequest: false,
    widths: ["auto", 400, 800, 1200],
    htmlOptions: {
			imgAttributes: {
				sizes: "(min-width: 1024em) 400px, 100vw"
			},
		},
  });
}
