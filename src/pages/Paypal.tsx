import React, { useState } from "react";
import {
  PayPalScriptProvider,
  PayPalButtons,
  usePayPalScriptReducer,
} from "@paypal/react-paypal-js";

const Checkout: React.FC = () => {
  const [{ options, isPending }, dispatch] = usePayPalScriptReducer();
  const [currency, setCurrency] = useState(options.currency);

  const onCurrencyChange = ({
    target: { value },
  }: React.ChangeEvent<HTMLSelectElement>) => {
    setCurrency(value);
    dispatch({
      type: "resetOptions",
      value: {
        ...options,
        currency: value,
      },
    });
  };

  const onCreateOrder = (data: any, actions: any) => {
    return actions.order.create({
      purchase_units: [
        {
          amount: {
            value: "8.99",
            currency_code: currency,
          },
        },
      ],
    });
  };

  const onApproveOrder = (data: any, actions: any) => {
    return actions.order.capture().then((details: any) => {
      const name = details.payer.name.given_name;
      alert(`Transaction completed by ${name}`);
    });
  };

  const onError = (err: any) => {
    console.error("Error during payment", err);
  };

  return (
    <PayPalScriptProvider
      options={{
        ...options,
        "client-id":
          "AV8satQzl6xdeYwhVfHFZ8scwCPszzmCfTaBfwtGi2Yow6el-QhRmkrpEhzlXJmY5Yy-eWb2nD_rAW0a",
      }}
    >
      <div className="checkout">
        {isPending ? (
          <p>LOADING...</p>
        ) : (
          <>
            <select value={currency} onChange={onCurrencyChange}>
              <option value="USD">💵 USD</option>
              <option value="EUR">💶 Euro</option>
            </select>
            <PayPalButtons
              style={{ layout: "vertical" }}
              createOrder={(data, actions) => onCreateOrder(data, actions)}
              onApprove={(data, actions) => onApproveOrder(data, actions)}
              onError={(err) => onError(err)}
            />
          </>
        )}
      </div>
    </PayPalScriptProvider>
  );
};

export default Checkout;
