// ===== DADOS DOS PRODUTOS =====
const products = [
    {
        id: 1,
        name: 'Relógio Elegante',
        category: 'Acessórios',
        price: 1299.90,
        description: 'Relógio de pulso em aço inoxidável com movimento suíço de precisão.',
        image: 'https://images.unsplash.com/photo-1523170335258-f5ed11844a49?w=500&h=500&fit=crop'
    },
    {
        id: 2,
        name: 'Óculos de Sol Premium',
        category: 'Acessórios',
        price: 899.90,
        description: 'Óculos com lentes polarizadas e armação em titânio.',
        image: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=500&h=500&fit=crop'
    },
    {
        id: 3,
        name: 'Bolsa de Couro',
        category: 'Bolsas',
        price: 2499.90,
        description: 'Bolsa artesanal em couro genuíno italiano com acabamento premium.',
        image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=500&h=500&fit=crop'
    },
    {
        id: 4,
        name: 'Sapato Executivo',
        category: 'Calçados',
        price: 1599.90,
        description: 'Sapato social em couro legítimo com solado de borracha natural.',
        image: 'https://images.unsplash.com/photo-1543163521-9efcc06814ee?w=500&h=500&fit=crop'
    },
    {
        id: 5,
        name: 'Cinto de Couro',
        category: 'Acessórios',
        price: 599.90,
        description: 'Cinto em couro premium com fivela em ouro 18k.',
        image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500&h=500&fit=crop'
    },
    {
        id: 6,
        name: 'Carteira Minimalista',
        category: 'Bolsas',
        price: 799.90,
        description: 'Carteira slim em couro com RFID protection.',
        image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=500&h=500&fit=crop'
    },
    {
        id: 7,
        name: 'Jaqueta de Couro',
        category: 'Vestuário',
        price: 3499.90,
        description: 'Jaqueta em couro genuíno com forro de seda.',
        image: 'https://images.unsplash.com/photo-1551028719-00167b16ebc5?w=500&h=500&fit=crop'
    },
    {
        id: 8,
        name: 'Lenço de Seda',
        category: 'Acessórios',
        price: 449.90,
        description: 'Lenço 100% seda com padrão geométrico exclusivo.',
        image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=500&h=500&fit=crop'
    }
];

// ===== ESTADO DO CARRINHO =====
let cart = [];

// ===== ELEMENTOS DO DOM =====
const productsGrid = document.getElementById('productsGrid');
const cartToggle = document.getElementById('cartToggle');
const cartSidebar = document.getElementById('cartSidebar');
const cartOverlay = document.getElementById('cartOverlay');
const closeCart = document.getElementById('closeCart');
const cartItems = document.getElementById('cartItems');
const cartCount = document.getElementById('cartCount');
const totalPrice = document.getElementById('totalPrice');

// ===== INICIALIZAÇÃO =====
document.addEventListener('DOMContentLoaded', () => {
    renderProducts();
    loadCartFromStorage();
    setupEventListeners();
});

// ===== RENDERIZAR PRODUTOS =====
function renderProducts() {
    productsGrid.innerHTML = '';
    
    products.forEach(product => {
        const card = document.createElement('div');
        card.className = 'product-card';
        card.innerHTML = `
            <img src="${product.image}" alt="${product.name}" class="product-image">
            <div class="product-info">
                <div>
                    <p class="product-category">${product.category}</p>
                    <h3 class="product-name">${product.name}</h3>
                    <p class="product-description">${product.description}</p>
                </div>
                <div class="product-footer">
                    <span class="product-price">R$ ${formatPrice(product.price)}</span>
                    <button class="add-to-cart-btn" onclick="addToCart(${product.id})">
                        Adicionar
                    </button>
                </div>
            </div>
        `;
        productsGrid.appendChild(card);
    });
}

// ===== ADICIONAR AO CARRINHO =====
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    const existingItem = cart.find(item => item.id === productId);

    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({
            ...product,
            quantity: 1
        });
    }

    saveCartToStorage();
    renderCart();
    updateCartCount();
    showCartNotification();
}

// ===== REMOVER DO CARRINHO =====
function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    saveCartToStorage();
    renderCart();
    updateCartCount();
}

// ===== ATUALIZAR QUANTIDADE =====
function updateQuantity(productId, change) {
    const item = cart.find(item => item.id === productId);
    
    if (item) {
        item.quantity += change;
        
        if (item.quantity <= 0) {
            removeFromCart(productId);
        } else {
            saveCartToStorage();
            renderCart();
            updateCartCount();
        }
    }
}

// ===== RENDERIZAR CARRINHO =====
function renderCart() {
    cartItems.innerHTML = '';

    if (cart.length === 0) {
        cartItems.innerHTML = `
            <div class="empty-cart">
                <div class="empty-cart-icon">🛍</div>
                <p>Seu carrinho está vazio</p>
            </div>
        `;
        totalPrice.textContent = 'R$ 0,00';
        return;
    }

    let total = 0;

    cart.forEach(item => {
        total += item.price * item.quantity;
        
        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';
        cartItem.innerHTML = `
            <img src="${item.image}" alt="${item.name}" class="cart-item-image">
            <div class="cart-item-details">
                <div class="cart-item-name">${item.name}</div>
                <div class="cart-item-price">R$ ${formatPrice(item.price)}</div>
                <div class="cart-item-controls">
                    <button class="quantity-btn" onclick="updateQuantity(${item.id}, -1)">−</button>
                    <span class="quantity-display">${item.quantity}</span>
                    <button class="quantity-btn" onclick="updateQuantity(${item.id}, 1)">+</button>
                    <button class="remove-btn" onclick="removeFromCart(${item.id})">✕</button>
                </div>
            </div>
        `;
        cartItems.appendChild(cartItem);
    });

    totalPrice.textContent = `R$ ${formatPrice(total)}`;
}

// ===== ATUALIZAR CONTADOR DO CARRINHO =====
function updateCartCount() {
    const count = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.textContent = count;
}

// ===== CONFIGURAR EVENT LISTENERS =====
function setupEventListeners() {
    cartToggle.addEventListener('click', openCart);
    closeCart.addEventListener('click', closeCartSidebar);
    cartOverlay.addEventListener('click', closeCartSidebar);

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeCartSidebar();
        }
    });
}

// ===== ABRIR CARRINHO =====
function openCart() {
    cartSidebar.classList.add('active');
    cartOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
}

// ===== FECHAR CARRINHO =====
function closeCartSidebar() {
    cartSidebar.classList.remove('active');
    cartOverlay.classList.remove('active');
    document.body.style.overflow = 'auto';
}

// ===== NOTIFICAÇÃO DE ADIÇÃO =====
function showCartNotification() {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 2rem;
        right: 2rem;
        background-color: #0a0a0a;
        color: #ffffff;
        padding: 1rem 1.5rem;
        border-radius: 4px;
        font-weight: 600;
        z-index: 300;
        animation: slideInRight 0.3s ease-out;
    `;
    notification.textContent = '✓ Produto adicionado ao carrinho';
    document.body.appendChild(notification);

    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease-out';
        setTimeout(() => notification.remove(), 300);
    }, 2000);
}

// ===== FORMATAR PREÇO =====
function formatPrice(price) {
    return price.toLocaleString('pt-BR', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    });
}

// ===== ARMAZENAMENTO LOCAL =====
function saveCartToStorage() {
    localStorage.setItem('luxeCart', JSON.stringify(cart));
}

function loadCartFromStorage() {
    const saved = localStorage.getItem('luxeCart');
    if (saved) {
        cart = JSON.parse(saved);
        renderCart();
        updateCartCount();
    }
}

// ===== ANIMAÇÕES CSS DINÂMICAS =====
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            opacity: 0;
            transform: translateX(100px);
        }
        to {
            opacity: 1;
            transform: translateX(0);
        }
    }

    @keyframes slideOutRight {
        from {
            opacity: 1;
            transform: translateX(0);
        }
        to {
            opacity: 0;
            transform: translateX(100px);
        }
    }
`;
document.head.appendChild(style);
