import React, { useEffect, useState } from "react";
import { getItems } from "../services/firestoreService"; // Import Firestore function

const TestComponent = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getItems("your-collection-name");
      setItems(data);
    };
    fetchData();
  }, []);

  return (
    <div>
      <h2>Fetched Data:</h2>
      {items.map((item) => (
        <p key={item.id}>{JSON.stringify(item)}</p>
      ))}
    </div>
  );
};

export default TestComponent;
