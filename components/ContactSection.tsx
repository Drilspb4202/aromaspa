import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent } from "@/components/ui/card"
import { Phone, Mail, MapPin, BellIcon as BrandTelegram, ShoppingBag, Calendar, User, Briefcase, MessageSquare } from 'lucide-react'
import { toast } from "@/components/ui/use-toast"
import { format } from 'date-fns'
import { ru } from 'date-fns/locale'
import { DatePicker } from "@/components/ui/date-picker"
import { submitTelegramMessage } from '@/app/actions/telegram'

export default function ContactSection() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    service: '',
    date: null as Date | null,
    additional_info: ''
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleServiceChange = (value: string) => {
    setFormData({ ...formData, service: value })
  }

  const handleDateChange = (date: Date | null) => {
    setFormData({ ...formData, date })
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const message = `Новая запись на услугу:
Имя: ${formData.name}
Телефон: ${formData.phone}
Услуга: ${formData.service}
Дата: ${formData.date ? format(formData.date, 'dd.MM.yyyy', { locale: ru }) : 'Не указана'}
Дополнительная информация: ${formData.additional_info || 'Нет'}`;

      console.log('Submitting form:', message);
      const result = await submitTelegramMessage(message);

      if (result.success) {
        console.log('Form submitted successfully:', result);
        toast({
          title: "Успешно!",
          description: "Ваша заявка успешно отправлена. Мы свяжемся с вами в ближайшее время.",
        });
        setFormData({ name: '', phone: '', service: '', date: null, additional_info: '' });
      } else {
        console.error('Form submission failed:', result);
        throw new Error(result.error || 'Неизвестная ошибка при отправке заявки');
      }
    } catch (error) {
      console.error("Ошибка при отправке формы:", error);
      toast({
        title: "Ошибка",
        description: `Не удалось отправить заявку: ${error instanceof Error ? error.message : 'Неизвестная ошибка'}`,
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="контакты" className="py-20 relative z-10">
      <div className="container mx-auto px-4 relative">
        <motion.h2
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-3xl md:text-4xl font-bold text-white mb-12 text-center"
        >
          ЗАПИСЬ НА УСЛУГИ
        </motion.h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Форма записи */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col h-full"
          >
            <Card className="bg-purple-900/30 border-fuchsia-500/30 flex-grow">
              <CardContent className="p-6 flex flex-col h-full">
                <h3 className="text-2xl font-bold text-fuchsia-400 mb-6">Записаться на услугу</h3>
                <form onSubmit={handleSubmit} className="space-y-6 flex-grow flex flex-col">
                  <div className="space-y-4">
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-fuchsia-500" />
                      <Input
                        name="name"
                        type="text"
                        placeholder="Ваше имя"
                        className="bg-purple-800/50 border-fuchsia-500/30 text-white placeholder-gray-400 pl-10"
                        required
                        value={formData.name}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-fuchsia-500" />
                      <Input
                        name="phone"
                        type="tel"
                        placeholder="Ваш телефон"
                        className="bg-purple-800/50 border-fuchsia-500/30 text-white placeholder-gray-400 pl-10"
                        required
                        value={formData.phone}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="relative">
                      <Briefcase className="absolute left-3 top-1/2 transform -translate-y-1/2 text-fuchsia-500 z-10" />
                      <Select onValueChange={handleServiceChange} value={formData.service}>
                        <SelectTrigger className="bg-purple-800/50 border-fuchsia-500/30 text-white pl-10">
                          <SelectValue placeholder="Выберите услугу" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Консультация">Консультация</SelectItem>
                          <SelectItem value="АромаДиагностика">АромаДиагностика</SelectItem>
                          <SelectItem value="АромаЙога">АромаЙога</SelectItem>
                          <SelectItem value="АромаДегустация">АромаДегустация</SelectItem>
                          <SelectItem value="АромаНейрографика">АромаНейрографика</SelectItem>
                          <SelectItem value="АромаТимбилдинг">АромаТимбилдинг</SelectItem>
                          <SelectItem value="Продажа Эфирных Масел">Продажа Эфирных Масел</SelectItem>
                          <SelectItem value="Хочу в АромаБизнес">Хочу в АромаБизнес</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-fuchsia-500" />
                      <DatePicker
                        selected={formData.date}
                        onSelect={handleDateChange}
                        locale={ru}
                        placeholderText="Выберите дату"
                        className="bg-purple-800/50 border-fuchsia-500/30 text-white placeholder-gray-400 w-full pl-10"
                      />
                    </div>
                    <div className="relative flex-grow">
                      <MessageSquare className="absolute left-3 top-3 text-fuchsia-500" />
                      <Textarea
                        name="additional_info"
                        placeholder="Дополнительная информация"
                        className="bg-purple-800/50 border-fuchsia-500/30 text-white placeholder-gray-400 pl-10 resize-none min-h-[120px]"
                        rows={4}
                        value={formData.additional_info}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <Button
                    type="submit"
                    className="w-full bg-fuchsia-600 hover:bg-fuchsia-700 text-white transition-all duration-300 transform hover:scale-105 mt-auto"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <div className="flex items-center justify-center">
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
                        Отправка...
                      </div>
                    ) : (
                      'Записаться'
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </motion.div>

          {/* Контакты и часы работы */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col gap-8 h-full"
          >
            {/* Контакты */}
            <Card className="bg-purple-900/30 border-fuchsia-500/30 flex-grow">
              <CardContent className="p-6 h-full">
                <h3 className="text-2xl font-bold text-fuchsia-400 mb-6">Наши контакты</h3>
                <div className="space-y-4">
                  <div className="flex items-start space-x-4">
                    <MapPin className="w-6 h-6 text-fuchsia-500 flex-shrink-0 mt-1" />
                    <p className="text-gray-300">г. СПб, Советский пр., д. 12, кв/оф. 2 (тер. Усть-Славянка)</p>
                  </div>
                  <div className="flex items-center space-x-4">
                    <Phone className="w-6 h-6 text-fuchsia-500" />
                    <a href="tel:+79956000122" className="text-gray-300 hover:text-fuchsia-500 transition-colors">8 995 6000 12 2</a>
                  </div>
                  <div className="flex items-center space-x-4">
                    <BrandTelegram className="w-6 h-6 text-fuchsia-500" />
                    <a href="https://t.me/+79956000122" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-fuchsia-500 transition-colors">Telegram</a>
                  </div>
                  <div className="flex items-center space-x-4">
                    <svg className="w-6 h-6 text-fuchsia-500" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                    </svg>
                    <a href="https://wa.me/79956000122" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-fuchsia-500 transition-colors">WhatsApp</a>
                  </div>
                  <div className="flex items-center space-x-4">
                    <BrandTelegram className="w-6 h-6 text-fuchsia-500" />
                    <a href="https://my.winwinbot.com/bot/1/EfirniyMir_Bot?REFID=6441213" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-fuchsia-500 transition-colors">Сообщество "НАШЕ ЗДОРОВЬЕ" в Telegram</a>
                  </div>
                  <div className="flex items-center space-x-4">
                    <ShoppingBag className="w-6 h-6 text-fuchsia-500" />
                    <a href="https://beta-doterra.myvoffice.com/Application/index.cfm?EnrollerID=14409682&Country=RUS" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-fuchsia-500 transition-colors">Купить эфирные масла с 25% скидкой</a>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Часы работы */}
            <Card className="bg-purple-900/30 border-fuchsia-500/30">
              <CardContent className="p-6">
                <h3 className="text-2xl font-bold text-fuchsia-400 mb-6">Часы работы</h3>
                <div className="space-y-2 text-gray-300">
                  <p>По предварительной записи</p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
