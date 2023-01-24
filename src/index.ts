import {
  createSession,
  createViewport,
  GeometryData,
  ITreeNode,
  MaterialStandardData
} from "@shapediver/viewer";
import { createExportMenu } from "./exports";
import { createParameterMenu } from "./parameters";

// we put all of our code here in an IIFE to allow the "await" statement of promises
(async () => {
  // we create a viewport with the canvas element we just read out
  const viewport = await createViewport({
    canvas: document.getElementById("canvas") as HTMLCanvasElement
  })

  // we create a session with the ticket and modelViewUrl of a model on the ShapeDiver platform
  const session = await createSession({
    ticket: "62019d36ced7e1ca4605e2d361bc61dedff1e9456e9f3d6bed7e7e840fd16a1c0e8cf4a6fd74f1a67e7e5cfd8c314b8b18a0dc1e1844a704ef9ced6c8f11f1acd33bfc3e73f9db49419d122947c0a568920b660034ba57930b88fcd8592b203e1721e69f484244-2f81e7ffa9ebb7b183af2c4f70c1b99a",
    modelViewUrl: "https://sdr7euc1.eu-central-1.shapediver.com"
  })

  createParameterMenu(session);
  createExportMenu(session);

  // const shelfOutput = session.getOutputByName("Shelf")[0];

  // // visible
  // const shelfOutput = session.getOutputByName("Shelf")[0];
  // shelfOutput.node.visible = false;

  // // freeze
  // const imagePlaneOutput = session.getOutputByName("Image Plane")[0];
  // imagePlaneOutput.freeze = true;

  // // updateCallback
  // const imagePlaneBoxOutput = session.getOutputByName("Image Plane Box")[0];
  // console.log(imagePlaneBoxOutput.content)
  // imagePlaneBoxOutput.updateCallback = () => {
  //   console.log(imagePlaneBoxOutput.content)
  // }

  // // material update
  // const shelfOutput = session.getOutputByName("Shelf")[0];

  // const updateCallback = (newNode: ITreeNode) => {
  //   const newMaterialData = new MaterialStandardData({ color: "#ff0000" });
  //   newNode.traverseData(d => {
  //     if(d instanceof GeometryData)
  //       d.primitive.material = newMaterialData;
  //   })
  //   newNode.updateVersion();
  // };

  // updateCallback(shelfOutput.node)
  // shelfOutput.updateCallback = updateCallback;
})();