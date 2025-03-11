# SoCha Discord Integration

## About
This project connects the match info site of a participating team of the [Software Challenge](https://software-challenge.de/) with a Discord webhook.
If a new game result is detected, then the result is send to the webhook. A curtain role will also be pinged.

The message will look like this:

![image](https://github.com/user-attachments/assets/4a5159b1-2d05-47de-874f-ac1748932b91)

## Config
The config is a simple *config.json* file in the root directory. The config should look like this:
```json
{
        "matchOverviewUrl": "https://contest.software-challenge.de/seasons/.../contestants/.../matches"
        "webhookUrl": "https://discord.com/api/webhooks/.../..."
        "pingedRoleId": "...",
        "intervalMs": 900000
}
```
- `matchOverviewUrl` is the url of the contestant's matches that should be looked at
- `webhookUrl` is the url of the Discord webhook
- `pingedRoleId` is the id of the role that should be pinged in the alert messages
- `intervalMs` is the time in milliseconds between each refresh

# Setup
Before running the project you have to install the required npm packages by running `npm install`.\
You also have to create a config like just explained.\
After that can the project be run with `node src/main.js` from the root directory.\
\
I developed the project with Node.js `v22.14.0` and npm `10.9.2`
