import React from 'react';
import { Carousel3D } from './Carousel3D';

const images = [
  {
    src: "/images/spa1.jpg",
    alt: "Спа процедуры"
  },
  {
    src: "/images/spa2.jpg",
    alt: "Массаж"
  },
  {
    src: "/images/spa3.jpg",
    alt: "Ароматерапия"
  },
  {
    src: "/images/spa4.jpg",
    alt: "Уход за лицом"
  },
  {
    src: "/images/spa5.jpg",
    alt: "Релаксация"
  }
];

export const CarouselSection = () => {
  return (
    <section className="py-16 bg-gradient-to-b from-neutral-50 to-neutral-100">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8">
          Наши спа-процедуры
        </h2>
        <p className="text-center text-neutral-600 mb-12 max-w-2xl mx-auto">
          Погрузитесь в мир релаксации и гармонии с нашими уникальными спа-процедурами.
          Каждая процедура - это путешествие к восстановлению баланса тела и души.
        </p>
        <Carousel3D 
          images={images} 
          className="max-w-4xl mx-auto shadow-2xl"
        />
      </div>
    </section>
  );
};
