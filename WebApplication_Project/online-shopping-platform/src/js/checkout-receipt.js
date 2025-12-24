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

    // 從 localStorage 讀取訂單數據
    const orderData = JSON.parse(localStorage.getItem('lastOrder') || 'null');
    
    if (!orderData) {
        alert('找不到訂單資訊！');
        window.location.href = 'index.html';
        return;
    }

    // 渲染收據內容
    renderReceipt(orderData);
});

function renderReceipt(orderData) {
    // 生成收據編號
    const receiptNumber = generateReceiptNumber();
    document.getElementById('receipt_number').textContent = receiptNumber;
    
    // 顯示訂單日期
    const orderDate = new Date().toLocaleString('zh-TW', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit'
    });
    document.getElementById('receipt_date').textContent = orderDate;
    
    // 顯示付款方式
    const paymentMethod = getPaymentMethodName(orderData.payment);
    document.getElementById('receipt_payment').textContent = paymentMethod;
    
    // 渲染客戶資訊
    renderCustomerInfo(orderData);
    
    // 渲染配送資訊
    renderDeliveryInfo(orderData);
    
    // 渲染訂單商品
    renderOrderItems(orderData.items);
    
    // 顯示總金額
    const subtotal = orderData.items.reduce((sum, item) => 
        sum + (item.storagePrice * item.quantity), 0);
    document.getElementById('receipt_subtotal').textContent = `HK$ ${subtotal.toLocaleString()}`;
    document.getElementById('receipt_total').textContent = `HK$ ${subtotal.toLocaleString()}`;
}

function generateReceiptNumber() {
    const date = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const random = Math.floor(Math.random() * 10000).toString().padStart(4, '0');
    return `ORD${year}${month}${day}${random}`;
}

function getPaymentMethodName(method) {
    const methods = {
        'credit': '信用卡 / 扣賬卡',
        'paypal': 'PayPal',
        'alipay': '支付寶',
        'wechat': '微信支付'
    };
    return methods[method] || method;
}

function renderCustomerInfo(orderData) {
    const container = document.getElementById('receipt_customer');
    const info = orderData.delivery === 'shipping' ? 
        orderData.shipping : orderData.pickup;
    
    container.innerHTML = `
        <div class="receipt_info_grid">
            <div class="receipt_info_item">
                <span class="receipt_label">姓名：</span>
                <span class="receipt_value">${info.name}</span>
            </div>
            <div class="receipt_info_item">
                <span class="receipt_label">電話：</span>
                <span class="receipt_value">${info.phone}</span>
            </div>
            <div class="receipt_info_item">
                <span class="receipt_label">電郵：</span>
                <span class="receipt_value">${info.email}</span>
            </div>
        </div>
    `;
}

function renderDeliveryInfo(orderData) {
    const container = document.getElementById('receipt_delivery');
    
    if (orderData.delivery === 'shipping') {
        container.innerHTML = `
            <div class="receipt_delivery_method">
                <i class="fas fa-truck"></i>
                <span>送貨到府</span>
            </div>
            <div class="receipt_address">
                <span class="receipt_label">配送地址：</span>
                <span class="receipt_value">${orderData.shipping.address}</span>
            </div>
        `;
    } else {
        container.innerHTML = `
            <div class="receipt_delivery_method">
                <i class="fas fa-store"></i>
                <span>門市自取</span>
            </div>
            <div class="receipt_address">
                <span class="receipt_label">取貨門市：</span>
                <span class="receipt_value">${orderData.pickup.store}</span>
            </div>
            <div class="receipt_note_box">
                <i class="fas fa-info-circle"></i>
                <span>商品將於 3-5 個工作天內送達所選門市，請留意取貨通知。</span>
            </div>
        `;
    }
}

function renderOrderItems(items) {
    const tbody = document.getElementById('receipt_items');
    
    tbody.innerHTML = items.map(item => `
        <tr>
            <td>
                <div class="receipt_item_name">
                    <img src="${item.image}" alt="${item.title}">
                    <span>${item.title}</span>
                </div>
            </td>
            <td>
                <div class="receipt_specs">
                    <span>${item.selectedColor}</span>
                    <span>${item.selectedStorage}</span>
                </div>
            </td>
            <td>HK$ ${item.storagePrice.toLocaleString()}</td>
            <td>${item.quantity}</td>
            <td class="receipt_item_total">HK$ ${(item.storagePrice * item.quantity).toLocaleString()}</td>
        </tr>
    `).join('');
}
