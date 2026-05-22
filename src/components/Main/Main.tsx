import React, { useState} from 'react'
import { Tag } from 'lucide-react';
import { NewsCard } from '../NewsCard';
import "./main.scss"
import { MarqueeBar } from '../Marquee/Marquee';
import { Usernow } from '../../redux/authSlice';
import dmc from "../../../public/images/dmc-photo.jpg"
import action from "../../../public/images/action-3.jpg"
interface AppointmentsProps {
  user: Usernow | null;
}

export function HomePage(props : AppointmentsProps) {
  const promotions = [
    {
      image: '../../../public/images/action-1.png',
      title: 'Скидка 20% на первый прием',
      description: 'Специальное предложение для новых пациентов',
      discount: '-20%',
    },
    {
      image: '../../../public/images/action-1.png',
      title: 'Комплексное обследование',
      description: 'Полное обследование организма со скидкой 30%',
      discount: '-30%',
    },
    {
      image: '../../../public/images/action-3.jpg',
      title: 'Детская вакцинация',
      description: 'Бесплатная консультация педиатра при вакцинации',
      discount: 'Бесплатно',
    },
    {
      image: '../../../public/images/OneVisit.png',
      title: 'Семейная карта здоровья',
      description: 'Скидка 15% на все услуги для всей семьи',
      discount: '-15%',
    },
  ];

  const newsItems = [
    {
      image: '../../../public/images/action-1.png',
      title: 'Новый филиал открыт в центре города',
    },
    {
      image: '../../../public/images/Авангард.jpg',
      title: 'Новые специалисты в нашей команде',
    },
    {
      image: '../../../public/images/Аптека3.jpg',
      title: 'Обновленные стандарты безопасности',
    },
    {
      image: 'https://images.unsplash.com/photo-1721076749160-e5a08d53c787?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
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
          <img src={dmc} alt="" />
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