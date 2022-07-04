
const baseurlApi = 'https://wayrus-appi.herokuapp.com';

/**
 * @param {string} endpoint 
 * @param {string} method 
 * @param {any} data 
 * @returns promise
 */

export const fetchToApi = async (endpoint, method, data ) => {
    let response;

    const url = `${baseurlApi}/${endpoint}`;
    if (method === "GET") {
        response = await fetch(url)
    } else {
        response = await fetch(url, {
            method,
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify( data )
        })
    }

    return await response.json();
}
