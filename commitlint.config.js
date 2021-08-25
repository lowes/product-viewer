module.exports = {
	extends: ["@commitlint/config-conventional"],
	rules: {
		"scope-enum": [
			2,
			"always",
			[
				"product-viewer",
				"viewer-assets",
				"viewer-demos",
				"eslint",
				"release",
				"*",
			],
		],
	},
};
