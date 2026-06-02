import React from 'react';
import './spinner.css'; // создайте файл ниже
import { RefreshCw } from 'lucide-react';
export const Spinner: React.FC = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center  z-50">
      <RefreshCw className="spinner" />
    </div>
  );
};