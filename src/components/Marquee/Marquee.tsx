import React from "react";

export function MarqueeBar() {
  const items = [
    "Мы в социальных сетях!",
    "Скорая медицинская помощь   24/7",
    "Проведи отпуск в наших санаториях",
    "Не забудь пройти диспансеризацию!",
    
  ];

  return (
    <div className="w-full bg-[#46abf1] text-white py-3 overflow-hidden mb-6 max-[541px]:py-1">
      <div className="flex gap-[60px] animate-marquee whitespace-nowrap max-[541px]:h-[22px]">
        {items.map((item, index) => (
          <span
            key={`first-${index}`}
            className="text-[18px] md:text-[14px] font-semibold inline-block px-10 relative cursor-pointer before:content-['⭐'] before:mr-3 after:content-['⭐'] after:ml-3  max-[541px]:text-[14px]  max-[541px]:px-5  max-[541px]:h-[22px]"
          >
            {item}
          </span>
        ))}
        {items.map((item, index) => (
          <span
            key={`second-${index}`}
            className="text-[18px] md:text-[14px] font-semibold inline-block px-10 relative cursor-pointer before:content-['⭐'] before:mr-3 after:content-['⭐'] after:ml-3"
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
