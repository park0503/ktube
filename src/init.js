import "regenerator-runtime";
import "dotenv/config";
import "./db";
import "./models/Video";
import app from "./server";

process.on('SIGINT', () => { console.log("exiting..."); process.exit(); });

process.on('exit', () => { console.log("exiting..."); process.exit(); });

const PORT = process.env.PORT || 3000;

const handleListening = () =>
    console.log(`✅ Server listenting on http://localhost:${PORT} 🚀`);

app.listen(PORT, handleListening);