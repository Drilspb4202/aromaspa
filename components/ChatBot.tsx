'use client'

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MessageCircle, X, Send, Trash2, ThumbsUp, ThumbsDown, Mail, Loader2 } from 'lucide-react';
import { useToast } from "@/components/ui/use-toast";
import { submitTelegramMessage } from '@/app/actions/telegram';
import { v4 as uuidv4 } from 'uuid';
import { BookingForm, BookingFormData } from './BookingForm';

interface Message {
  id: string;
  text: string;
  isBot: boolean;
  feedback?: 'positive' | 'negative';
  timestamp: number;
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

const systemPrompt = `Ты — дружелюбный и современный эксперт по ароматерапии в AROMA SPA СТУДИЯ. Вот твои основные характеристики:

1. Стиль общения:
- Говори простым, современным языком
- Используй эмоджи умеренно и уместно
- Будь дружелюбным, но профессиональным
- Избегай формальностей и канцеляризмов
- Не используй звездочки (*) для выделения текста

2. Структура ответов:
- Начинай с главного
- Разбивай длинные ответы на абзацы
- Используй списки для перечислений
- Выделяй важную информацию жирным шрифтом
- Добавляй конкретные примеры

3. Экспертность:
- Опирайся на научные факты об ароматерапии
- Приводи конкретные свойства масел
- Объясняй механизмы действия
- Давай практические рекомендации
- Упоминай исследования, но простым языком

4. Персонализация:
- Учитывай контекст вопроса
- Адаптируй ответы под запрос
- Предлагай индивидуальные решения
- Проявляй эмпатию к проблемам клиента
- Используй имя клиента, если оно известно

5. Продажи и сервис:
- Ненавязчиво рекомендуй услуги студии
- Подчеркивай преимущества и ценность
- Упоминай акции и специальные предложения
- Всегда предлагай записаться на консультацию
- Рассказывай о программах лояльности

Основные услуги и цены AROMA SPA СТУДИЯ:
- АромаДиагностика: 3000₽, 2 часа
- АромаЙога: 3000₽, 2,5 часа
- АромаДегустация: 500₽, 1 час
- АромаНейрографика: 1000₽, 2 часа
- АромаТимбилдинг: 5000₽, 2 часа

Адрес: г. СПб, Советский пр., д. 12, кв/оф. 2 (тер. Усть-Славянка)
Работаем по предварительной записи.

Пример ответа на вопрос "Какое масло поможет при стрессе?":

"Для снятия стресса я рекомендую несколько эффективных эфирных масел:

1. Лаванда — настоящий чемпион по расслаблению! Она помогает успокоить нервную систему и улучшить сон.

2. Бергамот — отлично поднимает настроение и уменьшает тревожность. Особенно хорош в вечернее время.

3. Иланг-иланг — помогает справиться с эмоциональным напряжением и нормализует сердцебиение.

Для максимального эффекта рекомендую попробовать нашу услугу АромаДиагностика (3000₽). За 2 часа мы подберем идеальную комбинацию масел именно для вашей ситуации.

Хотите записаться или узнать больше?"`;

const quickReplies = [
  {
    text: "Часы работы",
    icon: "🕒",
  },
  {
    text: "Цены",
    icon: "💰",
  },
  {
    text: "Услуги",
    icon: "📝",
  },
  {
    text: "Адрес",
    icon: "📍",
  },
  {
    text: "Эфирные масла",
    icon: "🌿",
  },
];

function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [sessionId] = useState(() => uuidv4());
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const chatWindowRef = useRef<HTMLDivElement>(null);
  const chatRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  useEffect(() => {
    const savedMessages = localStorage.getItem('chatMessages');
    if (savedMessages) {
      setMessages(JSON.parse(savedMessages));
    } else {
      setMessages([{
        id: uuidv4(),
        text: "Здравствуйте! Я виртуальный помощник AROMA SPA СТУДИЯ. Как я могу помочь вам сегодня?",
        isBot: true,
        timestamp: Date.now()
      }]);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('chatMessages', JSON.stringify(messages));
  }, [messages]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const getBotResponse = async (userInput: string): Promise<string> => {
    try {
      const shortContext = `Ты — эксперт по ароматерапии в AROMA SPA СТУДИЯ. Отвечай кратко (до 100 слов), но информативно. Используй эмоджи умеренно.

Услуги:
- АромаДиагностика: 3000₽, 2ч
- АромаЙога: 3000₽, 2.5ч
- АромаДегустация: 500₽, 1ч
- АромаНейрографика: 1000₽, 2ч
- АромаТимбилдинг: 5000₽, 2ч

Адрес: СПб, Советский пр., 12`;

      const response = await fetch('/api/deepseek', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          prompt: userInput,
          sessionId,
          context: shortContext
        })
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      if (!data.success) {
        throw new Error(data.error || 'Unknown error occurred');
      }

      return data.result;
    } catch (error) {
      console.error('Error getting AI response:', error);
      return "Извините, произошла ошибка. Пожалуйста, попробуйте позже или свяжитесь с нами напрямую.";
    }
  };

  const handleSend = useCallback(async () => {
    if (input.trim()) {
      const userMessage = input.trim();
      const userMessageId = uuidv4();
      
      setMessages(prev => [...prev, {
        id: userMessageId,
        text: userMessage,
        isBot: false,
        timestamp: Date.now()
      }]);
      
      setInput('');
      setIsTyping(true);

      try {
        if (services.includes(userMessage)) {
          const message = `Пользователь выбрал услугу: ${userMessage}`;
          await submitTelegramMessage(message);
          setMessages(prev => [...prev, {
            id: uuidv4(),
            text: "Спасибо за выбор услуги. Наш менеджер свяжется с вами в ближайшее время для уточнения деталей.",
            isBot: true,
            timestamp: Date.now()
          }]);
        } else {
          const response = await getBotResponse(userMessage);
          setMessages(prev => [...prev, {
            id: uuidv4(),
            text: response,
            isBot: true,
            timestamp: Date.now()
          }]);
        }
      } catch (error) {
        console.error('Error getting bot response:', error);
        toast({
          title: "Ошибка",
          description: "Не удалось получить ответ. Пожалуйста, попробуйте позже.",
          variant: "destructive",
        });
      } finally {
        setIsTyping(false);
      }
    }
  }, [input, toast, services, submitTelegramMessage, getBotResponse]);

  const handleQuickReply = useCallback(async (reply: string) => {
    if (reply === "Услуги") {
      setShowBookingForm(true);
      return;
    }

    const replyId = uuidv4();
    setMessages(prev => [...prev, {
      id: replyId,
      text: reply,
      isBot: false,
      timestamp: Date.now()
    }]);
    
    setIsTyping(true);
    
    try {
      if (reply === "Адрес") {
        const addressMessage = `📍 Адрес студии:
г. СПб, Советский пр., д. 12, кв/оф. 2 (тер. Усть-Славянка)

🗺️ Навигация:
• 2GIS: https://2gis.ru/spb/geo/70000001101166106
• Яндекс Карты: https://yandex.ru/navi/org/aroma_spa/35632460140

Мы работаем по предварительной записи. Звоните +7 995 6000 12 2`;
        
        setMessages(prev => [...prev, {
          id: uuidv4(),
          text: addressMessage,
          isBot: true,
          timestamp: Date.now()
        }]);
      } else if (services.includes(reply)) {
        const message = `Пользователь выбрал услугу: ${reply}`;
        await submitTelegramMessage(message);
        setMessages(prev => [...prev, {
          id: uuidv4(),
          text: "Спасибо за выбор услуги. Наш менеджер свяжется с вами в ближайшее время для уточнения деталей.",
          isBot: true,
          timestamp: Date.now()
        }]);
      } else {
        const response = await getBotResponse(reply);
        setMessages(prev => [...prev, {
          id: uuidv4(),
          text: response,
          isBot: true,
          timestamp: Date.now()
        }]);
      }
    } catch (error) {
      console.error('Error handling quick reply:', error);
      toast({
        title: "Ошибка",
        description: "Не удалось обработать запрос. Пожалуйста, попробуйте позже.",
        variant: "destructive",
      });
    } finally {
      setIsTyping(false);
    }
  }, [toast, services, submitTelegramMessage, getBotResponse]);

  const clearChat = useCallback(() => {
    setMessages([{
      id: uuidv4(),
      text: "Здравствуйте! Я виртуальный помощник AROMA SPA СТУДИЯ. Как я могу помочь вам сегодня?",
      isBot: true,
      timestamp: Date.now()
    }]);
    localStorage.removeItem('chatMessages');
  }, []);

  const handleFeedback = useCallback(async (messageId: string, type: 'positive' | 'negative') => {
    setMessages(prev => 
      prev.map(msg => 
        msg.id === messageId ? { ...msg, feedback: type } : msg
      )
    );

    try {
      await fetch('/api/deepseek', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          sessionId,
          feedback: type,
        })
      });
    } catch (error) {
      console.error('Error sending feedback:', error);
    }

    toast({
      title: type === 'positive' ? "Спасибо за положительный отзыв!" : "Спасибо за отзыв",
      description: type === 'positive' ? "Мы рады, что смогли помочь!" : "Мы постараемся улучшить наши ответы.",
    });
  }, [toast, sessionId]);

  const emailTranscript = useCallback(() => {
    const transcript = messages
      .map(msg => `${msg.isBot ? 'Бот' : 'Вы'}: ${msg.text}`)
      .join('\n');
    const mailtoLink = `mailto:?subject=Чат с AROMA SPA СТУДИЯ&body=${encodeURIComponent(transcript)}`;
    window.open(mailtoLink, '_blank');
  }, [messages]);

  const handleBookingSubmit = useCallback(async (formData: BookingFormData) => {
    setShowBookingForm(false);
    setIsTyping(true);

    try {
      const message = `Новая заявка на запись:
Имя: ${formData.name}
Телефон: ${formData.phone}
Услуга: ${formData.service}
Дата: ${formData.date}`;

      await submitTelegramMessage(message);

      setMessages(prev => [...prev, {
        id: uuidv4(),
        text: "Спасибо за вашу заявку. Наш менеджер свяжется с вами в ближайшее время для подтверждения записи.",
        isBot: true,
        timestamp: Date.now()
      }]);
    } catch (error) {
      console.error('Error submitting booking:', error);
      toast({
        title: "Ошибка",
        description: "Не удалось отправить заявку. Пожалуйста, попробуйте позже.",
        variant: "destructive",
      });
    } finally {
      setIsTyping(false);
    }
  }, [toast]);


  const messageVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };


  return (
    <>
      <Button
        onClick={() => setIsOpen(true)}
        className="fixed z-[60] rounded-full bg-gradient-to-r from-violet-600 via-purple-600 to-fuchsia-600 hover:from-violet-700 hover:via-purple-700 hover:to-fuchsia-700 text-white p-4 shadow-2xl transition-all duration-300 hover:scale-110 bottom-20 right-4 md:bottom-4 ring-2 ring-white/20 hover:ring-white/40"
        aria-label="Открыть чат"
      >
        <MessageCircle size={24} />
      </Button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            ref={chatRef}
            className="fixed bottom-4 right-4 z-[60] bg-black/30 backdrop-blur-md md:bottom-20 md:right-4 rounded-3xl overflow-hidden"
            initial={{ opacity: 0, y: 50, x: 20, scale: 0.9, rotateX: 15 }}
            animate={{ opacity: 1, y: 0, x: 0, scale: 1, rotateX: 0 }}
            exit={{ opacity: 0, y: 50, x: 20, scale: 0.9, rotateX: 15 }}
            transition={{ type: "spring", duration: 0.6, bounce: 0.3 }}
          >
            <div className="relative w-[calc(100vw-2rem)] h-[calc(100vh-8rem)] md:w-96 md:h-[32rem] max-h-[32rem] bg-gradient-to-br from-violet-600 via-purple-600 to-fuchsia-600 rounded-3xl shadow-2xl overflow-hidden flex flex-col border border-white/20">
              <div className="p-5 flex justify-between items-center bg-gradient-to-r from-violet-800/50 to-fuchsia-800/50 backdrop-blur-sm border-b border-white/20 shadow-lg">
                <div className="flex items-center space-x-3">
                  <div className="relative">
                    <div className="absolute inset-0 bg-white/20 rounded-full animate-pulse"></div>
                    <div className="relative bg-white/10 rounded-full p-2">
                      <MessageCircle className="w-5 h-5 text-white" />
                    </div>
                  </div>
                  <h3 className="text-xl font-bold bg-gradient-to-r from-white to-purple-100 bg-clip-text text-transparent drop-shadow-lg">AROMA SPA СТУДИЯ</h3>
                </div>
                <div className="flex items-center space-x-1">
                  <Button
                    onClick={clearChat}
                    variant="ghost"
                    size="icon"
                    className="text-white/70 hover:text-white hover:bg-white/20 rounded-xl transition-all duration-200 hover:scale-110"
                    title="Очистить историю"
                  >
                    <Trash2 size={18} />
                  </Button>
                  <Button
                    onClick={emailTranscript}
                    variant="ghost"
                    size="icon"
                    className="text-white/70 hover:text-white hover:bg-white/20 rounded-xl transition-all duration-200 hover:scale-110"
                    title="Отправить на email"
                  >
                    <Mail size={18} />
                  </Button>
                  <Button
                    onClick={() => setIsOpen(false)}
                    variant="ghost"
                    size="icon"
                    className="text-white/70 hover:text-white hover:bg-white/20 rounded-xl transition-all duration-200 hover:scale-110"
                  >
                    <X size={18} />
                  </Button>
                </div>
              </div>

                <div className="flex-1 overflow-y-auto p-5 space-y-4 bg-gradient-to-b from-transparent via-purple-500/5 to-transparent backdrop-blur-sm">
                  {messages.map((message) => (
                    <motion.div
                      key={message.id}
                      variants={messageVariants}
                      initial="hidden"
                      animate="visible"
                      className={`flex ${message.isBot ? 'justify-start' : 'justify-end'}`}
                    >
                      <div
                        className={`max-w-[80%] rounded-2xl px-4 py-3 shadow-lg transition-all duration-200 hover:scale-[1.02] ${
                          message.isBot
                            ? 'bg-white/15 backdrop-blur-md text-white border border-white/20'
                            : 'bg-white text-purple-900 border border-white/30 shadow-xl'
                        }`}
                      >
                        <div className="text-sm leading-relaxed">{message.text}</div>
                        {message.isBot && !message.feedback && (
                          <div className="mt-3 flex space-x-2">
                            <Button
                              onClick={() => handleFeedback(message.id, 'positive')}
                              variant="ghost"
                              size="sm"
                              className="text-white/60 hover:text-green-400 hover:bg-white/20 rounded-xl transition-all duration-200 hover:scale-110"
                            >
                              <ThumbsUp size={14} />
                            </Button>
                            <Button
                              onClick={() => handleFeedback(message.id, 'negative')}
                              variant="ghost"
                              size="sm"
                              className="text-white/60 hover:text-red-400 hover:bg-white/20 rounded-xl transition-all duration-200 hover:scale-110"
                            >
                              <ThumbsDown size={14} />
                            </Button>
                          </div>
                        )}
                      </div>
                    </motion.div>
                  ))}
                  {isTyping && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="flex justify-start"
                    >
                      <div className="bg-white/15 backdrop-blur-md rounded-2xl px-4 py-3 border border-white/20">
                        <Loader2 className="w-5 h-5 animate-spin text-white" />
                      </div>
                    </motion.div>
                  )}
                  <div ref={messagesEndRef} />
                </div>
                {showBookingForm && (
                  <div className="absolute inset-0 bg-black/80 backdrop-blur-md z-10 flex items-center justify-center">
                    <BookingForm
                      onSubmit={handleBookingSubmit}
                      onClose={() => setShowBookingForm(false)}
                    />
                  </div>
                )}
                <div className="p-5 space-y-4 bg-gradient-to-t from-violet-700/30 via-purple-600/30 to-fuchsia-700/30 backdrop-blur-sm border-t border-white/20">
                  <div className="flex space-x-3">
                    <Input
                      ref={inputRef}
                      type="text"
                      placeholder="Введите сообщение..."
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                      className="flex-1 bg-white/15 backdrop-blur-md border-white/30 text-white placeholder-white/60 focus:border-white focus:ring-2 focus:ring-white/50 shadow-lg rounded-xl"
                    />
                    <Button
                      onClick={handleSend}
                      className="bg-white text-violet-700 hover:bg-white/90 shadow-lg rounded-xl px-6 hover:scale-105 transition-all duration-200 font-semibold"
                    >
                      <Send size={18} />
                    </Button>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {quickReplies.map((reply, index) => (
                      <Button
                        key={index}
                        onClick={() => handleQuickReply(reply.text)}
                        variant="outline"
                        className="bg-white/10 backdrop-blur-md border-white/20 text-white hover:bg-white/20 hover:scale-105 transition-all duration-200 rounded-xl shadow-md hover:shadow-lg"
                        size="sm"
                      >
                        <span className="mr-1.5 text-base">{reply.icon}</span>
                        {reply.text}
                      </Button>
                    ))}
                  </div>
                </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default ChatBot;
