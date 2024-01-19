import React from "react";

const SubTotal = () => {
  return (
    <div>
      <p>SubTotal (oitems):$0</p>
      <input type="checkbox" /> this order contains a gift
      <button className="btn btn-warning rounded-0 btn-block">
        {" "}
        Proceed to Checkout
      </button>
    </div>
  );
};

export default SubTotal;
