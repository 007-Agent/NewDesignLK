import React from "react";

import san1 from "../../assets/images/Sanatoriy/Гурзуф.jpg";
import san2 from "../../assets/images/Sanatoriy/Поляны.jpg";
import san3 from "../../assets/images/Sanatoriy/Авангард.jpg";

interface Profile {
  id: number;
  uuid: string;
  firstName: string;
  lastName: string;
  middleName: string;
  birthday: string;
  email: string;
  phone: string;
  username: string | null;
  name: string | null;
  polId: number;
  stateId: number;
  authorities: string[];
  captcha: any;
  agreed: number;
}

interface SanatoriumProps {
  user: Profile | null;
}

const sanatoriums = [
  {
    id: 1,
    name: "Гурзуфский Санаторий",
    location: "Гурзуф, Крым",
    image: san1,
    description:
      "Гурзуфский санаторий расположен на живописном берегу Чёрного моря в окружении вековых парков и горных пейзажей. Здесь предоставляется комплексное санаторно-курортное лечение с применением современных методов физиотерапии, грязелечения и бальнеологических процедур. Мягкий средиземноморский климат и морской воздух оказывают благотворное воздействие на органы дыхания и сердечно-сосудистую систему.",
    features: ["Физиотерапия", "Грязелечение", "Бальнеология", "Морские ванны"],
    url: "https://www.kdpmc.ru/sanatorij-gurzufskij/",
  },
  {
    id: 2,
    name: "Санаторий «Поляны»",
    location: "Подмосковье",
    image: san2,
    description:
      "Санаторий «Поляны» утопает в зелени смешанного леса и предлагает спокойную атмосферу для восстановления здоровья. Специализируется на лечении заболеваний опорно-двигательного аппарата, нервной системы и реабилитации после травм. На территории санатория оборудованы прогулочные дорожки, закрытый бассейн и современный SPA-комплекс для полноценного отдыха.",
    features: ["Реабилитация", "Бассейн", "SPA-комплекс", "Лесные прогулки"],
    url: "https://www.kdpmc.ru/detskiy-sanatoriy-polayni/",
  },
  {
    id: 3,
    name: "Санаторий «Авангард»",
    location: "Сочи, Краснодарский край",
    image: san3,
    description:
      "Санаторий «Авангард» — современный медицинский курорт на черноморском побережье с богатой историей оздоровления. Учреждение оснащено передовым диагностическим и лечебным оборудованием, предлагает программы профилактики сердечно-сосудистых заболеваний, лечения органов пищеварения и укрепления иммунитета. Опытный медицинский персонал разрабатывает индивидуальные программы лечения для каждого пациента.",
    features: ["Кардиология", "Диагностика", "Иммунотерапия", "Диетотерапия"],
    url: "https://www.kdpmc.ru/sanatoriy-avangard-sochi/",
  },
];

export function Sanatorium({ user }: SanatoriumProps) {
  const handleCardClick = (url: string) => {
    window.open(url, "_blank"); // открывается в новой вкладке
    // Или window.location.href = url; // открывается в той же вкладке
  };
  return (
    <div className="px-4 md:px-8 py-8 max-w-[1100px] mx-auto">
      {/* Заголовок */}
      <div className="mb-10 text-center">
        <h1 className="text-orange-500 mb-3 text-3xl md:text-4xl font-bold">
          Отдых и Санаторно-курортное лечение
        </h1>
        <p className="text-gray-500 max-w-[680px] mx-auto text-base md:text-lg">
          Мы сотрудничаем с ведущими санаторно-курортными учреждениями, чтобы
          обеспечить нашим пациентам полноценное восстановление здоровья в
          комфортных условиях.
        </p>
      </div>

      {/* Сетка карточек */}
      <div className="flex flex-col gap-8">
        {sanatoriums.map((s) => (
          <div
            key={s.id}
            className="flex flex-col md:flex-row bg-white rounded-2xl shadow-md hover:shadow-orange-200/50 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden h-[500px]"
          >
            {/* Левая часть с изображением */}
            <div className="relative flex-none md:w-[340px] h-full ">
              <img src={s.image} alt={s.name} className="w-full h-full " />
              <span className="absolute top-4 left-4 bg-teal-500/90 text-white text-xs md:text-sm font-medium px-3 py-1 rounded-full">
                {s.location}
              </span>
            </div>

            {/* Правая часть с контентом */}
            <div className="flex-1 p-5 md:p-7 flex flex-col gap-3">
              <h2 className="text-gray-800 text-xl md:text-2xl font-bold m-0">
                {s.name}
              </h2>
              <p className="text-gray-500 leading-relaxed m-0">
                {s.description}
              </p>

              {/* Список тегов/удобств */}
              <div className="flex flex-wrap gap-2 mt-1">
                {s.features.map((f) => (
                  <span
                    key={f}
                    className="bg-orange-50 text-orange-600 border border-orange-200 text-xs md:text-sm font-medium px-3 py-1 rounded-full"
                  >
                    {f}
                  </span>
                ))}
              </div>

              {/* Кнопка */}
              <button
                className="self-start mt-auto bg-gradient-to-r from-orange-500 to-orange-400 text-white font-semibold py-2 px-6 rounded-lg hover:opacity-90 hover:scale-105 transition-all duration-200 shadow-md"
                onClick={() => handleCardClick(s.url)}
              >
                Подробнее
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
