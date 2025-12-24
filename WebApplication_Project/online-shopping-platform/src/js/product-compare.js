/**
 * 產品比較功能
 */
class ProductCompare {
    constructor() {
        this.compareList = [];
        this.maxCompare = 4;
        this.initialized = false;
        this.eventsBound = false;
        this.init();
    }

    init() {
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.setup());
        } else {
            this.setup();
        }
    }

    setup() {
        console.log('🔄 初始化產品比較功能...');
        this.loadCompareList();
        this.bindEvents();
        this.updateUI();
        this.initialized = true;
        console.log('✅ 產品比較功能初始化完成');
    }

    loadCompareList() {
        try {
            const stored = localStorage.getItem('compareProducts');
            if (stored) {
                this.compareList = JSON.parse(stored);
                console.log('📦 載入比較列表：', this.compareList);
            }
        } catch (e) {
            console.error('❌ 載入比較列表失敗：', e);
            this.compareList = [];
        }
    }

    saveCompareList() {
        try {
            localStorage.setItem('compareProducts', JSON.stringify(this.compareList));
            console.log('💾 保存比較列表：', this.compareList);
        } catch (e) {
            console.error('❌ 保存比較列表失敗：', e);
        }
    }

    bindEvents() {
        if (this.eventsBound) {
            console.log('⚠️ 事件已綁定，跳過重複綁定');
            return;
        }

        console.log('🔗 開始綁定事件...');

        // 使用事件委派綁定 checkbox 變化事件
        document.addEventListener('change', this.handleCheckboxChange.bind(this));
        document.addEventListener('click', this.handleCheckboxClick.bind(this));

        // 綁定面板按鈕事件
        this.bindPanelEvents();
        
        this.eventsBound = true;
        console.log('✅ 事件綁定完成');
    }

    handleCheckboxChange(e) {
        if (e.target && e.target.classList.contains('product-compare-checkbox')) {
            console.log('☑️ Change 事件觸發：', e.target.dataset.productId, e.target.checked);
            this.handleCompareToggle(e.target);
        }
    }

    handleCheckboxClick(e) {
        if (e.target && e.target.classList.contains('product-compare-checkbox')) {
            console.log('🖱️ Click 事件觸發：', e.target.dataset.productId);
            // 小延遲確保 checked 狀態已更新
            setTimeout(() => {
                console.log('⏰ 延遲處理點擊：', e.target.dataset.productId, e.target.checked);
                this.handleCompareToggle(e.target);
            }, 10);
        }
    }

    bindPanelEvents() {
        // 比較面板關閉按鈕
        const closeBtn = document.getElementById('compare-panel-close');
        if (closeBtn) {
            closeBtn.addEventListener('click', () => {
                console.log('🚫 關閉比較面板');
                this.hideComparePanel();
            });
        }

        // 立即比較按鈕
        const compareBtn = document.getElementById('compare-now');
        if (compareBtn) {
            compareBtn.addEventListener('click', () => {
                console.log('👁️ 點擊立即比較');
                this.goToCompare();
            });
        }

        // 清空所有比較按鈕
        const clearAllBtn = document.getElementById('clear-all-compare');
        if (clearAllBtn) {
            clearAllBtn.addEventListener('click', () => {
                console.log('🗑️ 點擊清空所有');
                this.clearAll();
            });
        }

        // 頂部清空比較按鈕
        const clearBtn = document.getElementById('clear-compare');
        if (clearBtn) {
            clearBtn.addEventListener('click', () => {
                console.log('🗑️ 點擊頂部清空');
                this.clearAll();
            });
        }

        // 移除單個產品按鈕 - 使用事件委派
        document.addEventListener('click', (e) => {
            if (e.target.closest('.compare-item-remove')) {
                const productId = e.target.closest('.compare-item-remove').dataset.productId;
                console.log('❌ 移除產品：', productId);
                this.removeFromCompare(productId);
            }
        });
    }

    handleCompareToggle(checkbox) {
        const productId = checkbox.dataset.productId;
        const isChecked = checkbox.checked;

        console.log(`📋 處理比較切換 - 產品ID: ${productId}, 選中: ${isChecked}`);

        if (isChecked) {
            if (this.compareList.length >= this.maxCompare) {
                checkbox.checked = false;
                alert(`最多只能比較 ${this.maxCompare} 個產品`);
                return;
            }
            this.addToCompare(checkbox);
        } else {
            this.removeFromCompare(productId);
        }
    }

    addToCompare(checkbox) {
        // 支援多種產品卡片結構
        const productCard = checkbox.closest('.product-card-v2') || 
                           checkbox.closest('.brandproductlist-product-card') ||
                           checkbox.closest('.product-card'); // 新增首頁產品卡片支援
        
        if (!productCard) {
            console.error('❌ 找不到產品卡片，checkbox:', checkbox);
            console.log('🔍 checkbox 父元素:', checkbox.parentElement);
            return;
        }

        const productId = checkbox.dataset.productId;
        console.log('📦 準備添加產品到比較：', productId);

        // 檢查是否已存在
        if (this.compareList.find(p => p.id === productId)) {
            console.log('⚠️ 產品已在比較列表中');
            return;
        }

        const productData = this.extractProductData(productCard);
        productData.id = productId;

        this.compareList.push(productData);
        this.saveCompareList();
        this.updateUI();
        this.showComparePanel();

        console.log('✅ 成功添加到比較：', productData);
    }

    removeFromCompare(productId) {
        console.log('🗑️ 從比較中移除：', productId);
        
        this.compareList = this.compareList.filter(p => p.id !== productId);
        this.saveCompareList();
        this.updateUI();

        // 取消對應的 checkbox
        const checkbox = document.querySelector(`[data-product-id="${productId}"]`);
        if (checkbox) {
            checkbox.checked = false;
        }

        if (this.compareList.length === 0) {
            this.hideComparePanel();
        }
    }

    extractProductData(productCard) {
        console.log('🔍 提取產品數據from:', productCard);

        // 支援不同的產品卡片結構 - 加強首頁支援
        const img = productCard.querySelector('.product-img-v2') || 
                   productCard.querySelector('.brandproductlist-product-image') ||
                   productCard.querySelector('.product-image'); // 首頁
        
        const title = productCard.querySelector('.product-title-v2') || 
                     productCard.querySelector('.brandproductlist-product-title') ||
                     productCard.querySelector('.product-info h3') || // 首頁
                     productCard.querySelector('h3');
        
        const priceElement = productCard.querySelector('.price-v2') || 
                           productCard.querySelector('.brandproductlist-current-price') ||
                           productCard.querySelector('.product-info .price') || // 首頁
                           productCard.querySelector('.price');
                          
        const originalPriceElement = productCard.querySelector('.original-price-v2') || 
                                   productCard.querySelector('.brandproductlist-original-price');
        
        const description = productCard.dataset.description || '暫無描述';
        const rating = productCard.querySelector('.rating-count-v2') || 
                      productCard.querySelector('.brandproductlist-rating-count') ||
                      { textContent: '0' };

        // 提取品牌（通常是標題的第一個詞）
        const fullTitle = title ? title.textContent.trim() : '';
        const brand = fullTitle.split(' ')[0];

        // 從隱藏的 product-specs 元素提取規格（適用於最新產品組件）
        const specsElement = productCard.querySelector('.product-specs');
        let specs = this.generateSpecs(fullTitle);
        let features = this.generateFeatures(fullTitle);

        if (specsElement) {
            // 如果有詳細規格數據，使用它們
            const cpu = specsElement.dataset.cpu;
            const ram = specsElement.dataset.ram;
            const storage = specsElement.dataset.storage;
            const screen = specsElement.dataset.screen;
            const camera = specsElement.dataset.camera;
            const battery = specsElement.dataset.battery;
            const os = specsElement.dataset.os;
            const sim = specsElement.dataset.sim;

            specs = [];
            if (cpu && cpu !== '不適用') specs.push(`處理器: ${cpu}`);
            if (ram && ram !== '不適用') specs.push(`記憶體: ${ram}`);
            if (storage && storage !== '不適用') specs.push(`儲存空間: ${storage}`);
            if (screen && screen !== '不適用') specs.push(`螢幕: ${screen}`);
            if (camera && camera !== '不適用') specs.push(`相機: ${camera}`);
            if (battery && battery !== '不適用') specs.push(`電池: ${battery}`);
            if (os && os !== '不適用') specs.push(`作業系統: ${os}`);
            if (sim && sim !== '不適用') specs.push(`SIM 卡: ${sim}`);
            
            if (specs.length === 0) specs = ['詳細規格請參考產品說明'];
        }

        // 提取顏色信息
        const colorDots = productCard.querySelectorAll('.color-dot');
        let colorOptions = [];
        let defaultColor = '#cccccc';
        let defaultImage = img ? img.src : '';
        
        console.log('🔍 [product-compare] 找到的顏色點數量:', colorDots.length);
        
        if (colorDots.length > 0) {
            colorDots.forEach((dot, idx) => {
                const style = dot.getAttribute('style');
                const image = dot.getAttribute('data-image');
                
                if (style) {
                    const bgMatch = style.match(/background(?:-color)?\s*:\s*([^;]+)/i);
                    if (bgMatch && bgMatch[1]) {
                        const colorHex = bgMatch[1].trim();
                        colorOptions.push({
                            color: colorHex,
                            image: image || defaultImage
                        });
                        
                        if (idx === 0) {
                            defaultColor = colorHex;
                            if (image) defaultImage = image;
                        }
                    }
                }
            });
        }
        
        console.log('🎨 [product-compare] 最終顏色選項:', colorOptions);

        const productData = {
            name: fullTitle,
            brand: brand,
            price: priceElement ? priceElement.textContent : '暫無價格',
            originalPrice: originalPriceElement ? `HK$${originalPriceElement.textContent.replace(/[^\d]/g, '')}` : null,
            image: defaultImage,
            description: description,
            rating: rating ? rating.textContent : '0',
            specs: specs,
            features: features,
            colorOptions: colorOptions,
            selectedColor: defaultColor,
            selectedColorIndex: 0,
            model: this.extractModel(fullTitle)
        };

        console.log('📋 提取的產品數據：', productData);
        return productData;
    }

    generateSpecs(title) {
        const specs = [];
        
        if (title.includes('藍牙')) specs.push('藍牙連接');
        if (title.includes('降噪')) specs.push('主動降噪功能');
        if (title.includes('真無線')) specs.push('真無線設計');
        if (title.includes('防水')) specs.push('IPX4防水');
        if (title.includes('256GB')) specs.push('256GB 儲存空間');
        if (title.includes('512GB')) specs.push('512GB 儲存空間');
        if (title.includes('1TB')) specs.push('1TB 儲存空間');
        if (title.includes('M3')) specs.push('Apple M3 晶片');
        if (title.includes('5G')) specs.push('5G 網路支援');
        
        if (title.includes('Apple')) {
            specs.push('與 iPhone 完美兼容', 'Siri 語音控制');
            if (title.includes('iPhone')) specs.push('iOS 系統', 'Face ID');
            if (title.includes('iPad')) specs.push('iPadOS 系統', 'Apple Pencil 支援');
            if (title.includes('MacBook')) specs.push('macOS 系統', 'Retina 顯示器');
            if (title.includes('AirPods')) specs.push('Lightning 充電', '自動配對');
        } else if (title.includes('Sony')) {
            specs.push('LDAC 高音質編碼', '30小時電池續航', 'V1 處理器');
        } else if (title.includes('Anker')) {
            specs.push('快速充電', '多點連接', 'HearID 個人化音效');
        }

        return specs.length > 0 ? specs : ['詳細規格請參考產品說明'];
    }

    generateFeatures(title) {
        const features = [];
        
        if (title.includes('降噪')) features.push('出色的降噪效果');
        if (title.includes('真無線')) features.push('無線自由體驗');
        if (title.includes('Apple')) {
            features.push('與蘋果設備無縫配對');
            if (title.includes('iPhone')) features.push('拍照功能強大', '電池續航持久');
            if (title.includes('iPad')) features.push('適合創作和工作', '輕薄便攜');
            if (title.includes('MacBook')) features.push('高效能運算', '超長電池續航');
        }
        if (title.includes('Sony')) features.push('專業音質調校');
        if (title.includes('長續航')) features.push('超長電池續航');
        
        return features.length > 0 ? features : ['優質產品體驗'];
    }

    extractModel(title) {
        const modelMatch = title.match(/[A-Z]{2,}[-]?[0-9A-Z]{2,}/);
        return modelMatch ? modelMatch[0] : '標準版';
    }

    updateUI() {
        if (!this.initialized) return;
        
        console.log('🔄 更新UI，當前比較列表：', this.compareList);
        
        this.updateCompareCount();
        this.updateComparePanel();
        this.updateCheckboxes();
        this.updateClearButton();
    }

    updateCompareCount() {
        const countElement = document.getElementById('compare-count');
        if (countElement) {
            countElement.textContent = this.compareList.length;
            console.log('📊 更新計數器：', this.compareList.length);
        }
    }

    updateComparePanel() {
        const panelBody = document.getElementById('compare-panel-body');
        const compareBtn = document.getElementById('compare-now');
        
        if (!panelBody) {
            console.warn('⚠️ 找不到比較面板主體');
            return;
        }

        if (this.compareList.length === 0) {
            panelBody.innerHTML = `
                <div class="compare-empty">
                    <i class="fas fa-balance-scale"></i>
                    <p>選擇產品進行比較</p>
                </div>
            `;
            if (compareBtn) compareBtn.disabled = true;
        } else {
            panelBody.innerHTML = this.compareList.map(product => `
                <div class="compare-item">
                    <img src="${product.image}" alt="${product.name}" class="compare-item-image">
                    <div class="compare-item-info">
                        <div class="compare-item-name">${product.name}</div>
                        <div class="compare-item-price">${product.price}</div>
                    </div>
                    <button class="compare-item-remove" data-product-id="${product.id}">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
            `).join('');
            
            if (compareBtn) {
                compareBtn.disabled = this.compareList.length < 2;
            }
        }
        
        console.log('🔄 面板內容已更新');
    }

    updateCheckboxes() {
        const checkboxes = document.querySelectorAll('.product-compare-checkbox');
        console.log(`☑️ 更新 ${checkboxes.length} 個 checkbox 狀態`);
        
        checkboxes.forEach(checkbox => {
            const productId = checkbox.dataset.productId;
            checkbox.checked = this.compareList.some(p => p.id === productId);
        });
    }

    updateClearButton() {
        const clearBtn = document.getElementById('clear-compare');
        if (clearBtn) {
            clearBtn.style.display = this.compareList.length > 0 ? 'inline-block' : 'none';
        }
    }

    showComparePanel() {
        const panel = document.getElementById('compare-panel');
        if (panel) {
            panel.classList.add('active');
            console.log('📱 顯示比較面板');
        } else {
            console.warn('⚠️ 找不到比較面板');
        }
    }

    hideComparePanel() {
        const panel = document.getElementById('compare-panel');
        if (panel) {
            panel.classList.remove('active');
            console.log('📱 隱藏比較面板');
        }
    }

    clearAll() {
        if (this.compareList.length === 0) return;
        
        if (confirm('確定要清空所有比較產品嗎？')) {
            this.compareList = [];
            this.saveCompareList();
            this.updateUI();
            this.hideComparePanel();
            console.log('🗑️ 已清空所有比較產品');
        }
    }

    goToCompare() {
        if (this.compareList.length < 2) {
            alert('請至少選擇兩個產品進行比較');
            return;
        }

        console.log('🔍 跳轉到比較頁面');
        window.location.href = 'compare_details.html';
    }

    // 新增：重新掃描和綁定 checkbox
    rescanCheckboxes() {
        console.log('🔄 重新掃描 checkbox...');
        const checkboxes = document.querySelectorAll('.product-compare-checkbox');
        console.log(`☑️ 發現 ${checkboxes.length} 個 checkbox`);
        
        checkboxes.forEach((checkbox, index) => {
            console.log(`Checkbox ${index + 1}: ID=${checkbox.dataset.productId}, 已選中=${checkbox.checked}`);
            
            // 為新的 checkbox 添加直接事件監聽
            if (!checkbox.hasAttribute('data-compare-bound')) {
                checkbox.addEventListener('change', (e) => {
                    console.log('🎯 直接 change 事件:', e.target.dataset.productId, e.target.checked);
                    this.handleCompareToggle(e.target);
                });
                
                checkbox.addEventListener('click', (e) => {
                    console.log('🎯 直接 click 事件:', e.target.dataset.productId);
                });
                
                // 標記已綁定
                checkbox.setAttribute('data-compare-bound', 'true');
                console.log(`✅ 為 checkbox ${index + 1} 添加直接事件監聽`);
            }
        });
        
        // 更新 UI
        this.updateUI();
    }
}

// 創建全局實例
if (!window.productCompare) {
    window.productCompare = new ProductCompare();
    console.log('🎯 產品比較實例已創建');
}

// 提供全局重新掃描方法
window.rescanCompareCheckboxes = function() {
    if (window.productCompare) {
        window.productCompare.rescanCheckboxes();
    }
};

// 匯出到全局作用域
window.ProductCompare = ProductCompare;
