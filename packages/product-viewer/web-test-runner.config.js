const { esbuildPlugin } = require("@web/dev-server-esbuild");

module.exports = {
	files: "src/**/*.test.ts",
	nodeResolve: true,
	plugins: [esbuildPlugin({ ts: true })],
	testFramework: {
		config: {
			timeout: "5000",
		},
	},
};
