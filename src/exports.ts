import { EXPORT_TYPE, IExportApi, IParameterApi, ISessionApi, PARAMETER_TYPE } from "@shapediver/viewer";

const createExportDiv = (exportObject: IExportApi, parentDiv: HTMLDivElement) => {
    // create a div to store the export data
    const exportDiv = document.createElement('div') as HTMLDivElement;
    parentDiv.appendChild(exportDiv)

    // create a label with the export name
    const labelElement = document.createElement('label') as HTMLLabelElement;
    exportDiv.appendChild(labelElement)
    labelElement.innerText = exportObject.displayname || exportObject.name;

    return exportDiv;
}

const createExportElement = (session: ISessionApi, exportObject: IExportApi, parentDiv: HTMLDivElement) => {
    // create a div to store the export data
    const exportDiv = createExportDiv(exportObject, parentDiv);

    // create a button element to manipulate the export
    const buttonElement = document.createElement('button') as HTMLButtonElement;
    exportDiv.appendChild(buttonElement);
    buttonElement.innerText = exportObject.name;

    buttonElement.onclick = async () => {

        if (exportObject.type === EXPORT_TYPE.DOWNLOAD) {
            const res = await exportObject.request();
            window.open(res.content[0].href);
        } else {
            await exportObject.request()
        }
    }
}

export const createExportMenu = (session: ISessionApi) => {

    const menuDiv = document.getElementById('exportMenu') as HTMLDivElement;

    // order the exports via their order property
    const ordereredExports = Object.values(session.exports).sort((a: IExportApi, b: IExportApi) => (a.order === undefined ? Infinity : a.order) - (b.order === undefined ? Infinity : b.order))

    for (let i = 0; i < ordereredExports.length; i++) {
        const exportObject = ordereredExports[i];

        // exports can be hidden via the platform
        if (exportObject.hidden === true) continue;

        // if an export has a group, we want to display it within that group
        let parentDiv: HTMLDivElement = menuDiv;
        if (exportObject.group !== undefined) {
            // we search if there already exists an element with the group id, if not, we create one
            let exportGroupDiv = document.getElementById(exportObject.group.id) as HTMLDivElement | null;
            if (!exportGroupDiv) {
                // we create a new div for this export group
                exportGroupDiv = document.createElement('div') as HTMLDivElement;
                exportGroupDiv.id = exportObject.group.id;
                menuDiv.appendChild(exportGroupDiv);

                // create a label for this group
                const labelElement = document.createElement('label') as HTMLLabelElement;
                exportGroupDiv.appendChild(labelElement);
                labelElement.innerText = exportObject.group.name;
                labelElement.style.fontWeight = "bold";
            }
            // if there is a group we add the export elements to it
            parentDiv = exportGroupDiv;
        }

        // depending on the type of export, we create the correct input elements in the menu
        createExportElement(session, exportObject, parentDiv);
    }

}