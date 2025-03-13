import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { X } from 'lucide-react';

interface BookingFormProps {
  onSubmit: (formData: BookingFormData) => void;
  onClose: () => void;
}

export interface BookingFormData {
  name: string;
  phone: string;
  service: string;
  date: string;
}

const services = [
  "АромаДиагностика",
  "АромаЙога",
  "АромаДегустация",
  "АромаНейрографика",
  "АромаТимбилдинг",
  "Консультация",
  "Хочу в АромаБизнес"
];

export function BookingForm({ onSubmit, onClose }: BookingFormProps) {
  const [formData, setFormData] = useState<BookingFormData>({
    name: '',
    phone: '',
    service: '',
    date: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleServiceChange = (value: string) => {
    setFormData({ ...formData, service: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 50 }}
      className="bg-white/10 backdrop-blur-sm p-4 rounded-lg w-full max-w-sm relative z-[90]"
    >
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-white">Запись на услугу</h3>
        <Button
          onClick={onClose}
          variant="ghost"
          size="sm"
          className="text-white/80 hover:text-white hover:bg-white/10"
        >
          <X size={18} />
        </Button>
      </div>
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          name="name"
          placeholder="Ваше имя"
          value={formData.name}
          onChange={handleChange}
          className="bg-white/10 border-white/20 text-white placeholder-white/50"
          required
        />
        <Input
          name="phone"
          placeholder="Ваш телефон"
          value={formData.phone}
          onChange={handleChange}
          className="bg-white/10 border-white/20 text-white placeholder-white/50"
          required
        />
        <Select onValueChange={handleServiceChange} value={formData.service}>
          <SelectTrigger className="bg-white/10 border-white/20 text-white">
            <SelectValue placeholder="Выберите услугу" />
          </SelectTrigger>
          <SelectContent className="bg-purple-900 border-fuchsia-500/30 z-[100] relative">
            {services.map((service) => (
              <SelectItem key={service} value={service} className="text-white hover:bg-fuchsia-600/50">
                {service}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Input
          name="date"
          type="date"
          value={formData.date}
          onChange={handleChange}
          className="bg-white/10 border-white/20 text-white"
          required
        />
        <Button type="submit" className="w-full bg-fuchsia-600 hover:bg-fuchsia-700 text-white font-semibold py-2">
          Отправить заявку
        </Button>
      </form>
    </motion.div>
  );
}

