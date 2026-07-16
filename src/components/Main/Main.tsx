//самая главная страница личного кабинета//
import React, { useState } from "react";

import "./main.scss";
import { MarqueeBar } from "../Marquee/Marquee";
import { Usernow } from "../../redux/slice/authSlice";
import dmc from "../../assets/images/dmc-photo.jpg";
import action1 from "../../assets/images/диспансеризация.jpg";
import action2 from "../../assets/images/вакцинация.jpg";
import action3 from "../../assets/images/КТ.jpg";
import action4 from "../../assets/images/МРТ.jpg";
import action5 from "../../assets/images/школа.jpg";
import action6 from "../../assets/images/стоматология.jpg";

import san1 from "../../assets/images/Sanatoriy/Гурзуф.jpg";
import san2 from "../../assets/images/Sanatoriy/Поляны.jpg";
import san3 from "../../assets/images/Sanatoriy/авангард-второй.jpg";

import new2 from "../../assets/images/авангард-второй.jpg";
import new1 from "../../assets/images/action-1.png";
import new3 from "../../assets/images/Аптека3.jpg";

interface AppointmentsProps {
  user: Usernow | null;
}

export function HomePage(props: AppointmentsProps) {
  const promotions = [
    {
      image: action1,
      title: "Комплексная диспансеризация (чекап) для детей",
      description: "Специальное предложение для новых пациентов",
      discount: "-20%",
      url: "https://www.kdpmc.ru/dispanserizacija-detej/",
    },
    {
      image: action2,
      title: "Вакцинация (прививки) для детей и взрослых",
      description: "Полное обследование организма со скидкой 30%",
      discount: "-30%",
      url: "https://www.kdpmc.ru/vakcinaciya/",
    },
    {
      image: action3,
      title: "КТ (МСКТ) - компьютерная томография",
      description: "Бесплатная консультация педиатра при вакцинации",
      discount: "Бесплатно",
      url: "https://www.kdpmc.ru/kompjuternaja-tomografija-2/",
    },
    {
      image: action4,
      title: " МРТ (магнитно-резонансная томография)",
      description: "Скидка 15% на все услуги для всей семьи",
      discount: "-15%",
      url: "https://www.kdpmc.ru/magnitno-rezonansnaja-tomografija-mrt/?utm_source=kdpmc.ru&utm_medium=banner&utm_campaign=mrt",
    },
    {
      image: action5,
      title: "Мамина школа",
      description: "Скидка 15% на все услуги для всей семьи",
      discount: "-15%",
    },
    {
      image: action6,
      title: "Стоматология для взрослых",
      description: "Скидка 15% на все услуги для всей семьи",
      discount: "-15%",
      url: "https://denta.kdpmc.ru/",
    },
  ];

  const newsItems = [
    {
      image: new3,
      title: "Аптека в Старопанском переулке",
    },
    {
      image: new2,
      title: "Сочи, первая линия, оздоровление всей семьи",
      rating: "★★★★",
    },
    {
      image: san1,
      title: "Крымская здравница у моря",
    },
    {
      image: san2,
      title: "Московская область, лечение и отдых для детей",
    },
  ];

  const handleGetSite = (url?: string) => {
    window.open(url, "_blank"); // открывается в новой вкладке
    // Или window.location.href = url; // открывается в той же вкладке
  };

  return (
    <div className="home-page">
      <MarqueeBar />
      <div className="home-content-wrapper">
        {/* Новости теперь идут ПЕРВЫМИ (были акциями) */}
        <div className="news-section">
          <h3 className="section-title">Актуальные предложения</h3>
          <div className="news-list">
            {promotions.map((item, index) => (
              <div
                key={index}
                className="news-item"
                onClick={() => handleGetSite(item.url)}
              >
                <div className="news-item-image-wrapper">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="news-item-image"
                  />
                </div>
                <div className="news-item-title">{item.title}</div>
              </div>
            ))}
          </div>
          <img src={dmc} alt="" className="img-new" />
        </div>

        {/* Акции теперь идут ВТОРЫМИ (были новостями) */}
        <div className="promotions-section">
          <h3 className="section-title">Важное</h3>
          <div className="promotions-grid">
            {newsItems.map((promo, index) => (
              <div key={index} className="promotion-card">
                <div className="promotion-image-wrapper">
                  <img
                    src={promo.image}
                    alt={promo.title}
                    className="promotion-image"
                  />
                </div>
                <div className="promotion-content">
                  <h4 className="promotion-title">{promo.title}</h4>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
