import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { X } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CartItem } from './OilShop';
import { submitTelegramMessage } from '@/app/actions/telegram';

interface CheckoutFormProps {
  cart: CartItem[];
  onClose: () => void;
  onSubmit: () => void;
}

export function CheckoutForm({ cart, onClose, onSubmit }: CheckoutFormProps) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const formRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (formRef.current) {
      formRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const orderDetails = cart.map(item => `${item.name} x ${item.quantity} - ${item.price * item.quantity} ₽`).join('\n');
    const message = `Новый заказ:

Имя: ${name}
Телефон: ${phone}

Заказ:
${orderDetails}

Итого: ${getTotalPrice()} ₽`;

    try {
      const result = await submitTelegramMessage(message);
      if (result.success) {
        onSubmit();
      } else {
        throw new Error(result.error || 'Неизвестная ошибка при отправке заказа');
      }
    } catch (error) {
      console.error('Error sending order to Telegram:', error);
      alert('Произошла ошибка при отправке заказа. Пожалуйста, попробуйте еще раз.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.div
      ref={formRef}
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 50 }}
      className="fixed inset-0 backdrop-blur-sm flex items-center justify-center z-50"
    >
      <div className="bg-transparent backdrop-blur-xl p-6 rounded-lg w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-white">Оформление заказа</h2>
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={onClose}
            className="text-white hover:bg-purple-800/50 hover:text-white"
          >
            <X className="h-6 w-6" />
          </Button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            type="text"
            placeholder="Ваше имя"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="bg-purple-800/30 text-white border-fuchsia-500/30 focus:border-fuchsia-500 backdrop-blur-md"
          />
          <Input
            type="tel"
            placeholder="Ваш телефон"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
            className="bg-purple-800/30 text-white border-fuchsia-500/30 focus:border-fuchsia-500 backdrop-blur-md"
          />
          <div className="space-y-2">
            <h3 className="text-lg font-semibold text-white">Ваш заказ:</h3>
            {cart.map((item) => (
              <div key={item.id} className="flex justify-between text-white/90">
                <span>{item.name} x {item.quantity}</span>
                <span>{item.price * item.quantity} ₽</span>
              </div>
            ))}
            <div className="text-xl font-bold text-white mt-2">
              Итого: {getTotalPrice()} ₽
            </div>
          </div>
          <Button
            type="submit"
            className="w-full bg-fuchsia-600 hover:bg-fuchsia-700 text-white"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Отправка...' : 'Подтвердить заказ'}
          </Button>
        </form>
      </div>
    </motion.div>
  );
}

