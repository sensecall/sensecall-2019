module.exports = function(eleventyConfig) {  
	eleventyConfig.addFilter("makeUppercase", function(value) {
		return `<h1>${this.makeUppercase(name)}</h1>`;
	});
};