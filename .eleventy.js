const dateFilter = require('./filters/date-filter.js');
const w3DateFilter = require('./filters/w3-date-filter.js');

const site = require('./_data/site.json');

module.exports = function(eleventyConfig) {  
  eleventyConfig.addFilter('dateFilter', dateFilter);
  eleventyConfig.addFilter('w3DateFilter', w3DateFilter);

  const now = new Date();

  // Custom collections
  const livePosts = post => post.date <= now && !post.data.draft;
  eleventyConfig.addCollection('posts', collection => {
    return [
    ...collection.getFilteredByGlob('./writing/*.md').filter(livePosts)
    ].reverse();
  });

  eleventyConfig.addCollection('postFeed', collection => {
    return [...collection.getFilteredByGlob('./writing/*.md').filter(livePosts)]
    .reverse()
    .slice(0, site.maxPostsPerPage);
  });

  eleventyConfig.addPassthroughCopy("assets/fonts");
  eleventyConfig.addPassthroughCopy("assets/images");
  eleventyConfig.addPassthroughCopy("favicon.ico");

  return {
    templateFormats: ["md", "njk", "html", "liquid", "jpg", "png"],
    pathPrefix: "/",

    markdownTemplateEngine: "md",
    htmlTemplateEngine: "njk",
    dataTemplateEngine: "njk",
    passthroughFileCopy: true,
    dir:
    {
     input: ".",
     includes: "_includes",
     data: "_data",
     output: "_site"
   }
 }
};