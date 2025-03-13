import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CartItem } from './OilShop';
import { submitTelegramMessage } from '@/app/actions/telegram';
import { useToast } from "@/components/ui/use-toast";
import Confetti from 'react-confetti';
import { useRouter } from 'next/navigation';
import OptimizedImage from './OptimizedImage';

interface CheckoutWizardProps {
  cart: CartItem[];
  onClose: () => void;
  onBackToShop: () => void;
  className?: string;
}

export default function CheckoutWizard({ cart, onClose, onBackToShop, className }: CheckoutWizardProps) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const router = useRouter();
  const { toast } = useToast();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;
    
    setIsSubmitting(true);

    try {
      const orderDetails = cart.map(item => `${item.name} x ${item.quantity} - ${item.price * item.quantity} ₽`).join('\n');
      const message = `Новый заказ:\n\nИмя: ${formData.name}\nТелефон: ${formData.phone}\n\nЗаказ:\n${orderDetails}\n\nИтого: ${getTotalPrice()} ₽`;

      const result = await submitTelegramMessage(message);
      
      // Show success effects immediately
      setShowConfetti(true);
      setShowConfirmation(true);
      
      // Clear cart from localStorage
      localStorage.removeItem('cart');
      
      // Redirect after delay
      setTimeout(() => {
        setShowConfetti(false);
        setShowConfirmation(false);
        router.push('/');
      }, 3000);
      
    } catch (error) {
      console.error('Error:', error);
      toast({
        title: "Ошибка",
        description: "Не удалось отправить заказ. Пожалуйста, попробуйте еще раз.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle window resize for confetti
  const [windowSize, setWindowSize] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 0,
    height: typeof window !== 'undefined' ? window.innerHeight : 0,
  });

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    if (typeof window !== 'undefined') {
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }
  }, []);

  return (
    <div className="fixed inset-0 z-0">
      <OptimizedImage
        src="https://i.ibb.co/cbBnDNx/image-fx-3.png"
        alt="Background"
        width={1920}
        height={1080}
        className="w-full h-full object-cover"
        loading="lazy"
      />
      {showConfetti && (
        <Confetti
          width={windowSize.width}
          height={windowSize.height}
          recycle={false}
          numberOfPieces={500}
        />
      )}
      
      <AnimatePresence>
        {showConfirmation && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="fixed inset-0 flex items-center justify-center z-[1001]"
          >
            <div className="bg-purple-600/90 border-2 border-fuchsia-400 text-white p-8 rounded-lg shadow-lg text-center">
              <h3 className="text-2xl font-bold mb-4">Ваш заказ в работе</h3>
              <p className="text-lg">Мы вам перезвоним</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        className={`bg-transparent backdrop-blur-sm p-6 rounded-lg w-full max-w-md ${className}`}
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-white">Оформление заказа</h2>
          <Button 
            variant="ghost" 
            onClick={onBackToShop}
            className="text-white/80 hover:text-fuchsia-400 p-2 h-auto w-auto hover:bg-transparent rounded-md transition-colors"
          >
            <X className="h-6 w-6" />
          </Button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            type="text"
            name="name"
            placeholder="Ваше имя"
            value={formData.name}
            onChange={handleChange}
            className="bg-purple-800/30 text-white border-fuchsia-500/30"
            required
            disabled={isSubmitting}
          />
          <Input
            type="tel"
            name="phone"
            placeholder="Ваш телефон"
            value={formData.phone}
            onChange={handleChange}
            className="bg-purple-800/30 text-white border-fuchsia-500/30"
            required
            disabled={isSubmitting}
          />
          
          <div className="space-y-2">
            <h3 className="text-lg font-semibold text-white mb-2">Ваш заказ:</h3>
            {cart.map((item) => (
              <div key={item.id} className="flex justify-between text-white/90">
                <span>{item.name} x {item.quantity}</span>
                <span>{item.price * item.quantity} ₽</span>
              </div>
            ))}
            <div className="text-xl font-bold text-white pt-4 border-t border-white/10">
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
      </motion.div>
    </div>
  );
}

