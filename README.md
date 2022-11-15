# ShapeDiver Viewer YouTube Tutorials

This is the repository that accompanies the ShapeDiver YouTube Viewer tutorial series. There will be a branch for each video so that you can check out the branch and have the examples available to you.

## Initial Setup

To start off, you need to have [npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm) installed. This version of `npm` that was used when creating this project is version `8.10.0`. Other versions of `npm` should work as well, but if you are experiencing errors, make sure to try it with this version first.

When you have pulled the repository, first call

```npm i```

to install all the packages that are specified. Then you are already ready to go!

## Scripts

There are currently only two scripts in this project. One is there to build the project for development `build-dev` and one to build it for production `build-prod`.

`npm run build-dev` - Starts a development server and builds the application whenever a change in one the files occurred.  
`npm run build-prod` - Builds the application and puts the final `bundle.js` and `index.html` into the `dist` folder.
