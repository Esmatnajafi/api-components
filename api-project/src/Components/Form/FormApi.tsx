import { useEffect, useState } from "react";
import axios from "axios";
import { PhotoApi } from "./PhotoApi";

const FormApi: React.FC = () => {
  const [newApi, setnewApi] = useState<PhotoApi[]>([]);

  const [selectedItems, setSelectedItems] = useState<boolean[]>([]);

  useEffect(() => {
    const getApi = async () => {
      try {
        const fetchData = await axios.get("https://fakestoreapi.com/products");
        setnewApi(fetchData.data);
      } catch (error) {
        console.log("error fetching data", error);
      }
    };
    getApi();
  }, []);

  const handleClick = (index: number) => {
    setSelectedItems((prevState) => {
      const newState = [...prevState];
      newState[index] = !newState[index];
      return newState;
    });
  };

  const toggleExpand = (index: number) => {
    setSelectedItems((prevState) => {
      const newState = [...prevState];
      newState[index] = !newState[index];
      return newState;
    });
  };

  return (
    <div className="container">
      {newApi.map((itemValue, index) => (
        <div key={itemValue.id} className="card">
          <h4>{itemValue.title}</h4>
          <div className="image-container">
            <img src={itemValue.image} alt={itemValue.title} />
          </div>
          <p>
            <span>Price:</span> {itemValue.price}
          </p>
          <p>
            <span>Description:</span>{" "}
            <p className={selectedItems[index] ? "expanded" : ""}>
              {itemValue.description}
            </p>
            {!selectedItems[index] && (
              <p
                className="read-more"
                onClick={() => toggleExpand(index)}
              >
                Read More
              </p>
            )}
          </p>
          <p>
            <span>Category:</span> {itemValue.category}
          </p>
          <button onClick={() => handleClick(index)}>Add</button>
          {selectedItems[index] && <p>Item selected!</p>}
        </div>
      ))}
    </div>
  );
};

export default FormApi;
