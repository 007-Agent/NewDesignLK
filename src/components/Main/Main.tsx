import React, { useState} from 'react'
import { Tag } from 'lucide-react';
import { NewsCard } from '../NewsCard';
import "./main.scss"
import { MarqueeBar } from '../Marquee/Marquee';
import { Usernow } from '../../redux/authSlice';
import dmc from "../../assets/images/dmc-photo.jpg"
import action1 from "../../assets/images/action-1.png"
import action2 from "../../assets/images/action-2.png"
import action3 from "../../assets/images/action-3.jpg"
import action4 from "../../assets/images/action-3.jpg"

import new2 from  "../../assets/images/Авангард.jpg"
import new1 from "../../assets/images/action-1.png"
import new3 from "../../assets/images/Аптека3.jpg"

interface AppointmentsProps {
  user: Usernow | null;
}

export function HomePage(props : AppointmentsProps) {
  const promotions = [
    {
      image: action1,
      title: 'Скидка 20% на первый прием',
      description: 'Специальное предложение для новых пациентов',
      discount: '-20%',
    },
    {
      image: action2,
      title: 'Комплексное обследование',
      description: 'Полное обследование организма со скидкой 30%',
      discount: '-30%',
    },
    {
      image: action3,
      title: 'Детская вакцинация',
      description: 'Бесплатная консультация педиатра при вакцинации',
      discount: 'Бесплатно',
    },
    {
      image: action4,
      title: 'Семейная карта здоровья',
      description: 'Скидка 15% на все услуги для всей семьи',
      discount: '-15%',
    },
  ];

  const newsItems = [
    {
      image: new1,
      title: 'Новый филиал открыт в центре города',
    },
    {
      image: new2,
      title: 'Новые специалисты в нашей команде',
    },
    {
      image: new3,
      title: 'Обновленные стандарты безопасности',
    },
    {
      image: new3,
      title: 'Современное медицинское оборудование',
    },
  ];

  return (
    <div className="home-page">
      <MarqueeBar/>
      <div className="home-content-wrapper">
        {/* Новости теперь идут ПЕРВЫМИ (были акциями) */}
        <div className="news-section">
          <h3 className="section-title">Актуальные акции</h3>
          <div className="news-list">
            {promotions.map((item, index) => (
              <div key={index} className="news-item">
                <div className="news-item-image-wrapper">
                  <img src={item.image} alt={item.title} className="news-item-image" />
                </div>
                <div className="news-item-title">{item.title}</div>
              </div>
            ))}
          </div>
          <img src={dmc} alt="" className='img-new'/>
        </div>

        {/* Акции теперь идут ВТОРЫМИ (были новостями) */}
        <div className="promotions-section">
          <h3 className="section-title">Новости</h3>
          <div className="promotions-grid">
            {newsItems.map((promo, index) => (
              <div key={index} className="promotion-card">
                <div className="promotion-image-wrapper">
                  <img src={promo.image} alt={promo.title} className="promotion-image" />
                  
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