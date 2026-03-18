import React, { useState} from 'react'
import { NewsCard } from './NewsCard'

import { Sidebar } from './SideBar/Sidebar';
import { Header } from './Header/Header';
export default function Main() {

    const newsItems = [
    {
      image: 'https://images.unsplash.com/photo-1662414185445-b9a05e26dba0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBob3NwaXRhbCUyMGJ1aWxkaW5nfGVufDF8fHx8MTc2ODMxMTQ1MXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      title: 'Новый филиал открыт в центре города',
      description:
        'Мы рады сообщить об открытии нового филиала для удобства наших пациентов',
    },
    {
      image: 'https://images.unsplash.com/photo-1584982751601-97dcc096659c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZWRpY2FsJTIwdGVhbSUyMGRvY3RvcnN8ZW58MXx8fHwxNzY4MjQxMTM4fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      title: 'Новые специалисты в нашей команде',
      description:
        'Присоединяйтесь к нам в приветствии наших новых врачей и медицинских сестер',
    },
    {
      image: 'https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkb2N0b3IlMjBwYXRpZW50JTIwY29uc3VsdGF0aW9ufGVufDF8fHx8MTc2ODIzNjY1OXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      title: 'Обновленные стандарты безопасности',
      description:
        'Узнайте о наших новых мерах безопасности для защиты пациентов и персонала',
    },
  ];

    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [currentPage, setCurrentPage] = useState('home');
    
  return (
     <>
    
                  {/* Welcome Section */}
                  <section className="mb-16">
                    <h2 className="mb-4">
                      Добро пожаловать в Медицинскую Поликлинику
                    </h2>
                    <p className="text-gray-600 max-w-3xl leading-relaxed">
                      Мы предлагаем широкий спектр медицинских услуг для всех наших
                      пациентов. Узнайте больше о наших услугах и специалистах.
                    </p>
                  </section>
    
                  {/* Latest News Section */}
                  <section>
                    <h2 className="mb-8">Последние новости</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                      {newsItems.map((item, index) => (
                        <NewsCard
                          key={index}
                          image={item.image}
                          title={item.title}
                          description={item.description}
                        />
                      ))}
                    </div>
                  </section>
    
              
                </>
  )
}
