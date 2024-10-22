import { fetchDataFromLocalStorage } from "../../utils/persistantStorage";

export interface Email {
    id: string | number,
    from: {
        email: string,
        name: string
    },
    read?: boolean;
    favorite?: boolean
    date: Date,
    subject: string,
    short_description: string
}

export async function fetchAllEmails(page: number | null) {

    const response = await fetch(`https://server-sigma-ashy.vercel.app/${page?"?page=" + page: ""}`);
    const { list }: { list: Email[] } = await response.json();
    // console.log(list);
    // const localEmailsData = fetchDataFromLocalStorage()
    // if (localEmailsData && localEmailsData.length > 0) {
    //     const mergedWithLocal = list.map((mail, i, arr) => {
    //         const localMail = localEmailsData.find(lm => lm.id == mail.id)
    //         return localMail ?
    //             { ...localMail, ...mail, } :
    //             { ...mail, read: false, favorite: false }
    //     })
    //     return mergedWithLocal
    // }
    return list;
}

export async function fetchEmailById(id: number | string) {
    try {
        const response = await fetch(`https://server-sigma-ashy.vercel.app/?id=${id}`)
        const parsedRespose = await response.json();
        

        return parsedRespose;
    } catch (error) {
        return {
            message: (error as Error).message
        }
    }
}