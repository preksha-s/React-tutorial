import React, { useState } from "react";

const Counter = () => {
  const incrementCount = () => {
    // Update state with incremented value
    setCount(count + 1);
  };

  const [count, setCount] = useState(0);
  return (
    <div>
      <h1> {count}</h1>
      <button onClick={incrementCount}>Click Here</button>
    </div>
  );
};
export default Counter;
