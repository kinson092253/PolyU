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

    // 載入 latest_product
    fetch('components/latest_product.html')
        .then(response => response.text())
        .then(html => {
            document.getElementById('latest_product').innerHTML = html;
            initializeProductList(); // 初始化 latest_product 功能
        });
    // 載入 compare_panel
    fetch('components/compare_panel.html')
        .then(response => response.text())
        .then(html => {
            document.getElementById('compare-panel-root').innerHTML = html;
        });

    // 載入 hot_brand
    fetch('components/hot_brand.html')
        .then(response => response.text())
        .then(html => {
            document.getElementById('hot_brand').innerHTML = html;
        });

    // 載入 limited_time_offer
    fetch('components/limited_time_offer.html')
    .then(res => res.text())
    .then(html => {
        document.getElementById('limited-time-offer').innerHTML = html;
        initializeLimitedOfferCarousel(); // 載入後初始化輪播
    });

    // 導航「限量搶購」滾動到區域
    document.addEventListener('click', function(e) {
        const target = e.target.closest('a');
        if (target && target.textContent.includes('限時搶購')) {
            e.preventDefault();
            const offerSection = document.getElementById('limited-time-offer');
            if (offerSection) {
                offerSection.scrollIntoView({ behavior: 'smooth' });
            }
        }
    });

    // 導航「最新產品」滾動到區域
    document.addEventListener('click', function(e) {
        const target = e.target.closest('a');
        if (target && target.textContent.includes('最新產品')) {
            e.preventDefault();
            const offerSection = document.getElementById('latest_product');
            if (offerSection) {
                offerSection.scrollIntoView({ behavior: 'smooth' });
            }
        }
    });

    // 導航「熱門品牌」滾動到區域
    document.addEventListener('click', function(e) {
        const target = e.target.closest('a');
        if (target && target.textContent.includes('熱門品牌')) {
            e.preventDefault();
            const offerSection = document.getElementById('hot_brand');
            if (offerSection) {
                offerSection.scrollIntoView({ behavior: 'smooth' });
            }
        }
    });

    // 讓麵包屑「耳機」點擊時彈出左側分類導航（支援 product.html）
    document.addEventListener('click', function(e) {
        const earphoneBreadcrumb = e.target.closest('#breadcrumb-earphone');
        if (earphoneBreadcrumb) {
            e.preventDefault();
            const categoryBtn = document.getElementById('category-btn');
            if (categoryBtn) categoryBtn.click();
            setTimeout(function() {
                const digitalLi = document.querySelector('#category-level-1 li[data-category="digital"]');
                if (digitalLi) digitalLi.click();
                setTimeout(function() {
                    const earphoneLi = Array.from(document.querySelectorAll('#subcategory-list li'))
                        .find(li => li.textContent.trim() === '耳機');
                    if (earphoneLi) earphoneLi.click();
                }, 200);
            }, 200);
        }

        // 讓麵包屑「數碼娛樂」點擊時彈出左側分類導航
        const digitalBreadcrumb = e.target.closest('#breadcrumb-digital');
        if (digitalBreadcrumb) {
            e.preventDefault();
            const categoryBtn = document.getElementById('category-btn');
            if (categoryBtn) categoryBtn.click();
            setTimeout(function() {
                const digitalLi = document.querySelector('#category-level-1 li[data-category="digital"]');
                if (digitalLi) digitalLi.click();
            }, 200);
        }
    });

    // 進階選項彈窗邏輯（for product.html）
    const openBtn = document.querySelector('.filter-btn');
    const sidebar = document.getElementById('filter-sidebar');
    const overlay = document.getElementById('filter-sidebar-overlay');
    const closeBtn = document.getElementById('filter-close-btn');
    if (openBtn && sidebar && overlay && closeBtn) {
        openBtn.addEventListener('click', function(e) {
            e.preventDefault();
            sidebar.classList.add('active');
            overlay.classList.add('active');
        });
        closeBtn.addEventListener('click', function() {
            sidebar.classList.remove('active');
            overlay.classList.remove('active');
        });
        overlay.addEventListener('click', function() {
            sidebar.classList.remove('active');
            overlay.classList.remove('active');
        });
    }

    // 動態顯示產品數量（for product.html）
    const productListCount = document.querySelector('.product-list-count');
    const productCardList = document.querySelector('.product-card-list');
    if (productListCount && productCardList) {
        const count = productCardList.querySelectorAll('.product-card-v2').length;
        productListCount.textContent = `(${count} 件產品)`;
    }

    // 產品排序功能（for product.html）
    const sortSelect = document.querySelector('.sort-select');
    // 注意：不要重複宣告 productCardList
    if (sortSelect && productCardList) {
        sortSelect.addEventListener('change', function() {
            const cards = Array.from(productCardList.querySelectorAll('.product-card-v2'));
            // 取得價格，去除非數字字元
            const getPrice = card => {
                const priceEl = card.querySelector('.price-v2');
                if (!priceEl) return Infinity;
                return parseFloat(priceEl.textContent.replace(/[^\d.]/g, '')) || Infinity;
            };
            let sorted;
            if (sortSelect.value.includes('低至高')) {
                sorted = cards.sort((a, b) => getPrice(a) - getPrice(b));
            } else if (sortSelect.value.includes('高至低')) {
                sorted = cards.sort((a, b) => getPrice(b) - getPrice(a));
            } else {
                // 預設不排序
                return;
            }
            // 重新插入排序後的卡片
            sorted.forEach(card => productCardList.appendChild(card));
        });
    }

    // 品牌顯示更多/收起功能
    const brandList = document.querySelector('.filter-brand-list');
    const brandBtns = brandList ? Array.from(brandList.querySelectorAll('.filter-brand-btn')) : [];
    const brandMore = document.querySelector('.filter-brand-more');
    let expanded = false;
    if (brandList && brandMore && brandBtns.length > 5) {
        brandMore.onclick = function() {
            expanded = !expanded;
            brandBtns.forEach((btn, idx) => {
                btn.style.display = (expanded || idx < 5) ? '' : 'none';
            });
            brandMore.textContent = expanded ? '收起' : '顯示更多';
        };
        // 初始化只顯示前5個
        brandBtns.forEach((btn, idx) => {
            btn.style.display = idx < 5 ? '' : 'none';
        });
    }

    // --- Filter 功能 ---
    // 避免重複命名，這裡用 productCardsForFilter
    const productCardsForFilter = productCardList ? Array.from(productCardList.querySelectorAll('.product-card-v2')) : [];
    const priceRadios = document.querySelectorAll('.filter-price-list input[type="radio"]');
    let selectedPrice = '全部價格';
    let selectedBrands = [];

    // 品牌選擇
    brandBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            btn.classList.toggle('selected');
            selectedBrands = brandBtns.filter(b => b.classList.contains('selected')).map(b => b.textContent.trim());
            filterProducts();
        });
    });

    // 價格選擇
    priceRadios.forEach(radio => {
        radio.addEventListener('change', function() {
             if (radio.checked) {
                selectedPrice = radio.parentElement.textContent.trim();
                filterProducts();
            }
        });
    });

    // 清空選項
    const clearBtn = document.querySelector('.filter-clear-btn');
    if (clearBtn) {
        clearBtn.addEventListener('click', function() {
            // 清空品牌
            brandBtns.forEach(btn => btn.classList.remove('selected'));
            selectedBrands = [];
            // 清空價格
            priceRadios.forEach(radio => {
                if (radio.parentElement.textContent.includes('全部價格')) {
                    radio.checked = true;
                    selectedPrice = '全部價格';
                } else {
                    radio.checked = false;
                }
            });
            filterProducts();
        });
    }

    // 篩選主邏輯
    function filterProducts() {
        productCardsForFilter.forEach(card => {
            // 從 .price-v2 取得價格
            const priceEl = card.querySelector('.price-v2');
            // 移除 HK$ 前綴和所有非數字字符（除了小數點）
            let price = priceEl ? parseFloat(priceEl.textContent.replace('HK$', '').replace(/[^\d.]/g, '')) : NaN;
            let priceMatch = true;

            if (selectedPrice === '全部價格') {
                priceMatch = true;
            } else if (selectedPrice.includes('或以下')) {
                const max = parseInt(selectedPrice.match(/\d+/)[0]);
                priceMatch = price <= max;
            } else if (selectedPrice.includes('或以上')) {
                const min = parseInt(selectedPrice.match(/\d+/)[0]);
                priceMatch = price >= min;
            } else if (selectedPrice.includes('-')) {
                // 明確處理價格區間，例如 "$200 - $400"
                const [min, max] = selectedPrice.split('-').map(p => parseInt(p.match(/\d+/)[0]));
                priceMatch = price >= min && price < max;  // 使用半開區間 [min, max)
            }
            // 品牌篩選
            let brandMatch = true;
            if (selectedBrands.length > 0) {
                brandMatch = selectedBrands.some(brand => {
                    const title = card.querySelector('.product-title-v2')?.textContent || '';
                    return title.includes(brand);
                });
            }
            card.style.display = (priceMatch && brandMatch) ? '' : 'none';
        });
        // 更新產品數量
        if (productListCount && productCardList) {
            const visibleCount = productCardsForFilter.filter(card => card.style.display !== 'none').length;
            productListCount.textContent = `(${visibleCount} 件產品)`;
        }
    }

    // --- Add-to-cart modal logic --- 移除這整個區塊
    // (function() {
    //     const modal = document.getElementById('add-modal');
    //     const overlay = document.getElementById('add-modal-overlay');
    //     const closeBtn = document.getElementById('add-modal-close');
    //     const cancelBtn = document.getElementById('add-modal-cancel');
    //     const confirmBtn = document.getElementById('add-modal-confirm');
    //     const imgEl = document.getElementById('add-modal-image');
    //     const titleEl = document.getElementById('add-modal-title');
    //     const priceEl = document.getElementById('add-modal-price');
    //     const qtyInput = document.getElementById('add-modal-qty');
    //     const qtyPlus = document.getElementById('add-modal-qty-plus');
    //     const qtyMinus = document.getElementById('add-modal-qty-minus');
    //     const colorsContainer = document.getElementById('add-modal-colors');

    //     function openModal(data) {
    //         if (!modal || !overlay) return;
    //         imgEl.src = data.image || '';
    //         imgEl.alt = data.title || '';
    //         titleEl.textContent = data.title || '';
    //         priceEl.textContent = data.priceText || '';
    //         qtyInput.value = 1;
    //         // populate colors if provided
    //         colorsContainer.innerHTML = '';
    //         const colors = data.colors && data.colors.length ? data.colors : ['Default'];
    //         colors.forEach((c, idx) => {
    //             const b = document.createElement('button');
    //             b.type = 'button';
    //             b.className = 'color-option' + (idx===0 ? ' selected' : '');
    //             b.dataset.color = c;
    //             b.textContent = c;
    //             b.addEventListener('click', () => {
    //                 colorsContainer.querySelectorAll('.color-option').forEach(x => x.classList.remove('selected'));
    //                 b.classList.add('selected');
    //             });
    //             colorsContainer.appendChild(b);
    //         });

    //         // lock body scroll while modal is open
    //         document.body.style.overflow = 'hidden';
    //         modal.setAttribute('aria-hidden','false');
    //         overlay.classList.add('active');
    //         overlay.style.display = 'block';
    //         overlay.setAttribute('aria-hidden','false');
    //         modal.style.display = 'block';
    //     }
    //     function closeModal() {
    //         if (!modal || !overlay) return;
    //         modal.setAttribute('aria-hidden','true');
    //         overlay.classList.remove('active');
    //         overlay.style.display = 'none';
    //         overlay.setAttribute('aria-hidden','true');
    //         modal.style.display = 'none';
    //         // restore body scroll
    //         document.body.style.overflow = '';
    //     }

    //     // delegate: open modal when clicking "+"
    //     document.addEventListener('click', function(e) {
    //         const btn = e.target.closest('.product-add-btn-v2');
    //         if (!btn) return;
    //         const card = btn.closest('.product-card-v2');
    //         if (!card) return;
    //         const title = card.querySelector('.product-title-v2')?.textContent?.trim() || '';
    //         const priceText = card.querySelector('.price-v2')?.textContent?.trim() || '';
    //         const image = card.querySelector('.product-img-v2')?.src || '';
    //         // optional: try to parse brand or color options from title or dataset (example)
    //         const colors = []; // you can fill with real options if available
    //         openModal({ title, priceText, image, colors });
    //     });

    //     closeBtn?.addEventListener('click', closeModal);
    //     cancelBtn?.addEventListener('click', closeModal);
    //     overlay?.addEventListener('click', closeModal);

    //     qtyPlus?.addEventListener('click', function() {
    //         qtyInput.value = Math.max(1, parseInt(qtyInput.value || '1') + 1);
    //     });
    //     qtyMinus?.addEventListener('click', function() {
    //         qtyInput.value = Math.max(1, parseInt(qtyInput.value || '1') - 1);
    //     });

    //     confirmBtn?.addEventListener('click', function() {
    //         // gather selection
    //         const qty = parseInt(qtyInput.value || '1');
    //         const color = colorsContainer.querySelector('.color-option.selected')?.dataset.color || '';
    //         const item = {
    //             title: titleEl.textContent,
    //             priceText: priceEl.textContent,
    //             qty,
    //             color
    //         };
    //         // TODO: add to cart logic; for now just log and close
    //         console.log('Add to cart:', item);
    //         closeModal();
    //     });
    // })();

    // --- Preview modal for product image click ---
    (function() {
        const modal = document.getElementById('preview-modal');
        const overlay = document.getElementById('preview-modal-overlay');
        const closeBtn = document.getElementById('preview-modal-close');
        const closePlain = document.getElementById('preview-close');
        const leftContainer = modal?.querySelector('.add-modal-left');
        const titleEl = document.getElementById('preview-title');
        const priceEl = document.getElementById('preview-price');
        const descEl = document.getElementById('preview-description');
        const mediaContainer = document.getElementById('preview-media');

        function createMediaElementForMain(url) {
            const isVideo = /\.(mp4|webm|ogg)(\?.*)?$/i.test(url);
            if (isVideo) {
                const v = document.createElement('video');
                v.controls = true;
                v.src = url;
                v.className = 'add-modal-image';
                return v;
            } else {
                const img = document.createElement('img');
                img.className = 'add-modal-image';
                img.src = url;
                return img;
            }
        }

        function openPreviewForCard(card) {
            const title = card.querySelector('.product-title-v2')?.textContent?.trim() || '';
            const priceText = card.querySelector('.price-v2')?.textContent?.trim() || '';
            const productId = card.dataset.product || card.getAttribute('data-product') || '';
            titleEl.textContent = title;
            priceEl.textContent = priceText;

            // 取得卡片主圖與額外媒體
            const cardImg = card.querySelector('.product-img-v2')?.src || '';
            const mediaRaw = card.dataset.media || card.getAttribute('data-media') || '';
            const mediaListFromAttr = mediaRaw ? mediaRaw.split(',').map(s => s.trim()).filter(Boolean) : [];

            // 針對 AirPods 4 特殊處理
            if (productId === 'airpods4' || /AirPods 4/i.test(title)) {
                // 右側：只顯示文字內容（移除圖片）
                descEl.innerHTML = `
                    <h3>功能簡介</h3>
                    <p>Apple AirPods 4 主動消噪真無線藍牙耳機 MXP93ZP/A 香港行貨。聲音沉浸感，影院級體驗。音質、舒適度、噪音控制，一再進化。個人化空間音訊支援動態頭部追蹤功能，讓聲音環繞縈繞，為音樂、電視節目、電影及遊戲等帶來 3D 音效聆聽體驗。</p>
                    <h3>產品特色</h3>
                    <ul>
                        <li>主動消噪功能、適應性音訊及通透模式</li>
                        <li>個人化空間音訊支援，動態頭部追蹤功能</li>
                        <li>語音隔離、「喂 Siri」及 Siri 互動功能</li>
                        <li>一次充電，聆聽時間長達 5 小時 (開啟主動消噪功能則長達 4 小時)</li>
                        <li>配合充電盒使用，聆聽時間長達 30 小時 (開啟主動消噪功能則長達 20 小時)</li>
                        <li>無線充電盒 (USB-C) 內置揚聲器支援尋找功能</li>
                        <li>防塵、抗汗及耐水</li>
                    </ul>
                    <h3>產品規格</h3>
                    <ul>
                        <li>音訊技術：特製高位移範圍 Apple 驅動器、特製高動態範圍擴音器</li>
                        <li>主動消噪功能、適應性音訊、通透模式、對話感知功能、語音隔離、適應性 EQ</li>
                        <li>個人化空間音訊支援動態頭部追蹤功能</li>
                        <li>為等壓而設的透氣系統</li>
                    </ul>
                    <h3>感應器</h3>
                    <ul>
                        <li>雙波束形成麥克風</li>
                        <li>向內式麥克風</li>
                        <li>光學入耳感應器</li>
                        <li>動態偵測加速感應器</li>
                        <li>語音偵測加速感應器</li>
                        <li>力度感應器</li>
                    </ul>
                    <h3>晶片</h3>
                    <ul><li>H2 耳筒晶片</li></ul>
                    <h3>防塵、抗汗及耐水</h3>
                    <ul><li>IP54</li></ul>
                    <h3>充電盒</h3>
                    <ul>
                        <li>USB-C / Apple Watch 充電器 / Qi</li>
                        <li>內建揚聲器支援尋找 app</li>
                    </ul>
                    <h3>電池</h3>
                    <ul>
                        <li>一次充電，聆聽時間長達 4 小時 (開啟主動消噪)</li>
                        <li>一次充電，聆聽時間長達 5 小時 (關閉噪音控制)</li>
                        <li>一次充電,通話時間長達 4.5 小時</li>
                    </ul>
                `;
                // 左側：大圖 + 詳細圖片列表（橫向）
                const detailImages = [
                    cardImg,
                    'assets/products/airpods4d1.jpg',
                    'assets/products/airpods4d2.jpg',
                    'assets/products/airpods4d3.jpg'
                ];
                const unique = Array.from(new Set(detailImages.filter(Boolean)));
                renderLeftColumnWithThumbs(unique);
            } else {
                // 其他產品：右側只顯示文字
                const desc = card.dataset.description || card.getAttribute('data-description') || '尚無詳細說明。';
                descEl.innerHTML = `<p>${desc}</p>`;
                
                // 左側：卡片圖 + 其他媒體
                const combined = [cardImg, ...mediaListFromAttr].filter(Boolean);
                const unique = Array.from(new Set(combined));
                renderLeftColumnWithThumbs(unique);
            }

            // 顯示 modal 並鎖定背景滾動
            modal.setAttribute('aria-hidden','false');
            overlay.classList.add('active');
            overlay.style.display = 'block';
            document.body.style.overflow = 'hidden';
            modal.style.display = 'block';
        }

        function renderLeftColumnWithThumbs(allUrls = []) {
            if (!leftContainer || !allUrls.length) return;
            leftContainer.innerHTML = '';
            
            // 建立大圖容器（用於存放當前顯示的大圖）
            const mainContainer = document.createElement('div');
            mainContainer.id = 'main-image-container';
            mainContainer.style.marginBottom = '12px';
            const mainEl = createMediaElementForMain(allUrls[0]);
            mainEl.style.display = 'block';
            mainContainer.appendChild(mainEl);
            leftContainer.appendChild(mainContainer);

            // 建立縮圖列表（橫向排列在大圖下方）
            if (mediaContainer) {
                mediaContainer.innerHTML = '';
                allUrls.forEach((url, idx) => {
                    const thumb = document.createElement('img');
                    thumb.src = url;
                    thumb.width = 80;
                    thumb.height = 80;
                    thumb.style.objectFit = 'cover';
                    thumb.style.cursor = 'pointer';
                    thumb.style.borderRadius = '6px';
                    thumb.style.border = idx === 0 ? '2px solid #00a0e9' : '1px solid #eee';
                    thumb.style.transition = 'border 0.2s';
                    
                    // 點擊縮圖時切換大圖
                    thumb.addEventListener('click', () => {
                        // 更新大圖
                        const newMain = createMediaElementForMain(url);
                        newMain.style.display = 'block';
                        mainContainer.innerHTML = '';
                        mainContainer.appendChild(newMain);
                        
                        // 更新所有縮圖的邊框樣式（高亮當前選中的）
                        mediaContainer.querySelectorAll('img').forEach(t => {
                            t.style.border = '1px solid #eee';
                        });
                        thumb.style.border = '2px solid #00a0e9';
                    });
                    
                    mediaContainer.appendChild(thumb);
                });
            }
        }

        function closePreview() {
            if (!modal) return;
            modal.setAttribute('aria-hidden','true');
            overlay.classList.remove('active');
            overlay.style.display = 'none';
            modal.style.display = 'none';
            document.body.style.overflow = '';
            
            // 清理
            if (leftContainer) leftContainer.innerHTML = '<img id="preview-main-media" class="add-modal-image" src="" alt="">';
            if (mediaContainer) mediaContainer.innerHTML = '';
        }

        // 點擊產品圖片開啟預覽
        document.addEventListener('click', function(e) {
            const imgTarget = e.target.closest('.product-img-v2');
            if (!imgTarget) return;
            const card = imgTarget.closest('.product-card-v2');
            if (!card) return;
            openPreviewForCard(card);
        });

        closeBtn?.addEventListener('click', closePreview);
        closePlain?.addEventListener('click', closePreview);
        overlay?.addEventListener('click', closePreview);
        document.addEventListener('keydown', function(e) { if (e.key === 'Escape') closePreview(); });
    })();

    // Product Preview Modal Functionality
    document.addEventListener('DOMContentLoaded', function() {
        const previewModal = document.getElementById('preview-modal');
        const previewOverlay = document.getElementById('preview-modal-overlay');
        const previewMain = document.getElementById('preview-main-media');
        const previewMediaContainer = document.getElementById('preview-media');
        const previewTitle = document.getElementById('preview-title');
        const previewDescription = document.getElementById('preview-description');

        function bindCompareToggle() {
            const comparePanel = document.getElementById('compare_panel');
            const toggleBtn = document.getElementById('compare-toggle-btn');
            if (!comparePanel || !toggleBtn) return;

            toggleBtn.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                comparePanel.classList.toggle('active');
                toggleBtn.innerHTML = comparePanel.classList.contains('active') 
                    ? '<i class="fas fa-chevron-right"></i>' 
                    : '<i class="fas fa-chevron-left"></i>';
                console.log('Toggle clicked, panel active:', comparePanel.classList.contains('active')); // 調試日誌
            });
        }

        // 載入 compare_panel.html 後立即執行綁定
        fetch('components/compare_panel.html')
            .then(response => response.text())
            .then(html => {
                document.getElementById('compare-panel-root').innerHTML = html;
                setTimeout(bindCompareToggle, 100); // 確保 DOM 完全載入
            })
            .catch(error => console.error('Error loading compare panel:', error));

        // 移除原有的點擊處理程序，改為使用事件委派
        document.body.addEventListener('click', function(e) {
            const compareBtn = e.target.closest('.compare-btn');
            if (!compareBtn) return;

            const comparePanel = document.getElementById('compare-panel');
            const toggleBtn = document.getElementById('compare-toggle-btn');
            if (comparePanel && toggleBtn) {
                comparePanel.classList.add('active');
                toggleBtn.innerHTML = '<i class="fas fa-chevron-right"></i>';
            }
        });

    // 當用戶第一次點選任何 .compare-btn 時自動展開比較框
    document.body.addEventListener('click', function(e) {
        if (e.target.classList.contains('compare-btn')) {
            comparePanel.classList.add('active');
            toggleBtn.innerHTML = '<i class="fas fa-chevron-right"></i>';
        }
    });

        function parseMediaList(str) {
            if (!str) return [];
            return str.split(',').map(s => s.trim()).filter(Boolean);
        }

        function openPreview(card) {
            const mediaAttr = card.getAttribute('data-media') || '';
            const mediaList = parseMediaList(mediaAttr);
            
            // Update title and description
            const titleEl = card.querySelector('.product-title-v2');
            if (titleEl) previewTitle.textContent = titleEl.textContent.trim();
            
            const desc = card.getAttribute('data-description') || '';
            if (desc) previewDescription.textContent = desc;

            // Clear and populate thumbnails
            previewMediaContainer.innerHTML = '';
            
            // Handle single image case
            if (mediaList.length === 0) {
                const img = card.querySelector('.product-img-v2');
                if (img) {
                    previewMain.src = img.src;
                    addThumbnail(img.src, true);
                }
            } else {
                // Handle multiple images
                mediaList.forEach((url, idx) => {
                    addThumbnail(url, idx === 0);
                });
                previewMain.src = mediaList[0];
            }

            // Show modal
            previewModal.style.display = 'block';
            previewOverlay.style.display = 'block';
            previewModal.setAttribute('aria-hidden', 'false');
            previewOverlay.setAttribute('aria-hidden', 'false');
        }

        function addThumbnail(url, isSelected) {
            const thumb = document.createElement('img');
            thumb.src = url;
            if (isSelected) thumb.classList.add('selected');
            
            thumb.addEventListener('click', () => {
                previewMain.src = url;
                // Update selected state
                previewMediaContainer.querySelectorAll('img').forEach(img => {
                    img.classList.remove('selected');
                });
                thumb.classList.add('selected');
            });
            
            previewMediaContainer.appendChild(thumb);
        }

        function closePreview() {
            previewModal.style.display = 'none';
            previewOverlay.style.display = 'none';
            previewModal.setAttribute('aria-hidden', 'true');
            previewOverlay.setAttribute('aria-hidden', 'true');
        }

        // Wire up click handlers
        document.querySelectorAll('.product-img-v2').forEach(img => {
            img.style.cursor = 'zoom-in';
            img.addEventListener('click', () => {
                const card = img.closest('.product-card-v2');
                if (card) openPreview(card);
            });
        });

        // Close handlers
        document.getElementById('preview-modal-close')?.addEventListener('click', closePreview);
        document.getElementById('preview-close')?.addEventListener('click', closePreview);
        overlay?.addEventListener('click', closePreview);
        document.addEventListener('keydown', e => {
            if (e.key === 'Escape') closePreview();
        });


    });

    // 比較面板初始化
    initializeComparePanel();
});

// 新增比較面板初始化函數（放在文件底部，但在 ShoppingCart.init() 之前）
function initializeComparePanel() {
    // 等待面板載入完成
    const checkInterval = setInterval(() => {
        const panel = document.getElementById('compare-panel');
        const toggleBtn = document.getElementById('compare-toggle-btn');
        
        if (panel && toggleBtn) {
            clearInterval(checkInterval);
            
            // 綁定切換按鈕事件
            toggleBtn.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                panel.classList.toggle('active');
                this.innerHTML = panel.classList.contains('active') 
                    ? '<i class="fas fa-chevron-right"></i>'
                    : '<i class="fas fa-chevron-left"></i>';
            });

            // 點擊比較按鈕時自動展開面板
            document.addEventListener('click', function(e) {
                const compareBtn = e.target.closest('.compare-btn');
                if (compareBtn) {
                    panel.classList.add('active');
                    toggleBtn.innerHTML = '<i class="fas fa-chevron-right"></i>';
                }
            });
        }
    }, 100);
}

// 更新 updateComparePanel 函數（修復版本）
function updateComparePanel() {
    const panel = document.getElementById('compare-panel');
    const list = panel.querySelector('.compare-list');
    const toggleBtn = document.getElementById('compare-toggle-btn');
    
    if (!panel || !list || !toggleBtn) {
        console.warn('找不到比較面板元素');
        return;
    }
    
    // 清空現有的比較按鈕
    const existingBtn = panel.querySelector('.compare-panel-btn');
    if (existingBtn) {
        existingBtn.remove();
    }
    
    list.innerHTML = '';
    
    if (compareList.length === 0) {
        list.innerHTML = '<div class="empty-compare">尚未添加商品</div>';
        toggleBtn.classList.remove('show');
        panel.classList.remove('active');
    } else {
        console.log('更新比較面板，產品數量：', compareList.length);
        
        compareList.forEach(item => {
            const div = document.createElement('div');
            div.className = 'compare-item';
            div.innerHTML = `
                <img src="${item.image}" class="compare-thumb">
                <span class="compare-info">${item.name}</span>
                <span class="compare-color" style="background:${item.color}"></span>
                <button class="compare-remove-btn">✕</button>
            `;
            
            div.querySelector('.compare-remove-btn').onclick = () => {
                compareList = compareList.filter(i => i.name !== item.name || i.color !== item.color);
                updateComparePanel();
                // 同步更新 localStorage
                localStorage.setItem('debugCompareList', JSON.stringify(compareList));
            };
            
            list.appendChild(div);
        });

        // 只有當有兩個或以上商品時才顯示比較按鈕
        if (compareList.length >= 2) {
            const compareBtn = document.createElement('button');
            compareBtn.className = 'compare-panel-btn';
            compareBtn.textContent = '比較產品';
            
            // 修復：使用事件監聽器而不是直接的 onclick
            compareBtn.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                
                console.log('🎯 比較產品按鈕被點擊！');
                console.log('當前比較列表：', compareList);
                
                // 直接使用 compareList 生成產品詳細資料
                const productDetails = compareList.map(item => {
                    // 基本產品信息（已有的）
                    const basicInfo = {
                        name: item.name,
                        image: item.image,
                        color: item.color,
                        price: '價格待確認',
                        specs: ['規格信息待補充'],
                        features: ['特點信息待補充'],
                        brand: item.name.split(' ')[0] || '未知品牌',
                        model: item.name.split(' ').slice(1).join(' ') || '型號待確認'
                    };
                    
                    // 嘗試從DOM獲取更詳細的信息
                    try {
                        console.log('🔍 開始搜索產品：', item.name);
                        
                        // 修復：直接搜索 latest_product 區域內的產品
                        const latestProductSection = document.getElementById('latest_product');
                        if (!latestProductSection) {
                            console.warn('找不到 latest_product 區域');
                            return basicInfo;
                        }
                        
                        console.log('✅ 找到 latest_product 區域');
                        
                        // 在 latest_product 區域內搜索產品卡片
                        const cards = latestProductSection.querySelectorAll('.product-card');
                        console.log('📋 在 latest_product 中找到', cards.length, '個產品卡片');
                        
                        let matchedCard = null;
                        for (const card of cards) {
                            const titleEl = card.querySelector('h3');
                            if (titleEl) {
                                const cardTitle = titleEl.textContent.trim();
                                console.log('🔍 檢查產品：', cardTitle, '是否匹配：', item.name);
                                if (cardTitle === item.name) {
                                    matchedCard = card;
                                    console.log('✅ 找到匹配的產品卡片！');
                                    break;
                                }
                            }
                        }
                        
                        if (matchedCard) {
                            console.log('📦 開始提取產品詳細信息...');
                            
                            // 獲取價格
                            const priceEl = matchedCard.querySelector('.price');
                            if (priceEl) {
                                basicInfo.price = priceEl.textContent.trim();
                                console.log('💰 找到價格：', basicInfo.price);
                            } else {
                                console.warn('⚠️ 找不到價格元素');
                            }
                            
                            // 獲取規格 - 從 data 屬性獲取
                            const specsEl = matchedCard.querySelector('.product-specs');
                            if (specsEl) {
                                console.log('📋 找到規格元素，開始提取 data 屬性...');
                                const specs = [];
                                
                                const attributes = [
                                    { key: 'data-cpu', label: '處理器' },
                                    { key: 'data-ram', label: '記憶體' },
                                    { key: 'data-storage', label: '儲存空間' },
                                    { key: 'data-screen', label: '螢幕' },
                                    { key: 'data-camera', label: '相機' },
                                    { key: 'data-battery', label: '電池' },
                                    { key: 'data-os', label: '作業系統' },
                                    { key: 'data-sim', label: 'SIM卡' }
                                ];
                                
                                attributes.forEach(attr => {
                                    const value = specsEl.getAttribute(attr.key);
                                    console.log(`🔍 檢查 ${attr.key}:`, value);
                                    if (value && value !== '不適用' && value !== '') {
                                        specs.push(`${attr.label}: ${value}`);
                                        console.log(`✅ 添加規格: ${attr.label}: ${value}`);
                                    }
                                });
                                
                                if (specs.length > 0) {
                                    basicInfo.specs = specs;
                                    console.log('📋 最終規格列表：', specs);
                                } else {
                                    console.warn('⚠️ 沒有找到有效的規格信息');
                                }
                            } else {
                                console.warn('⚠️ 找不到 .product-specs 元素');
                                // 列出所有可用的類名來調試
                                const allElements = matchedCard.querySelectorAll('*');
                                console.log('🔍 卡片內所有元素的類名：');
                                allElements.forEach(el => {
                                    if (el.className) {
                                        console.log('  -', el.tagName, el.className);
                                    }
                                });
                            }
                            
                            // 根據產品類型設置預設特點
                            if (item.name.includes('iPhone')) {
                                basicInfo.features = [
                                    'Face ID 面容識別',
                                    '無線充電支援',
                                    '防水防塵 IP68',
                                    'MagSafe 磁吸充電',
                                    '5G 網絡支援'
                                ];
                                console.log('📱 設置 iPhone 特點');
                            } else if (item.name.includes('AirPods') || item.name.includes('Airpods')) {
                                basicInfo.features = [
                                    '主動降噪',
                                    '透明模式',
                                    '空間音訊',
                                    '無線充電',
                                    'Siri 語音控制'
                                ];
                                console.log('🎧 設置 AirPods 特點');
                            } else if (item.name.includes('Watch')) {
                                basicInfo.features = [
                                    '健康監測',
                                    'GPS 定位',
                                    '防水設計',
                                    '心率監測',
                                    '運動追蹤'
                                ];
                                console.log('⌚ 設置 Watch 特點');
                            }
                            
                        } else {
                            console.warn('❌ 在 latest_product 中找不到匹配的產品：', item.name);
                            console.log('📋 可用的產品列表：');
                            cards.forEach((card, index) => {
                                const titleEl = card.querySelector('h3');
                                if (titleEl) {
                                    console.log(`  ${index + 1}. ${titleEl.textContent.trim()}`);
                                }
                            });
                        }
                    } catch (error) {
                        console.error('❌ 獲取產品詳細信息時出錯：', error);
                    }
                    
                    console.log('📦 處理後的產品資料：', basicInfo);
                    return basicInfo;
                });

                console.log('🎉 最終產品詳細資料：', productDetails);
                
                // 保存到 localStorage
                localStorage.setItem('compareProducts', JSON.stringify(productDetails));
                console.log('✅ 產品資料已保存到 compareProducts');
                
                // 跳轉到比較頁面
                console.log('🚀 準備跳轉到 compare_details.html');
                window.location.href = 'compare_details.html';
            });
            
            panel.appendChild(compareBtn);
        }
        
        toggleBtn.classList.add('show');
    }
}

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

    // 第一層副標題
    let level1Title = level1.querySelector('.category-title');
    if (!level1Title) {
        // 如果 header.html 已經有 <h3 class="category-title category-subtitle">選擇產品種類</h3> 就不用再加
        // 否則可保留這段
        level1Title = document.createElement('h3');
        level1Title.className = 'category-title category-subtitle';
        level1Title.textContent = '選擇產品種類';
        level1.insertBefore(level1Title, level1.firstChild);
    }

    // 第二層副標題
    categoryTitle.classList.add('category-subtitle');

    // 取得第三層 DOM（請在 header.html 預先寫好這一層）
    let level3 = document.getElementById('category-level-3');
    const backBtn2 = level3.querySelector('#back-btn-2');
    const groupTitle = level3.querySelector('#group-title');
    const detailList = level3.querySelector('#detail-list');

    // 新的主分類與細分類結構
    const categories = {
        digital: {
            name: '數碼娛樂',
            subs: [
                { group: '耳機', items: ['真無線藍牙耳機', '藍牙耳機', '有線耳機', '頭戴式耳機'] },
                { group: '休閒娛樂', items: ['藍牙喇叭', '電子書閱讀器', '錄音筆', '音樂播放器', '收音機'] },
                { group: '遊戲', items: ['遊戲機', '手掣/方向盤', '遊戲軟體', '遊戲週邊配件', '遊戲耳機'] },
                { group: '穿戴式裝置', items: ['智能手錶', '運動手環', '運動追蹤器', '兒童穿戴式裝置', '兒童智能手錶', '虛擬現實頭盔', '智能戒指'] },
                { group: 'Apple Watch', items: ['Apple Watch Ultra 2', 'Apple Watch 10'] },
                { group: '數碼影像', items: ['即影即有相機', '航拍機', '監控攝影機 IP Cam', '運動攝影機', '鏡頭', '360度全景相機', '相機配件', '相機袋', '腳架及雲台', '手持穩定器', '數碼攝錄機', '產品攝影棚', '單鏡反光相機', '輕便相機', '閃光燈', '潛相機', '電子防潮箱', '無反相機', '菲林相機', '菲林'] }
            ]
        },
        mobile: {
            name: '手機通訊',
            subs: [
                { group: '手機及配件', items: ['智能手機', '行動電源', '充電器', '手機配件', 'QI無線充電器', '充電線/數據線', '保護貼', '手機保護殼', '電話充值卡/儲值卡'] },
                { group: 'Apple iPhone', items: ['iPhone 17', 'iPhone 16'] },
                { group: 'Samsung Galaxy', items: ['Galaxy S', 'Galaxy A', 'Galaxy Z', 'Galaxy M'] },
                { group: '保護殼', items: ['iPhone 17', 'iPhone 17 Pro', 'iPhone 17 Air', 'iPhone 16', 'iPhone 16 Plus', 'iPhone 16 Pro', 'iPhone 16 Pro Max', 'iPhone 15', 'iPhone 15 Plus', 'iPhone 15 Pro', 'iPhone 15 Pro Max'] }
            ]
        },
        computer: {
            name: '電腦',
            subs: [
                { group: '電腦', items: ['手提電腦', '平板電腦', '桌上電腦', '迷你電腦'] },
                { group: 'Apple iPad', items: ['iPad Pro', 'iPad Air', 'iPad (10th Gen)', 'iPad mini'] },
                { group: 'Apple Mac', items: ['MacBook Air', 'MacBook Pro', 'iMac', 'Mac mini'] },
                { group: '顯示器', items: ['電腦螢幕', '便攜顯示器', '螢幕掛燈', '螢幕支架/機械臂'] },
                { group: '儲存', items: ['外置硬碟', '外置SSD固態硬碟', '記憶卡', 'USB手指'] },
                { group: '網絡', items: ['路由器', '網絡儲存裝置', 'WiFi增強器', '交換器', 'LAN線', '網路攝影機Web Cam', 'WiFi接收器', 'Pocket WiFi/WiFi蛋'] },
                { group: '電競', items: ['電競椅/電腦椅', '電競螢幕', '電競鍵盤', '電競筆電', '電競耳機', '電競滑鼠', '電競枱/電腦枱', '電競電腦'] },
                { group: '滑鼠及鍵盤', items: ['鍵盤', '鍵盤及滑鼠組合', '滑鼠', '滑鼠墊/腕墊'] }
            ]
        }
    };

    // 開啟側邊
    categoryBtn.onclick = function(e) {
        e.preventDefault();
        sidebar.classList.add('active');
        overlay.classList.add('active');
        level1.classList.add('active');
        level2.classList.remove('active');
        level3.classList.remove('active'); // 保證每次打開都回到第一層
    };

    // 關閉側邊
    overlay.onclick = function() {
        sidebar.classList.remove('active');
        overlay.classList.remove('active');
        level1.classList.add('active');    // 關閉時重設為第一層
        level2.classList.remove('active');
        level3.classList.remove('active');
    };

    // 點擊主分類
    level1.querySelectorAll('li').forEach(li => {
        li.onclick = function() {
            const cat = li.getAttribute('data-category');
            categoryTitle.textContent = categories[cat].name;
            subcategoryList.innerHTML = '';
            // 只顯示群組（第二層）
            categories[cat].subs.forEach((sub, idx) => {
                const groupLi = document.createElement('li');
                groupLi.textContent = sub.group;
                groupLi.style.fontWeight = 'bold';
                groupLi.style.cursor = 'pointer';
                groupLi.style.marginTop = '10px';
                groupLi.setAttribute('data-cat', cat);
                groupLi.setAttribute('data-group-idx', idx);
                // 避免群組名稱與主分類重複時重複顯示（如"電腦"）
                if (sub.group !== categories[cat].name) {
                    subcategoryList.appendChild(groupLi);
                } else {
                    // 若群組名稱與主分類相同，顯示為「全部」或略過
                    // groupLi.textContent = '全部';
                    // subcategoryList.appendChild(groupLi);
                }
            });
            level1.classList.remove('active');
            level2.classList.add('active');
            level3.classList.remove('active');
        };
    });

    // 點擊群組，顯示詳細產品（第三層）
    subcategoryList.onclick = function(e) {
        const li = e.target;
        if (!li.hasAttribute('data-group-idx')) return;
        const cat = li.getAttribute('data-cat');
        const groupIdx = li.getAttribute('data-group-idx');
        const sub = categories[cat].subs[groupIdx];
        groupTitle.textContent = sub.group;
        detailList.innerHTML = '';
        sub.items.forEach(item => {
            const itemLi = document.createElement('li');
            itemLi.textContent = item;
            // 新增：點擊「真無線藍牙耳機」跳轉 product.html
            if (cat === 'digital' && sub.group === '耳機' && item === '真無線藍牙耳機') {
                itemLi.style.color = '#00a0e9';
                itemLi.style.cursor = 'pointer';
                itemLi.onclick = function() {
                    window.location.href = 'product.html';
                };
            }
            detailList.appendChild(itemLi);
        });
        level2.classList.remove('active');
        level3.classList.add('active');
    };

    // 返回主分類
    backBtn.onclick = function() {
        level2.classList.remove('active');
        level1.classList.add('active');
        level3.classList.remove('active');
    };

    // 返回群組
    backBtn2.onclick = function() {
        level3.classList.remove('active');
        level2.classList.add('active');
    };
    
    // 初始化搜尋功能
    if (typeof initializeSearch === 'function') {
        initializeSearch();
    }
}

// Slider 功能初始化
function initializeSlider() {
    const slider = document.querySelector('.slider');
    const slides = document.querySelectorAll('.slide');
    const prevBtn = document.querySelector('.slider-btn.prev');
    const nextBtn = document.querySelector('.slider-btn.next');
    
    if (!slider || !slides.length) return;

    let currentSlide = 0;
    const slideCount = slides.length;
    let slideInterval;
    
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
    
    function startAutoSlide() {
        if (slideInterval) return;
        slideInterval = setInterval(nextSlide, 5000);
    }
    
    function stopAutoSlide() {
        clearInterval(slideInterval);
        slideInterval = null;
    }
    
    // 按鈕點擊事件
    prevBtn?.addEventListener('click', () => {
        stopAutoSlide();
        prevSlide();
        startAutoSlide();
    });
    
    nextBtn?.addEventListener('click', () => {
        stopAutoSlide();
        nextSlide();
        startAutoSlide();
    });
    
    // 滑鼠懸停時暫停自動輪播
    slider?.addEventListener('mouseenter', stopAutoSlide);
    slider?.addEventListener('mouseleave', startAutoSlide);
    
    // 拖動功能
    let isDown = false, startX = 0, startSlide = 0;
    
    slider.addEventListener('mousedown', (e) => {
        e.preventDefault();
        isDown = true;
        startX = e.pageX;
        startSlide = currentSlide;
        stopAutoSlide();
        slider.style.cursor = 'grabbing';
    });
    
    window.addEventListener('mousemove', (e) => {
        if (!isDown) return;
        e.preventDefault();
        const dx = e.pageX - startX;
        const slideWidth = slider.offsetWidth;
        
        // 如果拖動超過 1/4 寬度，則切換 slide
        if (Math.abs(dx) > slideWidth / 4) {
            if (dx > 0) {
                currentSlide = (startSlide - 1 + slideCount) % slideCount;
            } else {
                currentSlide = (startSlide + 1) % slideCount;
            }
            updateSlider();
            isDown = false;
            slider.style.cursor = 'grab';
            startAutoSlide();
        }
    });
    
    window.addEventListener('mouseup', () => {
        if (isDown) {
            isDown = false;
            slider.style.cursor = 'grab';
            startAutoSlide();
        }
    });
    
    // Touch 支援
    let touchStartX = 0, touchStartSlide = 0;
    
    slider.addEventListener('touchstart', (e) => {
        touchStartX = e.touches[0].clientX;
        touchStartSlide = currentSlide;
        stopAutoSlide();
    });
    
    slider.addEventListener('touchmove', (e) => {
        const dx = e.touches[0].clientX - touchStartX;
        const slideWidth = slider.offsetWidth;
        
        if (Math.abs(dx) > slideWidth / 4) {
            if (dx > 0) {
                currentSlide = (touchStartSlide - 1 + slideCount) % slideCount;
            } else {
                currentSlide = (touchStartSlide + 1) % slideCount;
            }
            updateSlider();
            touchStartX = e.touches[0].clientX;
            touchStartSlide = currentSlide;
        }
    });
    
    slider.addEventListener('touchend', () => {
        startAutoSlide();
    });
    
    // 初始化
    startAutoSlide();
}

let compareList = [];

// Product List 功能
function initializeProductList() {
    const productGrid = document.querySelector('.product-grid');
    const prevBtn = document.querySelector('.carousel-btn.prev');
    const nextBtn = document.querySelector('.carousel-btn.next');
    if (!productGrid || !productGrid.children.length) return; // 防呆

    const visibleCards = 5;
    let currentPosition = 0;

    // 計算單個卡片的實際寬度（包含間距）
    const card = productGrid.children[0];
    const cardStyle = window.getComputedStyle(card);
    const cardWidth = card.offsetWidth +
        parseInt(cardStyle.marginLeft) +
        parseInt(cardStyle.marginRight);

    function getMaxScroll() {
        const totalWidth = productGrid.scrollWidth;
        const containerWidth = productGrid.parentElement.offsetWidth;
        return Math.max(0, totalWidth - containerWidth);
    }

    function updateButtons() {
        const maxScroll = getMaxScroll();
        prevBtn.style.display = currentPosition <= 0 ? 'none' : 'flex';
        nextBtn.style.display = currentPosition >= maxScroll ? 'none' : 'flex';
    }

    function slideTo(position) {
        const maxScroll = getMaxScroll();
        currentPosition = Math.max(0, Math.min(position, maxScroll));
        productGrid.style.transform = `translateX(-${currentPosition}px)`;
        updateButtons();
    }

    prevBtn.addEventListener('click', () => {
        slideTo(currentPosition - cardWidth);
    });

    nextBtn.addEventListener('click', () => {
        slideTo(currentPosition + cardWidth);
    });

    window.addEventListener('resize', updateButtons);
    updateButtons();


    // 顏色點擊事件
    const colorDots = document.querySelectorAll('.color-dot');
    colorDots.forEach(dot => {
        dot.addEventListener('click', function() {
            const productCard = this.closest('.product-card');
            const productImage = productCard.querySelector('.product-image');
            productImage.src = this.dataset.image;
            productCard.querySelectorAll('.color-dot').forEach(d => d.classList.remove('selected'));
            this.classList.add('selected');
        });
    });

    // 顏色切換功能
    document.querySelectorAll('.color-dot').forEach(dot => {
        dot.addEventListener('click', function() {
            const productCard = this.closest('.product-card');
            productCard.querySelectorAll('.color-dot').forEach(d => d.classList.remove('selected'));
            this.classList.add('selected');
            const productImage = productCard.querySelector('.product-image');
            productImage.src = this.dataset.image;
        });
    });

    // ===== 初始化產品彈窗功能 =====
    console.log('📦 初始化產品彈窗功能');
    initLatestProductModal();

    // ===== 初始化產品比較功能 =====
    console.log('🔄 初始化產品比較功能');
    initLatestProductCompare();
}

// 產品彈窗功能（從 latest_product.html 提取）
function initLatestProductModal() {
    // 產品 YouTube 影片映射
    const productVideos = {
        'APPLE iPhone 17 Pro': 'h6CwwHyQxKI',
        'APPLE iPhone 17 Pro Max': 'h6CwwHyQxKI',
        'APPLE iPhone Air': 'M0au92yebLQ',
        'APPLE Airpods Pro 3': 'h6CwwHyQxKI',
        'APPLE Watch Ultra 3 GPS + Cellular': 'h6CwwHyQxKI',
        'APPLE MacBook Pro 16吋 M3 Pro': 'h6CwwHyQxKI'
    };

    const modal = document.getElementById('productModal');
    const closeBtn = document.querySelector('.modal-close');
    
    if (!modal) {
        console.error('❌ 找不到 productModal 元素');
        return;
    }
    
    if (!closeBtn) {
        console.error('❌ 找不到 modal-close 元素');
        return;
    }
    
    // 為產品圖片添加點擊事件
    const productImages = document.querySelectorAll('.product-image');
    console.log(`🖼️ 找到 ${productImages.length} 個產品圖片`);
    
    productImages.forEach((image, index) => {
        // 檢查是否已經綁定過事件（避免重複綁定）
        if (image.hasAttribute('data-modal-event-bound')) {
            return;
        }
        
        console.log(`🖼️ 綁定彈窗事件到第 ${index + 1} 個圖片:`, image.alt);
        
        // 添加視覺提示
        image.style.cursor = 'pointer';
        image.title = '點擊查看詳情';
        
        image.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            console.log('🖱️ 點擊了產品圖片:', this.alt);
            openProductModal(this, productVideos);
        });
        
        // 標記已綁定事件
        image.setAttribute('data-modal-event-bound', 'true');
    });
    
    // 彈窗關閉事件
    if (!closeBtn.hasAttribute('data-modal-event-bound')) {
        closeBtn.addEventListener('click', function(e) {
            e.preventDefault();
            console.log('❌ 點擊關閉按鈕');
            closeProductModal();
        });
        closeBtn.setAttribute('data-modal-event-bound', 'true');
    }
    
    // 點擊彈窗外部關閉
    if (!modal.hasAttribute('data-modal-event-bound')) {
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                console.log('❌ 點擊彈窗外部關閉');
                closeProductModal();
            }
        });
        modal.setAttribute('data-modal-event-bound', 'true');
    }
    
    // ESC 鍵關閉彈窗
    if (!window.latestProductEscBound) {
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') {
                if (modal && modal.style.display === 'block') {
                    console.log('❌ ESC 鍵關閉彈窗');
                    closeProductModal();
                }
            }
        });
        window.latestProductEscBound = true;
    }
    
    console.log('✅ 產品彈窗功能初始化完成');
}

function openProductModal(imageElement, productVideos) {
    console.log('🔓 開啟產品彈窗');
    
    try {
        const productCard = imageElement.closest('.product-card');
        if (!productCard) {
            console.error('❌ 找不到產品卡片');
            return;
        }
        
        const productName = productCard.querySelector('h3')?.textContent;
        const productPrice = productCard.querySelector('.price')?.textContent;
        const productImage = imageElement.src;
        const productSpecs = productCard.querySelector('.product-specs');
        const colorOptions = productCard.querySelectorAll('.color-dot');
        
        console.log('📋 產品信息:', { productName, productPrice, productImage });
        
        // 獲取彈窗元素
        const modal = document.getElementById('productModal');
        const modalImage = document.getElementById('modalProductImage');
        const modalName = document.getElementById('modalProductName');
        const modalPrice = document.getElementById('modalProductPrice');
        const modalColorOptions = document.getElementById('modalColorOptions');
        const modalSpecs = document.getElementById('modalProductSpecs');
        const modalVideo = document.getElementById('modalYouTubeVideo');
        
        if (!modal || !modalImage || !modalName || !modalPrice || !modalColorOptions || !modalSpecs || !modalVideo) {
            console.error('❌ 找不到彈窗元素');
            return;
        }
        
        // 填充彈窗內容
        modalImage.src = productImage;
        modalImage.alt = productName;
        modalName.textContent = productName;
        modalPrice.textContent = productPrice;
        
        // 處理顏色選項
        if (colorOptions.length > 0) {
            modalColorOptions.innerHTML = '<h4>可選顏色：</h4>';
            colorOptions.forEach(colorDot => {
                const newColorDot = colorDot.cloneNode(true);
                newColorDot.addEventListener('click', function() {
                    console.log('🎨 切換顏色:', this.dataset.image);
                    modalImage.src = this.dataset.image;
                });
                modalColorOptions.appendChild(newColorDot);
            });
        } else {
            modalColorOptions.innerHTML = '';
        }
        
        // 處理產品規格
        if (productSpecs) {
            const specLabels = {
                'cpu': '處理器',
                'ram': '記憶體',
                'storage': '儲存空間',
                'screen': '螢幕',
                'camera': '相機',
                'battery': '電池',
                'os': '作業系統',
                'sim': 'SIM卡'
            };
            
            let specsHTML = '<h4>產品規格：</h4>';
            Object.keys(specLabels).forEach(key => {
                const value = productSpecs.getAttribute(`data-${key}`);
                if (value && value !== '不適用' && value !== '無') {
                    specsHTML += `
                        <div class="spec-item">
                            <span class="spec-label">${specLabels[key]}：</span>
                            <span class="spec-value">${value}</span>
                        </div>
                    `;
                }
            });
            modalSpecs.innerHTML = specsHTML;
        } else {
            modalSpecs.innerHTML = '<p>暫無詳細規格信息</p>';
        }
        
        // 設置 YouTube 影片
        const videoId = productVideos[productName] || 'h6CwwHyQxKI';
        const youtubeEmbed = `https://www.youtube.com/embed/${videoId}?si=ZSrowG1T5BTEaztu&rel=0`;
        modalVideo.src = youtubeEmbed;
        
        // 顯示彈窗
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
        
        console.log('✅ 彈窗顯示成功');
        
    } catch (error) {
        console.error('❌ 開啟彈窗時發生錯誤:', error);
    }
}

function closeProductModal() {
    console.log('🔒 關閉產品彈窗');
    
    try {
        const modal = document.getElementById('productModal');
        const iframe = document.getElementById('modalYouTubeVideo');
        
        if (modal) {
            modal.style.display = 'none';
        }
        
        document.body.style.overflow = 'auto';
        
        // 停止 YouTube 影片播放
        if (iframe) {
            iframe.src = iframe.src;
        }
        
        console.log('✅ 彈窗關閉成功');
        
    } catch (error) {
        console.error('❌ 關閉彈窗時發生錯誤:', error);
    }
}

// 初始化 latest_product 組件的比較功能
function initLatestProductCompare() {
    const compareButtons = document.querySelectorAll('.product-card .compare-btn');
    console.log(`🔍 找到 ${compareButtons.length} 個比較按鈕`);
    
    if (compareButtons.length === 0) {
        console.warn('⚠️ 沒有找到比較按鈕');
        return;
    }
    
    compareButtons.forEach((btn, index) => {
        // 檢查是否已經綁定過事件
        if (btn.hasAttribute('data-compare-event-bound')) {
            return;
        }
        
        console.log(`🔗 綁定比較事件到第 ${index + 1} 個按鈕`);
        
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            console.log('🖱️ 點擊比較按鈕');
            
            const productCard = this.closest('.product-card');
            if (!productCard) {
                console.error('❌ 找不到產品卡片');
                return;
            }
            
            // 獲取產品信息
            const productName = productCard.querySelector('h3')?.textContent?.trim();
            const productPrice = productCard.querySelector('.price')?.textContent?.trim();
            const productImage = productCard.querySelector('.product-image')?.src;
            const productSpecs = productCard.querySelector('.product-specs');
            
            if (!productName) {
                console.error('❌ 找不到產品名稱');
                return;
            }
            
            console.log('📋 產品信息:', { productName, productPrice, productImage });
            
            // 生成唯一的產品 ID
            const productId = productName.replace(/\s+/g, '-').toLowerCase();
            
            // 確保 window.productCompare 已初始化
            if (!window.productCompare) {
                console.error('❌ productCompare 未初始化');
                alert('比較功能初始化失敗，請刷新頁面重試');
                return;
            }
            
            // 檢查是否已在比較列表中
            const existingProduct = window.productCompare.compareList.find(p => p.id === productId);
            
            if (existingProduct) {
                // 已存在，移除
                console.log('📤 產品已在比較列表中，移除');
                window.productCompare.removeFromCompare(productId);
                btn.textContent = '比較';
                btn.classList.remove('active');
            } else {
                // 檢查是否已達到最大數量
                if (window.productCompare.compareList.length >= window.productCompare.maxCompare) {
                    alert(`最多只能比較 ${window.productCompare.maxCompare} 個產品`);
                    return;
                }
                
                // 提取顏色選項
                const colorDots = productCard.querySelectorAll('.color-dot');
                let colorOptions = [];
                let defaultColor = '#cccccc';
                let defaultImage = productImage || '';
                
                console.log('🔍 找到的顏色點數量:', colorDots.length);
                
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
                                    image: image || productImage
                                });
                                
                                console.log(`🎨 顏色 ${idx + 1}:`, { color: colorHex, image });
                                
                                // 第一個顏色作為預設
                                if (idx === 0) {
                                    defaultColor = colorHex;
                                    defaultImage = image || productImage;
                                }
                            }
                        }
                    });
                }
                
                console.log('🎨 提取的所有顏色選項:', colorOptions);
                
                // 構建產品數據
                const productData = {
                    id: productId,
                    name: productName,
                    price: productPrice || '暫無價格',
                    image: defaultImage,
                    brand: productName.split(' ')[0],
                    description: '暫無描述',
                    rating: '0',
                    model: productName,
                    colorOptions: colorOptions,  // 保存所有顏色選項
                    selectedColor: defaultColor,  // 當前選中的顏色
                    selectedColorIndex: 0  // 當前選中的顏色索引
                };
                
                // 從 product-specs 提取規格
                if (productSpecs) {
                    const specs = [];
                    const specLabels = {
                        'cpu': '處理器',
                        'ram': '記憶體',
                        'storage': '儲存空間',
                        'screen': '螢幕',
                        'camera': '相機',
                        'battery': '電池',
                        'os': '作業系統',
                        'sim': 'SIM卡'
                    };
                    
                    Object.keys(specLabels).forEach(key => {
                        const value = productSpecs.getAttribute(`data-${key}`);
                        if (value && value !== '不適用' && value !== '無') {
                            specs.push(`${specLabels[key]}: ${value}`);
                        }
                    });
                    
                    productData.specs = specs.length > 0 ? specs : ['詳細規格請參考產品說明'];
                    productData.features = specs.slice(0, 3); // 取前3個作為特色
                } else {
                    productData.specs = ['詳細規格請參考產品說明'];
                    productData.features = [];
                }
                
                // 添加到比較列表
                console.log('📥 添加產品到比較列表:', productData);
                window.productCompare.compareList.push(productData);
                window.productCompare.saveCompareList();
                window.productCompare.updateUI();
                window.productCompare.showComparePanel();
                
                btn.textContent = '已加入比較';
                btn.classList.add('active');
            }
        });
        
        // 標記已綁定事件
        btn.setAttribute('data-compare-event-bound', 'true');
    });
    
    // 更新按鈕狀態
    if (window.productCompare && window.productCompare.compareList) {
        compareButtons.forEach(btn => {
            const productCard = btn.closest('.product-card');
            if (productCard) {
                const productName = productCard.querySelector('h3')?.textContent?.trim();
                if (productName) {
                    const productId = productName.replace(/\s+/g, '-').toLowerCase();
                    const isInCompare = window.productCompare.compareList.find(p => p.id === productId);
                    if (isInCompare) {
                        btn.textContent = '已加入比較';
                        btn.classList.add('active');
                    }
                }
            }
        });
    }
    
    console.log('✅ 比較功能初始化完成');
}

// 更新 updateComparePanel 函數（修復版本）
function updateComparePanel() {
    const panel = document.getElementById('compare-panel');
    const list = panel.querySelector('.compare-list');
    const toggleBtn = document.getElementById('compare-toggle-btn');
    
    if (!panel || !list || !toggleBtn) {
        console.warn('找不到比較面板元素');
        return;
    }
    
    // 清空現有的比較按鈕
    const existingBtn = panel.querySelector('.compare-panel-btn');
    if (existingBtn) {
        existingBtn.remove();
    }
    
    list.innerHTML = '';
    
    if (compareList.length === 0) {
        list.innerHTML = '<div class="empty-compare">尚未添加商品</div>';
        toggleBtn.classList.remove('show');
        panel.classList.remove('active');
    } else {
        console.log('更新比較面板，產品數量：', compareList.length);
        
        compareList.forEach(item => {
            const div = document.createElement('div');
            div.className = 'compare-item';
            div.innerHTML = `
                <img src="${item.image}" class="compare-thumb">
                <span class="compare-info">${item.name}</span>
                <span class="compare-color" style="background:${item.color}"></span>
                <button class="compare-remove-btn">✕</button>
            `;
            
            div.querySelector('.compare-remove-btn').onclick = () => {
                compareList = compareList.filter(i => i.name !== item.name || i.color !== item.color);
                updateComparePanel();
                // 同步更新 localStorage
                localStorage.setItem('debugCompareList', JSON.stringify(compareList));
            };
            
            list.appendChild(div);
        });

        // 只有當有兩個或以上商品時才顯示比較按鈕
        if (compareList.length >= 2) {
            const compareBtn = document.createElement('button');
            compareBtn.className = 'compare-panel-btn';
            compareBtn.textContent = '比較產品';
            
            // 修復：使用事件監聽器而不是直接的 onclick
            compareBtn.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                
                console.log('🎯 比較產品按鈕被點擊！');
                console.log('當前比較列表：', compareList);
                
                // 直接使用 compareList 生成產品詳細資料
                const productDetails = compareList.map(item => {
                    // 基本產品信息（已有的）
                    const basicInfo = {
                        name: item.name,
                        image: item.image,
                        color: item.color,
                        price: '價格待確認',
                        specs: ['規格信息待補充'],
                        features: ['特點信息待補充'],
                        brand: item.name.split(' ')[0] || '未知品牌',
                        model: item.name.split(' ').slice(1).join(' ') || '型號待確認'
                    };
                    
                    // 嘗試從DOM獲取更詳細的信息
                    try {
                        console.log('🔍 開始搜索產品：', item.name);
                        
                        // 修復：直接搜索 latest_product 區域內的產品
                        const latestProductSection = document.getElementById('latest_product');
                        if (!latestProductSection) {
                            console.warn('找不到 latest_product 區域');
                            return basicInfo;
                        }
                        
                        console.log('✅ 找到 latest_product 區域');
                        
                        // 在 latest_product 區域內搜索產品卡片
                        const cards = latestProductSection.querySelectorAll('.product-card');
                        console.log('📋 在 latest_product 中找到', cards.length, '個產品卡片');
                        
                        let matchedCard = null;
                        for (const card of cards) {
                            const titleEl = card.querySelector('h3');
                            if (titleEl) {
                                const cardTitle = titleEl.textContent.trim();
                                console.log('🔍 檢查產品：', cardTitle, '是否匹配：', item.name);
                                if (cardTitle === item.name) {
                                    matchedCard = card;
                                    console.log('✅ 找到匹配的產品卡片！');
                                    break;
                                }
                            }
                        }
                        
                        if (matchedCard) {
                            console.log('📦 開始提取產品詳細信息...');
                            
                            // 獲取價格
                            const priceEl = matchedCard.querySelector('.price');
                            if (priceEl) {
                                basicInfo.price = priceEl.textContent.trim();
                                console.log('💰 找到價格：', basicInfo.price);
                            } else {
                                console.warn('⚠️ 找不到價格元素');
                            }
                            
                            // 獲取規格 - 從 data 屬性獲取
                            const specsEl = matchedCard.querySelector('.product-specs');
                            if (specsEl) {
                                console.log('📋 找到規格元素，開始提取 data 屬性...');
                                const specs = [];
                                
                                const attributes = [
                                    { key: 'data-cpu', label: '處理器' },
                                    { key: 'data-ram', label: '記憶體' },
                                    { key: 'data-storage', label: '儲存空間' },
                                    { key: 'data-screen', label: '螢幕' },
                                    { key: 'data-camera', label: '相機' },
                                    { key: 'data-battery', label: '電池' },
                                    { key: 'data-os', label: '作業系統' },
                                    { key: 'data-sim', label: 'SIM卡' }
                                ];
                                
                                attributes.forEach(attr => {
                                    const value = specsEl.getAttribute(attr.key);
                                    console.log(`🔍 檢查 ${attr.key}:`, value);
                                    if (value && value !== '不適用' && value !== '') {
                                        specs.push(`${attr.label}: ${value}`);
                                        console.log(`✅ 添加規格: ${attr.label}: ${value}`);
                                    }
                                });
                                
                                if (specs.length > 0) {
                                    basicInfo.specs = specs;
                                    console.log('📋 最終規格列表：', specs);
                                } else {
                                    console.warn('⚠️ 沒有找到有效的規格信息');
                                }
                            } else {
                                console.warn('⚠️ 找不到 .product-specs 元素');
                                // 列出所有可用的類名來調試
                                const allElements = matchedCard.querySelectorAll('*');
                                console.log('🔍 卡片內所有元素的類名：');
                                allElements.forEach(el => {
                                    if (el.className) {
                                        console.log('  -', el.tagName, el.className);
                                    }
                                });
                            }
                            
                            // 根據產品類型設置預設特點
                            if (item.name.includes('iPhone')) {
                                basicInfo.features = [
                                    'Face ID 面容識別',
                                    '無線充電支援',
                                    '防水防塵 IP68',
                                    'MagSafe 磁吸充電',
                                    '5G 網絡支援'
                                ];
                                console.log('📱 設置 iPhone 特點');
                            } else if (item.name.includes('AirPods') || item.name.includes('Airpods')) {
                                basicInfo.features = [
                                    '主動降噪',
                                    '透明模式',
                                    '空間音訊',
                                    '無線充電',
                                    'Siri 語音控制'
                                ];
                                console.log('🎧 設置 AirPods 特點');
                            } else if (item.name.includes('Watch')) {
                                basicInfo.features = [
                                    '健康監測',
                                    'GPS 定位',
                                    '防水設計',
                                    '心率監測',
                                    '運動追蹤'
                                ];
                                console.log('⌚ 設置 Watch 特點');
                            }
                            
                        } else {
                            console.warn('❌ 在 latest_product 中找不到匹配的產品：', item.name);
                            console.log('📋 可用的產品列表：');
                            cards.forEach((card, index) => {
                                const titleEl = card.querySelector('h3');
                                if (titleEl) {
                                    console.log(`  ${index + 1}. ${titleEl.textContent.trim()}`);
                                }
                            });
                        }
                    } catch (error) {
                        console.error('❌ 獲取產品詳細信息時出錯：', error);
                    }
                    
                    console.log('📦 處理後的產品資料：', basicInfo);
                    return basicInfo;
                });

                console.log('🎉 最終產品詳細資料：', productDetails);
                
                // 保存到 localStorage
                localStorage.setItem('compareProducts', JSON.stringify(productDetails));
                console.log('✅ 產品資料已保存到 compareProducts');
                
                // 跳轉到比較頁面
                console.log('🚀 準備跳轉到 compare_details.html');
                window.location.href = 'compare_details.html';
            });
            
            panel.appendChild(compareBtn);
        }
        
        toggleBtn.classList.add('show');
    }

        // 插入 latest_product modal（只插入一次）
    if (!document.getElementById('latest-product-modal')) {
        const modalHtml = `
        <div id="latest-product-modal" style="display:none;position:fixed;top:0;left:0;width:100vw;height:100vh;z-index:9999;background:rgba(0,0,0,0.4);">
            <div style="background:#fff;max-width:400px;margin:80px auto;padding:24px 20px;border-radius:10px;position:relative;">
                <button id="latest-modal-close" style="position:absolute;top:10px;right:10px;font-size:20px;background:none;border:none;cursor:pointer;">&times;</button>
                <div style="text-align:center;">
                    <img id="latest-modal-image" src="" alt="" style="width:120px;height:120px;object-fit:cover;border-radius:8px;">
                </div>
                <h3 id="latest-modal-title" style="margin:10px 0 5px 0;font-size:18px;"></h3>
                <div id="latest-modal-price" style="color:#e74c3c;font-weight:bold;font-size:16px;margin-bottom:10px;"></div>
                <div id="latest-modal-colors" style="margin-bottom:10px;"></div>
                <div style="margin-bottom:10px;">
                    <span>數量：</span>
                    <button id="latest-modal-qty-minus" type="button" style="width:28px;">-</button>
                    <input id="latest-modal-qty" type="number" value="1" min="1" style="width:40px;text-align:center;">
                    <button id="latest-modal-qty-plus" type="button" style="width:28px;">+</button>
                </div>
                <div style="text-align:center;">
                    <button id="latest-modal-confirm" style="background:#00a0e9;color:#fff;padding:8px 24px;border:none;border-radius:5px;cursor:pointer;">確定加入購物車</button>
                    <button id="latest-modal-cancel" style="margin-left:10px;background:#eee;color:#333;padding:8px 24px;border:none;border-radius:5px;cursor:pointer;">取消</button>
                </div>
            </div>
        </div>
        `;
        document.body.insertAdjacentHTML('beforeend', modalHtml);
    }


}

// 限時優惠倒數計時 - 修復版本
(function() {
  // 設定結束時間（例如：3天2小時24分39秒後）
  const endTime = new Date(Date.now() + 3*24*60*60*1000 + 2*60*60*1000 + 24*60*1000 + 39*1000);

  function updateTimer() {
    // 檢查元素是否存在
    const dayEl = document.getElementById('timer-day');
    const hourEl = document.getElementById('timer-hour');
    const minEl = document.getElementById('timer-min');
    const secEl = document.getElementById('timer-sec');
    
    // 如果元素不存在，不執行更新
    if (!dayEl || !hourEl || !minEl || !secEl) {
      return;
    }
    
    const now = new Date();
    let diff = Math.max(0, endTime - now);
    const day = Math.floor(diff / (24*60*60*1000));
    diff %= 24*60*60*1000;
    const hour = Math.floor(diff / (60*60*1000));
    diff %= 60*60*1000;
    const min = Math.floor(diff / (60*1000));
    diff %= 60*1000;
    const sec = Math.floor(diff / 1000);

    dayEl.textContent = String(day).padStart(2, '0');
    hourEl.textContent = String(hour).padStart(2, '0');
    minEl.textContent = String(min).padStart(2, '0');
    secEl.textContent = String(sec).padStart(2, '0');
  }

  // 延遲啟動計時器，等待 DOM 加載
  document.addEventListener('DOMContentLoaded', function() {
    // 確認元素存在後才啟動
    setTimeout(() => {
      if (document.getElementById('timer-day')) {
        setInterval(updateTimer, 1000);
        updateTimer();
      }
    }, 1000);
  });
})();


// 限時優惠自動輪播
function initializeLimitedOfferCarousel() {
    const carousel = document.getElementById('limited-offer-carousel');
    if (!carousel) return;
    const cards = carousel.querySelectorAll('.limited-offer-card');
    const visibleCards = 4;
    let currentIndex = 0;
    let intervalId;

    function getCardWidth() {
        const card = cards[0];
        const cardStyle = window.getComputedStyle(card);
        return card.offsetWidth +
            parseInt(cardStyle.marginLeft) +
            parseInt(cardStyle.marginRight);
    }

    function slideTo(idx) {
        const cardWidth = getCardWidth();
        carousel.style.transition = 'transform 0.5s';
        carousel.style.transform = `translateX(-${idx * cardWidth}px)`;
        currentIndex = idx;
    }

    function autoSlide() {
        const maxIndex = Math.ceil(cards.length / visibleCards) - 1;
        let nextIndex = currentIndex + 1;
        if (nextIndex > maxIndex) nextIndex = 0;
        slideTo(nextIndex * visibleCards);
    }

    function startAuto() {
        if (intervalId) return;
        intervalId = setInterval(autoSlide, 3000);
    }
    
    function stopAuto() {
        clearInterval(intervalId);
        intervalId = null;
    }

    // 滑鼠進入時暫停自動輪播
    carousel.parentElement.addEventListener('mouseenter', stopAuto);
    carousel.parentElement.addEventListener('mouseleave', startAuto);

    // 拖曳功能 - 修復版本
    let isDown = false, startX = 0, scrollStart = 0;
    
    carousel.parentElement.addEventListener('mousedown', (e) => {
        // 防止默認行為（防止圖片被選中）
        e.preventDefault();
        isDown = true;
        stopAuto();
        startX = e.pageX;
        scrollStart = currentIndex;
        carousel.style.cursor = 'grabbing';
    });

    window.addEventListener('mousemove', (e) => {
        if (!isDown) return;
        e.preventDefault(); // 防止默認拖拽行為
        const dx = e.pageX - startX;
        const cardWidth = getCardWidth();
        let moveIndex = scrollStart - Math.round(dx / cardWidth);
        moveIndex = Math.max(0, Math.min(cards.length - visibleCards, moveIndex));
        slideTo(moveIndex);
    });

    window.addEventListener('mouseup', () => {
        if (isDown) {
            isDown = false;
            carousel.style.cursor = 'grab';
            startAuto();
        }
    });

    // Touch 支援
    let touchStartX = 0, touchScrollStart = 0;
    
    carousel.parentElement.addEventListener('touchstart', (e) => {
        stopAuto();
        touchStartX = e.touches[0].clientX;
        touchScrollStart = currentIndex;
    });

    carousel.parentElement.addEventListener('touchmove', (e) => {
        e.preventDefault(); // 防止頁面滾動
        const dx = e.touches[0].clientX - touchStartX;
        const cardWidth = getCardWidth();
        let moveIndex = touchScrollStart - Math.round(dx / cardWidth);
        moveIndex = Math.max(0, Math.min(cards.length - visibleCards, moveIndex));
        slideTo(moveIndex);
    });

    carousel.parentElement.addEventListener('touchend', () => {
        startAuto();
    });

    // 初始化
    carousel.style.display = 'flex';
    carousel.style.transition = 'transform 0.5s';
    carousel.style.willChange = 'transform';
    slideTo(0);
    startAuto();
}

// 購物車管理系統 - 修復動態加載問題
window.ShoppingCart = {
    items: [],
    initialized: false,
    currentSelectedCard: null,
    cartIconBound: false,
    productEventsBound: false,
    
    init() {
        if (this.initialized) return;
        this.initialized = true;
        
        console.log('✅ 購物車初始化開始');
        this.loadFromStorage();
        
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => {
                this.waitForSetup();
            });
        } else {
            this.waitForSetup();
        }
    },

    waitForSetup() {
        setTimeout(() => {
            this.setupCart();
            this.bindProductEvents();
        }, 500);
    },

    ensureLatestProductModalExists() {
        if (document.getElementById('latest-product-modal')) return;
        const modalHtml = `
        <div id="latest-product-modal" style="display:none;position:fixed;top:0;left:0;width:100vw;height:100vh;z-index:9999;background:rgba(0,0,0,0.4);">
            <div style="background:#fff;max-width:420px;margin:80px auto;padding:24px;border-radius:10px;position:relative;">
                <button id="latest-modal-close" style="position:absolute;top:10px;right:10px;font-size:20px;background:none;border:none;cursor:pointer;">&times;</button>
                <div style="text-align:center;">
                    <img id="latest-modal-image" src="" alt="" style="width:120px;height:120px;object-fit:cover;border-radius:8px;">
                </div>
                <h3 id="latest-modal-title" style="margin:10px 0 5px 0;font-size:18px;"></h3>
                <div id="latest-modal-price" style="color:#e74c3c;font-weight:bold;font-size:16px;margin-bottom:10px;"></div>
                <div id="latest-modal-colors" style="margin-bottom:10px;display:flex;align-items:center;"></div>
                <div style="margin-bottom:10px;">
                    <span>數量：</span>
                    <button id="latest-modal-qty-minus" type="button" style="width:28px;">-</button>
                    <input id="latest-modal-qty" type="number" value="1" min="1" style="width:44px;text-align:center;">
                    <button id="latest-modal-qty-plus" type="button" style="width:28px;">+</button>
                </div>
                <div style="text-align:center;">
                    <button id="latest-modal-confirm" style="background:#00a0e9;color:#fff;padding:8px 24px;border:none;border-radius:5px;cursor:pointer;">確定加入購物車</button>
                    <button id="latest-modal-cancel" style="margin-left:10px;background:#eee;color:#333;padding:8px 24px;border:none;border-radius:5px;cursor:pointer;">取消</button>
                </div>
            </div>
        </div>
        `;
        document.body.insertAdjacentHTML('beforeend', modalHtml);
    },

    setupCart() {
        console.log('🔧 設置購物車，開始檢查元素');
        
        // 使用更長的檢查時間和更頻繁的檢查
        let checkCount = 0;
        const maxChecks = 100; // 最多檢查 100 次（10 秒）
        
        const checkInterval = setInterval(() => {
            checkCount++;
            const cartIcon = document.getElementById('cart-icon');
            const cartDropdown = document.getElementById('cart-dropdown');
            
            if (cartIcon && cartDropdown && !this.cartIconBound) {
                clearInterval(checkInterval);
                console.log('✅ 找到購物車元素，綁定事件');
                
                this.cartIconBound = true;
                
                // 綁定購物車圖標點擊事件
                cartIcon.addEventListener('click', (e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    console.log('🛒 點擊購物車圖標');
                    cartDropdown.classList.toggle('active');
                    console.log('購物車下拉狀態:', cartDropdown.classList.contains('active'));
                });

                // 點擊其他地方關閉購物車
                document.addEventListener('click', (e) => {
                    // 新增：檢查是否點擊了刪除按鈕，如果是則阻止關閉
                    if (e.target.closest('.cart-item-remove')) {
                        return; // 不關閉購物車
                    }

                    if (!cartIcon.contains(e.target) && !cartDropdown.contains(e.target)) {
                        if (cartDropdown.classList.contains('active')) {
                            console.log('關閉購物車下拉');
                            cartDropdown.classList.remove('active');
                        }
                    }
                });

                // 新增：在購物車下拉內部綁定刪除事件
                cartDropdown.addEventListener('click', (e) => {
                    const removeBtn = e.target.closest('.cart-item-remove');
                    if (removeBtn) {
                        e.preventDefault();
                        e.stopPropagation(); // 防止事件冒泡
                        
                        const id = removeBtn.getAttribute('data-id');
                        const color = removeBtn.getAttribute('data-color');
                        
                        if (id && color) {
                            window.ShoppingCart.removeItem(id, color);
                            console.log('✅ 已刪除商品，購物車保持打開狀態');
                        }
                    }
                });
                
                this.updateDisplay();
            } else if (checkCount >= maxChecks) {
                clearInterval(checkInterval);
                console.log('⚠️ 購物車檢查超時，已檢查', checkCount, '次');
            }
        }, 100);
    },

    bindProductEvents() {
        if (this.productEventsBound) {
            console.log('⚠️ 產品事件已綁定，跳過');
            return;
        }
        
        this.productEventsBound = true;
        console.log('✅ 綁定產品事件（一次性）');
        
        // 使用事件委託綁定所有按鈕（一次性綁定）
        document.body.addEventListener('click', (e) => {
            // 處理加入購物車按鈕
            const addBtn = e.target.closest('.product-add-btn-v2');
            if (addBtn) {
                e.preventDefault();
                e.stopPropagation();
                const card = addBtn.closest('.product-card-v2');
                if (card) {
                    console.log('✅ 點擊產品加入按鈕');
                    this.currentSelectedCard = card;
                    this.openAddModal(card);
                }
                return;
            }
            
            // 處理確認按鈕
            if (e.target.id === 'add-modal-confirm' || e.target.closest('#add-modal-confirm')) {
                e.preventDefault();
                e.stopPropagation();
                console.log('✅ 點擊確認按鈕');
                this.confirmAddToCart();
                return;
            }
            
            // 處理取消和關閉按鈕
            if (e.target.id === 'add-modal-cancel' || 
                e.target.id === 'add-modal-close' ||
                e.target.id === 'add-modal-overlay') {
                e.stopPropagation();
                this.closeAddModal();
                return;
            }
            
            // 處理數量減少按鈕 - 確保只執行一次
            const minusBtn = e.target.closest('#add-modal-qty-minus');
            if (minusBtn) {
                e.preventDefault();
                e.stopPropagation();
                const qtyInput = document.getElementById('add-modal-qty');
                if (qtyInput) {
                    const val = parseInt(qtyInput.value) || 1;
                    if (val > 1) {
                        qtyInput.value = val - 1;
                        console.log('➖ 數量減少到:', qtyInput.value);
                    }
                }
                return;
            }
            
            // 處理數量增加按鈕 - 確保只執行一次
            const plusBtn = e.target.closest('#add-modal-qty-plus');
            if (plusBtn) {
                e.preventDefault();
                e.stopPropagation();
                const qtyInput = document.getElementById('add-modal-qty');
                if (qtyInput) {
                    const val = parseInt(qtyInput.value) || 1;
                    qtyInput.value = val + 1;
                    console.log('➕ 數量增加到:', qtyInput.value);
                }
                return;
            }

            // 新增：latest_product 區塊的加入購物車功能
            const addCartBtn = e.target.closest('.add-cart-btn');
            if (addCartBtn) {
                e.preventDefault();
                e.stopPropagation();

                // 找到對應的 .product-card
                const card = addCartBtn.closest('.product-card');
                if (!card) return;

                // 保險：確保 modal 已存在（若不存在就建立）
                this.ensureLatestProductModalExists();

                // 讀取產品資料
                const title = card.querySelector('h3')?.textContent.trim() || '';
                const priceText = card.querySelector('.price')?.textContent.trim() || '0';
                const price = parseFloat((priceText || '').replace('HK$', '').replace(/[^\d.]/g, '').trim()) || 0;
                const image = card.querySelector('.product-image')?.src || '';

                // 取得顏色選項（若無則使用單一預設）
                const colorDots = Array.from(card.querySelectorAll('.color-dot'));
                const colorOptions = colorDots.length ? colorDots.map(dot => {
                    let color = dot.dataset.color || dot.getAttribute('data-color') || '';
                    if (!color) {
                        const style = dot.getAttribute('style') || '';
                        const m = style.match(/background(?:-color)?\s*:\s*([^;]+)/i);
                        if (m) color = m[1].trim();
                    }
                    const img = dot.dataset.image || dot.getAttribute('data-image') || image;
                    return { color: color || '#cccccc', image: img };
                }) : [{ color: '#cccccc', image }];

                // 填充並顯示 modal（使用已插入的 latest-product-modal）
                const modal = document.getElementById('latest-product-modal');
                const colorsContainer = document.getElementById('latest-modal-colors');
                const qtyInput = document.getElementById('latest-modal-qty');
                if (!modal || !colorsContainer || !qtyInput) {
                    console.error('❌ 找不到 latest-product modal 或其元素');
                    return;
                }

                // 填基本資訊
                document.getElementById('latest-modal-image').src = image;
                document.getElementById('latest-modal-title').textContent = title;
                document.getElementById('latest-modal-price').textContent = priceText;
                qtyInput.value = 1;

                // 建立顏色按鈕
                colorsContainer.innerHTML = '';
                let selectedColor = colorOptions[0].color;
                let selectedImage = colorOptions[0].image;

                colorOptions.forEach((opt, idx) => {
                    const btn = document.createElement('button');
                    btn.type = 'button';
                    btn.className = 'latest-color-option' + (idx === 0 ? ' selected' : '');
                    btn.style.cssText = `
                        background: ${opt.color};
                        width: 28px; height: 28px; border-radius:50%;
                        margin-right:8px; border:${idx===0?'2px solid #00a0e9':'1px solid #ccc'};
                        cursor:pointer;
                    `;
                    btn.setAttribute('data-color', opt.color);
                    btn.setAttribute('data-image', opt.image);
                    btn.addEventListener('click', function(ev) {
                        ev.stopPropagation();
                        colorsContainer.querySelectorAll('.latest-color-option').forEach(b => {
                            b.classList.remove('selected');
                            b.style.border = '1px solid #ccc';
                        });
                        btn.classList.add('selected');
                        btn.style.border = '2px solid #00a0e9';
                        selectedColor = opt.color;
                        selectedImage = opt.image;
                        document.getElementById('latest-modal-image').src = selectedImage;
                    });
                    colorsContainer.appendChild(btn);
                });

                // 顯示 modal
                modal.style.display = 'block';
                document.body.style.overflow = 'hidden';

                // 綁定按鈕（覆蓋舊 handler）
                const closeBtn = document.getElementById('latest-modal-close');
                const cancelBtn = document.getElementById('latest-modal-cancel');
                const confirmBtn = document.getElementById('latest-modal-confirm');
                const qtyPlus = document.getElementById('latest-modal-qty-plus');
                const qtyMinus = document.getElementById('latest-modal-qty-minus');

                // 使用 cloneNode 清除舊事件，再替換（確保不會重複綁定）
                function replaceHandler(el) {
                    if (!el) return el;
                    const n = el.cloneNode(true);
                    el.parentNode.replaceChild(n, el);
                    return n;
                }
                const newClose = replaceHandler(closeBtn);
                const newCancel = replaceHandler(cancelBtn);
                const newConfirm = replaceHandler(confirmBtn);
                const newPlus = replaceHandler(qtyPlus);
                const newMinus = replaceHandler(qtyMinus);

                const closeLatestModal = () => {
                    modal.style.display = 'none';
                    document.body.style.overflow = '';
                };

                if (newClose) newClose.addEventListener('click', closeLatestModal);
                if (newCancel) newCancel.addEventListener('click', closeLatestModal);
                if (newPlus) newPlus.addEventListener('click', () => {
                    qtyInput.value = Math.max(1, parseInt(qtyInput.value || '1') + 1);
                });
                if (newMinus) newMinus.addEventListener('click', () => {
                    qtyInput.value = Math.max(1, parseInt(qtyInput.value || '1') - 1);
                });

                if (newConfirm) newConfirm.addEventListener('click', () => {
                    const qty = Math.max(1, parseInt(qtyInput.value || '1'));
                    const id = `${title}_${selectedColor}`;
                    const product = {
                        id,
                        title,
                        price,
                        image: selectedImage,
                        quantity: qty,
                        color: selectedColor
                    };
                    window.ShoppingCart.addItem(product);
                    closeLatestModal();
                    // 可選提示
                    // alert(`已加入購物車：${title} x ${qty}`);
                });

                return;
            }
        });
    },

    openAddModal(card) {
        if (!card) return;

        console.log('✅ 打開加入購物車模態框');
        
        // 設置選中狀態
        document.querySelectorAll('.product-card-v2').forEach(c => {
            c.removeAttribute('data-selected');
        });
        card.setAttribute('data-selected', 'true');
        this.currentSelectedCard = card;

        // 獲取產品信息
        const title = card.querySelector('.product-title-v2')?.textContent || '';
        const price = card.querySelector('.price-v2')?.textContent || '';
        const image = card.querySelector('.product-img-v2')?.src || '';

        console.log('📦 產品信息:', { title, price, image });

        // 更新模態框
        const modal = document.getElementById('add-modal');
        const overlay = document.getElementById('add-modal-overlay');
        
        if (modal && overlay) {
            document.getElementById('add-modal-title').textContent = title;
            document.getElementById('add-modal-price').textContent = price;
            document.getElementById('add-modal-image').src = image;
            document.getElementById('add-modal-qty').value = 1;

            modal.style.display = 'block';
            overlay.style.display = 'block';
            document.body.style.overflow = 'hidden';
            console.log('✅ 模態框已顯示');
        }
    },

    closeAddModal() {
        console.log('❌ 關閉模態框');
        const modal = document.getElementById('add-modal');
        const overlay = document.getElementById('add-modal-overlay');
        
        if (modal) modal.style.display = 'none';
        if (overlay) overlay.style.display = 'none';
        document.body.style.overflow = '';
        
        this.currentSelectedCard = null;
        document.querySelectorAll('.product-card-v2').forEach(card => {
            card.removeAttribute('data-selected');
        });
    },

    confirmAddToCart() {
        // 使用保存的選中卡片
        const selectedCard = this.currentSelectedCard || document.querySelector('.product-card-v2[data-selected="true"]');
        
        if (!selectedCard) {
            console.error('❌ 沒有選中的產品');
            return;
        }

        console.log('✅ 找到選中的產品卡片');

        // 獲取價格
        const priceText = selectedCard.querySelector('.price-v2')?.textContent || '0';
        const price = parseFloat(priceText.replace('HK$', '').replace(',', '').trim()) || 0;

        const product = {
            id: selectedCard.getAttribute('data-product') || `product-${Date.now()}`,
            title: selectedCard.querySelector('.product-title-v2')?.textContent.trim() || '',
            price: price,
            image: selectedCard.querySelector('.product-img-v2')?.src || '',
            quantity: parseInt(document.getElementById('add-modal-qty')?.value || 1),
            color: document.querySelector('.color-option.selected')?.getAttribute('data-color') || 'Default'
        };

        console.log('📦 準備加入購物車:', product);
        
        
        this.addItem(product);
        this.closeAddModal();
        
    },

    addItem(product) {
        console.log('➕ addItem 被調用:', product);
        
        const existingItem = this.items.find(item => 
            item.id === product.id && item.color === product.color
        );

        if (existingItem) {
            existingItem.quantity += product.quantity;
            console.log('✅ 更新現有產品數量:', existingItem);
        } else {
            this.items.push(product);
            console.log('✅ 添加新產品');
        }



        console.log('📦 購物車內容:', this.items);
        
        this.saveToStorage();
        this.updateDisplay();
    },

    removeItem(id, color) {
        console.log('🗑️ 移除產品:', id, color);
        this.items = this.items.filter(item => 
            !(item.id === id && item.color === color)
        );
        this.saveToStorage();
        this.updateDisplay();
    },

    updateDisplay() {
        console.log('🔄 更新購物車顯示');
        
        const totalQuantity = this.items.reduce((sum, item) => sum + item.quantity, 0);
        console.log('📊 總數量:', totalQuantity);
        
        const cartCount = document.querySelector('.cart-count');
        if (cartCount) {
            cartCount.textContent = totalQuantity;
            console.log('✅ 購物車數量已更新:', totalQuantity);
        } else {
            console.log('⚠️ 找不到 .cart-count 元素');
        }
        
        const cartCountText = document.querySelector('.cart-count-text');
        if (cartCountText) {
            cartCountText.textContent = `${totalQuantity} 件商品`;
        }

        const cartItems = document.querySelector('.cart-items');
        if (cartItems) {
            if (this.items.length === 0) {
                cartItems.innerHTML = '<div style="text-align:center;padding:40px;color:#999;">購物車是空的</div>';
            } else {
                cartItems.innerHTML = this.items.map(item => `
                    <div class="cart-item">
                        <img src="${item.image}" alt="${item.title}" class="cart-item-img">
                        <div class="cart-item-info">
                            <div class="cart-item-title">${item.title}</div>
                            <div class="cart-item-price">HK$${item.price.toFixed(2)}</div>
                            <div class="cart-item-quantity">數量: ${item.quantity}</div>
                        </div>
                        <button class="cart-item-remove" data-id="${item.id}" data-color="${item.color}">
                            <i class="fas fa-times"></i>
                        </button>
                    </div>
                `).join('');
            }
        }

        const total = this.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        const totalElement = document.getElementById('cart-total-amount');
       
        if (totalElement) {
            totalElement.textContent = `HK$ ${total.toFixed(2)}`;
        }

        // 修復：綁定結賬按鈕事件 - 使用更可靠的方式
        setTimeout(() => {
            const checkoutBtn = document.querySelector('.cart-checkout');
            console.log('🔍 尋找結賬按鈕:', checkoutBtn);
            
            if (checkoutBtn) {
                // 移除舊的事件監聽器
                const newCheckoutBtn = checkoutBtn.cloneNode(true);
                checkoutBtn.parentNode.replaceChild(newCheckoutBtn, checkoutBtn);
                
                // 綁定新的事件
                newCheckoutBtn.addEventListener('click', (e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    console.log('🎯 結賬按鈕被點擊！');
                    console.log('📦 購物車商品數量:', this.items.length);
                    
                    if (this.items.length === 0) {
                        alert('購物車是空的！');
                        return;
                    }
                    
                    console.log('✅ 準備跳轉到結賬頁面');
                    // 跳轉到產品詳細選擇頁面
                    window.location.href = 'checkout-details.html';
                });
                
                console.log('✅ 結賬按鈕事件已綁定');
            } else {
                console.warn('⚠️ 找不到結賬按鈕元素');
            }
        }, 200);
        
        console.log('✅ 購物車顯示更新完成');
    },

    saveToStorage() {
        try {
            localStorage.setItem('shoppingCart', JSON.stringify(this.items));
            console.log('💾 已保存到 localStorage');
        } catch (e) {
            console.error('❌ 保存失敗:', e);
        }
    },

    loadFromStorage() {
        try {
            const saved = localStorage.getItem('shoppingCart');
            if (saved) {
                this.items = JSON.parse(saved);
                console.log('📂 已從 localStorage 載入');
            }
        } catch (e) {
            console.error('❌ 載入失敗:', e);
            this.items = [];
        }
    }
};

// 立即初始化購物車
window.ShoppingCart.init();

// 比較面板初始化
initializeComparePanel();

// 在 DOMContentLoaded 事件後添加比較按鈕事件監聽器
document.addEventListener('click', function(e) {
    console.log('點擊事件：', e.target);
    console.log('點擊元素的文本：', e.target.textContent);
    console.log('點擊元素的類名：', e.target.className);
    
    // 排除比較面板內部的按鈕
    if (e.target.closest('#compare-panel') || e.target.closest('.compare-panel-btn')) {
        console.log('🚫 排除比較面板內部的點擊');
        return;
    }
    
    // 檢查是否點擊了產品的比較按鈕
    if (e.target.textContent && e.target.textContent.trim() === '比較' && e.target.tagName === 'BUTTON') {
        console.log('🎯 檢測到產品比較按鈕點擊！');
        
        e.preventDefault();
        e.stopPropagation();
        
        // 修復：找到產品卡片 - 支援多種選擇器
        let productCard = e.target.closest('.product-card') || 
                         e.target.closest('.product-card-v2') ||
                         e.target.closest('[class*="product"]');
        
        if (!productCard) {
            console.error('❌ 找不到產品卡片');
            return;
        }
        
        console.log('✅ 找到產品卡片：', productCard);
        
        // 修復：獲取產品名稱 - 支援多種選擇器
        let productName = '';
        const titleEl = productCard.querySelector('h3') || 
                       productCard.querySelector('.product-title-v2') || 
                       productCard.querySelector('[class*="title"]');
        
        if (titleEl && titleEl.textContent.trim()) {
            productName = titleEl.textContent.trim();
        }
        
        // 修復：獲取產品圖片 - 支援多種選擇器
        let productImage = '';
        const imgEl = productCard.querySelector('.product-image') ||
                     productCard.querySelector('.product-img-v2') || 
                     productCard.querySelector('img');
        
        if (imgEl && imgEl.src) {
            productImage = imgEl.src;
        }
        
        // 獲取顏色
        let color = '#fff';
        const colorDot = productCard.querySelector('.color-dot.selected') || 
                        productCard.querySelector('.color-dot');
        if (colorDot) {
            const style = colorDot.getAttribute('style');
            if (style && style.includes('background')) {
                color = style.match(/background[^;]*:\s*([^;]*)/)?.[1] || '#fff';
            }
        }
        
        console.log('產品信息：', { productName, productImage, color });
        
        if (!productName) {
            console.error('❌ 找不到有效的產品名稱');
            return;
        }
        
        // 驗證產品名稱不是無效的文本
        if (productName === '比較清單' || productName === '比較產品' || productName === '比較') {
            console.warn('⚠️ 忽略無效的產品名稱:', productName);
            return;
        }
        
        // 檢查是否已經在比較列表中
        const isDuplicate = compareList.some(item => 
            item.name === productName && item.color === color
        );
        
        if (!isDuplicate) {
            compareList.push({
                name: productName,
                image: productImage,
                color: color
            });
            
            console.log('✅ 產品已添加到比較列表：', compareList);
            
            // 更新 localStorage
            localStorage.setItem('debugCompareList', JSON.stringify(compareList));
            
            // 更新比較面板
            updateComparePanel();
            
            // 自動展開比較面板
            const comparePanel = document.getElementById('compare-panel');
            const toggleBtn = document.getElementById('compare-toggle-btn');
            if (comparePanel && toggleBtn) {
                comparePanel.classList.add('active');
                toggleBtn.innerHTML = '<i class="fas fa-chevron-right"></i>';
                console.log('✅ 比較面板已展開');
            }
        } else {
            console.log('⚠️ 產品已在比較列表中');
        }
    }
});

// Brand product list functionality
function loadBrandProductPage() {
    // 載入 header/footer components（與 index.html 同做法）
    fetch('components/header.html').then(r=>r.text()).then(html=>{
        document.getElementById('site-header').innerHTML = html;
        // 重要：在 header 載入完成後初始化 header 功能
        setTimeout(() => {
            initializeHeader();
        }, 100);
    });
    fetch('components/footer.html').then(r=>r.text()).then(html=>document.getElementById('site-footer').innerHTML = html);

    // 讀取 query param
    function getQueryParam(name) {
        const url = new URL(window.location.href);
        return url.searchParams.get(name);
    }

    // 更新頁面標題（如果有 query param）
    const brand = getQueryParam('brand');
    if (brand) {
        const titleEl = document.getElementById('brandproductlist-title');
        if (titleEl) titleEl.textContent = brand;
    }

    // 初始化產品種類選擇功能
    initCategoryFilter();
}

// 產品種類篩選功能
function initCategoryFilter() {
    const categoryItems = document.querySelectorAll('.brandproductlist-category-item');
    const productCards = document.querySelectorAll('.brandproductlist-product-card');
    const categoryScroll = document.querySelector('.brandproductlist-category-scroll');
    const prevBtn = document.querySelector('.brandproductlist-category-prev');
    const nextBtn = document.querySelector('.brandproductlist-category-next');

    // 修復：產品類別映射 - 更準確的關鍵字匹配
    const categoryMapping = {
        'earphones': ['AirPods', 'Airpods', '真無線', '藍牙耳機', 'MXP63ZP'],
        'headphones': ['頭戴式耳機', '有線耳機'],
        'smartwatch': ['Watch', '手錶', '智能手錶', '運動手環'],
        'laptop': ['MacBook', 'Air', '筆記型電腦', '筆電', 'M3', 'Liquid Retina'],
        'mobile': ['iPhone', '手機', '智能手機', '5G', '沙漠鈦金色'],
        'tablet': ['iPad', '平板', 'Wi-Fi', '太空灰色', '6th Gen'],
        'desktop': ['iMac', 'Mac mini', '桌上電腦', '桌機'],
        'accessories': ['Pencil', 'AirTag', '配件', '週邊', '智能定位', 'MX2D3ZA'],
        'cables': ['線材', '充電線', 'USB', '傳輸線', 'Lightning']
    };


    console.log('🔧 初始化分類篩選，找到', categoryItems.length, '個分類按鈕');
    console.log('🔧 找到', productCards.length, '個產品卡片');

    // 種類選擇事件
    categoryItems.forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            const category = this.getAttribute('data-category');
            
            console.log('🎯 點擊分類：', category);
            
            // 更新按鈕狀態
            categoryItems.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // 篩選產品
            filterProducts(category);
        });
    });

    // 修復：篩選產品函數 - 更詳細的日誌和更好的匹配邏輯
    function filterProducts(category) {
        console.log('🔍 開始篩選分類：', category);
        
        let visibleCount = 0;
        
        productCards.forEach((card, index) => {
            const titleEl = card.querySelector('.brandproductlist-product-title');
            const title = titleEl?.textContent?.trim() || '';
            
            console.log(`📋 檢查產品 ${index + 1}: "${title}"`);
            
            if (category === 'all') {
                card.style.display = 'flex';
                visibleCount++;
                console.log(`✅ 產品 ${index + 1} 顯示（全部分類）`);
            } else {
                const keywords = categoryMapping[category] || [];
                console.log(`🔍 分類 "${category}" 的關鍵字：`, keywords);
                
                // 改進匹配邏輯：不區分大小寫，支援部分匹配
                const isMatch = keywords.some(keyword => {
                    const match = title.toLowerCase().includes(keyword.toLowerCase());
                    if (match) {
                        console.log(`✅ 產品 "${title}" 匹配關鍵字 "${keyword}"`);
                    }
                    return match;
                });
                
                if (isMatch) {
                    card.style.display = 'flex';
                    visibleCount++;
                    console.log(`✅ 產品 ${index + 1} 顯示`);
                } else {
                    card.style.display = 'none';
                    console.log(`❌ 產品 ${index + 1} 隱藏`);
                }
            }
        });
        
        console.log(`📊 篩選完成，顯示 ${visibleCount} 個產品`);
        
        // 如果沒有產品匹配，顯示提示
        if (visibleCount === 0 && category !== 'all') {
            console.warn('⚠️ 沒有找到匹配的產品');
            // 可以在這裡添加"無產品"的提示
        }
    }

    // 橫向滾動功能
    if (categoryScroll && prevBtn && nextBtn) {
        const scrollAmount = 200;

        prevBtn.addEventListener('click', () => {
            categoryScroll.scrollBy({
                left: -scrollAmount,
                behavior: 'smooth'
            });
        });

        nextBtn.addEventListener('click', () => {
            categoryScroll.scrollBy({
                left: scrollAmount,
                behavior: 'smooth'
            });
        });

        // 檢查是否需要顯示滾動按鈕
        function checkScrollButtons() {
            const { scrollLeft, scrollWidth, clientWidth } = categoryScroll;
            
            prevBtn.style.display = scrollLeft > 0 ? 'flex' : 'none';
            nextBtn.style.display = scrollLeft < scrollWidth - clientWidth - 1 ? 'flex' : 'none';
        }

        // 監聽滾動事件
        categoryScroll.addEventListener('scroll', checkScrollButtons);
        window.addEventListener('resize', checkScrollButtons);
        
        // 初始檢查
        setTimeout(checkScrollButtons, 100);
    }

    // 調試：列出所有產品標題
    console.log('📋 所有產品標題：');
    productCards.forEach((card, index) => {
        const title = card.querySelector('.brandproductlist-product-title')?.textContent?.trim() || '';
        console.log(`  ${index + 1}. "${title}"`);
    });
}

// Check if we're on the brand product list page and initialize
document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('brandproductlist-grid')) {
        loadBrandProductPage();
    }
});


