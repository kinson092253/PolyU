// API Configuration
// - 本地開發 (npm start): REACT_APP_API_URL=http://localhost:5001/api
// - Docker: 不設環境變數，用相對路徑 /api，由 nginx proxy 轉發到 backend

const API_BASE_URL = process.env.REACT_APP_API_URL || '/api';

export { API_BASE_URL };
