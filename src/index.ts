import { 
  createSession,
  createViewport, 
  BUSY_MODE_DISPLAY, 
  FLAG_TYPE, 
  SPINNER_POSITIONING, 
  VISIBILITY_MODE 
} from "@shapediver/viewer";

// we put all of our code here in an IIFE to allow the "await" statement of promises
(async () => {

  // we read out the canvas element of the index.html file
  const canvasElement = document.getElementById("canvas") as HTMLCanvasElement;

  // we create a viewport with the canvas element we just read out
  // additionally we adjust some optional properties to change the style of the viewport
  const viewport = await createViewport({
    canvas: canvasElement,
    visibility: VISIBILITY_MODE.MANUAL,
    branding: {
      logo: "https://viewer.shapediver.com/v3/youtube/video1/catAstronaut.png",
      backgroundColor: "#008800",
      spinnerPositioning: SPINNER_POSITIONING.BOTTOM_LEFT,
      busyModeSpinner: "https://viewer.shapediver.com/v3/youtube/video1/subscribe.gif",
      busyModeDisplay: BUSY_MODE_DISPLAY.SPINNER
    },
    id: "YouTubeViewport1"
  })

  // we create a session with the ticket and modelViewUrl of a model on the ShapeDiver platform
  // we additionally adjust some optional properties
  const session = await createSession({
    ticket: "90377527eeeafdd35ed9c698d21b100d4c7388444aac60838be7ff176eed6b979a8c92632db8f3e96d76c913b5ee0c4ea4bec0908aed7b0fd358b690dd3dc23b39d86476293d56fab2f1ed07615095b459ee9c9e68f9718488a22111dbfb54e0d3f6b315174a46-15abf4140442e14d3fb0095c438c5939",
    modelViewUrl: "https://sdeuc1.eu-central-1.shapediver.com",
    initialParameterValues: {
      "de76cade-0cea-47b1-879e-1a0b717910e1": "2"
    },
    id: "YouTubeSession1"
  })

  // once everything is set up, we show the viewport (when setting the visibility of the viewport to SESSION, this call is not needed)
  viewport.show = true;

  // we add a flag to always show the busy mode
  // this is just done to show the gif
  viewport.addFlag(FLAG_TYPE.BUSY_MODE)
})();