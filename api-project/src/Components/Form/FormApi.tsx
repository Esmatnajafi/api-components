import { useEffect, useState } from "react";
import axios from "axios";
import { PhotoApi } from "./PhotoApi";
import SelectedItemsList from "../ItemList/SelectedItemsList";

const FormApi: React.FC = () => {
  const [newApi, setnewApi] = useState<PhotoApi[]>([]);

  const [selectedItems, setSelectedItems] = useState<{ id: number; title: string; quantity: number; price: number; }[]>([]);

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
    const newItem = newApi[index];
    const existingItem = selectedItems.find((item) => item.id === newItem.id);
    if (!existingItem) {
        setSelectedItems((prevState) => [...prevState, { ...newItem, quantity: 1 }]);
    }
  };
  

  return (
    <div className="container">
        <SelectedItemsList
        selectedItems={selectedItems}
        setSelectedItems={setSelectedItems}
      />
      {newApi.map((itemValue, index) => (
        <div key={itemValue.id} className="card">
          <h4>{itemValue.title}</h4>
          <div className="image-container">
            <img src={itemValue.image} alt={itemValue.title} />
          </div>
          <p>
            <span>Price: </span> {itemValue.price} $
          </p>
          <p>
            <span>Description:</span>{" "}
            <p className={selectedItems[index] ? "expanded" : ""}>
              {itemValue.description}
            </p>
            {!selectedItems[index] && (
              <p
                className="read-more"
                onClick={() => handleClick(index)}
              >
                Read More
              </p>
            )}
          </p>
          <p>
            <span>Category:</span> {itemValue.category}
          </p>
          <button onClick={() => handleClick(index)}>Add</button>
          {selectedItems.some((selectedItem) => selectedItem.title === itemValue.title) && <p>Item selected!</p>}
        </div>
      ))}
    </div>
  );
};

export default FormApi;
