export default async function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy('stylesheets');
  eleventyConfig.addPassthroughCopy('mstile-*.png');
  eleventyConfig.addPassthroughCopy('favicon*');
  eleventyConfig.addPassthroughCopy('android-chrome*');
  eleventyConfig.addPassthroughCopy('apple-touch-icon*');
  eleventyConfig.addPassthroughCopy('images');
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
}
