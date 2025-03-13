import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { Button } from "@/components/ui/button";
import OptimizedImage from '@/components/OptimizedImage';

export const metadata: Metadata = {
  title: 'АромаДиагностика | Aroma Spa Studio',
  description: 'Индивидуальная консультация с использованием эфирных масел doTERRA для анализа вашего состояния и подбора оптимального решения в Санкт-Петербурге.',
  openGraph: {
    title: 'АромаДиагностика | Aroma Spa Studio',
    description: 'Индивидуальная консультация с использованием эфирных масел doTERRA для анализа вашего состояния и подбора оптимального решения.',
    images: [{ url: 'https://aroma-spa-studio.ru/images/services/aromadiagnostika.jpg' }],
  },
};

export default function AromaDiagnosticsPage() {
  return (
    <div className="min-h-screen bg-purple-900 text-white py-20">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold mb-8 text-center">АромаДиагностика</h1>
        <div className="max-w-3xl mx-auto">
          <OptimizedImage
            src="/images/services/aromadiagnostika.jpg"
            alt="АромаДиагностика в Aroma Spa Studio"
            width={800}
            height={400}
            className="rounded-lg mb-8"
          />
          <p className="mb-6">
            АромаДиагностика - это индивидуальная консультация, в ходе которой мы исследуем Ваше эмоциональное и физическое состояние методом Аромадиагностирования на базе 100% эфирных масел стандарта качества CPTG doTERRA с расшифровкой.
          </p>
          <h2 className="text-2xl font-semibold mb-4">Что включает в себя сеанс:</h2>
          <ul className="list-disc list-inside mb-6">
            <li>Анализ текущего состояния</li>
            <li>Подбор индивидуальной комбинации эфирных масел</li>
            <li>Рекомендации по использованию масел</li>
            <li>Создание персональных ресурсных духов</li>
          </ul>
          <p className="mb-6">
            Продолжительность сеанса: 2 часа
          </p>
          <p className="mb-6">
            Стоимость: 2000₽
          </p>
          <div className="text-center">
            <Link href="/#контакты">
              <Button className="bg-fuchsia-600 hover:bg-fuchsia-700 text-white">
                Записаться на АромаДиагностику
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

