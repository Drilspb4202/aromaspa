'use server'

import { sendTelegramMessage } from '@/utils/telegram'

console.log('Telegram config:', {
  BOT_TOKEN: process.env.BOT_TOKEN ? 'Set' : 'Not set',
  CHAT_ID: process.env.CHAT_ID ? 'Set' : 'Not set'
});

export async function submitTelegramMessage(message: string) {
  try {
    console.log('Submitting Telegram message:', message);
    const result = await sendTelegramMessage(message);
    console.log('Telegram message sent successfully:', result);
    return { success: true, result };
  } catch (error) {
    console.error('Error in submitTelegramMessage:', error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Unknown error occurred',
      details: JSON.stringify(error, Object.getOwnPropertyNames(error))
    };
  }
}

