import {
  createSession,
  createViewport,
  GeometryData,
  IMaterialContentDataV3,
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
    ticket: "4c97fdb952da3599f01bcbb80b99846c76032ab06cd911aed28ebf3210f34537c618b0bdc0e3d2b6b1323e60e4e3e5d62bf30588494982051b635cb461b1ad6a0f95aff695a74194370c170ba12fe6436300e5f84d982ca38c2875c6c2d15bec92fa8f1986d384-5be4b97ba9d6a4f763e9b69418831383",
    modelViewUrl: "https://sdr7euc1.eu-central-1.shapediver.com"
  })

  createParameterMenu(session);
  createExportMenu(session);

  // // gltf 2.0
  // const shelfOutput = session.getOutputByName("glTF 2.0 Display (Shelf)")[0];
  // console.log(shelfOutput)

  // // gltf 1.0 + material 1
  // const shelfOutputs = session.getOutputByName("ShapeDiver Display (Shelf)");
  // const shelfMaterialOutput = shelfOutputs.find(o => o.format.includes("material"));
  // const shelfGeometryOutput = shelfOutputs.find(o => !o.format.includes("material"));
  // console.log(shelfMaterialOutput, shelfGeometryOutput);

  // // gltf 1.0 + material 2
  // const imagePlaneOutput = session.getOutputByName("ShapeDiver Display (Image Plane)")[0];
  // console.log(imagePlaneOutput);

  // // data
  // const delayOutput = session.getOutputByName("Delay Output")[0];
  // console.log(delayOutput)

  // // data 2
  // const imagePlaneBoxOutput = session.getOutputByName("Image Plane Box")[0];
  // console.log(imagePlaneBoxOutput.content)

  // // tag2d
  // const tag2dOutput = session.getOutputByName("Text Tag")[0];
  // console.log(tag2dOutput);

  // // tag3d
  // const tag3dOutput = session.getOutputByName("Text Tag 3D")[0];
  // console.log(tag3dOutput);

  // // external
  // const externalDisplayOutput = session.getOutputByName("External Display");
  // console.log(externalDisplayOutput);

  // // visible
  // const shelfOutput = session.getOutputByName("glTF 2.0 Display (Shelf)")[0];
  // shelfOutput.node.visible = false;
  // const shelfOutputOld = session.getOutputByName("ShapeDiver Display (Shelf)").find(o => !o.format.includes("material"));
  // shelfOutputOld.node.visible = false;

  // // freeze
  // const imagePlaneOutput = session.getOutputByName("ShapeDiver Display (Image Plane)")[0];
  // imagePlaneOutput.freeze = true;

  // // updateCallback
  // const imagePlaneBoxOutput = session.getOutputByName("Image Plane Box")[0];
  // console.log(imagePlaneBoxOutput.content)
  // imagePlaneBoxOutput.updateCallback = () => {
  //   console.log(imagePlaneBoxOutput.content)
  // }

  // // material update
  // const shelfOutput = session.getOutputByName("glTF 2.0 Display (Shelf)")[0];
  // const shelfOutputOld = session.getOutputByName("ShapeDiver Display (Shelf)").find(o => !o.format.includes("material"));

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

  // updateCallback(shelfOutputOld.node)
  // shelfOutputOld.updateCallback = updateCallback;
})();