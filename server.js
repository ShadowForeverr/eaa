const express = require('express');
const axios = require('axios');
require('dotenv').config();

const app = express();
const port = 3000;

// Endpoint to get messages from Discord
app.get('/api/messages', async (req, res) => {
  try {
    const response = await axios.get(
      `https://discord.com/api/v10/channels/${process.env.DISCORD_CHANNEL_ID}/messages`,
      {
        headers: {
          'Authorization': `Bot ${process.env.DISCORD_BOT_TOKEN}`
        }
      }
    );

    // Send the messages to the frontend
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching messages:', error);
    res.status(500).send('Error fetching messages');
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
