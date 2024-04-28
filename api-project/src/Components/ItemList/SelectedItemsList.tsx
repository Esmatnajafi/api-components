
interface Props {
  selectedItems: { id: number; title: string; quantity: number; price: number }[];
  setSelectedItems: React.Dispatch<
    React.SetStateAction<{ id: number; title: string; quantity: number; price: number }[]>
  >;
}

const SelectedItemsList: React.FC<Props> = ({ selectedItems, setSelectedItems }) => {
  const handleRemove = (itemId: number) => {
    const updatedItems = selectedItems.filter((item) => item.id !== itemId);
    setSelectedItems(updatedItems);
  };

  const handleQuantityChange = (itemId: number, newQuantity: number) => {
    if (newQuantity <= -1) {
      handleRemove(itemId); // Remove item if quantity becomes zero
    } else {
      const updatedItems = selectedItems.map((item) =>
        item.id === itemId ? { ...item, quantity: newQuantity } : item
      );
      setSelectedItems(updatedItems);
    }
  };


  const totalAmount = selectedItems.reduce((total, item) => total + item.quantity * item.price, 0);


  return (
    <div className="selected-items-container">
      <h2>Selected Items</h2>
      <ul>
        {selectedItems.map((item) => (
          <li key={item.id}>
            {item.title} - Price: ${item.price.toFixed(2)} 
            <button onClick={() => handleQuantityChange(item.id, item.quantity - 1)}> -</button>
            {item.quantity}
            <button onClick={() => handleQuantityChange(item.id, item.quantity + 1)}> +</button>
            <button onClick={() => handleRemove(item.id)}>Remove</button>
          </li>
        ))}    
      </ul>
      <div className="total-amount">
      <p> Total Amount: ${totalAmount.toFixed(2)}</p>
      </div>       
    </div>
  );
};



export default SelectedItemsList;