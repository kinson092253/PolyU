// API Configuration
// 在 Cloudflare Pages 中，环境变量在构建时会被替换
// 设置环境变量 REACT_APP_API_URL 来指定后端 API 地址

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

export { API_BASE_URL };
