import React, { useState } from "react";
import { addItem } from "../services/firestoreService";

const AddItemForm = () => {
  const [input, setInput] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input) return;
    await addItem("your-collection-name", { name: input });
    setInput("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input 
        type="text" 
        value={input} 
        onChange={(e) => setInput(e.target.value)} 
        placeholder="Enter item"
      />
      <button type="submit">Add Item</button>
    </form>
  );
};

export default AddItemForm;
