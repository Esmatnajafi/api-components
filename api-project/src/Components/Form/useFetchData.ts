import { useEffect, useState } from "react";
import axios from "axios";
import { PhotoApi } from "./PhotoApi";

export const useFetchData = () =>{
    const [data, setData] = useState([] as PhotoApi[]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");


    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("https://fakestoreapi.com/products");
                setData(response.data);
                setLoading(false);
            } catch (error) {
                setError("error message 404");
                setLoading(false);
            }
        };
        fetchData();


        return () => {
            setData([]);
            setLoading(false);
            setError("");
        };
    }, []);

    return { data, loading, error };
}