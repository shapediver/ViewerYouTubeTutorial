# ShapeDiver Viewer YouTube Tutorials

This is the repository that accompanies the ShapeDiver YouTube Viewer tutorial series. There will be a branch for each video so that you can check out the branch and have the examples available to you.

## Initial Setup

Please update the viewer version of the package.json to the latest viewer version available, you can see that viewer version on our [help desk](https://help.shapediver.com/doc/viewer). Then, if you haven't installed `npm` please do so. You can find information about that [here](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm).

After doing that, first call

```npm i```

to install all the packages that are specified. Then you are already ready to go!

## Scripts

There are currently only two scripts in this project. One is there to build the project for development `build-dev` and one to build it for production `build-prod`.

`npm run build-dev` - Starts a development server and builds the application whenever a change in one the files occurred.  
`npm run build-prod` - Builds the application and puts the final `bundle.js` and `index.html` into the `dist` folder.
