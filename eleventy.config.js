export default async function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy('mstile-*.png');
  eleventyConfig.addPassthroughCopy('favicon*');
  eleventyConfig.addPassthroughCopy('android-chrome*');
  eleventyConfig.addPassthroughCopy('apple-touch-icon*');
  eleventyConfig.addPassthroughCopy('images');
  eleventyConfig.addPassthroughCopy('browserconfig.xml');
  eleventyConfig.addPassthroughCopy('site.webmanifest');
  eleventyConfig.addPassthroughCopy('stylesheets');
}
