# Mapih

Mapih is a comprehensive collection of Discord and Slack (in progress) API endpoint handlers as well as other useful utilities.
---
## Authenticating
##### Option 1
Place a variable in your `.env` file named `token` with your bot's token. (`slackToken` for slack API key).
##### Option 2
```javascript
const mapih = require('mapih');

mapih.initialize({
  discord: 'bot_token_here',
  slack: 'slack_auth_token_here' // optional
});
```
---
### Basic usage
```javascript
(async() => {

  await mapih.discord.channels.messages.create({
    channel_id: '774133713733812275',
    content: 'hello'
  });

})();
```