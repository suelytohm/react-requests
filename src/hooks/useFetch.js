import { useState, useEffect } from 'react';

// Criando custom hook

export const useFetch = (url) => {
    
    const [data, setData] = useState(null);

    useEffect(() => {
        (async() => {

            const res = await fetch(url);
            const json = await res.json();

            setData(json);

        })();

    }, [url]);

    return { data };
}