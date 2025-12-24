/**
 * 簡化版搜尋功能 - 關鍵詞匹配後直接跳轉
 */
class SearchModule {
    constructor() {
        this.searchInput = null;
        this.searchBtn = null;
        
        // 搜尋關鍵詞對應表
        this.searchMap = {
            // Apple 相關
            'apple': 'brandproductlist.html?brand=Apple',
            '蘋果': 'brandproductlist.html?brand=Apple',
            'iphone': 'brandproductlist.html?brand=Apple',
            'ipad': 'brandproductlist.html?brand=Apple',
            'macbook': 'brandproductlist.html?brand=Apple',
            'airpods': 'brandproductlist.html?brand=Apple',
            'watch': 'brandproductlist.html?brand=Apple',
            
            // 耳機相關
            '真無線藍牙耳機': 'product.html',
            '耳機': 'product.html',
            '藍牙耳機': 'product.html',
            'earphone': 'product.html',
            'airpod': 'product.html'
        };
    }

    setup() {
        this.searchInput = document.getElementById('search-input');
        this.searchBtn = document.getElementById('search-btn');
        
        if (!this.searchInput || !this.searchBtn) {
            console.log('⚠️ 搜尋元素未找到');
            return;
        }
        
        this.bindEvents();
        console.log('✅ 搜尋功能已初始化');
    }

    bindEvents() {
        // 按下 Enter 鍵執行搜尋
        this.searchInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                this.performSearch();
            }
        });

        // 搜尋按鈕點擊
        this.searchBtn.addEventListener('click', (e) => {
            e.preventDefault();
            this.performSearch();
        });
    }

    performSearch() {
        const query = this.searchInput.value.trim().toLowerCase();
        
        if (query.length === 0) {
            alert('請輸入搜尋關鍵字');
            return;
        }

        // 查找匹配的URL
        let targetUrl = null;
        
        // 完全匹配優先
        if (this.searchMap[query]) {
            targetUrl = this.searchMap[query];
        } else {
            // 模糊匹配 - 檢查是否包含關鍵字
            for (const [keyword, url] of Object.entries(this.searchMap)) {
                if (query.includes(keyword) || keyword.includes(query)) {
                    targetUrl = url;
                    break;
                }
            }
        }

        if (targetUrl) {
            console.log(`🔍 搜尋「${query}」→ 跳轉到 ${targetUrl}`);
            window.location.href = targetUrl;
        } else {
            alert(`沒有找到與「${query}」相關的產品\n\n支援的搜尋關鍵字：\n- Apple、蘋果、iPhone、iPad\n- 耳機、真無線藍牙耳機`);
        }
    }
}

// 初始化搜尋功能（由 initializeHeader 調用）
function initializeSearch() {
    if (!window.searchModule) {
        window.searchModule = new SearchModule();
    }
    window.searchModule.setup();
}
