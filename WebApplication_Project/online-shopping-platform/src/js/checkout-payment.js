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

    // 從 localStorage 讀取詳細產品數據
    const detailedItems = JSON.parse(localStorage.getItem('checkoutDetailedItems') || '[]');
    
    if (detailedItems.length === 0) {
        alert('沒有產品信息！');
        window.location.href = 'checkout-details.html';
        return;
    }

    // 計算總金額
    const totalAmount = detailedItems.reduce((sum, item) => sum + (item.storagePrice * item.quantity), 0);

    // 渲染訂單摘要
    renderOrderSummary(detailedItems);
    updatePaymentTotals(detailedItems);

    // 付款方式切換
    const paymentMethods = document.querySelectorAll('input[name="payment"]');
    const creditCardFields = document.getElementById('cp_credit_card_fields');
    const alipayQR = document.getElementById('cp_alipay_qr');
    const wechatQR = document.getElementById('cp_wechat_qr');
    
    paymentMethods.forEach(method => {
        method.addEventListener('change', function() {
            // 隱藏所有付款方式的額外欄位
            creditCardFields.style.display = 'none';
            alipayQR.style.display = 'none';
            wechatQR.style.display = 'none';
            
            // 根據選擇顯示對應的付款方式
            if (this.value === 'credit') {
                creditCardFields.style.display = 'block';
            } else if (this.value === 'alipay') {
                alipayQR.style.display = 'block';
                // 更新支付寶金額
                document.getElementById('cp_alipay_amount').textContent = 
                    `HK$ ${totalAmount.toLocaleString()}`;
            } else if (this.value === 'wechat') {
                wechatQR.style.display = 'block';
                // 更新微信支付金額
                document.getElementById('cp_wechat_amount').textContent = 
                    `HK$ ${totalAmount.toLocaleString()}`;
            }
        });
    });

    // 配送方式切換
    const deliveryMethods = document.querySelectorAll('input[name="delivery"]');
    const shippingFields = document.getElementById('cp_shipping_fields');
    const pickupFields = document.getElementById('cp_pickup_fields');

    deliveryMethods.forEach(method => {
        method.addEventListener('change', function() {
            if (this.value === 'shipping') {
                // 顯示送貨表單
                shippingFields.style.display = 'block';
                pickupFields.style.display = 'none';
                
                // 設置送貨欄位為必填
                shippingFields.querySelectorAll('input, textarea').forEach(input => {
                    input.required = true;
                });
                
                // 移除自取欄位的必填要求
                pickupFields.querySelectorAll('input, select').forEach(input => {
                    input.required = false;
                });
            } else {
                // 顯示自取表單
                shippingFields.style.display = 'none';
                pickupFields.style.display = 'block';
                
                // 移除送貨欄位的必填要求
                shippingFields.querySelectorAll('input, textarea').forEach(input => {
                    input.required = false;
                });
                
                // 設置自取欄位為必填
                pickupFields.querySelectorAll('input, select').forEach(input => {
                    input.required = true;
                });
            }
        });
    });

    // 表單提交
    document.getElementById('cp_payment_form').addEventListener('submit', function(e) {
        e.preventDefault();
        
        const formData = new FormData(this);
        const deliveryMethod = document.querySelector('input[name="delivery"]:checked').value;
        
        // 收集訂單資料
        const orderData = {
            items: detailedItems,
            delivery: deliveryMethod,
            payment: formData.get('payment'),
            total: totalAmount
        };
        
        // 根據配送方式收集不同的資料
        if (deliveryMethod === 'shipping') {
            orderData.shipping = {
                name: formData.get('name'),
                phone: formData.get('phone'),
                email: formData.get('email'),
                address: formData.get('address')
            };
        } else {
            orderData.pickup = {
                name: formData.get('pickup-name'),
                phone: formData.get('pickup-phone'),
                email: formData.get('pickup-email'),
                store: formData.get('pickup-store')
            };
        }

        // 保存訂單資料到 localStorage
        localStorage.setItem('lastOrder', JSON.stringify(orderData));
        
        // 清空購物車和結賬數據
        localStorage.removeItem('shoppingCart');
        localStorage.removeItem('checkoutDetailedItems');
        
        // 跳轉到收據頁面
        window.location.href = 'checkout-receipt.html';
    });

    // 格式化信用卡號碼
    const cardNumberInput = document.querySelector('input[name="card-number"]');
    if (cardNumberInput) {
        cardNumberInput.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\s/g, '');
            let formattedValue = value.match(/.{1,4}/g)?.join(' ') || value;
            e.target.value = formattedValue;
        });
    }

    // 格式化有效期限
    const expiryInput = document.querySelector('input[name="expiry"]');
    if (expiryInput) {
        expiryInput.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\D/g, '');
            if (value.length >= 2) {
                value = value.slice(0, 2) + '/' + value.slice(2, 4);
            }
            e.target.value = value;
        });
    }
});

function renderOrderSummary(items) {
    const container = document.getElementById('cp_summary_products');
    
    container.innerHTML = items.map(item => `
        <div class="cp_summary_item">
            <img src="${item.image}" alt="${item.title}">
            <div class="cp_summary_details">
                <div class="cp_summary_title">${item.title}</div>
                <div class="cp_summary_options">
                    <span>${item.selectedColor}</span> | 
                    <span>${item.selectedStorage}</span>
                </div>
                <div class="cp_summary_qty">數量: ${item.quantity}</div>
            </div>
            <div class="cp_summary_price">
                HK$ ${(item.storagePrice * item.quantity).toLocaleString()}
            </div>
        </div>
    `).join('');
}

function updatePaymentTotals(items) {
    const subtotal = items.reduce((sum, item) => sum + (item.storagePrice * item.quantity), 0);
    document.getElementById('cp_subtotal').textContent = `HK$ ${subtotal.toLocaleString()}`;
    document.getElementById('cp_total').textContent = `HK$ ${subtotal.toLocaleString()}`;
}
