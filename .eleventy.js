const dateFilter = require('./filters/date-filter.js');
const w3DateFilter = require('./filters/w3-date-filter.js');

module.exports = function(eleventyConfig) {  
    eleventyConfig.addFilter('dateFilter', dateFilter);
    eleventyConfig.addFilter('w3DateFilter', w3DateFilter);

    const now = new Date();

    return {
        templateFormats: ["md", "njk", "html", "liquid", "jpg"],
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