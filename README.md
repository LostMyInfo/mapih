# Mapih
#### Comprehensive collection of Discord and Slack (in progress) API endpoint handlers and utilities.
---
## Authentication

Choose one of the following methods to authenticate:

#### Option 1: Using Environment Variables

Add a variable named `token` to your `.env` file and set it to your bot's token for Discord (`slackToken` for Slack).

#### Option 2: Using Initialization Function

```javascript
const mapih = require('mapih');

mapih.initialize({
  discord: 'bot_token_here',
  slack: 'slack_auth_token_here' // optional
});
```
---
## Basic usage
```javascript
(async() => {

  await mapih.discord.channels.messages.create({
    channel_id: '774133713733812275',
    content: 'hello'
  });

})();
```
