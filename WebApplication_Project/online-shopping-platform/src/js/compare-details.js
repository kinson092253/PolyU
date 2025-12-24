/**
 * 產品比較詳細頁面功能
 */
class CompareDetails {
    constructor() {
        this.products = [];
        this.comparisonData = {};
        this.init();
    }

    init() {
        document.addEventListener('DOMContentLoaded', () => {
            this.loadProducts();
            this.renderComparison();
        });
    }

    loadProducts() {
        try {
            const compareProducts = localStorage.getItem('compareProducts');
            if (compareProducts) {
                this.products = JSON.parse(compareProducts);
                console.log('✅ 載入產品數據：', this.products);
            }
        } catch (e) {
            console.error('❌ 解析數據失敗：', e);
            this.products = [];
        }
    }

    renderComparison() {
        const container = document.getElementById('comd-content');
        
        if (!this.products || this.products.length < 2) {
            this.renderNoProducts(container);
            return;
        }

        this.renderComparisonContent(container);
    }

    renderNoProducts(container) {
        container.innerHTML = `
            <div class="comd-no-products">
                <div class="comd-no-products-icon">
                    <i class="fas fa-exclamation-triangle"></i>
                </div>
                <h3>沒有足夠的產品進行比較</h3>
                <p>請至少選擇兩個產品進行比較</p>
                <p>當前產品數量：${this.products.length}</p>
                <a href="index.html" class="comd-btn comd-btn-primary">
                    <i class="fas fa-home"></i> 返回首頁
                </a>
            </div>
        `;
    }

    renderComparisonContent(container) {
        const productsOverview = this.renderProductsOverview();
        const comparisonTable = this.renderComparisonTable();
        const actions = this.renderActions();

        container.innerHTML = `
            ${productsOverview}
            ${comparisonTable}
            ${actions}
        `;

        this.addInteractivity();
    }

    renderProductsOverview() {
        return `
            <div class="comd-products-section">
                <div class="comd-products-overview">
                    ${this.products.map((product, index) => `
                        <div class="comd-product-card" data-product-index="${index}">
                            <img src="${product.image || 'assets/placeholder.jpg'}" 
                                 alt="${product.name || '未知產品'}" 
                                 class="comd-product-image"
                                 id="product-image-${index}">
                            <div class="comd-product-name">${product.name || '未知產品'}</div>
                            <div class="comd-product-price">${product.price || '暫無價格'}</div>
                            <div class="comd-product-brand">${product.brand || '未知品牌'}</div>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
    }

    renderComparisonTable() {
        const comparisonRows = this.generateComparisonRows();
        
        return `
            <div class="comd-comparison-table">
                <div class="comd-table-header">
                    <h2 class="comd-table-title">詳細比較 (${this.products.length} 個產品)</h2>
                </div>
                <div class="comd-table-wrapper">
                    <table class="comd-table">
                        ${comparisonRows}
                    </table>
                </div>
            </div>
        `;
    }

    generateComparisonRows() {
        const rows = [
            this.createRow('產品名稱', 'name', '未知產品'),
            this.createRow('價格', 'price', '暫無價格', 'price'),
            this.createRow('品牌', 'brand', '未知品牌'),
            this.createColorRow(),  // 改用專門的顏色行
            this.createSpecsRow(),
            this.createFeaturesRow()
        ];

        return rows.join('');
    }

    createColorRow() {
        const cells = this.products.map((product, index) => {
            const colorOptions = product.colorOptions || [];
            const selectedIndex = product.selectedColorIndex || 0;
            
            console.log(`🎨 產品 ${index + 1} 顏色選項:`, colorOptions);
            
            if (colorOptions.length === 0) {
                return `<td><span style="color: #999;">無顏色選項</span></td>`;
            }
            
            // 創建可點擊的顏色圓點
            const colorDots = colorOptions.map((option, colorIdx) => {
                const isSelected = colorIdx === selectedIndex;
                return `
                    <span class="comd-color-selector ${isSelected ? 'selected' : ''}"
                          style="background: ${option.color};"
                          data-product-index="${index}"
                          data-color-index="${colorIdx}"
                          data-image="${option.image}"
                          title="點擊切換顏色">
                    </span>
                `;
            }).join('');
            
            return `
                <td>
                    <div class="comd-color-options">
                        ${colorDots}
                        <div class="comd-color-count">${colorOptions.length} 種顏色</div>
                    </div>
                </td>
            `;
        }).join('');

        return `
            <tr>
                <th>選擇顏色</th>
                ${cells}
            </tr>
        `;
    }

    createRow(label, key, defaultValue, type = 'text') {
        const cells = this.products.map((product, index) => {
            const value = product[key] || defaultValue;
            const cellClass = this.shouldHighlight(key, value, index) ? 'comd-winner' : '';
            
            let content = value;
            if (type === 'price') {
                content = this.formatPrice(value);
            } else if (type === 'color') {
                content = `<span class="comd-color-indicator" style="background: ${value};"></span>`;
            }

            return `<td class="${cellClass}">${content}</td>`;
        }).join('');

        return `
            <tr>
                <th>${label}</th>
                ${cells}
            </tr>
        `;
    }

    createSpecsRow() {
        const cells = this.products.map((product, index) => {
            const specs = product.specs || [];
            const content = specs.length > 0 ? `
                <ul class="comd-specs-list">
                    ${specs.map(spec => `<li>${spec}</li>`).join('')}
                </ul>
            ` : '暫無規格信息';
            
            return `<td>${content}</td>`;
        }).join('');

        return `
            <tr>
                <th>詳細規格</th>
                ${cells}
            </tr>
        `;
    }

    createFeaturesRow() {
        const cells = this.products.map((product, index) => {
            const features = product.features || [];
            const content = features.length > 0 ? `
                <ul class="comd-features-list">
                    ${features.map(feature => `<li>${feature}</li>`).join('')}
                </ul>
            ` : '暫無特點信息';
            
            return `<td>${content}</td>`;
        }).join('');

        return `
            <tr>
                <th>產品特點</th>
                ${cells}
            </tr>
        `;
    }

    shouldHighlight(key, value, index) {
        if (key === 'price') {
            // 找到最低價格的產品
            const prices = this.products.map(p => this.extractPrice(p.price));
            const minPrice = Math.min(...prices.filter(p => p > 0));
            return this.extractPrice(value) === minPrice;
        }
        return false;
    }

    extractPrice(priceString) {
        if (!priceString) return 0;
        const match = priceString.match(/[\d,]+/);
        return match ? parseInt(match[0].replace(/,/g, '')) : 0;
    }

    formatPrice(price) {
        if (!price || price === '暫無價格') return price;
        return `<span class="comd-price-highlight">${price}</span>`;
    }

    renderActions() {
        return `
            <div class="comd-actions">
                <button class="comd-btn comd-btn-primary" onclick="window.print()">
                    <i class="fas fa-print"></i> 列印比較表
                </button>
                <button class="comd-btn comd-btn-secondary" onclick="compareDetails.exportComparison()">
                    <i class="fas fa-download"></i> 匯出 PDF
                </button>
                <button class="comd-btn comd-btn-outline" onclick="compareDetails.clearComparison()">
                    <i class="fas fa-trash"></i> 清空比較
                </button>
                <a href="index.html" class="comd-btn comd-btn-primary">
                    <i class="fas fa-home"></i> 返回首頁
                </a>
            </div>
        `;
    }

    addInteractivity() {
        // 產品卡片懸停效果
        const productCards = document.querySelectorAll('.comd-product-card');
        productCards.forEach((card, index) => {
            card.addEventListener('mouseenter', () => {
                this.highlightColumn(index);
            });
            
            card.addEventListener('mouseleave', () => {
                this.removeColumnHighlight();
            });
        });

        // 表格行懸停效果
        const tableRows = document.querySelectorAll('.comd-table tr');
        tableRows.forEach(row => {
            row.addEventListener('mouseenter', () => {
                row.style.background = '#f0f8ff';
            });
            
            row.addEventListener('mouseleave', () => {
                row.style.background = '';
            });
        });

        // 顏色選擇器點擊事件
        const colorSelectors = document.querySelectorAll('.comd-color-selector');
        colorSelectors.forEach(selector => {
            selector.addEventListener('click', (e) => {
                const productIndex = parseInt(e.target.dataset.productIndex);
                const colorIndex = parseInt(e.target.dataset.colorIndex);
                const newImage = e.target.dataset.image;
                
                console.log('🎨 切換顏色:', { productIndex, colorIndex, newImage });
                
                this.changeProductColor(productIndex, colorIndex, newImage);
            });
        });
    }

    changeProductColor(productIndex, colorIndex, newImage) {
        // 更新產品數據
        if (this.products[productIndex]) {
            this.products[productIndex].selectedColorIndex = colorIndex;
            this.products[productIndex].image = newImage;
            
            // 更新 localStorage
            localStorage.setItem('compareProducts', JSON.stringify(this.products));
        }
        
        // 更新產品圖片
        const productImage = document.getElementById(`product-image-${productIndex}`);
        if (productImage) {
            productImage.style.opacity = '0';
            setTimeout(() => {
                productImage.src = newImage;
                productImage.style.opacity = '1';
            }, 150);
        }
        
        // 更新顏色選擇器的選中狀態
        const allSelectors = document.querySelectorAll(`[data-product-index="${productIndex}"]`);
        allSelectors.forEach(selector => {
            selector.classList.remove('selected');
        });
        
        const selectedSelector = document.querySelector(
            `[data-product-index="${productIndex}"][data-color-index="${colorIndex}"]`
        );
        if (selectedSelector) {
            selectedSelector.classList.add('selected');
        }
        
        console.log('✅ 顏色已更新');
    }

    highlightColumn(columnIndex) {
        const table = document.querySelector('.comd-table');
        if (!table) return;

        const rows = table.querySelectorAll('tr');
        rows.forEach(row => {
            const cells = row.querySelectorAll('td');
            if (cells[columnIndex]) {
                cells[columnIndex].style.background = '#e3f2fd';
                cells[columnIndex].style.transform = 'scale(1.02)';
                cells[columnIndex].style.boxShadow = '0 2px 8px rgba(0,0,0,0.1)';
            }
        });
    }

    removeColumnHighlight() {
        const cells = document.querySelectorAll('.comd-table td');
        cells.forEach(cell => {
            cell.style.background = '';
            cell.style.transform = '';
            cell.style.boxShadow = '';
        });
    }

    clearComparison() {
        if (confirm('確定要清空比較列表嗎？')) {
            localStorage.removeItem('compareProducts');
            localStorage.removeItem('debugCompareList');
            window.location.href = 'index.html';
        }
    }

    exportComparison() {
        // 模擬 PDF 匯出功能
        alert('PDF 匯出功能開發中，請使用列印功能代替。');
    }

    // 添加產品到比較 (從其他頁面調用)
    static addProduct(product) {
        let compareProducts = [];
        try {
            const stored = localStorage.getItem('compareProducts');
            if (stored) {
                compareProducts = JSON.parse(stored);
            }
        } catch (e) {
            console.error('解析比較產品失敗：', e);
        }

        // 檢查是否已存在
        const exists = compareProducts.find(p => p.id === product.id);
        if (exists) {
            alert('該產品已在比較列表中');
            return false;
        }

        // 限制最多比較 4 個產品
        if (compareProducts.length >= 4) {
            alert('最多只能比較 4 個產品');
            return false;
        }

        compareProducts.push(product);
        localStorage.setItem('compareProducts', JSON.stringify(compareProducts));
        return true;
    }

    // 移除產品
    static removeProduct(productId) {
        let compareProducts = [];
        try {
            const stored = localStorage.getItem('compareProducts');
            if (stored) {
                compareProducts = JSON.parse(stored);
            }
        } catch (e) {
            console.error('解析比較產品失敗：', e);
            return false;
        }

        compareProducts = compareProducts.filter(p => p.id !== productId);
        localStorage.setItem('compareProducts', JSON.stringify(compareProducts));
        return true;
    }
}

// 創建全局實例
const compareDetails = new CompareDetails();

// 匯出到全局作用域以供其他腳本使用
window.CompareDetails = CompareDetails;
