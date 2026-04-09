# 使用官方 Python 運行時作為基礎鏡像
FROM python:3.11-slim

# 設置工作目錄
WORKDIR /app

# 複製依賴文件
COPY requirements.txt .

# 安裝依賴
RUN pip install --no-cache-dir -r requirements.txt

# 複製應用代碼
COPY . .

# 創建非 root 用戶來運行應用（安全考慮）
RUN useradd -m -u 1000 appuser && \
    chown -R appuser:appuser /app

# 切換到非 root 用戶
USER appuser

# 暴露端口
EXPOSE 5000

# 設置環境變量
ENV FLASK_APP=api.py
ENV PYTHONUNBUFFERED=1

# 運行應用
CMD ["python", "api.py"]
