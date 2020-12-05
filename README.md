# React D3 Template Repo

### Fork me on Github to create your own interactive visualizations!!

Essential reading for converting normal D3 code to object oriented code.
https://aspenmesh.io/using-d3-in-react-a-pattern-for-using-data-visualization-at-scale/

Essential reading for bringing React and D3 code together.
https://elliotbentley.com/2017/08/09/a-better-way-to-structure-d3-code-es6-version.html
https://towardsdatascience.com/react-d3-the-macaroni-and-cheese-of-the-data-visualization-world-12bafde1f922

## Getting started developing and intended workflow
### Intial IDE Setup and Git Flow.
I would recommend using VSCode to develop. https://code.visualstudio.com/download
- Open a new terminal in VSCODE. 
- `cd "folder_name"` Navigate to your work folder,
- `git clone https://github.com/HakaiInstitute/frontpage.git` Clone the repo,
- `git checkout -b "new_branch_name"` Checkout a new branch.

Do work in VSCode, then when ready to create commits:
- `git status` Check your changes,
- `git add -A` if adding all, or `git add "file_name(s)"` Add files to staging area,
- `git commit -m "your_commit_message_here"` Create a commit once desired files are added,
- `git push` Push changes to your branch,
- Create a PR on Github so that others can review and request changes or approve.
- Merge PR and Celebrate.

### Doing work in this repo.
Once you have pulled down the repo you will have to:
- `npm install` Install the dependencies specified in package.json: 
- `npm start` Start the hot-reloading server. This will open an auto-updating development tab in chrome. Write code and save it and it will automatically show in the tab which refreshes itself on file saves.
- `npm run build` Generates a production ready version of the site that have been transpiled in /dist. Does not start a hot-reloading tab in Chrome. However! If you wish to run the production code of this repository however, you will need to change two things before running `npm run build`.
1. change the path used inside the /d3/d3Chart.js file `loadData('./src/assets/qu39_ctd.csv'`) to `loadData('./qu39_ctd.csv')` to access a copy of qu39_ctd you will manually copy into the /dist folder.
2. copy-paste a copy of qu39_ctd.csv into the /dist folder.
Now you can run a local server of the production code by running `serve` (an npm package installed during `npm install`) inside the /frontpage directory from the command line. Running this here captures all the assets in the repo.
Open the link provided by serve. I believe it is normally `http://localhost:5000`, and you should be able to select the /dist folder inside the page that opens at that link. 

## Development tools and features
This repo uses webpack, bable, React, and object oriented JavaScript to make creating and maintaining D3 visualizations simpler and more robust. In the future, the addition of TypeScript should produce a substantial improvement to tracking of data schemas and objects within data visualizations. 
There are some files in the repo which specify behaviours of these development tools.
They are:
- `.babelrc`: controls how Babel transpiles our ES6 code into vanilla js, and also packages html, js, and assets using "loaders".
- `eslintrc.js`: a VSCode environment file that enables us to have code linting that supports clean, readable, safe code.
- `.gitignore`: a file which names files and folders that git should ignore in tracking changes to the repo.
- `package.json`: a file that npn uses to a) specify command line scripts, b) install dev and production node_module dependencies. These node_modules are downloaded in `/node_modules/` and accessible anywhere in the app using `import` statements. Greatly simplifies bringing open source npm js modules (libraries) into code. You can add new npm modules to package.json by calling `npm install "node_module"` with the `--save`, `--save-dev`, `-g` flags depending on the node_module and your needs.
- `package-lock.json`: a file that `package.json` uses to track all the crazy dependencies of npm modules. This is not intended for human consumption, but is part of the repo.
- `webpack.config.js`: a file that specifies webpack's entry points, outputs, and file loaders and rules. This also enables the hot-reloading server that is so useful for web-development.
- `tscongif.json`: a file that specifies the enforcement of typings according to the TypeScript super set language that Microsoft has created. Incredibly useful in complex applications to know what those unknowable variable values are. Might adopt in future.

## Basic Architecture
The basic architecture of the app is as follows:
### src/
- `index.html`: holds the named HTML elements that React grabs to inject its rendered JSX into.
- `index.js`: imports the ReactD3Viz component for webpack to access the entire app and inject it into `index.html`.
### src/assets/
- place your data assets, images, and other stuff here for reference.
### src/components/
- `reactD3Viz.jsx`: Our root component that holds UI selection state, and provides setters for each UI selection. Renders all the react components in its `Render ()` function. Create and add components to the `ReactD3Viz` component to generate nice layouts.
- `chart.jsx`: controls the rendering of the D3 chart by using React LifeCycle methods and local state. Alternatively, you can create charts using other npm packages such as Plotly and many others and describe their behaviour in here.
### src/d3/
- `d3Chart.js`: contains the object oriented D3 code for constructing, loading data, initially drawing, and updating the chart based on control selections.

# Getting Started with Create React App

**We moved to using the create-react-app starting point for this ICO Vis project. The following sections are the default instructions included with that project.**

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn eject` DON'T DO THIS UNLESS YOU ARE CERTAIN

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `yarn build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
