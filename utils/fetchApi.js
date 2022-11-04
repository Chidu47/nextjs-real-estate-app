import axios from "axios";

export const baseUrl = process.env.NEXT_APP_BASE_URL;

export const fetchApi = async (url) => {
    const { data } = await axios.get(url, {
        headers: {
            "x-rapidapi-host": "bayut.p.rapidapi.com",
            "x-rapidapi-key": process.env.NEXT_APP_API_KEY,
        },
    });
    return data
};
