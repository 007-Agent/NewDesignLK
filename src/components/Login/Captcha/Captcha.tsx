import React, { useState } from "react";
import { RefreshCcw } from "lucide-react";

const Captcha = () => {
  const [index, setIndex] = useState(Date.now());

  const handleRefresh = () => setIndex(Date.now());

  return (
    <>
      <div className="flex items-center center">
        <img
          src={`/api/login/captcha?${index}`}
          alt="captcha"
          className="max-[450px]:h-15"
        />
        <RefreshCcw onClick={handleRefresh} className="w-5 h-5" />
      </div>
    </>
  );
};
export default Captcha;
