// メンバーカラーとグラデーションの定義
const memberColors = {
    yousuke: { color: '#4db56a', gradient: 'linear-gradient(135deg, #4db56a, #2b5876)' },
    kuro: { color: '#B1063A', gradient: 'linear-gradient(135deg, #B1063A, #2b5876)' },
    kotaro: { color: '#ff8c00', gradient: 'linear-gradient(135deg, #ff8c00, #2b5876)' },
    rui: { color: '#D69ABB', gradient: 'linear-gradient(135deg, #D69ABB, #2b5876)' },
    minato: { color: '#235bc8', gradient: 'linear-gradient(135deg, #235bc8, #2b5876)' }
};

// ペンライトカーソルエフェクト
class PenlightCursor {
    constructor() {
        this.cursor = document.createElement('div');
        this.cursor.className = 'penlight-cursor';
        document.body.appendChild(this.cursor);
        
        this.glow = document.createElement('div');
        this.glow.className = 'penlight-glow';
        document.body.appendChild(this.glow);
        
        this.init();
    }
    
    init() {
        document.addEventListener('mousemove', (e) => {
            requestAnimationFrame(() => {
                this.cursor.style.left = e.clientX + 'px';
                this.cursor.style.top = e.clientY + 'px';
                this.glow.style.left = e.clientX + 'px';
                this.glow.style.top = e.clientY + 'px';
            });
        });
    }
    
    setColor(color) {
        this.cursor.style.backgroundColor = color;
        this.glow.style.boxShadow = `0 0 20px 10px ${color}`;
    }
}

// パララックススクロール効果
document.addEventListener('scroll', () => {
    const parallaxElements = document.querySelectorAll('.parallax');
    parallaxElements.forEach(element => {
        const speed = element.dataset.speed || 0.5;
        const yPos = -(window.pageYOffset * speed);
        element.style.transform = `translateY(${yPos}px)`;
    });
});

// 3Dフォトギャラリー
class PhotoGallery3D {
    constructor(container) {
        this.container = container;
        this.photos = container.querySelectorAll('.gallery-item');
        this.init();
    }
    
    init() {
        this.photos.forEach(photo => {
            photo.addEventListener('mousemove', (e) => {
                const rect = photo.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                const rotateX = (y / rect.height - 0.5) * 30;
                const rotateY = -(x / rect.width - 0.5) * 30;
                
                photo.style.transform = `
                    perspective(1000px)
                    rotateX(${rotateX}deg)
                    rotateY(${rotateY}deg)
                    scale3d(1.05, 1.05, 1.05)
                `;
            });
            
            photo.addEventListener('mouseleave', () => {
                photo.style.transform = 'none';
            });
        });
    }
}

// デジタルスタンプラリー
class StampRally {
    constructor() {
        this.stamps = new Set();
        this.loadStamps();
    }
    
    loadStamps() {
        const saved = localStorage.getItem('qcanvas-stamps');
        if (saved) {
            this.stamps = new Set(JSON.parse(saved));
            this.updateUI();
        }
    }
    
    collectStamp(stampId) {
        this.stamps.add(stampId);
        localStorage.setItem('qcanvas-stamps', JSON.stringify([...this.stamps]));
        this.updateUI();
    }
    
    updateUI() {
        const stampElements = document.querySelectorAll('.stamp-item');
        stampElements.forEach(element => {
            const stampId = element.dataset.stampId;
            if (this.stamps.has(stampId)) {
                element.classList.add('collected');
            }
        });
    }
}

// グローバルインスタンス
window.penlightCursor = new PenlightCursor();
window.stampRally = new StampRally();

// 初期化
document.addEventListener('DOMContentLoaded', () => {
    // 3Dフォトギャラリーの初期化
    const galleryContainer = document.querySelector('.gallery-container');
    if (galleryContainer) {
        new PhotoGallery3D(galleryContainer);
    }
    
    // メンバーカラーエフェクトの初期化
    const memberElements = document.querySelectorAll('[data-member]');
    memberElements.forEach(element => {
        element.addEventListener('mouseenter', () => {
            const member = element.dataset.member;
            if (memberColors[member]) {
                document.body.style.background = memberColors[member].gradient;
            }
        });
        
        element.addEventListener('mouseleave', () => {
            document.body.style.background = 'linear-gradient(135deg, #2b5876, #4e4376)';
        });
    });
});
