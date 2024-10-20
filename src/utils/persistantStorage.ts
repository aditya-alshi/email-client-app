export type emailMetaData = {
    id: number;
    read ?: boolean;
    favorite?: boolean
}

export function addDataToLocalStorage(data: emailMetaData[]) {
    localStorage.setItem('emailsMeta', JSON.stringify(data))
}

export function fetchDataFromLocalStorage(): emailMetaData[] {
    const storedEmailMeta = localStorage.getItem('emailsMeta')
    if(storedEmailMeta && storedEmailMeta.length > 0 ) {
        return JSON.parse(storedEmailMeta)
    }
    else {

        return []
    }
}