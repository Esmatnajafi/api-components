import { PhotoApi } from "../Form/PhotoApi";
import { useState } from "react";

export const useSelectedItem = () => {
  const [selectedItems, setSelectedItems] = useState<{ id: number; title: string; quantity: number; price: number }[]>([]);
  const addItem = (item: PhotoApi) => {
    const existingItem = selectedItems.find((selectedItem) => selectedItem.id === item.id
    );
    if (!existingItem) {
      setSelectedItems((prevItems) => [...prevItems, { ...item, quantity: 1 }]);
    }
  };

  const removeItem = (itemId: number) => {
    setSelectedItems((prevItems) =>
      prevItems.filter((item) => item.id !== itemId)
    );
  };

  const updateQuantity = (itemId: number, newQuantity: number) => {
    setSelectedItems((prevItems) =>
      prevItems.map((item) =>
        item.id === itemId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  return {
    selectedItems,
    addItem,
    removeItem,
    updateQuantity,
  };
};
