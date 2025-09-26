document.addEventListener("DOMContentLoaded", function() {
    // 載入 header
    fetch('components/header.html')
        .then(response => response.text())
        .then(html => {
            document.getElementById('header').innerHTML = html;
            initializeHeader(); // 初始化 header 功能
        });

    // 載入 slider
    fetch('components/slider.html')
        .then(response => response.text())
        .then(html => {
            document.getElementById('slider').innerHTML = html;
            initializeSlider(); // 初始化 slider 功能
        });

    // 載入 footer
    fetch('components/footer.html')
        .then(response => response.text())
        .then(html => {
            document.getElementById('footer').innerHTML = html;
        });

    // 載入 product-list
    fetch('components/product-list.html')
        .then(response => response.text())
        .then(html => {
            document.getElementById('product-list').innerHTML = html;
            initializeProductList(); // 初始化 product-list 功能
        });

    // 載入 hot-brand
    fetch('components/hot-brand.html')
        .then(response => response.text())
        .then(html => {
            document.getElementById('hot-brand').innerHTML = html;
        });
});

// Header 功能初始化
function initializeHeader() {
    const categoryBtn = document.getElementById('category-btn');
    const sidebar = document.getElementById('category-sidebar');
    const overlay = document.getElementById('sidebar-overlay');
    const level1 = document.getElementById('category-level-1');
    const level2 = document.getElementById('category-level-2');
    const backBtn = document.getElementById('back-btn');
    const categoryTitle = document.getElementById('category-title');
    const subcategoryList = document.getElementById('subcategory-list');

    // 種類與子類對應
    const subcategories = {
        tv: ['4K 電視', '智能電視', '電視配件'],
        laptop: ['滑鼠', '鍵盤', '螢幕', '筆電包'],
        phone: ['手機殼', '充電器', '耳機', '保護貼']
    };

    // 開啟側邊欄
    categoryBtn.onclick = function(e) {
        e.preventDefault();
        sidebar.classList.add('active');
        overlay.classList.add('active');
        level1.classList.add('active');
        level2.classList.remove('active');
    };

    // 關閉側邊欄
    overlay.onclick = function() {
        sidebar.classList.remove('active');
        overlay.classList.remove('active');
    };

    // 點擊第一層分類
    level1.querySelectorAll('li').forEach(li => {
        li.onclick = function() {
            const cat = li.getAttribute('data-category');
            categoryTitle.textContent = li.textContent;
            subcategoryList.innerHTML = '';
            subcategories[cat].forEach(sub => {
                const item = document.createElement('li');
                item.textContent = sub;
                subcategoryList.appendChild(item);
            });
            level1.classList.remove('active');
            level2.classList.add('active');
        };
    });

    // 返回第一層
    backBtn.onclick = function() {
        level2.classList.remove('active');
        level1.classList.add('active');
    };
}

// Slider 功能初始化
function initializeSlider() {
    const slider = document.querySelector('.slider');
    const slides = document.querySelectorAll('.slide');
    const prevBtn = document.querySelector('.prev');
    const nextBtn = document.querySelector('.next');
    
    if (!slider || !slides.length) return;

    let currentSlide = 0;
    const slideCount = slides.length;
    
    // 自動輪播
    let slideInterval = setInterval(nextSlide, 5000);
    
    function nextSlide() {
        currentSlide = (currentSlide + 1) % slideCount;
        updateSlider();
    }
    
    function prevSlide() {
        currentSlide = (currentSlide - 1 + slideCount) % slideCount;
        updateSlider();
    }
    
    function updateSlider() {
        slider.style.transform = `translateX(-${currentSlide * 100}%)`;
    }
    
    // 按鈕點擊事件
    prevBtn?.addEventListener('click', () => {
        clearInterval(slideInterval);
        prevSlide();
        slideInterval = setInterval(nextSlide, 5000);
    });
    
    nextBtn?.addEventListener('click', () => {
        clearInterval(slideInterval);
        nextSlide();
        slideInterval = setInterval(nextSlide, 5000);
    });
    
    // 滑鼠懸停時暫停自動輪播
    slider?.addEventListener('mouseenter', () => {
        clearInterval(slideInterval);
    });
    
    slider?.addEventListener('mouseleave', () => {
        slideInterval = setInterval(nextSlide, 5000);
    });
}

// Product List 功能
function initializeProductList() {
    const colorDots = document.querySelectorAll('.color-dot');
    colorDots.forEach(dot => {
        dot.addEventListener('click', function() {
            // 找到最近的產品卡片中的圖片
            const productCard = this.closest('.product-card');
            const productImage = productCard.querySelector('.product-image');
            
            // 更換圖片
            productImage.src = this.dataset.image;
            
            // 更新選中狀態
            productCard.querySelectorAll('.color-dot').forEach(d => {
                d.classList.remove('selected');
            });
            this.classList.add('selected');
        });
    });
}