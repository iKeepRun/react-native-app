import {useEffect, useState} from "react";

const useFetch = <T>(fetchFunction: () => Promise<T>, autoFetch=true) => {
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState<T | null>(null);
    const [error, setError] = useState<Error | null>(null);

    const fetchData = async () => {
        try {
            setLoading(true);
            setError(null);
            const data = await fetchFunction();
            setData(data);
        } catch (err) {
            setError(err instanceof Error ? err : new Error("an error occurred")); // TODO: add more info
        } finally {
            setLoading(false);
        }
    }

    const reset = () => {
        setData(null);
        setError(null);
        setLoading(false);
    }


    useEffect(() => {
        if (autoFetch) {
            fetchData();
        }
    }, []);


    return {loading, data, error, refetch: fetchData, reset}

}


export default useFetch