import {
  createSession,
  createViewport
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
    ticket: "028961a79bb79b2e6b665e8ded16cabc389923dcaced689663e7d43d20ac4d5a1d09306fda2fb03acbf3bdee4dcbdb1391f8ee1c47c53aca8a3c632283be5db9b679f76e3caad6f35494c51996f90d9a4d13cdbebd9fa33e71d2e131879ca2c60f0982cbcaeaad-055f5df4510e5975418008e61cc89024",
    modelViewUrl: "https://sdeuc1.eu-central-1.shapediver.com"
  })

  createParameterMenu(session)
  createExportMenu(session)

  // const imageExport = session.getExportByName('Image Export')[0];
  // const resultImageExport = await imageExport.request();
  // window.open(resultImageExport.content[0].href);

  // const emailExport = session.getExportByName('Image Email Export')[0];
  // const emailParameter = session.getParameterByName('Email')[0];
  // const emailParameterId = emailParameter.id;

  // const emailExportParameters = {};
  // emailExportParameters[emailParameter.id] = "";
  // const resultEmailExport = await emailExport.request(emailExportParameters);
  // console.log(resultEmailExport);

  // const delayExport = session.getExportByName('Delay Export')[0];
  // const delayParameter = session.getParameterByName('Delay [sec]')[0];
  // const emailExportParameters2 = {};
  // emailExportParameters2[delayParameter.id] = "135";
  // const resultDelayExport = await delayExport.request(emailExportParameters2);
  // console.log(resultDelayExport.msg);
  // const resultDelayExport2 = await delayExport.request();
  // window.open(resultDelayExport2.content[0].href);
})();