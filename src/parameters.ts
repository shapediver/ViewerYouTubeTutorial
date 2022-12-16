import { IParameterApi, ISessionApi, PARAMETER_TYPE } from "@shapediver/viewer";
import { extendMimeTypes, guessMimeTypeFromFilename, mapMimeTypeToFileEndings } from "@shapediver/viewer.utils.mime-type";

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

    // get all allowed file endings
    const fileEndings = mapMimeTypeToFileEndings(extendMimeTypes(parameterObject.format!));

    // remove duplicates
    let uniqueFileEndings: string[] = [];
    fileEndings.forEach((element) => {
        if (!uniqueFileEndings.includes(element)) 
            uniqueFileEndings.push(element);
    });
    inputElement.accept = uniqueFileEndings.join(',');

    inputElement.onchange = async () => {
        if (!inputElement.files || !inputElement.files[0]) return;
        
        // some uploaded files do not have a type specified
        const file = inputElement.files[0];
        let fileWithMimeType = file;
        if (!fileWithMimeType.type)
            fileWithMimeType = new File([file], file.name, { type: guessMimeTypeFromFilename(file.name)[0]});

        parameterObject.value = fileWithMimeType;
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

export const createParameterMenu = (session: ISessionApi) => {

    const menuDiv = document.getElementById('parameterMenu') as HTMLDivElement;

    // order the parameters via their order property
    const orderedParameters = Object.values(session.parameters).sort((a: IParameterApi<any>, b: IParameterApi<any>) => (a.order === undefined ? Infinity : a.order) - (b.order === undefined ? Infinity : b.order))

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

}