import React, { useState} from 'react'
import { Tag } from 'lucide-react';
import { NewsCard } from '../NewsCard';
import "./main.scss"
import { Usernow } from '../../redux/authSlice';

interface AppointmentsProps {
  user: Usernow | null;
}

export function HomePage(props : AppointmentsProps) {
  const promotions = [
    {
      image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
      title: 'Скидка 20% на первый прием',
      description: 'Специальное предложение для новых пациентов',
      discount: '-20%',
    },
    {
      image: 'https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
      title: 'Комплексное обследование',
      description: 'Полное обследование организма со скидкой 30%',
      discount: '-30%',
    },
    {
      image: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
      title: 'Детская вакцинация',
      description: 'Бесплатная консультация педиатра при вакцинации',
      discount: 'Бесплатно',
    },
    {
      image: 'https://images.unsplash.com/photo-1666214280557-f1b5022eb634?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
      title: 'Семейная карта здоровья',
      description: 'Скидка 15% на все услуги для всей семьи',
      discount: '-15%',
    },
  ];

  const newsItems = [
    {
      image: 'https://images.unsplash.com/photo-1662414185445-b9a05e26dba0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
      title: 'Новый филиал открыт в центре города',
    },
    {
      image: 'https://images.unsplash.com/photo-1584982751601-97dcc096659c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
      title: 'Новые специалисты в нашей команде',
    },
    {
      image: 'https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
      title: 'Обновленные стандарты безопасности',
    },
    {
      image: 'https://images.unsplash.com/photo-1721076749160-e5a08d53c787?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
      title: 'Современное медицинское оборудование',
    },
  ];

  return (
    <div className="home-page">
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