const path = require("path");
const pluginSEO = require("eleventy-plugin-seo");
const prettier = require("prettier");

module.exports = function (eleventyConfig) {
    // Copy assets
    eleventyConfig.addPassthroughCopy("assets");

    // Copy favicon
    eleventyConfig.addPassthroughCopy("*.png");
    eleventyConfig.addPassthroughCopy("*.ico");

    // Ignore components
    eleventyConfig.ignores.add("_components/**");

    eleventyConfig.addPlugin(pluginSEO, {
        title: "OpenWire | Thinclients, Mini PCs, All in One(AIO) PCs",
        description: "OpenWire is a leading manufacturer of thinclients, mini pcs, all in one(AIO) and desktop computers. OpenWire has it's presence across india and is trusted by industry leaders. OpenWire offers solutions to computational problems of small and medium scale businesses.",
        url: "https://openwire.in",
        image: "assets/img/logos/logo.png",
        author: "OpenWire",
    });

    eleventyConfig.addTransform("prettier", function (content, outputPath) {
        const extname = path.extname(outputPath);
        switch (extname) {
            case ".html":
            case ".json":
                // Strip leading period from extension and use as the Prettier parser.
                const parser = extname.replace(/^./, "");
                return prettier.format(content, { parser });

            default:
                return content;
        }
    });

    return {
        dir: {
            output: "public"
        }
    }
};
