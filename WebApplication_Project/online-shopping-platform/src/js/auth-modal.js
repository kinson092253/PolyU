/**
 * 登入/註冊彈窗管理
 */
class AuthModal {
    constructor() {
        this.modal = null;
        this.isOpen = false;
        this.init();
    }

    init() {
        // 等待 DOM 載入完成
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.setupModal());
        } else {
            this.setupModal();
        }
    }

    setupModal() {
        // 創建彈窗 HTML
        this.createModal();
        
        // 等待 header 載入完成後再綁定事件
        this.waitForHeader();
    }

    waitForHeader() {
        // 檢查 header 是否已載入
        const checkHeader = () => {
            const loginBtn = document.querySelector('.login-icon');
            if (loginBtn) {
                // header 已載入，綁定事件
                this.bindEvents();
                console.log('Auth modal initialized - header found');
            } else {
                // header 還沒載入，繼續等待
                setTimeout(checkHeader, 100);
            }
        };
        
        checkHeader();
    }

    createModal() {
        const modalHTML = `
            <div id="auth-modal" class="auth-modal">
                <div class="auth-modal-content">
                    <button class="auth-modal-close" id="auth-close-btn">&times;</button>
                    
                    <div class="auth-header">
                        <div class="auth-logo-container">
                            <img src="assets/logo.png" alt="QUICK TO BUY Logo" class="auth-logo">
                            <div class="auth-company-info">
                                <h2>QUICK TO BUY</h2>
                            </div>
                        </div>
                    </div>

                    <!-- 登入/註冊切換 -->
                    <div class="auth-tabs">
                        <button class="auth-tab" data-tab="login">登入</button>
                        <button class="auth-tab active" data-tab="register">註冊</button>
                    </div>

                    <!-- 登入表單 -->
                    <div class="auth-form-container" id="login-form" style="display: none;">
                        <!-- 第三方登入 -->
                        <div class="auth-social-buttons">
                            <button class="auth-social-btn google">
                                <i class="fab fa-google"></i>
                                <span>以 Google 帳戶登入</span>
                            </button>
                            <button class="auth-social-btn facebook">
                                <i class="fab fa-facebook"></i>
                                <span>以 Facebook 帳戶登入</span>
                            </button>
                            <button class="auth-social-btn apple">
                                <i class="fab fa-apple"></i>
                                <span>以 Apple 帳戶登入</span>
                            </button>
                        </div>

                        <div class="auth-divider">或以電話號碼登入</div>

                        <!-- 電話登入 -->
                        <form class="auth-form">
                            <div class="auth-phone-group">
                                <select class="auth-country-code">
                                    <option value="852">852</option>
                                    <option value="86">86</option>
                                    <option value="853">853</option>
                                    <option value="886">886</option>
                                </select>
                                <input type="tel" class="auth-phone-input" placeholder="電話號碼" required>
                            </div>
                            <div class="auth-form-group">
                                <input type="password" class="auth-input" placeholder="帳戶密碼" required>
                                <button type="button" class="auth-toggle-password">
                                    <i class="fas fa-eye-slash"></i>
                                </button>
                            </div>
                            <button type="submit" class="auth-submit-btn">登入</button>
                            <a href="#" class="auth-forgot-password">忘記密碼?</a>
                        </form>
                    </div>

                    <!-- 註冊表單 -->
                    <div class="auth-form-container" id="register-form">
                        <!-- 第三方註冊 -->
                        <div class="auth-social-buttons">
                            <button class="auth-social-btn google">
                                <i class="fab fa-google"></i>
                                <span>以 Google 帳戶註冊</span>
                            </button>
                            <button class="auth-social-btn facebook">
                                <i class="fab fa-facebook"></i>
                                <span>以 Facebook 帳戶註冊</span>
                            </button>
                            <button class="auth-social-btn apple">
                                <i class="fab fa-apple"></i>
                                <span>以 Apple 帳戶註冊</span>
                            </button>
                        </div>

                        <div class="auth-divider">或以電話號碼註冊</div>

                        <!-- 電話註冊 -->
                        <form class="auth-form">
                            <div class="auth-phone-group">
                                <select class="auth-country-code">
                                    <option value="852">852</option>
                                    <option value="86">86</option>
                                    <option value="853">853</option>
                                    <option value="886">886</option>
                                </select>
                                <input type="tel" class="auth-phone-input" placeholder="電話號碼" required>
                            </div>
                            <div class="auth-form-group">
                                <input type="email" class="auth-input" placeholder="電郵地址" required>
                            </div>
                            <div class="auth-form-group">
                                <input type="password" class="auth-input" placeholder="帳戶密碼" required>
                                <button type="button" class="auth-toggle-password">
                                    <i class="fas fa-eye-slash"></i>
                                </button>
                            </div>
                            <div class="auth-terms">
                                <input type="checkbox" id="agree-terms" required>
                                <label for="agree-terms">
                                    我已詳細閱讀並同意 <a href="#">免責聲明</a> 和 <a href="#">私隱條款</a>
                                </label>
                            </div>
                            <button type="submit" class="auth-submit-btn">註冊</button>
                        </form>
                    </div>
                </div>
            </div>
        `;
        
        document.body.insertAdjacentHTML('beforeend', modalHTML);
        this.modal = document.getElementById('auth-modal');
    }

    bindEvents() {
        // 綁定開啟按鈕 - 使用事件委派
        document.addEventListener('click', (e) => {
            if (e.target.closest('.login-icon')) {
                e.preventDefault();
                this.open();
                console.log('Login button clicked');
            }
        });

        // 綁定關閉按鈕
        const closeBtn = document.getElementById('auth-close-btn');
        if (closeBtn) {
            closeBtn.addEventListener('click', () => this.close());
        }

        // 綁定遮罩層點擊
        if (this.modal) {
            this.modal.addEventListener('click', (e) => {
                if (e.target === this.modal) {
                    this.close();
                }
            });
        }

        // 綁定標籤切換
        this.setupTabs();

        // 綁定密碼顯示/隱藏
        this.setupPasswordToggle();

        // 綁定表單提交
        this.setupFormSubmit();

        // 鍵盤 ESC 關閉
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.isOpen) {
                this.close();
            }
        });
    }

    setupTabs() {
        const tabs = document.querySelectorAll('.auth-tab');
        const loginForm = document.getElementById('login-form');
        const registerForm = document.getElementById('register-form');

        tabs.forEach(tab => {
            tab.addEventListener('click', function() {
                const tabType = this.dataset.tab;
                
                // 更新標籤狀態
                tabs.forEach(t => t.classList.remove('active'));
                this.classList.add('active');
                
                // 切換表單
                if (tabType === 'login') {
                    if (loginForm) loginForm.style.display = 'block';
                    if (registerForm) registerForm.style.display = 'none';
                } else {
                    if (loginForm) loginForm.style.display = 'none';
                    if (registerForm) registerForm.style.display = 'block';
                }
            });
        });
    }

    setupPasswordToggle() {
        const toggleBtns = document.querySelectorAll('.auth-toggle-password');
        
        toggleBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                const input = this.parentElement.querySelector('input');
                const icon = this.querySelector('i');
                
                if (input && icon) {
                    if (input.type === 'password') {
                        input.type = 'text';
                        icon.classList.remove('fa-eye-slash');
                        icon.classList.add('fa-eye');
                    } else {
                        input.type = 'password';
                        icon.classList.remove('fa-eye');
                        icon.classList.add('fa-eye-slash');
                    }
                }
            });
        });
    }

    setupFormSubmit() {
        const forms = document.querySelectorAll('.auth-form');
        
        forms.forEach(form => {
            form.addEventListener('submit', (e) => {
                e.preventDefault();
                this.handleFormSubmit(form);
            });
        });

        // 第三方登入按鈕
        const socialBtns = document.querySelectorAll('.auth-social-btn');
        socialBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                const provider = btn.classList.contains('google') ? 'Google' : 
                                btn.classList.contains('facebook') ? 'Facebook' : 'Apple';
                this.handleSocialLogin(provider);
            });
        });
    }

    handleFormSubmit(form) {
        const formData = new FormData(form);
        const isLogin = form.closest('#login-form') !== null;
        
        // 簡單驗證
        const phoneInput = form.querySelector('.auth-phone-input');
        const passwordInput = form.querySelector('input[type="password"], input[type="text"]');
        
        if (phoneInput && !phoneInput.value) {
            alert('請輸入電話號碼');
            phoneInput.focus();
            return;
        }
        
        if (passwordInput && !passwordInput.value) {
            alert('請輸入密碼');
            passwordInput.focus();
            return;
        }
        
        if (!isLogin) {
            const agreeTerms = form.querySelector('#agree-terms');
            if (!agreeTerms.checked) {
                alert('請同意服務條款');
                return;
            }
        }

        // 這裡應該發送到後端 API
        console.log('表單提交:', {
            type: isLogin ? '登入' : '註冊',
            data: Object.fromEntries(formData)
        });

        // 模擬成功
        alert(isLogin ? '登入成功！' : '註冊成功！');
        this.close();
    }

    handleSocialLogin(provider) {
        console.log(`使用 ${provider} 登入`);
        alert(`${provider} 登入功能尚未實現`);
    }

    open() {
        if (this.modal) {
            this.modal.classList.add('active');
            document.body.style.overflow = 'hidden';
            this.isOpen = true;
            console.log('Auth modal opened');
        }
    }

    close() {
        if (this.modal) {
            this.modal.classList.remove('active');
            document.body.style.overflow = '';
            this.isOpen = false;
            console.log('Auth modal closed');
        }
    }
}

// 創建全局實例
window.authModal = new AuthModal();
