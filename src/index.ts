import {
  createSession,
  createViewport,
  IParameterApi,
  ISessionApi,
  PARAMETER_TYPE
} from "@shapediver/viewer";
import { createParameterMenu } from "./parameters";

// we put all of our code here in an IIFE to allow the "await" statement of promises
(async () => {
  // we create a viewport with the canvas element we just read out
  const viewport = await createViewport({
    canvas: document.getElementById("canvas") as HTMLCanvasElement
  })

  // we create a session with the ticket and modelViewUrl of a model on the ShapeDiver platform
  const session = await createSession({
    ticket: "49c24476e7ab6d9a883d9a92170085a725c7c411778d4fe4776261d6a64dc90ba44ae5178f6254936ce3fdd6edfcab58cf8b2bd55ed83919d7113864d81654ca4c82d5656f835d4d9df978b8c66d45eb73dca020079863fd74f0eee41d26bcd5d6094cf90bc235-7e055d8491f882af523591404f2c8ed7",
    modelViewUrl: "https://sdr7euc1.eu-central-1.shapediver.com"
  })

  createParameterMenu(session)

  // const lengthParameter = session.getParameterByName('Length')[0];
  // lengthParameter.value = 4;
  // await session.customize();

  // await new Promise(resolve => setTimeout(resolve, 2000));

  // lengthParameter.resetToDefaultValue();
  // await session.customize();

  // await new Promise(resolve => setTimeout(resolve, 2000));

  // lengthParameter.value = 6;
  // await session.customize();

  // lengthParameter.value = 3;
  // lengthParameter.resetToSessionValue();
  // console.log("Reset to session value: ", lengthParameter.value);

  // try {
  //   lengthParameter.isValid("Clearly not a number");
  // } catch (e) {
  //   console.log(e)
  // }

  // console.log("Stringified value: ", lengthParameter.stringify());

})();