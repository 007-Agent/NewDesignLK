import React from "react";

export function MarqueeBar() {
  const items = [
    "Мы в социальных сетях!",
    "Скорая медицинская помощь   24/7",
    "Проведи отпуск в наших санаториях",
    "Не забудь пройти диспансеризацию!",
    "Проведи отпуск в наших санаториях!",
  ];

  return (
    <div className="w-full bg-[#46abf1] text-white py-3 overflow-hidden mb-6">
      <div className="flex gap-[60px] animate-marquee whitespace-nowrap">
        {items.map((item, index) => (
          <span
            key={`first-${index}`}
            className="text-[18px] md:text-[14px] font-semibold inline-block px-10 relative cursor-pointer before:content-['⭐'] before:mr-3 after:content-['⭐'] after:ml-3"
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
