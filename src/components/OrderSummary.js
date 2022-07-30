import React from "react";
import { Link, useNavigate } from "react-router-dom";

const OrderSummary = () => {
 const navigate = useNavigate("");
  return (
    <div>
      Order confirmed!!
      <button onClick={() => navigate(-1)}>Goback</button>
    </div>
  );
};
export default OrderSummary;
