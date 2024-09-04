import { useEffect, useState } from "react";

async function useFetch(url, argData, method = "GET") {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const controller = new AbortController();
        const { signal } = controller;

        const options = {
            method,
            signal,
        };

        if (["POST", "PUT", "PATCH"].includes(method)) {
            if (argData instanceof FormData) options.body = argData;
            else {
                options.body = JSON.stringify(argData);
                options.headers = {
                    "Content-Type": "application/json",
                };
            }
        }

        async function fetchData() {
            try {
                const response = await fetch(url, options);
                if (!response.ok)
                    throw new Error(
                        `Error: ${response.status} - ${response.statusText}`
                    );

                const result = await response.json();
                setData(result?.data);
            } catch (error) {
                setError(error.message || "Something went wrong ");
            } finally {
                setLoading(false);
            }
        }

        fetchData();

        return () => {
            controller.abort();
        };
    }, [url, argData, method]);

    return { data, loading, error };
}

export { useFetch };
