# Real-Time-Tracker

A Node.js + Express app that streams browser geolocation in real time using Socket.io and Leaflet.

## Run locally

1. Clone the repository:
   ```bash
   git clone https://github.com/adityanagvanshi61-byte/Real-Time-Tracker.git
   cd Real-Time-Tracker
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the server:
   ```bash
   npm start
   ```
4. Open in browser:
   ```text
   http://localhost:3000
   ```

## Deployment

This app is ready for deployment to Node hosts like Render or Railway.

Render settings:
- Build command: `npm install`
- Start command: `npm start`
- Port: `process.env.PORT || 3000`

## Notes

- Add a `.env` file for environment variables if needed.
- `node_modules/` is ignored by `.gitignore`.
