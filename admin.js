// Основной файл для админ-панели продавцов

// Глобальные переменные
let currentSeller = null;
let allProducts = {};
let sellerProducts = {};

// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', function() {
    // Проверяем авторизацию
    if (typeof checkSellerAuth === 'function') {
        const seller = checkSellerAuth();
        if (seller) {
            currentSeller = seller;
            initializeAdminPanel();
        } else if (!window.location.href.includes('admin.html')) {
            window.location.href = 'admin.html';
        }
    }
    
    // Инициализация для страницы входа
    if (window.location.href.includes('admin.html')) {
        initializeLoginPage();
    }
});

// Инициализация страницы входа
function initializeLoginPage() {
    // Устанавливаем текущую дату
    updateCurrentDate();
    
    // Обработка нажатия Enter в полях ввода
    document.getElementById('username')?.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') sellerLogin();
    });
    
    document.getElementById('password')?.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') sellerLogin();
    });
}

// Инициализация админ-панели
function initializeAdminPanel() {
    if (!currentSeller) return;
    
    // Загружаем данные продавца
    loadSellerData();
    
    // Загружаем товары продавца
    loadProducts();
    
    // Загружаем заказы продавца
    loadOrders();
    
    // Обновляем дату
    updateCurrentDate();
    
    // Настраиваем обработчики событий
    setupEventListeners();
}

// Загрузка данных продавца
function loadSellerData() {
    if (!currentSeller) return;
    
    // Обновляем информацию в сайдбаре
    const sellerNameElement = document.getElementById('sellerName');
    const sellerEmailElement = document.getElementById('sellerEmail');
    const sellerLogoElement = document.getElementById('sellerLogo');
    
    if (sellerNameElement) sellerNameElement.textContent = currentSeller.name;
    if (sellerEmailElement) sellerEmailElement.textContent = currentSeller.email;
    if (sellerLogoElement && currentSeller.logo) {
        sellerLogoElement.src = currentSeller.logo;
    }
}

// Загрузка товаров продавца
function loadProducts() {
    if (!currentSeller) return;
    
    if (typeof getSellerProducts === 'function') {
        sellerProducts = getSellerProducts(currentSeller.id);
        renderProducts();
        updateProductsSummary();
    }
}

// Отображение товаров
function renderProducts() {
    const productsList = document.getElementById('productsList');
    const emptyState = document.getElementById('emptyProducts');
    
    if (!productsList) return;
    
    productsList.innerHTML = '';
    
    const products = Object.values(sellerProducts);
    
    if (products.length === 0) {
        if (emptyState) emptyState.style.display = 'block';
        return;
    }
    
    if (emptyState) emptyState.style.display = 'none';
    
    products.forEach(product => {
        const productCard = createProductCard(product);
        productsList.innerHTML += productCard;
    });
}

// Создание карточки товара
function createProductCard(product) {
    return `
        <div class="product-admin-card" data-id="${product.id}" data-category="${product.category || 'other'}">
            <div class="product-admin-image">
                <img src="${product.images?.[0] || '/products/default.jpg'}" alt="${product.name}">
            </div>
            
            <div class="product-admin-info">
                <h3>${product.name}</h3>
                <p>${(product.description || '').substring(0, 100)}...</p>
                <div class="product-price">${(product.basePrice || 0).toLocaleString()} сом</div>
            </div>
            
            <div class="product-admin-actions">
                <button class="btn btn-sm btn-outline" onclick="editProduct(${product.id})">
                    <i class="fas fa-edit"></i> Редактировать
                </button>
                <button class="btn btn-sm btn-danger" onclick="deleteProduct(${product.id})">
                    <i class="fas fa-trash"></i> Удалить
                </button>
            </div>
        </div>
    `;
}

// Обновление сводки товаров
function updateProductsSummary() {
    const summaryElement = document.getElementById('productsSummaryText');
    if (!summaryElement) return;
    
    const count = Object.keys(sellerProducts).length;
    summaryElement.textContent = `Найдено товаров: ${count}`;
    
    // Обновляем статистику на dashboard
    const productCountElement = document.getElementById('productCount');
    if (productCountElement) {
        productCountElement.textContent = count;
    }
}

// Фильтрация товаров
function filterProducts() {
    const searchTerm = document.getElementById('productSearch')?.value.toLowerCase() || '';
    const categoryFilter = document.getElementById('productCategory')?.value || 'all';
    
    const filtered = Object.values(sellerProducts).filter(product => {
        const matchesSearch = product.name.toLowerCase().includes(searchTerm) || 
                            (product.description || '').toLowerCase().includes(searchTerm);
        
        const matchesCategory = categoryFilter === 'all' || 
                              (product.category || 'other') === categoryFilter;
        
        return matchesSearch && matchesCategory;
    });
    
    renderFilteredProducts(filtered);
}

// Отображение отфильтрованных товаров
function renderFilteredProducts(products) {
    const productsList = document.getElementById('productsList');
    const emptyState = document.getElementById('emptyProducts');
    
    if (!productsList) return;
    
    productsList.innerHTML = '';
    
    if (products.length === 0) {
        if (emptyState) emptyState.style.display = 'block';
        
        // Обновляем сводку
        const summaryElement = document.getElementById('productsSummaryText');
        if (summaryElement) {
            summaryElement.textContent = 'Товары не найдены';
        }
        return;
    }
    
    if (emptyState) emptyState.style.display = 'none';
    
    products.forEach(product => {
        const productCard = createProductCard(product);
        productsList.innerHTML += productCard;
    });
    
    // Обновляем сводку
    const summaryElement = document.getElementById('productsSummaryText');
    if (summaryElement) {
        summaryElement.textContent = `Найдено товаров: ${products.length}`;
    }
}

// Сортировка товаров
function sortProducts() {
    const sortBy = document.getElementById('productSort')?.value || 'newest';
    const products = Object.values(sellerProducts);
    
    products.sort((a, b) => {
        switch (sortBy) {
            case 'price_asc':
                return (a.basePrice || 0) - (b.basePrice || 0);
            case 'price_desc':
                return (b.basePrice || 0) - (a.basePrice || 0);
            case 'name':
                return a.name.localeCompare(b.name);
            default: // newest
                return (b.id || 0) - (a.id || 0);
        }
    });
    
    renderFilteredProducts(products);
}

// Добавление нового товара
function addNewProduct() {
    if (!currentSeller) {
        alert('Ошибка: продавец не авторизован');
        return;
    }
    
    // Собираем данные из формы
    const productData = {
        id: Date.now(),
        name: document.getElementById('productName').value,
        category: document.getElementById('productCategorySelect').value,
        basePrice: parseInt(document.getElementById('productPrice').value) || 0,
        oldPrice: parseInt(document.getElementById('productOldPrice').value) || null,
        description: document.getElementById('productDescription').value,
        specs: tryParseJSON(document.getElementById('productSpecs').value) || {},
        colors: document.getElementById('productColors').value.split(',').map(c => c.trim()).filter(c => c),
        storage: document.getElementById('productStorage').value.split(',').map(s => s.trim()).filter(s => s),
        images: document.getElementById('productImages').value.split(',').map(url => url.trim()).filter(url => url),
        rating: 4.0,
        reviews: 0,
        createdAt: new Date().toISOString()
    };
    
    // Валидация
    if (!productData.name || !productData.basePrice || !productData.description || productData.images.length === 0) {
        alert('Пожалуйста, заполните все обязательные поля (*)');
        return;
    }
    
    // Сохраняем товар
    const sellerProductsKey = `seller_${currentSeller.id}_products`;
    sellerProducts[productData.id] = productData;
    localStorage.setItem(sellerProductsKey, JSON.stringify(sellerProducts));
    
    // Обновляем отображение
    renderProducts();
    updateProductsSummary();
    
    // Закрываем модальное окно и очищаем форму
    closeModal('addProductModal');
    clearProductForm();
    
    // Показываем уведомление
    showNotification('Товар успешно добавлен!');
}

// Редактирование товара
function editProduct(productId) {
    const product = sellerProducts[productId];
    if (!product) return;
    
    // Заполняем форму редактирования
    document.getElementById('editProductId').value = productId;
    document.getElementById('editProductName').value = product.name;
    document.getElementById('editProductCategory').value = product.category || 'other';
    document.getElementById('editProductPrice').value = product.basePrice || 0;
    document.getElementById('editProductOldPrice').value = product.oldPrice || '';
    document.getElementById('editProductDescription').value = product.description || '';
    document.getElementById('editProductSpecs').value = JSON.stringify(product.specs || {}, null, 2);
    document.getElementById('editProductColors').value = (product.colors || []).join(', ');
    document.getElementById('editProductStorage').value = (product.storage || []).join(', ');
    document.getElementById('editProductImages').value = (product.images || []).join(', ');
    
    // Показываем модальное окно
    showModal('editProductModal');
}

// Обновление товара
function updateProduct() {
    const productId = document.getElementById('editProductId').value;
    if (!productId || !currentSeller) return;
    
    // Собираем обновленные данные
    const updatedData = {
        name: document.getElementById('editProductName').value,
        category: document.getElementById('editProductCategory').value,
        basePrice: parseInt(document.getElementById('editProductPrice').value) || 0,
        oldPrice: parseInt(document.getElementById('editProductOldPrice').value) || null,
        description: document.getElementById('editProductDescription').value,
        specs: tryParseJSON(document.getElementById('editProductSpecs').value) || {},
        colors: document.getElementById('editProductColors').value.split(',').map(c => c.trim()).filter(c => c),
        storage: document.getElementById('editProductStorage').value.split(',').map(s => s.trim()).filter(s => s),
        images: document.getElementById('editProductImages').value.split(',').map(url => url.trim()).filter(url => url)
    };
    
    // Валидация
    if (!updatedData.name || !updatedData.basePrice || !updatedData.description || updatedData.images.length === 0) {
        alert('Пожалуйста, заполните все обязательные поля (*)');
        return;
    }
    
    // Обновляем товар
    sellerProducts[productId] = {
        ...sellerProducts[productId],
        ...updatedData
    };
    
    // Сохраняем
    const sellerProductsKey = `seller_${currentSeller.id}_products`;
    localStorage.setItem(sellerProductsKey, JSON.stringify(sellerProducts));
    
    // Обновляем отображение
    renderProducts();
    
    // Закрываем модальное окно
    closeModal('editProductModal');
    
    // Показываем уведомление
    showNotification('Товар успешно обновлен!');
}

// Удаление товара
function deleteProduct(productId) {
    if (!confirm('Вы уверены, что хотите удалить этот товар?')) return;
    
    if (!currentSeller) return;
    
    // Удаляем товар
    delete sellerProducts[productId];
    
    // Сохраняем изменения
    const sellerProductsKey = `seller_${currentSeller.id}_products`;
    localStorage.setItem(sellerProductsKey, JSON.stringify(sellerProducts));
    
    // Обновляем отображение
    renderProducts();
    updateProductsSummary();
    
    // Показываем уведомление
    showNotification('Товар удален!');
}

// Загрузка заказов
function loadOrders() {
    if (!currentSeller) return;
    
    if (typeof getSellerOrders === 'function') {
        const orders = getSellerOrders(currentSeller.id);
        renderOrders(orders);
        updateOrdersSummary(orders);
        
        // Обновляем статистику на dashboard
        updateDashboardOrders(orders);
    }
}

// Отображение заказов
function renderOrders(orders) {
    const ordersList = document.getElementById('ordersList');
    const emptyState = document.getElementById('emptyOrders');
    
    if (!ordersList) return;
    
    ordersList.innerHTML = '';
    
    if (orders.length === 0) {
        if (emptyState) emptyState.style.display = 'block';
        return;
    }
    
    if (emptyState) emptyState.style.display = 'none';
    
    orders.forEach(order => {
        const orderCard = createOrderCard(order);
        ordersList.innerHTML += orderCard;
    });
}

// Создание карточки заказа
function createOrderCard(order) {
    const statusColors = {
        pending: 'warning',
        processing: 'info',
        completed: 'success',
        cancelled: 'danger'
    };
    
    const statusText = {
        pending: 'В ожидании',
        processing: 'В обработке',
        completed: 'Выполнен',
        cancelled: 'Отменен'
    };
    
    return `
        <div class="order-card" data-id="${order.id}" data-status="${order.status}">
            <div class="order-info">
                <h3>Заказ #${order.id}</h3>
                <p><strong>${order.productName || 'Товар'}</strong></p>
                <p>Клиент: ${order.customer || 'Не указан'}</p>
                <p>Дата: ${order.date || 'Не указана'}</p>
            </div>
            
            <div class="order-details">
                <div class="order-amount">
                    <strong>${(order.amount || 0).toLocaleString()} сом</strong>
                </div>
                <div class="order-status">
                    <span class="status-badge status-${order.status}">
                        ${statusText[order.status] || order.status}
                    </span>
                </div>
            </div>
            
            <div class="order-actions">
                <button class="btn btn-sm btn-outline" onclick="viewOrderDetails(${order.id})">
                    <i class="fas fa-eye"></i> Подробнее
                </button>
                <button class="btn btn-sm btn-primary" onclick="updateOrderStatus(${order.id}, 'processing')">
                    <i class="fas fa-cog"></i> В обработку
                </button>
            </div>
        </div>
    `;
}

// Просмотр деталей заказа
function viewOrderDetails(orderId) {
    if (!currentSeller) return;
    
    const orders = getSellerOrders(currentSeller.id);
    const order = orders.find(o => o.id === orderId);
    
    if (!order) return;
    
    // Заполняем форму деталей
    document.getElementById('detailOrderId').textContent = order.id;
    document.getElementById('detailOrderDate').textContent = order.date;
    document.getElementById('detailProductName').textContent = order.productName || 'Не указан';
    document.getElementById('detailCustomer').textContent = order.customer || 'Не указан';
    document.getElementById('detailPhone').textContent = order.phone || 'Не указан';
    document.getElementById('detailAddress').textContent = order.address || 'Не указан';
    document.getElementById('detailAmount').textContent = (order.amount || 0).toLocaleString() + ' сом';
    document.getElementById('detailStatus').value = order.status;
    document.getElementById('detailOrderIdInput').value = order.id;
    
    // Показываем модальное окно
    showModal('orderDetailsModal');
}

// Обновление статуса заказа
function updateOrderStatus(orderId, newStatus) {
    if (!currentSeller) return;
    
    if (typeof updateOrderStatus === 'function') {
        const success = window.updateOrderStatus(currentSeller.id, orderId, newStatus);
        if (success) {
            // Перезагружаем заказы
            loadOrders();
            showNotification('Статус заказа обновлен!');
        }
    }
}

// Обновление сводки заказов
function updateOrdersSummary(orders) {
    const totalOrders = orders.length;
    const pendingOrders = orders.filter(o => o.status === 'pending').length;
    const processingOrders = orders.filter(o => o.status === 'processing').length;
    const completedOrders = orders.filter(o => o.status === 'completed').length;
    
    // Обновляем элементы на странице заказов
    const totalElement = document.getElementById('totalOrders');
    const pendingElement = document.getElementById('pendingOrders');
    const processingElement = document.getElementById('processingOrders');
    const completedElement = document.getElementById('completedOrders');
    
    if (totalElement) totalElement.textContent = totalOrders;
    if (pendingElement) pendingElement.textContent = pendingOrders;
    if (processingElement) processingElement.textContent = processingOrders;
    if (completedElement) completedElement.textContent = completedOrders;
}

// Обновление заказов на dashboard
function updateDashboardOrders(orders) {
    const recentOrdersTable = document.getElementById('recentOrdersTable');
    if (!recentOrdersTable) return;
    
    // Берем последние 5 заказов
    const recentOrders = orders.slice(0, 5);
    
    recentOrdersTable.innerHTML = '';
    
    recentOrders.forEach(order => {
        const row = createOrderTableRow(order);
        recentOrdersTable.innerHTML += row;
    });
    
    // Обновляем статистику
    const orderCountElement = document.getElementById('orderCount');
    const revenueElement = document.getElementById('revenueCount');
    
    if (orderCountElement) {
        orderCountElement.textContent = orders.length;
    }
    
    if (revenueElement) {
        const revenue = orders
            .filter(o => o.status === 'completed')
            .reduce((sum, o) => sum + (o.amount || 0), 0);
        revenueElement.textContent = revenue.toLocaleString() + ' сом';
    }
}

// Создание строки таблицы заказов для dashboard
function createOrderTableRow(order) {
    const statusText = {
        pending: 'В ожидании',
        processing: 'В обработке',
        completed: 'Выполнен',
        cancelled: 'Отменен'
    };
    
    return `
        <tr>
            <td>#${order.id}</td>
            <td>${order.productName || 'Товар'}</td>
            <td>${order.customer || 'Не указан'}</td>
            <td>${(order.amount || 0).toLocaleString()} сом</td>
            <td><span class="status-badge status-${order.status}">${statusText[order.status] || order.status}</span></td>
            <td>
                <button class="btn btn-sm btn-outline" onclick="viewOrderDetails(${order.id})">
                    <i class="fas fa-eye"></i>
                </button>
            </td>
        </tr>
    `;
}

// Фильтрация заказов
function filterOrders() {
    if (!currentSeller) return;
    
    const orders = getSellerOrders(currentSeller.id);
    const searchTerm = document.getElementById('orderSearch')?.value.toLowerCase() || '';
    const statusFilter = document.getElementById('orderStatus')?.value || 'all';
    const dateFilter = document.getElementById('orderDate')?.value;
    
    const filtered = orders.filter(order => {
        const matchesSearch = 
            (order.customer || '').toLowerCase().includes(searchTerm) ||
            (order.productName || '').toLowerCase().includes(searchTerm) ||
            order.id.toString().includes(searchTerm);
        
        const matchesStatus = statusFilter === 'all' || order.status === statusFilter;
        const matchesDate = !dateFilter || order.date === dateFilter;
        
        return matchesSearch && matchesStatus && matchesDate;
    });
    
    renderOrders(filtered);
    updateOrdersSummary(filtered);
}

// Обновление текущей даты
function updateCurrentDate() {
    const dateElement = document.getElementById('currentDate');
    if (!dateElement) return;
    
    const now = new Date();
    const options = { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
    };
    
    dateElement.textContent = now.toLocaleDateString('ru-RU', options);
}

// Вход продавца
function sellerLogin() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    
    if (!username || !password) {
        showError('loginError', 'Пожалуйста, заполните все поля');
        return;
    }
    
    // Ищем продавца
    const seller = sellers.find(s => s.username === username && s.password === password);
    
    if (seller) {
        // Сохраняем текущего продавца
        localStorage.setItem('currentSeller', JSON.stringify(seller));
        
        // Перенаправляем в личный кабинет
        window.location.href = 'seller-dashboard.html';
    } else {
        showError('loginError', 'Неверный логин или пароль');
    }
}

// Регистрация нового продавца
function registerSeller() {
    const username = document.getElementById('registerUsername').value;
    const password = document.getElementById('registerPassword').value;
    const storeName = document.getElementById('registerStoreName').value;
    
    if (!username || !password || !storeName) {
        showError('registerError', 'Пожалуйста, заполните обязательные поля (*)');
        return;
    }
    
    if (typeof registerNewSeller === 'function') {
        const result = registerNewSeller({
            username: username,
            password: password,
            storeName: storeName,
            email: document.getElementById('registerEmail').value,
            phone: document.getElementById('registerPhone').value,
            description: document.getElementById('registerDescription').value
        });
        
        if (result.success) {
            alert(result.message);
            showLoginForm();
        } else {
            showError('registerError', result.message);
        }
    }
}

// Выход из системы
function sellerLogout() {
    localStorage.removeItem('currentSeller');
    window.location.href = 'admin.html';
}

// Обновление dashboard
function refreshDashboard() {
    if (!currentSeller) return;
    
    // Обновляем статистику
    if (typeof updateSellerStats === 'function') {
        const stats = updateSellerStats(currentSeller.id);
        
        const productCountElement = document.getElementById('productCount');
        const orderCountElement = document.getElementById('orderCount');
        const viewCountElement = document.getElementById('viewCount');
        const revenueElement = document.getElementById('revenueCount');
        
        if (productCountElement) productCountElement.textContent = stats.products || 0;
        if (orderCountElement) orderCountElement.textContent = stats.orders || 0;
        if (viewCountElement) viewCountElement.textContent = stats.views || 0;
        if (revenueElement) revenueElement.textContent = (stats.revenue || 0).toLocaleString() + ' сом';
    }
    
    // Перезагружаем заказы
    loadOrders();
    
    showNotification('Данные обновлены!');
}

// Обновление заказов
function refreshOrders() {
    loadOrders();
    showNotification('Заказы обновлены!');
}

// Показ формы входа
function showLoginForm() {
    document.getElementById('loginForm').style.display = 'block';
    document.getElementById('registerForm').style.display = 'none';
}

// Показ формы регистрации
function showRegisterForm() {
    document.getElementById('loginForm').style.display = 'none';
    document.getElementById('registerForm').style.display = 'block';
}

// Показ модального окна
function showModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = 'flex';
    }
}

// Закрытие модального окна
function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = 'none';
    }
}

// Показ настроек магазина
function showShopSettings() {
    if (!currentSeller) return;
    
    // Заполняем форму текущими данными
    document.getElementById('shopName').value = currentSeller.name || '';
    document.getElementById('shopDescription').value = currentSeller.description || '';
    document.getElementById('shopLogo').value = currentSeller.logo || '';
    document.getElementById('shopPhone').value = currentSeller.phone || '';
    document.getElementById('shopEmail').value = currentSeller.email || '';
    
    showModal('shopSettingsModal');
}

// Сохранение настроек магазина
function saveShopSettings() {
    if (!currentSeller) return;
    
    // Обновляем данные продавца
    currentSeller.name = document.getElementById('shopName').value;
    currentSeller.description = document.getElementById('shopDescription').value;
    currentSeller.logo = document.getElementById('shopLogo').value;
    currentSeller.phone = document.getElementById('shopPhone').value;
    currentSeller.email = document.getElementById('shopEmail').value;
    
    // Сохраняем в localStorage
    localStorage.setItem('currentSeller', JSON.stringify(currentSeller));
    
    // Обновляем отображение
    loadSellerData();
    
    // Закрываем модальное окно
    closeModal('shopSettingsModal');
    
    showNotification('Настройки магазина сохранены!');
}

// Показ настроек
function showSettings() {
    showModal('settingsModal');
}

// Смена пароля
function changePassword() {
    const newPassword = document.getElementById('newPassword').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    
    if (!newPassword || !confirmPassword) {
        alert('Пожалуйста, заполните все поля');
        return;
    }
    
    if (newPassword !== confirmPassword) {
        alert('Пароли не совпадают');
        return;
    }
    
    // В реальном приложении здесь был бы запрос на сервер
    currentSeller.password = newPassword;
    localStorage.setItem('currentSeller', JSON.stringify(currentSeller));
    
    closeModal('settingsModal');
    showNotification('Пароль успешно изменен!');
}

// Показ ошибки
function showError(elementId, message) {
    const errorElement = document.getElementById(elementId);
    if (errorElement) {
        errorElement.textContent = message;
        errorElement.style.display = 'block';
    }
}

// Показ уведомления
function showNotification(message) {
    // Создаем элемент уведомления
    const notification = document.createElement('div');
    notification.className = 'notification-item';
    notification.innerHTML = `
        <i class="fas fa-info-circle"></i>
        <span>${message}</span>
    `;
    
    // Добавляем в контейнер уведомлений
    const container = document.getElementById('notifications');
    if (container) {
        container.appendChild(notification);
        
        // Удаляем через 5 секунд
        setTimeout(() => {
            notification.remove();
        }, 5000);
    } else {
        // Если контейнера нет, показываем alert
        alert(message);
    }
}

// Очистка формы товара
function clearProductForm() {
    document.getElementById('productName').value = '';
    document.getElementById('productPrice').value = '';
    document.getElementById('productOldPrice').value = '';
    document.getElementById('productDescription').value = '';
    document.getElementById('productSpecs').value = '';
    document.getElementById('productColors').value = '';
    document.getElementById('productStorage').value = '';
    document.getElementById('productImages').value = '';
}

// Парсинг JSON с обработкой ошибок
function tryParseJSON(jsonString) {
    try {
        return JSON.parse(jsonString);
    } catch (e) {
        return null;
    }
}

// Настройка обработчиков событий
function setupEventListeners() {
    // Обработка параметров URL
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.has('action') && urlParams.get('action') === 'add') {
        showAddProductModal();
    }
}

// Показ модального окна добавления товара
function showAddProductModal() {
    showModal('addProductModal');
}

// Глобальные функции для inline обработчиков
window.sellerLogin = sellerLogin;
window.sellerLogout = sellerLogout;
window.registerSeller = registerSeller;
window.showLoginForm = showLoginForm;
window.showRegisterForm = showRegisterForm;
window.showAddProductModal = showAddProductModal;
window.closeModal = closeModal;
window.addNewProduct = addNewProduct;
window.editProduct = editProduct;
window.updateProduct = updateProduct;
window.deleteProduct = deleteProduct;
window.filterProducts = filterProducts;
window.sortProducts = sortProducts;
window.viewOrderDetails = viewOrderDetails;
window.updateOrderStatus = updateOrderStatus;
window.filterOrders = filterOrders;
window.refreshDashboard = refreshDashboard;
window.refreshOrders = refreshOrders;
window.showShopSettings = showShopSettings;
window.saveShopSettings = saveShopSettings;
window.showSettings = showSettings;
window.changePassword = changePassword;