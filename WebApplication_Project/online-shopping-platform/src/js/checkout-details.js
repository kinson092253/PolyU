document.addEventListener('DOMContentLoaded', function() {
    // 載入 header 和 footer
    fetch('components/header.html')
        .then(r => r.text())
        .then(html => {
            document.getElementById('site-header').innerHTML = html;
            setTimeout(() => {
                if (typeof initializeHeader === 'function') initializeHeader();
            }, 100);
        });
    
    fetch('components/footer.html')
        .then(r => r.text())
        .then(html => document.getElementById('site-footer').innerHTML = html);

    // 從 localStorage 讀取購物車數據
    const checkoutItems = JSON.parse(localStorage.getItem('shoppingCart') || '[]');
    
    if (checkoutItems.length === 0) {
        alert('購物車是空的！');
        window.location.href = 'index.html';
        return;
    }

    // 渲染產品列表
    renderProducts(checkoutItems);
    updateTotals(checkoutItems);

    // 綁定前往付款按鈕
    document.getElementById('cd_proceed_payment').addEventListener('click', function() {
        // 重新獲取最新的購物車數據
        const currentItems = JSON.parse(localStorage.getItem('shoppingCart') || '[]');
        
        if (currentItems.length === 0) {
            alert('購物車是空的！');
            window.location.href = 'index.html';
            return;
        }
        
        // 收集所有產品的詳細選擇
        const detailedItems = [];
        let allValid = true;

        currentItems.forEach((item, index) => {
            const selectedColorBtn = document.querySelector(`[data-product-index="${index}"] .cd_color_option.selected`);
            const selectedStorageBtn = document.querySelector(`[data-product-index="${index}"] .cd_storage_option.selected`);
            
            if (!selectedColorBtn || !selectedStorageBtn) {
                allValid = false;
                alert(`請完成 "${item.title}" 的所有選項！`);
                return;
            }

            detailedItems.push({
                ...item,
                selectedColor: selectedColorBtn.dataset.color,
                selectedStorage: selectedStorageBtn.dataset.storage,
                storagePrice: parseFloat(selectedStorageBtn.dataset.price)
            });
        });

        if (allValid) {
            // 保存詳細選擇到 localStorage
            localStorage.setItem('checkoutDetailedItems', JSON.stringify(detailedItems));
            // 跳轉到付款頁面
            window.location.href = 'checkout-payment.html';
        }
    });
});

function renderProducts(items) {
    const container = document.getElementById('cd_products');
    
    // 根據產品標題判斷顏色選項和對應圖片
    function getColorOptions(productTitle, baseImage) {
        const title = productTitle.toLowerCase();
        
        // iPhone 17 Pro 的顏色 - 使用實際存在的圖片檔案
        if (title.includes('iphone') && title.includes('17 pro') && !title.includes('max')) {
            return [
                { name: '銀色', color: '#E8EEF2', image: 'assets/products/iPhone_17_Pro_Silver.avif' },
                { name: '宇宙橙', color: '#FF6B35', image: 'assets/products/iPhone_17_Pro_Cosmic_Orange.avif' },
                { name: '深墨藍', color: '#1A3A52', image: 'assets/products/iPhone_17_Pro_Deep_blue.avif' }
            ];
        }
        
        // iPhone 17 Pro Max 的顏色
        if (title.includes('iphone') && title.includes('17 pro max')) {
            return [
                { name: '銀色', color: '#E8EEF2', image: 'assets/products/iPhone_17_Pro_Max_Silver.avif' },
                { name: '宇宙橙', color: '#FF6B35', image: 'assets/products/iPhone_17_Pro_Max_Cosmic_Orange.avif' },
                { name: '深墨藍', color: '#1A3A52', image: 'assets/products/iPhone_17_Pro_Max_Deep_blue.avif' }
            ];
        }
        
        // iPhone 16 Pro 的顏色
        if (title.includes('iphone') && title.includes('16 pro') && !title.includes('max')) {
            return [
                { name: '沙漠鈦金色', color: '#8B7355', image: 'assets/products/iPhone_16_Pro.avif' },
                { name: '原色鈦金屬', color: '#C0C0C0', image: 'assets/products/iPhone_16_Pro_natural.avif' },
                { name: '白色鈦金屬', color: '#F5F5F5', image: 'assets/products/iPhone_16_Pro_white.avif' },
                { name: '黑色鈦金屬', color: '#2C2C2C', image: 'assets/products/iPhone_16_Pro_black.avif' }
            ];
        }

        // iPhone Air 的顏色 - 確保正確的檔案名稱
        if (title.includes('iphone') && (title.includes('air') || title.includes('17 air'))) {
            return [
                { name: '天藍色', color: '#aee8efff', image: 'assets/products/iPhone_Air_Sky_Blue.avif' },
                { name: '淺金色', color: '#fffd8dff', image: 'assets/products/iPhone_Air_Light_Gold.avif' },
                { name: '浮雲白色', color: '#f6efefff', image: 'assets/products/iPhone_Air_Cloud_White.avif' },
                { name: '太空黑色', color: '#2C2C2C', image: 'assets/products/iPhone_Air_Space_Black.avif' }
            ];
        }
        
        // iPad 的顏色
        if (title.includes('ipad')) {
            const baseImageName = baseImage.split('/').pop().split('.')[0];
            return [
                { name: '太空灰色', color: '#7D7E80', image: baseImage },
                { name: '銀色', color: '#E8EEF2', image: `assets/products/${baseImageName}_silver.avif` },
                { name: '玫瑰金色', color: '#E8B98A', image: `assets/products/${baseImageName}_rose.avif` },
                { name: '天藍色', color: '#4A7FA0', image: `assets/products/${baseImageName}_blue.avif` }
            ];
        }
        
        // MacBook 的顏色
        if (title.includes('macbook')) {
            const baseImageName = baseImage.split('/').pop().split('.')[0];
            return [
                { name: '午夜藍色', color: '#2C3E50', image: baseImage },
                { name: '銀色', color: '#E8EEF2', image: `assets/products/${baseImageName}_silver.avif` },
                { name: '太空灰色', color: '#7D7E80', image: `assets/products/${baseImageName}_gray.avif` },
                { name: '星光色', color: '#F5E6D3', image: `assets/products/${baseImageName}_starlight.avif` }
            ];
        }
        
        // AirPods 的顏色（通常只有白色）
        if (title.includes('airpods') || title.includes('耳機')) {
            return [
                { name: '白色', color: '#FFFFFF', image: baseImage }
            ];
        }
        
        // 預設顏色選項
        return [
            { name: '預設顏色', color: '#E8EEF2', image: baseImage }
        ];
    }
    
    // 根據產品標題判斷使用哪組儲存容量選項
    function getStorageOptions(productTitle) {
        const title = productTitle.toLowerCase();
        
        // iPhone 17 Pro (非 Max) - 較低價格
        if (title.includes('iphone') && title.includes('17 pro') && !title.includes('max')) {
            return [
                { size: '256GB', price: 9399, label: '256GB¹' },
                { size: '512GB', price: 11099, label: '512GB¹' },
                { size: '1TB', price: 12799, label: '1TB¹' }
            ];
        }
        
        // iPhone 17 Pro Max - 較高價格
        if (title.includes('iphone') && title.includes('17 pro max')) {
            return [
                { size: '256GB', price: 10199, label: '256GB¹' },
                { size: '512GB', price: 11899, label: '512GB¹' },
                { size: '1TB', price: 13599, label: '1TB¹' }
            ];
        }
        
        // iPhone 16 Pro
        if (title.includes('iphone') && title.includes('16 pro') && !title.includes('max')) {
            return [
                { size: '256GB', price: 9099, label: '256GB¹' },
                { size: '512GB', price: 10799, label: '512GB¹' },
                { size: '1TB', price: 12499, label: '1TB¹' }
            ];
        }
        
        // iPhone 16 Pro Max
        if (title.includes('iphone') && title.includes('16 pro max')) {
            return [
                { size: '256GB', price: 9899, label: '256GB¹' },
                { size: '512GB', price: 11599, label: '512GB¹' },
                { size: '1TB', price: 13299, label: '1TB¹' }
            ];
        }
        
        // iPhone Air 的儲存容量選項
        if (title.includes('iphone') && (title.includes('air') || title.includes('17 air'))) {
            return [
                { size: '256GB', price: 8599, label: '256GB¹' },
                { size: '512GB', price: 10299, label: '512GB¹' },
                { size: '1TB', price: 11999, label: '1TB¹' }
            ];
        }
        
        // iPad 或其他平板產品
        if (title.includes('ipad')) {
            return [
                { size: '128GB', price: 4999, label: '128GB' },
                { size: '256GB', price: 5499, label: '256GB' },
                { size: '512GB', price: 6499, label: '512GB' }
            ];
        }
        
        // MacBook 或筆記型電腦
        if (title.includes('macbook') || title.includes('筆記')) {
            return [
                { size: '256GB', price: 9999, label: '256GB SSD' },
                { size: '512GB', price: 11499, label: '512GB SSD' },
                { size: '1TB', price: 13499, label: '1TB SSD' }
            ];
        }
        
        // AirPods 或耳機 - 沒有儲存容量選項，顯示為不同型號
        if (title.includes('airpods') || title.includes('耳機')) {
            return [
                { size: '標準版', price: 899, label: '標準版' },
                { size: '主動降噪版', price: 1399, label: '主動降噪版' }
            ];
        }
        
        // 預設選項（適用於配件等）
        return [
            { size: '標準版', price: 799, label: '標準版' }
        ];
    }
    
    container.innerHTML = items.map((item, index) => {
        const colorOptions = getColorOptions(item.title, item.image);
        const storageOptions = getStorageOptions(item.title);
        
        // 使用第一個顏色選項的圖片作為初始圖片
        const initialImage = colorOptions[0].image;
        // 使用第一個儲存容量選項的價格作為初始價格
        const initialPrice = storageOptions[0].price;
        const initialTotal = initialPrice * item.quantity;
        
        return `
        <div class="cd_product_card" data-product-index="${index}">
            <button class="cd_remove_btn" data-index="${index}" title="移除商品">
                <i class="fas fa-times"></i>
            </button>
            <img src="${initialImage}" 
                 alt="${item.title}" 
                 class="cd_product_image" 
                 id="cd_product_image_${index}"
                 onerror="this.onerror=null; this.src='${item.image}';">
            <div class="cd_product_info">
                <h3 class="cd_product_title">${item.title}</h3>
                <div class="cd_product_price" id="cd_product_price_${index}">HK$ ${initialTotal.toLocaleString()}</div>
                
                <!-- 數量選擇器 -->
                <div class="cd_quantity_selector">
                    <label class="cd_quantity_label">數量：</label>
                    <div class="cd_quantity_controls">
                        <button class="cd_quantity_btn cd_quantity_minus" data-product-index="${index}" title="減少數量">
                            <i class="fas fa-minus"></i>
                        </button>
                        <input type="number" 
                               class="cd_quantity_input" 
                               id="cd_quantity_${index}"
                               value="${item.quantity}" 
                               min="1" 
                               max="99"
                               data-product-index="${index}"
                               readonly>
                        <button class="cd_quantity_btn cd_quantity_plus" data-product-index="${index}" title="增加數量">
                            <i class="fas fa-plus"></i>
                        </button>
                    </div>
                </div>
                
                <div class="cd_product_options">
                    <!-- 顏色選擇 -->
                    <div class="cd_option_section">
                        <label class="cd_option_label" id="cd_color_label_${index}">顏色 - ${colorOptions[0].name}</label>
                        <div class="cd_color_options">
                            ${colorOptions.map((color, idx) => `
                                <button class="cd_color_option ${idx === 0 ? 'selected' : ''}" 
                                        data-color="${color.name}"
                                        data-image="${color.image}"
                                        data-fallback="${item.image}"
                                        data-product-index="${index}"
                                        style="background: ${color.color}; ${color.color === '#FFFFFF' || color.color === '#F5F5F5' || color.color === '#f6efefff' ? 'border: 2px solid #d2d2d7;' : ''}"
                                        title="${color.name}">
                                </button>
                            `).join('')}
                        </div>
                    </div>
                    
                    <!-- 儲存容量選擇 -->
                    <div class="cd_option_section">
                        <label class="cd_option_label">${storageOptions.length > 1 ? '儲存空間：你需要多少儲存空間？' : '型號選擇'}</label>
                        <div class="cd_storage_options">
                            ${storageOptions.map((storage, idx) => `
                                <button class="cd_storage_option ${idx === 0 ? 'selected' : ''}"
                                        data-storage="${storage.size}"
                                        data-price="${storage.price}"
                                        data-product-index="${index}">
                                    <div class="cd_storage_size">${storage.label}</div>
                                    <div class="cd_storage_price">HK$${storage.price.toLocaleString()}</div>
                                </button>
                            `).join('')}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `}).join('');
    
    // 綁定刪除按鈕事件
    document.querySelectorAll('.cd_remove_btn').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            const index = parseInt(this.dataset.index);
            
            if (confirm('確定要移除此商品嗎？')) {
                // 從 localStorage 讀取最新的購物車數據
                let cartItems = JSON.parse(localStorage.getItem('shoppingCart') || '[]');
                
                // 移除指定索引的商品
                cartItems.splice(index, 1);
                
                // 更新 localStorage
                localStorage.setItem('shoppingCart', JSON.stringify(cartItems));
                
                // 如果購物車空了，返回首頁
                if (cartItems.length === 0) {
                    alert('購物車已清空！');
                    window.location.href = 'index.html';
                    return;
                }
                
                // 重新渲染產品列表
                renderProducts(cartItems);
                updateTotals(cartItems);
                
                // 更新購物車圖標數量（如果 ShoppingCart 存在）
                if (window.ShoppingCart && typeof window.ShoppingCart.updateDisplay === 'function') {
                    window.ShoppingCart.items = cartItems;
                    window.ShoppingCart.updateDisplay();
                }
            }
        });
    });
    
    // 綁定數量增加按鈕
    document.querySelectorAll('.cd_quantity_plus').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            const productIndex = this.dataset.productIndex;
            const quantityInput = document.getElementById(`cd_quantity_${productIndex}`);
            let currentQuantity = parseInt(quantityInput.value) || 1;
            
            if (currentQuantity < 99) {
                currentQuantity++;
                quantityInput.value = currentQuantity;
                
                // 添加動畫效果
                quantityInput.style.transform = 'scale(1.2)';
                setTimeout(() => {
                    quantityInput.style.transform = 'scale(1)';
                }, 200);
                
                // 更新 localStorage
                updateCartQuantity(productIndex, currentQuantity);
                
                // 更新產品價格和總價
                updateProductPrice(productIndex);
                updateTotalsFromSelection();
            }
        });
    });
    
    // 綁定數量減少按鈕
    document.querySelectorAll('.cd_quantity_minus').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            const productIndex = this.dataset.productIndex;
            const quantityInput = document.getElementById(`cd_quantity_${productIndex}`);
            let currentQuantity = parseInt(quantityInput.value) || 1;
            
            if (currentQuantity > 1) {
                currentQuantity--;
                quantityInput.value = currentQuantity;
                
                // 添加動畫效果
                quantityInput.style.transform = 'scale(1.2)';
                setTimeout(() => {
                    quantityInput.style.transform = 'scale(1)';
                }, 200);
                
                // 更新 localStorage
                updateCartQuantity(productIndex, currentQuantity);
                
                // 更新產品價格和總價
                updateProductPrice(productIndex);
                updateTotalsFromSelection();
            }
        });
    });
    
    // 綁定顏色選擇事件
    document.querySelectorAll('.cd_color_option').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            
            const productIndex = this.dataset.productIndex;
            const colorName = this.dataset.color;
            const newImage = this.dataset.image;
            const fallbackImage = this.dataset.fallback;
            
            console.log('🎨 切換顏色:', colorName);
            console.log('📷 新圖片路徑:', newImage);
            console.log('📷 備用圖片路徑:', fallbackImage);
            
            // 移除同一產品的其他選中狀態
            document.querySelectorAll(`[data-product-index="${productIndex}"].cd_color_option`).forEach(b => {
                b.classList.remove('selected');
            });
            
            // 添加當前選中狀態
            this.classList.add('selected');
            
            // 更新標籤顯示選中的顏色
            const label = document.getElementById(`cd_color_label_${productIndex}`);
            if (label) {
                label.textContent = `顏色 - ${colorName}`;
            }
            
            // 更新產品圖片
            const productImage = document.getElementById(`cd_product_image_${productIndex}`);
            if (productImage) {
                // 添加淡出效果
                productImage.style.opacity = '0.5';
                
                // 直接設置新圖片
                productImage.src = newImage;
                
                // 圖片載入成功後恢復透明度
                productImage.onload = function() {
                    productImage.style.opacity = '1';
                    console.log('✅ 圖片載入成功:', newImage);
                };
                
                // 圖片載入失敗時使用備用圖片
                productImage.onerror = function() {
                    console.warn('⚠️ 圖片載入失敗，使用備用圖片:', fallbackImage);
                    productImage.src = fallbackImage;
                    productImage.style.opacity = '1';
                    // 防止無限循環
                    productImage.onerror = null;
                };
            }
        });
    });
    
    // 綁定儲存容量選擇事件
    document.querySelectorAll('.cd_storage_option').forEach(btn => {
        btn.addEventListener('click', function() {
            const productIndex = this.dataset.productIndex;
            
            // 移除同一產品的其他選中狀態
            document.querySelectorAll(`[data-product-index="${productIndex}"].cd_storage_option`).forEach(b => {
                b.classList.remove('selected');
            });
            
            // 添加當前選中狀態
            this.classList.add('selected');
            
            // 更新產品價格
            updateProductPrice(productIndex);
            
            // 重新計算總價
            updateTotalsFromSelection();
        });
    });
}

// 新增函數：更新單個產品的價格（容量價格 × 數量）
function updateProductPrice(productIndex) {
    const selectedStorage = document.querySelector(`[data-product-index="${productIndex}"].cd_storage_option.selected`);
    const quantityInput = document.getElementById(`cd_quantity_${productIndex}`);
    const priceElement = document.getElementById(`cd_product_price_${productIndex}`);
    
    if (selectedStorage && quantityInput && priceElement) {
        const unitPrice = parseFloat(selectedStorage.dataset.price);
        const quantity = parseInt(quantityInput.value) || 1;
        const totalPrice = unitPrice * quantity;
        
        // 添加動畫效果
        priceElement.style.transform = 'scale(1.1)';
        priceElement.style.transition = 'all 0.3s ease';
        
        setTimeout(() => {
            priceElement.textContent = `HK$ ${totalPrice.toLocaleString()}`;
            priceElement.style.transform = 'scale(1)';
        }, 150);
        
        console.log(`📊 產品 ${productIndex}: ${unitPrice} × ${quantity} = ${totalPrice}`);
    }
}

// 新增函數：更新單個產品的小計
function updateProductSubtotal(productIndex) {
    const selectedStorage = document.querySelector(`[data-product-index="${productIndex}"].cd_storage_option.selected`);
    const quantityInput = document.getElementById(`cd_quantity_${productIndex}`);
    const subtotalElement = document.getElementById(`cd_product_subtotal_${productIndex}`);
    
    if (selectedStorage && quantityInput && subtotalElement) {
        const price = parseFloat(selectedStorage.dataset.price);
        const quantity = parseInt(quantityInput.value) || 1;
        const subtotal = price * quantity;
        
        // 添加動畫效果
        subtotalElement.style.transform = 'scale(1.1)';
        subtotalElement.style.transition = 'all 0.3s ease';
        
        setTimeout(() => {
            subtotalElement.textContent = `小計：HK$ ${subtotal.toLocaleString()}`;
            subtotalElement.style.transform = 'scale(1)';
        }, 150);
        
        console.log(`📊 產品 ${productIndex} 小計: ${subtotal}`);
    }
}

// 新增函數：更新購物車中的數量
function updateCartQuantity(index, newQuantity) {
    let cartItems = JSON.parse(localStorage.getItem('shoppingCart') || '[]');
    
    if (cartItems[index]) {
        cartItems[index].quantity = newQuantity;
        localStorage.setItem('shoppingCart', JSON.stringify(cartItems));
        
        // 同步更新購物車圖標數量
        if (window.ShoppingCart && typeof window.ShoppingCart.updateDisplay === 'function') {
            window.ShoppingCart.items = cartItems;
            window.ShoppingCart.updateDisplay();
        }
        
        console.log('🔄 已更新數量:', newQuantity);
    }
}

// 修改函數：根據當前選擇計算總價
function updateTotalsFromSelection() {
    let subtotal = 0;
    
    // 遍歷所有產品卡片
    document.querySelectorAll('.cd_product_card').forEach((card, index) => {
        const selectedStorage = card.querySelector('.cd_storage_option.selected');
        const quantityInput = document.getElementById(`cd_quantity_${index}`);
        
        if (selectedStorage && quantityInput) {
            const price = parseFloat(selectedStorage.dataset.price);
            const quantity = parseInt(quantityInput.value) || 1;
            subtotal += price * quantity;
        }
    });
    
    console.log('🧮 計算總價:', subtotal);
    
    // 添加動畫效果
    const subtotalElement = document.getElementById('cd_subtotal');
    const totalElement = document.getElementById('cd_total');
    
    if (subtotalElement && totalElement) {
        subtotalElement.style.transform = 'scale(1.1)';
        totalElement.style.transform = 'scale(1.1)';
        
        setTimeout(() => {
            subtotalElement.textContent = `HK$ ${subtotal.toLocaleString()}`;
            totalElement.textContent = `HK$ ${subtotal.toLocaleString()}`;
            subtotalElement.style.transform = 'scale(1)';
            totalElement.style.transform = 'scale(1)';
        }, 200);
    }
}

function updateTotals(items) {
    // 使用新函數計算總價
    updateTotalsFromSelection();
}
