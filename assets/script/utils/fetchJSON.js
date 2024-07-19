export const fetchJSON = async (url) => {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Failed to fetch ${url}: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();

        if (typeof data !== 'object' || data === null) {
            throw new Error(`Invalid JSON response from ${url}`);
        }

        return data;
    } catch (error) {
        console.error('Error fetching JSON from', url, error);
        throw error; 
    }
};