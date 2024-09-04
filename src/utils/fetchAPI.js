async function fetchAPI(url, argData = null, method = "GET") {
    const options = {
        method,
        headers: {},
        credentials: "include",
    };

    if (["POST", "PUT", "PATCH"].includes(method) && argData) {
        if (argData instanceof FormData) {
            options.body = argData;
        } else {
            options.body = JSON.stringify(argData);
            options.headers["Content-Type"] = "application/json";
        }
    }

    try {
        const response = await fetch(url, options);
        const responseBody = await response.json();

        if (!response.ok) {
            const errorMessage = `Error: ${response.status} - ${responseBody?.message}`;
            throw new Error(errorMessage);
        }

        return responseBody?.data || responseBody;
    } catch (error) {
        throw error;
    }
}

export default fetchAPI;
