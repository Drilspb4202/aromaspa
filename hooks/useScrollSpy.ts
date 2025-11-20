import { useState, useEffect, useRef, useCallback } from 'react';

interface UseScrollSpyOptions {
  offset?: number;
  throttleMs?: number;
}

/**
 * Хук для отслеживания активной секции при скролле
 * Оптимизирован с использованием throttling для лучшей производительности
 */
export function useScrollSpy(
  sectionIds: string[],
  options: UseScrollSpyOptions = {}
) {
  const { offset = 100, throttleMs = 100 } = options;
  const [activeSection, setActiveSection] = useState<string>('');
  const sectionRefs = useRef<Map<string, HTMLElement>>(new Map());
  const rafId = useRef<number | null>(null);
  const lastScrollTime = useRef<number>(0);

  // Функция для получения активной секции
  const getActiveSection = useCallback(() => {
    const scrollPosition = window.scrollY + offset;
    let currentSection = '';

    for (const sectionId of sectionIds) {
      const element = sectionRefs.current.get(sectionId);
      if (element) {
        const { offsetTop, offsetHeight } = element;
        if (
          scrollPosition >= offsetTop &&
          scrollPosition < offsetTop + offsetHeight
        ) {
          currentSection = sectionId;
          break; // Берем первую подходящую секцию
        }
      }
    }

    return currentSection;
  }, [sectionIds, offset]);

  // Оптимизированный обработчик скролла с throttling
  const handleScroll = useCallback(() => {
    const now = Date.now();
    if (now - lastScrollTime.current < throttleMs) {
      return;
    }
    lastScrollTime.current = now;

    if (rafId.current !== null) {
      cancelAnimationFrame(rafId.current);
    }

    rafId.current = requestAnimationFrame(() => {
      const newActiveSection = getActiveSection();
      if (newActiveSection !== activeSection) {
        setActiveSection(newActiveSection);
      }
    });
  }, [activeSection, getActiveSection, throttleMs]);

  // Регистрация элементов секций
  const registerSection = useCallback((id: string, element: HTMLElement | null) => {
    if (element) {
      sectionRefs.current.set(id, element);
    } else {
      sectionRefs.current.delete(id);
    }
  }, []);

  useEffect(() => {
    // Устанавливаем начальную активную секцию
    const initialSection = getActiveSection();
    if (initialSection) {
      setActiveSection(initialSection);
    }

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (rafId.current !== null) {
        cancelAnimationFrame(rafId.current);
      }
    };
  }, [handleScroll, getActiveSection]);

  return {
    activeSection,
    registerSection,
  };
}

