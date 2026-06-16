import React from "react";
import { Toaster } from "react-hot-toast";

export const CustomToaster = () => {
  return (
    <Toaster
      position="top-right"
      reverseOrder={false}
      gutter={8}
      toastOptions={{
        duration: 10000,
        style: {
          background: "#fff",
          color: "#333",
          border: "2px solid #f5bf03",
          borderRadius: "12px",
          padding: "16px 20px",
          fontSize: "16px",
          boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
        },
        success: {
          iconTheme: {
            primary: "#f5bf03",
            secondary: "#fff",
          },
        },
      }}
    />
  );
};
