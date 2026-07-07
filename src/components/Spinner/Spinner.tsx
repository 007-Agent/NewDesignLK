import React from "react";
import "./spinner.css"; // создайте файл ниже
import { RefreshCw } from "lucide-react";
export const Spinner: React.FC = () => {
  return (
    <div className="absolute inset-0 flex items-center justify-center  z-10">
      <RefreshCw className="spinner" />
    </div>
  );
};
