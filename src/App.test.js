import React from "react";
import TestComponent from "./components/TestComponent";
import AddItemForm from "./components/AddItemForm";

function App() {
  return (
    <div>
      <h1>Firestore Test</h1>
      <AddItemForm />
      <TestComponent />
    </div>
  );
}

export default App;
