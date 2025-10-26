const getServerConfig = () => {
  // Check if we're on the server side
  if (typeof window === 'undefined') {
    const config = {
      BOT_TOKEN: process.env.BOT_TOKEN,
      CHAT_ID: process.env.CHAT_ID
    };
    console.log('Server config:', config);
    return config;
  }
  console.log('Client-side: No config available');
  return {
    BOT_TOKEN: null,
    CHAT_ID: null
  };
};

export async function sendTelegramMessage(message: string) {
  const config = getServerConfig();

  if (!config.BOT_TOKEN || !config.CHAT_ID) {
    console.error('Telegram configuration is missing:', { BOT_TOKEN: !!config.BOT_TOKEN, CHAT_ID: !!config.CHAT_ID });
    throw new Error('Telegram configuration is not available on the server');
  }

  const url = `https://api.telegram.org/bot${config.BOT_TOKEN}/sendMessage`;
  const body = JSON.stringify({
    chat_id: config.CHAT_ID,
    text: message,
  });

  try {
    console.log('Sending Telegram message:', { url, body: JSON.parse(body) });
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body,
    });

    if (!response.ok) {
      const errorData = await response.text();
      console.error('Telegram API error:', { status: response.status, statusText: response.statusText, errorData });
      throw new Error(`Failed to send Telegram message: ${response.status} ${response.statusText}`);
    }

    const responseData = await response.json();
    console.log('Telegram API response:', responseData);

    return { success: true };
  } catch (error) {
    console.error('Error sending Telegram message:', error);
    throw error;
  }
}
