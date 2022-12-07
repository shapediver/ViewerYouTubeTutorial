import {
  createSession,
  createViewport,
  IParameterApi,
  ISessionApi,
  PARAMETER_TYPE
} from "@shapediver/viewer";

const createParameterDiv = (parameterObject: IParameterApi<any>, parentDiv: HTMLDivElement) => {
  // create a div to store the parameter data
  const parameterDiv = document.createElement('div') as HTMLDivElement;
  parentDiv.appendChild(parameterDiv)

  // create a label with the parameter name
  const labelElement = document.createElement('label') as HTMLLabelElement;
  parameterDiv.appendChild(labelElement)
  labelElement.innerText = parameterObject.displayname || parameterObject.name;

  return parameterDiv;
}


const createBooleanParameterElement = (session: ISessionApi, parameterObject: IParameterApi<boolean>, parentDiv: HTMLDivElement) => {
  // create a div to store the parameter data
  const parameterDiv = createParameterDiv(parameterObject, parentDiv);

  // create an input element to manipulate the parameter
  const inputElement = document.createElement('input') as HTMLInputElement;
  parameterDiv.appendChild(inputElement)
  inputElement.type = 'checkbox';
  inputElement.checked = parameterObject.value === true || parameterObject.value === 'true';
  inputElement.onchange = async () => {
    parameterObject.value = inputElement.checked;
    await session.customize();
  }
}

const createColorParameterElement = (session: ISessionApi, parameterObject: IParameterApi<string>, parentDiv: HTMLDivElement) => {
  // create a div to store the parameter data
  const parameterDiv = createParameterDiv(parameterObject, parentDiv);

  // create an input element to manipulate the parameter
  const inputElement = document.createElement('input') as HTMLInputElement;
  parameterDiv.appendChild(inputElement)
  inputElement.type = 'color';
  inputElement.value = parameterObject.value.replace("0x", "#").substring(0, 7);
  inputElement.onchange = async () => {
    parameterObject.value = inputElement.value;
    await session.customize();
  }
}

const createStringParameterElement = (session: ISessionApi, parameterObject: IParameterApi<string>, parentDiv: HTMLDivElement) => {
  // create a div to store the parameter data
  const parameterDiv = createParameterDiv(parameterObject, parentDiv);

  // create an input element to manipulate the parameter
  const inputElement = document.createElement('input') as HTMLInputElement;
  parameterDiv.appendChild(inputElement)
  inputElement.type = 'text';
  inputElement.value = parameterObject.value;
  inputElement.onchange = async () => {
    parameterObject.value = inputElement.value;
    await session.customize();
  }
}

const createFloatParameterElement = (session: ISessionApi, parameterObject: IParameterApi<number>, parentDiv: HTMLDivElement) => {
  // create a div to store the parameter data
  const parameterDiv = createParameterDiv(parameterObject, parentDiv);

  // create an input element to manipulate the parameter
  const inputElement = document.createElement('input') as HTMLInputElement;
  parameterDiv.appendChild(inputElement)
  inputElement.type = 'range';
  inputElement.value = parameterObject.value + '';
  inputElement.min = parameterObject.min + '';
  inputElement.max = parameterObject.max + '';
  inputElement.step = 1 / Math.pow(10, parameterObject.decimalplaces!) + "";

  inputElement.onchange = async () => {
    parameterObject.value = inputElement.value;
    await session.customize();
  }
}

const createNumberParameterElement = (session: ISessionApi, parameterObject: IParameterApi<number>, parentDiv: HTMLDivElement) => {
  // create a div to store the parameter data
  const parameterDiv = createParameterDiv(parameterObject, parentDiv);

  // create an input element to manipulate the parameter
  const inputElement = document.createElement('input') as HTMLInputElement;
  parameterDiv.appendChild(inputElement)
  inputElement.type = 'range';
  inputElement.value = parameterObject.value + '';
  inputElement.min = parameterObject.min + '';
  inputElement.max = parameterObject.max + '';

  if (parameterObject.type === PARAMETER_TYPE.INT) {
    inputElement.step = "1";
  } else if (parameterObject.type === PARAMETER_TYPE.EVEN || parameterObject.type === PARAMETER_TYPE.ODD) {
    inputElement.step = "2";
  } else {
    inputElement.step = 1 / Math.pow(10, parameterObject.decimalplaces!) + "";
  }

  inputElement.onchange = async () => {
    parameterObject.value = inputElement.value;
    await session.customize();
  }
}

const createFileParameterElement = (session: ISessionApi, parameterObject: IParameterApi<File | Blob | String>, parentDiv: HTMLDivElement) => {
  // create a div to store the parameter data
  const parameterDiv = createParameterDiv(parameterObject, parentDiv);

  // create an input element to manipulate the parameter
  const inputElement = document.createElement('input') as HTMLInputElement;
  parameterDiv.appendChild(inputElement)
  inputElement.type = 'file';
  inputElement.accept = parameterObject.format.join(',');

  inputElement.onchange = async () => {
    if (!inputElement.files || !inputElement.files[0]) return;
    parameterObject.value = inputElement.files[0];
    await session.customize();
  }
}

const createStringListParameterElement = (session: ISessionApi, parameterObject: IParameterApi<string>, parentDiv: HTMLDivElement) => {
  // create a div to store the parameter data
  const parameterDiv = createParameterDiv(parameterObject, parentDiv);

  // create a select element to manipulate the parameter
  const selectElement = document.createElement('select') as HTMLSelectElement;
  parameterDiv.appendChild(selectElement);

  for (let i = 0; i < parameterObject.choices.length; i++) {
    const option = document.createElement("option") as HTMLOptionElement;
    option.value = i + "";
    option.innerText = parameterObject.choices[i];
    selectElement.appendChild(option);
  }

  selectElement.onchange = async () => {
    parameterObject.value = selectElement.value;
    await session.customize();
  }
}

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

  const menuDiv = document.getElementById('menu') as HTMLDivElement;

  // order the parameters via their order property
  const orderedParameters = Object.values(session.parameters).sort((a: IParameterApi<any>, b: IParameterApi<any>) => a.order - b.order)

  for (let i = 0; i < orderedParameters.length; i++) {
    const parameterObject = orderedParameters[i];

    // parameters can be hidden via the platform
    if (parameterObject.hidden === true) continue;

    // if a parameter has a group, we want to display it within that group
    let parentDiv: HTMLDivElement = menuDiv;
    if (parameterObject.group !== undefined) {
      // we search if there already exists an element with the group id, if not, we create one
      let parameterGroupDiv = document.getElementById(parameterObject.group.id) as HTMLDivElement | null;
      if (!parameterGroupDiv) {
        // we create a new div for this parameter group
        parameterGroupDiv = document.createElement('div') as HTMLDivElement;
        parameterGroupDiv.id = parameterObject.group.id;
        menuDiv.appendChild(parameterGroupDiv);

        // create a label for this group
        const labelElement = document.createElement('label') as HTMLLabelElement;
        parameterGroupDiv.appendChild(labelElement);
        labelElement.innerText = parameterObject.group.name;
        labelElement.style.fontWeight = "bold";
      }
      // if there is a group we add the parameter elements to it
      parentDiv = parameterGroupDiv;
    }

    // depending on the type of parameter, we create the correct input elements in the menu
    switch (parameterObject.type) {
      case PARAMETER_TYPE.BOOL:
        createBooleanParameterElement(session, parameterObject, parentDiv);
        break;
      case PARAMETER_TYPE.FLOAT:
      case PARAMETER_TYPE.ODD:
      case PARAMETER_TYPE.EVEN:
      case PARAMETER_TYPE.INT:
        createNumberParameterElement(session, parameterObject, parentDiv);
        break;
      case PARAMETER_TYPE.COLOR:
        createColorParameterElement(session, parameterObject, parentDiv);
        break;
      case PARAMETER_TYPE.STRING:
        createStringParameterElement(session, parameterObject, parentDiv);
        break;
      case PARAMETER_TYPE.FILE:
        createFileParameterElement(session, parameterObject, parentDiv);
        break;
      case PARAMETER_TYPE.STRINGLIST:
        createStringListParameterElement(session, parameterObject, parentDiv);
        break;
      default:
        console.log(parameterObject.name, parameterObject.type)
    }
  }




  const lengthParameter = session.getParameterByName('Length')[0];
  lengthParameter.value = 4;
  await session.customize();

  await new Promise(resolve => setTimeout(resolve, 2000));

  lengthParameter.resetToDefaultValue();
  await session.customize();

  await new Promise(resolve => setTimeout(resolve, 2000));

  lengthParameter.value = 6;
  await session.customize();

  lengthParameter.value = 3;
  lengthParameter.resetToSessionValue();
  console.log("Reset to session value: ", lengthParameter.value);

  try {
    lengthParameter.isValid("Clearly not a number");
  } catch (e) {
    console.log(e)
  }

  console.log("Stringified value: ", lengthParameter.stringify());

})();