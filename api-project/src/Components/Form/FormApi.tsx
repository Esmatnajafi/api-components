import { useEffect, useState } from "react";
import axios from "axios";
import { PhotoApi } from "./PhotoApi";

const FormApi: React.FC = ()=> {

    const [newApi, setnewApi] = useState<PhotoApi[]>([]);

    useEffect(() => {
        const getApi = async () =>{ 
            try {
            const fetchData = await axios.get('https://fakestoreapi.com/products');
            setnewApi(fetchData.data);
        } catch (error) {
            console.log("error fetching data", error);
        }
    }
        getApi();
    }, []);

    return(
      <div className="container">
        {newApi.map((itemValue) => (
            <><div className="card" key={itemValue.id}>
                <h4>{itemValue.title}</h4>
            </div>
            <img src={itemValue.image} alt={itemValue.title} /><p>Price: {itemValue.price}</p><p>Description: {itemValue.description}</p><p>Category: {itemValue.category}</p></>
        ))}
      </div>
    );
}


export default FormApi;