# Viewer Demos

The viewer demos project is a collection of product-viewer examples showcasing each of it's features and sample code with documentation.

## Available Scripts

| Command         | Description                                            |
| --------------- | ------------------------------------------------------ |
| `npm run start` | Creates a dev build, and then starts the dev server    |
| `npm run build` | Builds a minified production version of product-viewer |
| `npm run lint`  | Runs eslint and prettier tests                         |
| `npm run fix`   | Attempts to fix all eslint and prettier problems       |
| `npm run test`  | Launches the test runner in the interactive watch mode |

## Code Verification Workflow (Veracode)

There is a workflow job that runs on pull requests and main branch merges that uses Veracode to check for security vulnerabilities.

There can only be 1 verification running at a time on Veracode, so there is a concurrency limit of single Veracode Analysis job at a time. This means it may take longer than usual for this check to complete but just be patient and it will eventually return a result.
