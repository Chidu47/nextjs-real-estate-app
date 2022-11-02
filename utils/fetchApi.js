import axios from "axios";

export const baseUrl = process.env.NEXT_APP_BASE_URL;

export const fetchApi = async (url) => {
    // try {
    const data = await axios.get(url, {
        headers: {
            "x-rapidapi-host": "bayut.p.rapidapi.com",
            "x-rapidapi-key": process.env.NEXT_APP_API_KEY,
        },
    });
    return data
    // } catch (err) {
    //     console.log(err.response.status);
    //     return err
    // }

    // return data;
};
