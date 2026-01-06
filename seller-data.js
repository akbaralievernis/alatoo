// База данных продавцов (в реальности - на сервере)
const sellers = [
    {
        id: 1,
        username: "apple_center",
        password: "apple123",
        name: "Apple Center Osh",
        phone: "+996 701 111 111",
        email: "apple@example.com",
        description: "Официальный дилер Apple в Оше",
        logo: "/sellers/apple-center.jpg",
        products: [1, 2, 3, 4, 5, 6, 7, 8, 9] // ID товаров
    },
    {
        id: 2,
        username: "samsung_kg",
        password: "samsung123",
        name: "Samsung Store KG",
        phone: "+996 701 222 222",
        email: "samsung@example.com",
        description: "Сертифицированный магазин Samsung",
        logo: "/sellers/samsung-store.jpg",
        products: [10, 11, 12, 13, 14, 15, 16, 17, 18]
    },
    {
        id: 3,
        username: "xiaomi_kg",
        password: "xiaomi123",
        name: "Xiaomi Official KG",
        phone: "+996 701 333 333",
        email: "xiaomi@example.com",
        description: "Официальный дистрибьютор Xiaomi",
        logo: "/sellers/xiaomi-store.jpg",
        products: [19, 20, 21, 22, 23, 24, 25, 26, 27]
    }
];

// Функция для получения ID продавца из URL
function getSellerIdFromURL() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('seller') || 1; // По умолчанию первый продавец
}

// Проверка авторизации
function checkSellerAuth() {
    const currentSeller = JSON.parse(localStorage.getItem('currentSeller') || "{}");
    
    // Если на странице админки и пользователь не авторизован, перенаправляем на страницу входа
    if ((window.location.href.includes('seller-dashboard.html') || 
         window.location.href.includes('seller-products.html') || 
         window.location.href.includes('seller-orders.html')) && 
        !currentSeller.id) {
        window.location.href = 'admin.html';
        return false;
    }
    
    return currentSeller.id ? currentSeller : null;
}

// Получение товаров продавца
function getSellerProducts(sellerId) {
    const seller = sellers.find(s => s.id === sellerId);
    if (!seller) return {};
    
    const sellerProductsKey = `seller_${sellerId}_products`;
    const storedProducts = JSON.parse(localStorage.getItem(sellerProductsKey) || "{}");
    
    // Если есть сохраненные товары, возвращаем их
    if (Object.keys(storedProducts).length > 0) {
        return storedProducts;
    }
    
    // Иначе создаем из стандартных товаров
    const allProducts = uiManager ? uiManager.productsData : {};
    const filteredProducts = {};
    
    seller.products.forEach(productId => {
        if (allProducts[productId]) {
            filteredProducts[productId] = allProducts[productId];
        }
    });
    
    // Сохраняем в localStorage
    localStorage.setItem(sellerProductsKey, JSON.stringify(filteredProducts));
    
    return filteredProducts;
}

// Обновление статистики продавца
function updateSellerStats(sellerId) {
    const products = getSellerProducts(sellerId);
    const ordersKey = `seller_${sellerId}_orders`;
    const orders = JSON.parse(localStorage.getItem(ordersKey) || "[]");
    
    // Подсчет доходов
    let revenue = 0;
    let completedOrders = 0;
    
    orders.forEach(order => {
        if (order.status === 'completed') {
            revenue += order.amount || 0;
            completedOrders++;
        }
    });
    
    // Возвращаем статистику
    return {
        products: Object.keys(products).length,
        orders: orders.length,
        completedOrders: completedOrders,
        revenue: revenue,
        // Простая статистика просмотров (случайная для демо)
        views: Math.floor(Math.random() * 1000) + 500
    };
}

// Создание тестовых заказов для продавца
function createDemoOrders(sellerId) {
    const ordersKey = `seller_${sellerId}_orders`;
    let orders = JSON.parse(localStorage.getItem(ordersKey) || "[]");
    
    if (orders.length === 0) {
        // Создаем тестовые заказы
        orders = [
            {
                id: 1,
                date: '2024-12-01',
                productName: 'iPhone 15 Pro',
                customer: 'Айдар А.',
                phone: '+996 555 111 111',
                address: 'Ош, ул. Ленина, 45',
                amount: 149990,
                status: 'completed',
                sellerId: sellerId
            },
            {
                id: 2,
                date: '2024-12-02',
                productName: 'Samsung S24 Ultra',
                customer: 'Мария К.',
                phone: '+996 555 222 222',
                address: 'Ош, ул. Кирова, 12',
                amount: 124990,
                status: 'pending',
                sellerId: sellerId
            },
            {
                id: 3,
                date: '2024-12-03',
                productName: 'Xiaomi 17 Pro Max',
                customer: 'Бектур С.',
                phone: '+996 555 333 333',
                address: 'Ош, ул. Московская, 8',
                amount: 96990,
                status: 'processing',
                sellerId: sellerId
            }
        ];
        
        localStorage.setItem(ordersKey, JSON.stringify(orders));
    }
    
    return orders;
}

// Добавление нового заказа
function addNewOrder(sellerId, orderData) {
    const ordersKey = `seller_${sellerId}_orders`;
    const orders = JSON.parse(localStorage.getItem(ordersKey) || "[]");
    
    // Создаем новый заказ
    const newOrder = {
        id: Date.now(),
        date: new Date().toISOString().split('T')[0],
        ...orderData,
        sellerId: sellerId,
        status: 'pending'
    };
    
    orders.push(newOrder);
    localStorage.setItem(ordersKey, JSON.stringify(orders));
    
    return newOrder;
}

// Обновление статуса заказа
function updateOrderStatus(sellerId, orderId, newStatus) {
    const ordersKey = `seller_${sellerId}_orders`;
    const orders = JSON.parse(localStorage.getItem(ordersKey) || "[]");
    
    const orderIndex = orders.findIndex(o => o.id === orderId);
    if (orderIndex !== -1) {
        orders[orderIndex].status = newStatus;
        localStorage.setItem(ordersKey, JSON.stringify(orders));
        return true;
    }
    
    return false;
}

// Получение всех заказов продавца
function getSellerOrders(sellerId) {
    const ordersKey = `seller_${sellerId}_orders`;
    return JSON.parse(localStorage.getItem(ordersKey) || "[]");
}

// Регистрация нового продавца (простая версия)
function registerNewSeller(sellerData) {
    // Простая валидация
    if (sellers.find(s => s.username === sellerData.username)) {
        return { success: false, message: 'Этот логин уже занят!' };
    }
    
    // Создаем нового продавца
    const newSeller = {
        id: sellers.length + 1,
        username: sellerData.username,
        password: sellerData.password,
        name: sellerData.storeName || 'Новый магазин',
        email: sellerData.email || '',
        phone: sellerData.phone || '',
        description: sellerData.description || 'Новый магазин мобильной техники',
        logo: sellerData.logo || '/sellers/default.jpg',
        products: []
    };
    
    // Добавляем в массив продавцов
    sellers.push(newSeller);
    
    // В реальном приложении здесь был бы запрос на сервер
    return { 
        success: true, 
        message: 'Регистрация успешна! Теперь вы можете войти.',
        seller: newSeller 
    };
}

// Экспорт функций для использования в других файлах
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        sellers,
        getSellerIdFromURL,
        checkSellerAuth,
        getSellerProducts,
        updateSellerStats,
        createDemoOrders,
        addNewOrder,
        updateOrderStatus,
        getSellerOrders,
        registerNewSeller
    };
}