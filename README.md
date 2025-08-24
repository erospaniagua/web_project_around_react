Deployment Notice

This repository contains the source code only. It is not a production build, so it cannot be deployed directly to GitHub Pages.

The project uses JSX, which browsers cannot run without being compiled to plain JavaScript.

To view the project, you need to run it locally with the development server.

Run locally
npm install
npm start

Build for deployment

If you want to host it (e.g. on GitHub Pages or Netlify), first create a build:

npm run build


Then deploy the contents of the build/ (or dist/) folder.
