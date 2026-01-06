// Modern UI Manager for Ala-Too Mobile
class UIManager {
    constructor() {
        this.sellerId = this.getSellerIdFromURL();
        this.productsData = this.loadProductsData();
        this.cart = this.loadCart();
        this.currentModal = null;
        this.initialize();
    }

    // Функция для получения ID продавца из URL
    getSellerIdFromURL() {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get('seller') || 1; // По умолчанию первый продавец
    }

    // Загрузка данных товаров с учетом продавца
    loadProductsData() {
        const sellerId = this.sellerId;
        
        // Пытаемся загрузить товары продавца из localStorage
        const sellerProductsKey = `seller_${sellerId}_products`;
        const sellerProducts = JSON.parse(localStorage.getItem(sellerProductsKey) || "{}");
        
        // Если у продавца есть товары, используем их
        if (Object.keys(sellerProducts).length > 0) {
            return sellerProducts;
        }
        
        // Иначе используем стандартные товары (только те, что принадлежат продавцу)
        const seller = sellers && sellers.find ? sellers.find(s => s.id === sellerId) : null;
        if (seller && seller.products) {
            const filteredProducts = {};
            seller.products.forEach(id => {
                if (this.initializeProductsData()[id]) {
                    filteredProducts[id] = this.initializeProductsData()[id];
                }
            });
            return filteredProducts;
        }
        
        // Если продавец не найден, возвращаем все товары
        return this.initializeProductsData();
    }

    initializeProductsData() {
        return {
            // iPhone модели
            1: {
                id: 1,
                name: "iPhone 17 Pro Max",
                basePrice: 169990,
                rating: 4.8,
                reviews: 128,
                description: "Новый iPhone 17 Pro Max с инновационной камерой и мощным процессором A19 Pro. 6.9-дюймовый Super Retina XDR дисплей с технологией ProMotion. Основная камера 48 МП с сенсором Quad Pixel.",
                specs: {
                    display: "6.9\" Super Retina XDR",
                    processor: "A19 Pro",
                    camera: "48MP + 12MP + 12MP",
                    battery: "5000mAh",
                    os: "iOS 19",
                    ram: "12GB",
                    connectivity: "5G, Wi-Fi 7, Bluetooth 5.3"
                },
                colors: [
                    { name: "Белый", price: 0 },
                    { name: "Черный", price: 0 },
                    { name: "Синий", price: 0 },
                    { name: "Золотой", price: 5000 }
                ],
                storage: [
                    { size: "512GB", price: 0 },
                    { size: "1TB", price: 20000 }
                ],
                images: [
                    "/photo/iPhone 17 Pro, iPhone 17 Pro Max.jpg",
                    "/photo/iPhone 17 Pro, iPhone 17 Pro Max.jpg",
                    "/photo/iPhone 17 Pro, iPhone 17 Pro Max.jpg",
                    "/photo/iPhone 17 Pro, iPhone 17 Pro Max.jpg"
                ]
            },
            2: {
                id: 2,
                name: "iPhone 16 Pro Max",
                basePrice: 159990,
                rating: 4.7,
                reviews: 215,
                description: "iPhone 16 Pro Max с улучшенной камерой и долгим временем работы. Дисплей 6.7 дюйма, процессор A18 Pro, камера 48 МП с улучшенной стабилизацией.",
                specs: {
                    display: "6.7\" Super Retina XDR",
                    processor: "A18 Pro",
                    camera: "48MP + 12MP + 12MP",
                    battery: "4850mAh",
                    os: "iOS 18",
                    ram: "12GB",
                    connectivity: "5G, Wi-Fi 6E, Bluetooth 5.3"
                },
                colors: [
                    { name: "Черный", price: 0 },
                    { name: "Белый", price: 0 },
                    { name: "Синий", price: 0 }
                ],
                storage: [
                    { size: "512GB", price: 0 },
                    { size: "1TB", price: 18000 }
                ],
                images: [
                    "/photo/Apple iPhone 16 Pro Max 1TB in Black Titanium _ Nebraska Furniture Mart.jpg",
                    "/photo/Apple iPhone 16 Pro Max 1TB in Black Titanium _ Nebraska Furniture Mart.jpg",
                    "/photo/Apple iPhone 16 Pro Max 1TB in Black Titanium _ Nebraska Furniture Mart.jpg",
                    "/photo/Apple iPhone 16 Pro Max 1TB in Black Titanium _ Nebraska Furniture Mart.jpg"
                ]
            },
            3: {
                id: 3,
                name: "iPhone 15 Pro Max",
                basePrice: 149990,
                rating: 4.6,
                reviews: 328,
                description: "iPhone 15 Pro Max с титановым корпусом и USB-C. Мощный процессор A17 Pro, камера 48 МП с 5x оптическим зумом.",
                specs: {
                    display: "6.7\" Super Retina XDR",
                    processor: "A17 Pro",
                    camera: "48MP + 12MP + 12MP",
                    battery: "4441mAh",
                    os: "iOS 17",
                    ram: "8GB",
                    connectivity: "5G, Wi-Fi 6E, Bluetooth 5.3"
                },
                colors: [
                    { name: "Черный титан", price: 0 },
                    { name: "Белый титан", price: 0 },
                    { name: "Синий титан", price: 0 },
                    { name: "Натуральный титан", price: 0 }
                ],
                storage: [
                    { size: "512GB", price: 0 },
                    { size: "1TB", price: 20000 }
                ],
                images: [
                    "/photo/Без названия (1).jpg",
                    "/photo/Без названия (1).jpg",
                    "/photo/Без названия (1).jpg",
                    "/photo/Без названия (1).jpg"
                ]
            },
            4: {
                id: 4,
                name: "iPhone 17 Pro",
                basePrice: 139990,
                rating: 4.7,
                reviews: 95,
                description: "Компактный iPhone 17 Pro с теми же функциями что и Max версия. Процессор A19 Pro, камера 48 МП, 6.3-дюймовый дисплей.",
                specs: {
                    display: "6.3\" Super Retina XDR",
                    processor: "A19 Pro",
                    camera: "48MP + 12MP + 12MP",
                    battery: "4200mAh",
                    os: "iOS 19",
                    ram: "12GB",
                    connectivity: "5G, Wi-Fi 7, Bluetooth 5.3"
                },
                colors: [
                    { name: "Белый", price: 0 },
                    { name: "Черный", price: 0 },
                    { name: "Синий", price: 0 }
                ],
                storage: [
                    { size: "512GB", price: 0 },
                    { size: "1TB", price: 20000 }
                ],
                images: [
                    "/photo/iPhone 17 Pro, iPhone 17 Pro Max.jpg",
                    "/photo/iPhone 17 Pro, iPhone 17 Pro Max.jpg",
                    "/photo/iPhone 17 Pro, iPhone 17 Pro Max.jpg",
                    "/photo/iPhone 17 Pro, iPhone 17 Pro Max.jpg"
                ]
            },
            5: {
                id: 5,
                name: "iPhone 16 Pro",
                basePrice: 129990,
                rating: 4.6,
                reviews: 142,
                description: "Профессиональная камера в компактном корпусе. Процессор A18 Pro, камера 48 МП, титановый корпус.",
                specs: {
                    display: "6.3\" Super Retina XDR",
                    processor: "A18 Pro",
                    camera: "48MP + 12MP + 12MP",
                    battery: "4100mAh",
                    os: "iOS 18",
                    ram: "12GB",
                    connectivity: "5G, Wi-Fi 6E, Bluetooth 5.3"
                },
                colors: [
                    { name: "Черный титан", price: 0 },
                    { name: "Белый титан", price: 0 },
                    { name: "Синий титан", price: 0 }
                ],
                storage: [
                    { size: "512GB", price: 0 },
                    { size: "1TB", price: 18000 }
                ],
                images: [
                    "/photo/Apple iPhone 16 Pro Max 1TB in Black Titanium _ Nebraska Furniture Mart.jpg",
                    "/photo/Apple iPhone 16 Pro Max 1TB in Black Titanium _ Nebraska Furniture Mart.jpg",
                    "/photo/Apple iPhone 16 Pro Max 1TB in Black Titanium _ Nebraska Furniture Mart.jpg",
                    "/photo/Apple iPhone 16 Pro Max 1TB in Black Titanium _ Nebraska Furniture Mart.jpg"
                ]
            },
            6: {
                id: 6,
                name: "iPhone 15 Pro",
                basePrice: 99990,
                rating: 4.5,
                reviews: 276,
                description: "Титановый дизайн и профессиональная камера в компактном форм-факторе. Процессор A17 Pro, USB-C.",
                specs: {
                    display: "6.1\" Super Retina XDR",
                    processor: "A17 Pro",
                    camera: "48MP + 12MP + 12MP",
                    battery: "3274mAh",
                    os: "iOS 17",
                    ram: "8GB",
                    connectivity: "5G, Wi-Fi 6E, Bluetooth 5.3"
                },
                colors: [
                    { name: "Черный титан", price: 0 },
                    { name: "Белый титан", price: 0 },
                    { name: "Синий титан", price: 0 },
                    { name: "Натуральный титан", price: 0 }
                ],
                storage: [
                    { size: "512GB", price: 0 },
                    { size: "256GB", price: -15000 }
                ],
                images: [
                    "/photo/Без названия (1).jpg",
                    "/photo/Без названия (1).jpg",
                    "/photo/Без названия (1).jpg",
                    "/photo/Без названия (1).jpg"
                ]
            },
            7: {
                id: 7,
                name: "iPhone 17",
                basePrice: 119990,
                rating: 4.4,
                reviews: 89,
                description: "Новый дизайн и улучшенная камера основной серии. Процессор A18, камера 48 МП, динамический остров.",
                specs: {
                    display: "6.1\" Super Retina XDR",
                    processor: "A18",
                    camera: "48MP + 12MP",
                    battery: "4000mAh",
                    os: "iOS 19",
                    ram: "8GB",
                    connectivity: "5G, Wi-Fi 6, Bluetooth 5.3"
                },
                colors: [
                    { name: "Черный", price: 0 },
                    { name: "Синий", price: 0 },
                    { name: "Розовый", price: 0 },
                    { name: "Желтый", price: 0 }
                ],
                storage: [
                    { size: "512GB", price: 0 },
                    { size: "256GB", price: -20000 }
                ],
                images: [
                    "/photo/❣️現貨❣️Apple iPhone 17 256GB 全新 桃園.jpg",
                    "/photo/❣️現貨❣️Apple iPhone 17 256GB 全新 桃園.jpg",
                    "/photo/❣️現貨❣️Apple iPhone 17 256GB 全新 桃園.jpg",
                    "/photo/❣️現貨❣️Apple iPhone 17 256GB 全新 桃園.jpg"
                ]
            },
            8: {
                id: 8,
                name: "iPhone 16",
                basePrice: 99990,
                rating: 4.3,
                reviews: 167,
                description: "Популярная модель с отличным соотношением цены и качества. Процессор A17, камера 48 МП.",
                specs: {
                    display: "6.1\" Super Retina XDR",
                    processor: "A17",
                    camera: "48MP + 12MP",
                    battery: "3800mAh",
                    os: "iOS 18",
                    ram: "8GB",
                    connectivity: "5G, Wi-Fi 6, Bluetooth 5.3"
                },
                colors: [
                    { name: "Синий", price: 0 },
                    { name: "Черный", price: 0 },
                    { name: "Розовый", price: 0 },
                    { name: "Зеленый", price: 0 }
                ],
                storage: [
                    { size: "512GB", price: 0 },
                    { size: "256GB", price: -20000 }
                ],
                images: [
                    "/photo/ip 16 plus.jpg",
                    "/photo/ip 16 plus.jpg",
                    "/photo/ip 16 plus.jpg",
                    "/photo/ip 16 plus.jpg"
                ]
            },
            9: {
                id: 9,
                name: "iPhone 15",
                basePrice: 89990,
                rating: 4.2,
                reviews: 312,
                description: "Классический iPhone с USB-C и динамическим островом. Процессор A16, камера 48 МП.",
                specs: {
                    display: "6.1\" Super Retina XDR",
                    processor: "A16",
                    camera: "48MP + 12MP",
                    battery: "3349mAh",
                    os: "iOS 17",
                    ram: "6GB",
                    connectivity: "5G, Wi-Fi 6, Bluetooth 5.3"
                },
                colors: [
                    { name: "Черный", price: 0 },
                    { name: "Синий", price: 0 },
                    { name: "Розовый", price: 0 },
                    { name: "Желтый", price: 0 },
                    { name: "Зеленый", price: 0 }
                ],
                storage: [
                    { size: "512GB", price: 0 },
                    { size: "256GB", price: -15000 },
                    { size: "128GB", price: -25000 }
                ],
                images: [
                    "/photo/Apple iPhone 15 Plus 128GB with Content Support Voucher.jpg",
                    "/photo/Apple iPhone 15 Plus 128GB with Content Support Voucher.jpg",
                    "/photo/Apple iPhone 15 Plus 128GB with Content Support Voucher.jpg",
                    "/photo/Apple iPhone 15 Plus 128GB with Content Support Voucher.jpg"
                ]
            },

            // Samsung модели
            10: {
                id: 10,
                name: "Samsung Galaxy S25 Ultra",
                basePrice: 124990,
                rating: 4.8,
                reviews: 76,
                description: "Флагман Samsung с революционной 200 МП камерой и S-Pen. Динамический AMOLED 2X дисплей 6.8\" с частотой 120 Гц.",
                specs: {
                    display: "6.8\" Dynamic AMOLED 2X",
                    processor: "Snapdragon 8 Gen 3",
                    camera: "200MP + 50MP + 12MP + 10MP",
                    battery: "5000mAh",
                    os: "Android 15",
                    ram: "12GB",
                    connectivity: "5G, Wi-Fi 7, Bluetooth 5.3"
                },
                colors: [
                    { name: "Черный", price: 0 },
                    { name: "Фиолетовый", price: 0 },
                    { name: "Зеленый", price: 0 }
                ],
                storage: [
                    { size: "512GB", price: 0 },
                    { size: "1TB", price: 15000 }
                ],
                images: [
                    "/photo/Samsung S25 Ultra.jpg",
                    "/photo/Samsung S25 Ultra.jpg",
                    "/photo/Samsung S25 Ultra.jpg",
                    "/photo/Samsung S25 Ultra.jpg"
                ]
            },
            11: {
                id: 11,
                name: "Samsung Galaxy S24 Ultra",
                basePrice: 123990,
                rating: 4.7,
                reviews: 189,
                description: "Мощный флагман с AI функциями и титановым корпусом. Камера 200 МП с 100x Space Zoom.",
                specs: {
                    display: "6.8\" Dynamic AMOLED 2X",
                    processor: "Snapdragon 8 Gen 2",
                    camera: "200MP + 50MP + 10MP + 10MP",
                    battery: "5000mAh",
                    os: "Android 14",
                    ram: "12GB",
                    connectivity: "5G, Wi-Fi 6E, Bluetooth 5.3"
                },
                colors: [
                    { name: "Черный", price: 0 },
                    { name: "Серый", price: 0 },
                    { name: "Фиолетовый", price: 0 },
                    { name: "Желтый", price: 0 }
                ],
                storage: [
                    { size: "512GB", price: 0 },
                    { size: "1TB", price: 15000 }
                ],
                images: [
                    "/photo/Galaxy s24 ultra.jpg",
                    "/photo/Galaxy s24 ultra.jpg",
                    "/photo/Galaxy s24 ultra.jpg",
                    "/photo/Galaxy s24 ultra.jpg"
                ]
            },
            12: {
                id: 12,
                name: "Samsung Galaxy S23 Ultra",
                basePrice: 92990,
                rating: 4.6,
                reviews: 342,
                description: "Легендарный флагман с изогнутым дисплеем и S-Pen. Камера 200 МП с улучшенной стабилизацией.",
                specs: {
                    display: "6.8\" Dynamic AMOLED 2X",
                    processor: "Snapdragon 8 Gen 2",
                    camera: "200MP + 10MP + 10MP + 12MP",
                    battery: "5000mAh",
                    os: "Android 13",
                    ram: "12GB",
                    connectivity: "5G, Wi-Fi 6E, Bluetooth 5.3"
                },
                colors: [
                    { name: "Черный", price: 0 },
                    { name: "Зеленый", price: 0 },
                    { name: "Кремовый", price: 0 },
                    { name: "Лавандовый", price: 0 }
                ],
                storage: [
                    { size: "512GB", price: 0 },
                    { size: "1TB", price: 10000 }
                ],
                images: [
                    "/photo/Celular Samsung Galaxy S23 Ultra 1TB Black.jpg",
                    "/photo/Celular Samsung Galaxy S23 Ultra 1TB Black.jpg",
                    "/photo/Celular Samsung Galaxy S23 Ultra 1TB Black.jpg",
                    "/photo/Celular Samsung Galaxy S23 Ultra 1TB Black.jpg"
                ]
            },
            13: {
                id: 13,
                name: "Samsung Galaxy S25+",
                basePrice: 94990,
                rating: 4.5,
                reviews: 45,
                description: "Большой экран и мощная батарея в тонком корпусе. Процессор Snapdragon 8 Gen 3.",
                specs: {
                    display: "6.7\" Dynamic AMOLED 2X",
                    processor: "Snapdragon 8 Gen 3",
                    camera: "50MP + 12MP + 10MP",
                    battery: "4900mAh",
                    os: "Android 15",
                    ram: "12GB",
                    connectivity: "5G, Wi-Fi 7, Bluetooth 5.3"
                },
                colors: [
                    { name: "Черный", price: 0 },
                    { name: "Синий", price: 0 },
                    { name: "Фиолетовый", price: 0 }
                ],
                storage: [
                    { size: "512GB", price: 0 },
                    { size: "256GB", price: -10000 }
                ],
                images: [
                    "/photo/Samsung Galaxy S25+.jpg",
                    "/photo/Samsung Galaxy S25+.jpg",
                    "/photo/Samsung Galaxy S25+.jpg",
                    "/photo/Samsung Galaxy S25+.jpg"
                ]
            },
            14: {
                id: 14,
                name: "Samsung Galaxy S24+",
                basePrice: 93990,
                rating: 4.4,
                reviews: 128,
                description: "AI смартфон с мощной камерой и большим экраном. Galaxy AI функции для фотографий.",
                specs: {
                    display: "6.7\" Dynamic AMOLED 2X",
                    processor: "Snapdragon 8 Gen 2",
                    camera: "50MP + 12MP + 10MP",
                    battery: "4900mAh",
                    os: "Android 14",
                    ram: "12GB",
                    connectivity: "5G, Wi-Fi 6E, Bluetooth 5.3"
                },
                colors: [
                    { name: "Черный", price: 0 },
                    { name: "Серый", price: 0 },
                    { name: "Фиолетовый", price: 0 },
                    { name: "Желтый", price: 0 }
                ],
                storage: [
                    { size: "512GB", price: 0 },
                    { size: "256GB", price: -10000 }
                ],
                images: [
                    "/photo/Samsung Galaxy S24 Plus 5G (Cobalt Violet, 12GB, 512GB Storage).jpg",
                    "/photo/Samsung Galaxy S24 Plus 5G (Cobalt Violet, 12GB, 512GB Storage).jpg",
                    "/photo/Samsung Galaxy S24 Plus 5G (Cobalt Violet, 12GB, 512GB Storage).jpg",
                    "/photo/Samsung Galaxy S24 Plus 5G (Cobalt Violet, 12GB, 512GB Storage).jpg"
                ]
            },
            15: {
                id: 15,
                name: "Samsung Galaxy S23+",
                basePrice: 72990,
                rating: 4.3,
                reviews: 187,
                description: "Сбалансированный флагман с отличной автономностью. Процессор Snapdragon 8 Gen 2.",
                specs: {
                    display: "6.6\" Dynamic AMOLED 2X",
                    processor: "Snapdragon 8 Gen 2",
                    camera: "50MP + 12MP + 10MP",
                    battery: "4700mAh",
                    os: "Android 13",
                    ram: "8GB",
                    connectivity: "5G, Wi-Fi 6E, Bluetooth 5.3"
                },
                colors: [
                    { name: "Зеленый", price: 0 },
                    { name: "Черный", price: 0 },
                    { name: "Кремовый", price: 0 },
                    { name: "Лавандовый", price: 0 }
                ],
                storage: [
                    { size: "512GB", price: 0 },
                    { size: "256GB", price: -8000 }
                ],
                images: [
                    "/photo/Galaxy S23 Plus Vert 256Go avec abonnement Forfait 2h 100Mo Samsung.jpg",
                    "/photo/Galaxy S23 Plus Vert 256Go avec abonnement Forfait 2h 100Mo Samsung.jpg",
                    "/photo/Galaxy S23 Plus Vert 256Go avec abonnement Forfait 2h 100Mo Samsung.jpg",
                    "/photo/Galaxy S23 Plus Vert 256Go avec abonnement Forfait 2h 100Mo Samsung.jpg"
                ]
            },
            16: {
                id: 16,
                name: "Samsung Galaxy S25",
                basePrice: 84990,
                rating: 4.4,
                reviews: 32,
                description: "Компактный флагман с AI функциями и мощной камерой. Galaxy AI для обработки фотографий.",
                specs: {
                    display: "6.2\" Dynamic AMOLED 2X",
                    processor: "Snapdragon 8 Gen 3",
                    camera: "50MP + 12MP + 10MP",
                    battery: "4000mAh",
                    os: "Android 15",
                    ram: "8GB",
                    connectivity: "5G, Wi-Fi 7, Bluetooth 5.3"
                },
                colors: [
                    { name: "Черный", price: 0 },
                    { name: "Синий", price: 0 },
                    { name: "Розовый", price: 0 }
                ],
                storage: [
                    { size: "512GB", price: 0 },
                    { size: "256GB", price: -10000 }
                ],
                images: [
                    "/photo/S25.jpg",
                    "/photo/S25.jpg",
                    "/photo/S25.jpg",
                    "/photo/S25.jpg"
                ]
            },
            17: {
                id: 17,
                name: "Samsung Galaxy S24",
                basePrice: 83990,
                rating: 4.3,
                reviews: 96,
                description: "Компактный AI смартфон с круговой записью звонков. Galaxy AI для перевода и обработки текста.",
                specs: {
                    display: "6.2\" Dynamic AMOLED 2X",
                    processor: "Snapdragon 8 Gen 2",
                    camera: "50MP + 12MP + 10MP",
                    battery: "4000mAh",
                    os: "Android 14",
                    ram: "8GB",
                    connectivity: "5G, Wi-Fi 6E, Bluetooth 5.3"
                },
                colors: [
                    { name: "Черный", price: 0 },
                    { name: "Серый", price: 0 },
                    { name: "Желтый", price: 0 },
                    { name: "Фиолетовый", price: 0 }
                ],
                storage: [
                    { size: "512GB", price: 0 },
                    { size: "256GB", price: -10000 }
                ],
                images: [
                    "/photo/O Samsung Galaxy S24 é bom_ Ficha técnica.jpg",
                    "/photo/O Samsung Galaxy S24 é bom_ Ficha técnica.jpg",
                    "/photo/O Samsung Galaxy S24 é bom_ Ficha técnica.jpg",
                    "/photo/O Samsung Galaxy S24 é bom_ Ficha técnica.jpg"
                ]
            },
            18: {
                id: 18,
                name: "Samsung Galaxy S23",
                basePrice: 62990,
                rating: 4.2,
                reviews: 231,
                description: "Компактный и мощный смартфон для ежедневного использования. Отличная камера и автономность.",
                specs: {
                    display: "6.1\" Dynamic AMOLED 2X",
                    processor: "Snapdragon 8 Gen 2",
                    camera: "50MP + 12MP + 10MP",
                    battery: "3900mAh",
                    os: "Android 13",
                    ram: "8GB",
                    connectivity: "5G, Wi-Fi 6E, Bluetooth 5.3"
                },
                colors: [
                    { name: "Зеленый", price: 0 },
                    { name: "Черный", price: 0 },
                    { name: "Кремовый", price: 0 },
                    { name: "Лавандовый", price: 0 }
                ],
                storage: [
                    { size: "512GB", price: 0 },
                    { size: "256GB", price: -8000 }
                ],
                images: [
                    "/photo/Samsung Galaxy S23.jpg",
                    "/photo/Samsung Galaxy S23.jpg",
                    "/photo/Samsung Galaxy S23.jpg",
                    "/photo/Samsung Galaxy S23.jpg"
                ]
            },

            // Xiaomi модели
            19: {
                id: 19,
                name: "Xiaomi 17 Pro Max",
                basePrice: 96990,
                rating: 4.6,
                reviews: 67,
                description: "Флагман Xiaomi с Leica камерой и быстрой зарядкой 120W. Процессор Snapdragon 8 Gen 3.",
                specs: {
                    display: "6.8\" AMOLED",
                    processor: "Snapdragon 8 Gen 3",
                    camera: "50MP + 50MP + 50MP",
                    battery: "5000mAh",
                    os: "HyperOS",
                    ram: "16GB",
                    connectivity: "5G, Wi-Fi 7, Bluetooth 5.4"
                },
                colors: [
                    { name: "Белый", price: 0 },
                    { name: "Черный", price: 0 },
                    { name: "Зеленый", price: 0 }
                ],
                storage: [
                    { size: "512GB", price: 0 },
                    { size: "1TB", price: 12000 }
                ],
                images: [
                    "/photo/Xiaomi 17 Pro.jpg",
                    "/photo/Xiaomi 17 Pro.jpg",
                    "/photo/Xiaomi 17 Pro.jpg",
                    "/photo/Xiaomi 17 Pro.jpg"
                ]
            },
            20: {
                id: 20,
                name: "Xiaomi 16 Pro Max",
                basePrice: 95990,
                rating: 4.5,
                reviews: 89,
                description: "Мощный смартфон с камерой Leica и быстрой зарядкой. Процессор Snapdragon 8 Gen 2.",
                specs: {
                    display: "6.7\" AMOLED",
                    processor: "Snapdragon 8 Gen 2",
                    camera: "50MP + 50MP + 50MP",
                    battery: "5000mAh",
                    os: "MIUI 14",
                    ram: "16GB",
                    connectivity: "5G, Wi-Fi 6E, Bluetooth 5.3"
                },
                colors: [
                    { name: "Белый", price: 0 },
                    { name: "Черный", price: 0 },
                    { name: "Синий", price: 0 }
                ],
                storage: [
                    { size: "512GB", price: 0 },
                    { size: "1TB", price: 10000 }
                ],
                images: [
                    "/photo/Original Xiaomi 17 Pro Max 512GB 16GB White China Model Unlocked GSM Opens in a new window or tab.jpg",
                    "/photo/Original Xiaomi 17 Pro Max 512GB 16GB White China Model Unlocked GSM Opens in a new window or tab.jpg",
                    "/photo/Original Xiaomi 17 Pro Max 512GB 16GB White China Model Unlocked GSM Opens in a new window or tab.jpg",
                    "/photo/Original Xiaomi 17 Pro Max 512GB 16GB White China Model Unlocked GSM Opens in a new window or tab.jpg"
                ]
            },
            21: {
                id: 21,
                name: "Xiaomi 15 Pro Max",
                basePrice: 84990,
                rating: 4.4,
                reviews: 124,
                description: "Флагман с камерой Leica и зарядкой 120W. Процессор Snapdragon 8 Gen 2.",
                specs: {
                    display: "6.7\" AMOLED",
                    processor: "Snapdragon 8 Gen 2",
                    camera: "50MP + 50MP + 50MP",
                    battery: "5000mAh",
                    os: "MIUI 14",
                    ram: "12GB",
                    connectivity: "5G, Wi-Fi 6E, Bluetooth 5.3"
                },
                colors: [
                    { name: "Белый", price: 0 },
                    { name: "Черный", price: 0 },
                    { name: "Зеленый", price: 0 }
                ],
                storage: [
                    { size: "512GB", price: 0 },
                    { size: "256GB", price: -8000 }
                ],
                images: [
                    "/photo/Xiaomi 17 Pro Max.jpg",
                    "/photo/Xiaomi 17 Pro Max.jpg",
                    "/photo/Xiaomi 17 Pro Max.jpg",
                    "/photo/Xiaomi 17 Pro Max.jpg"
                ]
            },
            22: {
                id: 22,
                name: "Xiaomi 17 Ultra",
                basePrice: 96990,
                rating: 4.7,
                reviews: 53,
                description: "Ультра флагман с четырьмя камерами Leica. Фотографическая система профессионального уровня.",
                specs: {
                    display: "6.8\" AMOLED",
                    processor: "Snapdragon 8 Gen 3",
                    camera: "50MP + 50MP + 50MP + 50MP",
                    battery: "5300mAh",
                    os: "HyperOS",
                    ram: "16GB",
                    connectivity: "5G, Wi-Fi 7, Bluetooth 5.4"
                },
                colors: [
                    { name: "Черный", price: 0 },
                    { name: "Белый", price: 0 },
                    { name: "Синий", price: 0 }
                ],
                storage: [
                    { size: "512GB", price: 0 },
                    { size: "1TB", price: 15000 }
                ],
                images: [
                    "/photo/Xiaomi 14 Ultra 5G (16GB RAM + 512GB)__$1,315_00Price.jpg",
                    "/photo/Xiaomi 14 Ultra 5G (16GB RAM + 512GB)__$1,315_00Price.jpg",
                    "/photo/Xiaomi 14 Ultra 5G (16GB RAM + 512GB)__$1,315_00Price.jpg",
                    "/photo/Xiaomi 14 Ultra 5G (16GB RAM + 512GB)__$1,315_00Price.jpg"
                ]
            },
            23: {
                id: 23,
                name: "Xiaomi 16 Ultra",
                basePrice: 95990,
                rating: 4.6,
                reviews: 78,
                description: "Фотографический флагман с системой камер Leica. Четыре камеры с оптическим зумом.",
                specs: {
                    display: "6.7\" AMOLED",
                    processor: "Snapdragon 8 Gen 2",
                    camera: "50MP + 50MP + 50MP + 50MP",
                    battery: "5000mAh",
                    os: "MIUI 14",
                    ram: "16GB",
                    connectivity: "5G, Wi-Fi 6E, Bluetooth 5.3"
                },
                colors: [
                    { name: "Белый", price: 0 },
                    { name: "Черный", price: 0 },
                    { name: "Зеленый", price: 0 }
                ],
                storage: [
                    { size: "512GB", price: 0 },
                    { size: "1TB", price: 12000 }
                ],
                images: [
                    "/photo/Xiaomi 14 Ultra 5G - Powerful Global Smartphone.jpg",
                    "/photo/Xiaomi 14 Ultra 5G - Powerful Global Smartphone.jpg",
                    "/photo/Xiaomi 14 Ultra 5G - Powerful Global Smartphone.jpg",
                    "/photo/Xiaomi 14 Ultra 5G - Powerful Global Smartphone.jpg"
                ]
            },
            24: {
                id: 24,
                name: "Xiaomi 15 Ultra",
                basePrice: 84990,
                rating: 4.5,
                reviews: 102,
                description: "Ультра-камера с четырьмя сенсорами Leica. Профессиональная система камер для фотографов.",
                specs: {
                    display: "6.7\" AMOLED",
                    processor: "Snapdragon 8 Gen 2",
                    camera: "50MP + 50MP + 50MP + 50MP",
                    battery: "5000mAh",
                    os: "MIUI 14",
                    ram: "12GB",
                    connectivity: "5G, Wi-Fi 6E, Bluetooth 5.3"
                },
                colors: [
                    { name: "Черный", price: 0 },
                    { name: "Белый", price: 0 },
                    { name: "Оранжевый", price: 0 }
                ],
                storage: [
                    { size: "512GB", price: 0 },
                    { size: "256GB", price: -8000 }
                ],
                images: [
                    "/photo/Xiaomi 15 Ultra_ ya conocemos sus principales especificaciones.jpg",
                    "/photo/Xiaomi 15 Ultra_ ya conocemos sus principales especificaciones.jpg",
                    "/photo/Xiaomi 15 Ultra_ ya conocemos sus principales especificaciones.jpg",
                    "/photo/Xiaomi 15 Ultra_ ya conocemos sus principales especificaciones.jpg"
                ]
            },
            25: {
                id: 25,
                name: "Xiaomi 17",
                basePrice: 76990,
                rating: 4.3,
                reviews: 45,
                description: "Баланс мощности и стоимости с камерой Leica. Процессор Snapdragon 8s Gen 3.",
                specs: {
                    display: "6.4\" AMOLED",
                    processor: "Snapdragon 8s Gen 3",
                    camera: "50MP + 8MP + 2MP",
                    battery: "4800mAh",
                    os: "HyperOS",
                    ram: "12GB",
                    connectivity: "5G, Wi-Fi 6, Bluetooth 5.3"
                },
                colors: [
                    { name: "Серый", price: 0 },
                    { name: "Черный", price: 0 },
                    { name: "Синий", price: 0 }
                ],
                storage: [
                    { size: "512GB", price: 0 },
                    { size: "256GB", price: -10000 }
                ],
                images: [
                    "/photo/Xiaomi 15T 5G Dual Sim 12GB RAM 256GB - Grey - Tech 2 Tech.jpg",
                    "/photo/Xiaomi 15T 5G Dual Sim 12GB RAM 256GB - Grey - Tech 2 Tech.jpg",
                    "/photo/Xiaomi 15T 5G Dual Sim 12GB RAM 256GB - Grey - Tech 2 Tech.jpg",
                    "/photo/Xiaomi 15T 5G Dual Sim 12GB RAM 256GB - Grey - Tech 2 Tech.jpg"
                ]
            },
            26: {
                id: 26,
                name: "Xiaomi 16",
                basePrice: 75990,
                rating: 4.2,
                reviews: 67,
                description: "Популярная модель с отличной камерой и быстрой зарядкой. Процессор Snapdragon 8s Gen 2.",
                specs: {
                    display: "6.4\" AMOLED",
                    processor: "Snapdragon 8s Gen 2",
                    camera: "50MP + 8MP + 2MP",
                    battery: "4800mAh",
                    os: "MIUI 14",
                    ram: "12GB",
                    connectivity: "5G, Wi-Fi 6, Bluetooth 5.3"
                },
                colors: [
                    { name: "Розовое золото", price: 0 },
                    { name: "Черный", price: 0 },
                    { name: "Синий", price: 0 }
                ],
                storage: [
                    { size: "512GB", price: 0 },
                    { size: "256GB", price: -10000 }
                ],
                images: [
                    "/photo/Xiaomi 15T 12_512GB - Rose Gold.jpg",
                    "/photo/Xiaomi 15T 12_512GB - Rose Gold.jpg",
                    "/photo/Xiaomi 15T 12_512GB - Rose Gold.jpg",
                    "/photo/Xiaomi 15T 12_512GB - Rose Gold.jpg"
                ]
            },
            27: {
                id: 27,
                name: "Xiaomi 15",
                basePrice: 64990,
                rating: 4.1,
                reviews: 89,
                description: "Доступный флагман с камерой Leica и быстрой зарядкой. Отличное соотношение цены и качества.",
                specs: {
                    display: "6.4\" AMOLED",
                    processor: "Snapdragon 8s Gen 2",
                    camera: "50MP + 8MP + 2MP",
                    battery: "4700mAh",
                    os: "MIUI 14",
                    ram: "12GB",
                    connectivity: "5G, Wi-Fi 6, Bluetooth 5.3"
                },
                colors: [
                    { name: "Серый", price: 0 },
                    { name: "Черный", price: 0 },
                    { name: "Синий", price: 0 }
                ],
                storage: [
                    { size: "512GB", price: 0 },
                    { size: "256GB", price: -8000 }
                ],
                images: [
                    "/photo/Xiaomi 14t Dual Sim 512 Gb Cinza Titânio 12 Gb Ram.jpg",
                    "/photo/Xiaomi 14t Dual Sim 512 Gb Cinza Titânio 12 Gb Ram.jpg",
                    "/photo/Xiaomi 14t Dual Sim 512 Gb Cinza Titânio 12 Gb Ram.jpg",
                    "/photo/Xiaomi 14t Dual Sim 512 Gb Cinza Titânio 12 Gb Ram.jpg"
                ]
            }
        };
    }

    loadCart() {
        const sellerId = this.sellerId;
        const cartKey = `cart_${sellerId}`;
        return JSON.parse(localStorage.getItem(cartKey) || "[]");
    }

    saveCart() {
        const sellerId = this.sellerId;
        const cartKey = `cart_${sellerId}`;
        localStorage.setItem(cartKey, JSON.stringify(this.cart));
    }

    initialize() {
        this.setupEventListeners();
        this.initializeAnimations();
        this.updateCartCount();
        this.setupProductFilters();
        this.addSellerButton();
    }

    // Добавляем кнопку входа для продавца
    addSellerButton() {
        const navActions = document.querySelector('.nav-actions');
        if (navActions && this.sellerId) {
            // Проверяем, не добавлена ли уже кнопка
            if (!document.querySelector('.seller-admin-btn')) {
                const sellerBtn = document.createElement('a');
                sellerBtn.href = `seller-dashboard.html`;
                sellerBtn.className = 'btn btn-outline seller-admin-btn';
                sellerBtn.innerHTML = '<i class="fas fa-store"></i> Мой магазин';
                navActions.insertBefore(sellerBtn, navActions.querySelector('.cart-btn'));
            }
        }
    }

    setupEventListeners() {
        // Mobile menu
        const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
        const navLinks = document.querySelector('.nav-links');
        
        if (mobileMenuBtn) {
            mobileMenuBtn.addEventListener('click', () => {
                navLinks.classList.toggle('active');
                mobileMenuBtn.innerHTML = navLinks.classList.contains('active') 
                    ? '<i class="fas fa-times"></i>' 
                    : '<i class="fas fa-bars"></i>';
            });
        }

        // Close mobile menu on link click
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
            });
        });

        // Product buttons
        document.addEventListener('click', (e) => {
            // Details button
            if (e.target.closest('.btn-details')) {
                const productId = e.target.closest('.btn-details').dataset.product;
                this.openProductDetails(productId);
            }

            // Add to cart button
            if (e.target.closest('.btn-add')) {
                const productId = e.target.closest('.btn-add').dataset.product;
                this.addToCartSimple(productId);
            }

            // Quick view
            if (e.target.closest('.product-quick-view')) {
                const productId = e.target.closest('.product-quick-view').dataset.product;
                this.openProductDetails(productId);
            }

            // Color selection
            if (e.target.closest('.color-dot')) {
                const colorDot = e.target.closest('.color-dot');
                this.selectColor(colorDot);
            }

            // Memory selection
            if (e.target.closest('.memory-option')) {
                const memoryOption = e.target.closest('.memory-option');
                this.selectMemory(memoryOption);
            }
        });

        // Navbar scroll effect
        window.addEventListener('scroll', () => {
            const navbar = document.querySelector('.navbar');
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });

        // Smooth scrolling for anchor links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = anchor.getAttribute('href');
                if (targetId === '#') return;
                
                const target = document.querySelector(targetId);
                if (target) {
                    window.scrollTo({
                        top: target.offsetTop - 80,
                        behavior: 'smooth'
                    });
                }
            });
        });

        // Load more button
        const loadMoreBtn = document.querySelector('.btn-load-more');
        if (loadMoreBtn) {
            loadMoreBtn.addEventListener('click', () => {
                this.showNotification('Загружаем больше товаров...');
                // Здесь можно добавить логику загрузки дополнительных товаров
                setTimeout(() => {
                    this.showNotification('Все товары загружены');
                }, 1000);
            });
        }
    }

    setupProductFilters() {
        const filterTabs = document.querySelectorAll('.filter-tab');
        const sortSelect = document.querySelector('.sort-select');
        const productsGrid = document.querySelector('.products-grid');
        
        if (!filterTabs.length || !sortSelect || !productsGrid) return;

        filterTabs.forEach(tab => {
            tab.addEventListener('click', () => {
                // Update active tab
                filterTabs.forEach(t => t.classList.remove('active'));
                tab.classList.add('active');
                
                // Filter products
                const filter = tab.dataset.filter;
                this.filterProducts(filter);
            });
        });

        sortSelect.addEventListener('change', (e) => {
            this.sortProducts(e.target.value);
        });
    }

    filterProducts(filter) {
        const products = document.querySelectorAll('.product-card');
        
        products.forEach(product => {
            const categories = product.dataset.category.split(' ');
            
            if (filter === 'all' || categories.includes(filter)) {
                product.style.display = 'block';
                setTimeout(() => {
                    product.style.opacity = '1';
                    product.style.transform = 'translateY(0)';
                }, 100);
            } else {
                product.style.opacity = '0';
                product.style.transform = 'translateY(20px)';
                setTimeout(() => {
                    product.style.display = 'none';
                }, 300);
            }
        });
    }

    sortProducts(sortBy) {
        const productsGrid = document.querySelector('.products-grid');
        const products = Array.from(document.querySelectorAll('.product-card'));
        
        products.sort((a, b) => {
            const priceA = parseInt(a.querySelector('.price-current').textContent.replace(/\s+/g, ''));
            const priceB = parseInt(b.querySelector('.price-current').textContent.replace(/\s+/g, ''));
            
            switch (sortBy) {
                case 'price-asc':
                    return priceA - priceB;
                case 'price-desc':
                    return priceB - priceA;
                case 'newest':
                    const hasNewA = a.querySelector('.new');
                    const hasNewB = b.querySelector('.new');
                    return hasNewB ? 1 : -1;
                default:
                    return 0;
            }
        });
        
        // Reorder products
        products.forEach(product => {
            productsGrid.appendChild(product);
        });
    }

    initializeAnimations() {
        // Intersection Observer for scroll animations
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                }
            });
        }, observerOptions);
        
        // Observe elements
        document.querySelectorAll('.product-card, .tech-card, .brand-item, .contact-card').forEach(el => {
            observer.observe(el);
        });
    }

    selectColor(colorDot) {
        const container = colorDot.parentElement;
        container.querySelectorAll('.color-dot').forEach(dot => {
            dot.classList.remove('active');
        });
        colorDot.classList.add('active');
    }

    selectMemory(memoryOption) {
        const container = memoryOption.parentElement;
        container.querySelectorAll('.memory-option').forEach(option => {
            option.classList.remove('active');
        });
        memoryOption.classList.add('active');
    }

    openProductDetails(productId) {
        const product = this.productsData[productId];
        if (!product) return;

        const modalContent = `
            <div class="product-modal-content">
                <div class="product-modal-images">
                    <div class="product-modal-main-image">
                        <img src="${product.images[0]}" alt="${product.name}" id="productModalMainImage">
                    </div>
                    <div class="product-modal-thumbnails">
                        ${product.images.map((img, index) => `
                            <div class="product-modal-thumbnail ${index === 0 ? 'active' : ''}" 
                                 data-image="${img}"
                                 onclick="uiManager.changeProductImage('${img}')">
                                <img src="${img}" alt="${product.name} - вид ${index + 1}">
                            </div>
                        `).join('')}
                    </div>
                </div>
                
                <div class="product-modal-info">
                    <div class="product-modal-category">${product.id <= 9 ? 'Apple' : product.id <= 18 ? 'Samsung' : 'Xiaomi'}</div>
                    <h2 class="product-modal-title">${product.name}</h2>
                    
                    <div class="product-modal-rating">
                        <div class="rating-stars">
                            ${this.generateStars(product.rating)}
                        </div>
                        <span class="rating-count">${product.reviews} отзывов</span>
                    </div>
                    
                    <p class="product-modal-description">${product.description}</p>
                    
                    <div class="product-modal-specs">
                        ${Object.entries(product.specs).map(([key, value]) => `
                            <div class="spec-item-full">
                                <span class="spec-label">${this.getSpecLabel(key)}</span>
                                <span class="spec-value">${value}</span>
                            </div>
                        `).join('')}
                    </div>
                    
                    <div class="product-modal-options">
                        <h4 class="options-title">Цвет</h4>
                        <div class="product-colors">
                            ${product.colors.map((color, index) => `
                                <div class="color-dot ${index === 0 ? 'active' : ''}" 
                                     style="background: ${this.getColorValue(color.name)}"
                                     title="${color.name}"
                                     onclick="uiManager.selectColor(this)">
                                </div>
                            `).join('')}
                        </div>
                        
                        <h4 class="options-title">Память</h4>
                        <div class="product-memory">
                            ${product.storage.map((storage, index) => `
                                <div class="memory-option ${index === 0 ? 'active' : ''}"
                                     data-price="${storage.price}"
                                     onclick="uiManager.selectMemory(this)">
                                    ${storage.size}
                                    ${storage.price > 0 ? ` (+${storage.price.toLocaleString()} сом)` : storage.price < 0 ? ` (${storage.price.toLocaleString()} сом)` : ''}
                                </div>
                            `).join('')}
                        </div>
                    </div>
                    
                    <div class="product-modal-price">
                        <div class="price-current-large" id="productModalPrice">${product.basePrice.toLocaleString()} сом</div>
                        ${product.basePrice > 150000 ? `
                            <div class="price-old-large">${(product.basePrice * 1.15).toLocaleString()} сом</div>
                        ` : ''}
                    </div>
                    
                    <div class="product-modal-actions">
                        <div class="quantity-selector">
                            <button class="quantity-btn" onclick="uiManager.changeQuantity(-1)">
                                <i class="fas fa-minus"></i>
                            </button>
                            <span class="quantity-value" id="productQuantity">1</span>
                            <button class="quantity-btn" onclick="uiManager.changeQuantity(1)">
                                <i class="fas fa-plus"></i>
                            </button>
                        </div>
                        
                        <div class="product-modal-buttons">
                            <button class="btn btn-primary btn-add-to-cart-large" 
                                    onclick="uiManager.addToCartWithOptions(${productId})">
                                <i class="fas fa-cart-plus"></i>
                                <span>Добавить в корзину</span>
                            </button>
                            <button class="btn btn-outline btn-buy-now"
                                    onclick="uiManager.buyNow(${productId})">
                                <i class="fas fa-bolt"></i>
                                <span>Купить сейчас</span>
                            </button>
                        </div>
                    </div>
                    
                    <div class="product-modal-extras">
                        <ul class="extras-list">
                            <li class="extra-item">
                                <i class="fas fa-check-circle"></i>
                                <span>Официальная гарантия 12 месяцев</span>
                            </li>
                            <li class="extra-item">
                                <i class="fas fa-shipping-fast"></i>
                                <span>Бесплатная доставка по Ошу</span>
                            </li>
                            <li class="extra-item">
                                <i class="fas fa-sync-alt"></i>
                                <span>Возврат в течение 14 дней</span>
                            </li>
                            <li class="extra-item">
                                <i class="fas fa-headset"></i>
                                <span>Круглосуточная поддержка</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        `;

        document.getElementById('productModalContent').innerHTML = modalContent;
        this.openModal('productModal');
    }

    generateStars(rating) {
        const stars = [];
        const fullStars = Math.floor(rating);
        const hasHalfStar = rating % 1 >= 0.5;
        
        for (let i = 0; i < fullStars; i++) {
            stars.push('<i class="fas fa-star"></i>');
        }
        
        if (hasHalfStar) {
            stars.push('<i class="fas fa-star-half-alt"></i>');
        }
        
        const emptyStars = 5 - stars.length;
        for (let i = 0; i < emptyStars; i++) {
            stars.push('<i class="far fa-star"></i>');
        }
        
        return stars.join('');
    }

    getSpecLabel(key) {
        const labels = {
            display: "Дисплей",
            processor: "Процессор",
            camera: "Камера",
            battery: "Батарея",
            os: "Операционная система",
            ram: "Оперативная память",
            connectivity: "Беспроводные технологии"
        };
        return labels[key] || key;
    }

    getColorValue(colorName) {
        const colors = {
            "Белый": "#ffffff",
            "Черный": "#000000",
            "Синий": "#3b82f6",
            "Золотой": "#f59e0b",
            "Зеленый": "#10b981",
            "Фиолетовый": "#8b5cf6",
            "Серый": "#9ca3af",
            "Кремовый": "#fef3c7",
            "Лавандовый": "#ddd6fe",
            "Натуральный титан": "#a8a29e",
            "Черный титан": "#374151",
            "Белый титан": "#f9fafb",
            "Синий титан": "#60a5fa",
            "Розовый": "#f472b6",
            "Желтый": "#fbbf24",
            "Оранжевый": "#fb923c",
            "Розовое золото": "#fbcfe8"
        };
        return colors[colorName] || "#cccccc";
    }

    changeProductImage(imageUrl) {
        const mainImage = document.getElementById('productModalMainImage');
        const thumbnails = document.querySelectorAll('.product-modal-thumbnail');
        
        if (mainImage) {
            mainImage.src = imageUrl;
        }
        
        thumbnails.forEach(thumb => {
            thumb.classList.remove('active');
            if (thumb.dataset.image === imageUrl) {
                thumb.classList.add('active');
            }
        });
    }

    changeQuantity(delta) {
        const quantityElement = document.getElementById('productQuantity');
        let quantity = parseInt(quantityElement.textContent) || 1;
        quantity = Math.max(1, quantity + delta);
        quantityElement.textContent = quantity;
    }

    addToCartSimple(productId) {
        const product = this.productsData[productId];
        if (!product) return;

        const cartItem = {
            id: product.id,
            name: product.name,
            color: product.colors[0].name,
            storage: product.storage[0].size,
            price: product.basePrice,
            image: product.images[0],
            quantity: 1
        };

        this.addToCart(cartItem);
        this.showNotification('Товар добавлен в корзину');
    }

    addToCartWithOptions(productId) {
        const product = this.productsData[productId];
        if (!product) return;

        const selectedColorElement = document.querySelector('.color-dot.active');
        const selectedMemoryElement = document.querySelector('.memory-option.active');
        const quantityElement = document.getElementById('productQuantity');

        const color = selectedColorElement ? selectedColorElement.title : product.colors[0].name;
        const storage = selectedMemoryElement ? selectedMemoryElement.textContent.split(' ')[0] : product.storage[0].size;
        const quantity = quantityElement ? parseInt(quantityElement.textContent) : 1;

        // Calculate final price with memory option
        const selectedStorage = product.storage.find(s => s.size === storage);
        const finalPrice = product.basePrice + (selectedStorage ? selectedStorage.price : 0);

        const cartItem = {
            id: product.id,
            name: product.name,
            color: color,
            storage: storage,
            price: finalPrice,
            image: product.images[0],
            quantity: quantity
        };

        this.addToCart(cartItem);
        this.closeModal('productModal');
        this.showNotification(`${quantity} × ${product.name} добавлен в корзину`);
    }

    addToCart(item) {
        // Check if item already exists in cart
        const existingIndex = this.cart.findIndex(cartItem => 
            cartItem.id === item.id && 
            cartItem.color === item.color && 
            cartItem.storage === item.storage
        );

        if (existingIndex > -1) {
            this.cart[existingIndex].quantity += item.quantity;
        } else {
            this.cart.push(item);
        }

        this.saveCart();
        this.updateCartCount();
    }

    removeFromCart(index) {
        this.cart.splice(index, 1);
        this.saveCart();
        this.updateCartCount();
        this.renderCart();
    }

    updateCartCount() {
        const count = this.cart.reduce((total, item) => total + item.quantity, 0);
        const cartCountElement = document.querySelector('.cart-count');
        
        if (cartCountElement) {
            cartCountElement.textContent = count;
            cartCountElement.style.display = count > 0 ? 'flex' : 'none';
        }
    }

    openCart() {
        this.renderCart();
        this.openModal('cartModal');
    }

    closeCart() {
        this.closeModal('cartModal');
    }

    renderCart() {
        const cartItemsElement = document.getElementById('cartItems');
        const cartEmptyElement = document.getElementById('cartEmpty');
        const cartSummaryElement = document.getElementById('cartSummary');
        const cartItemsCountElement = document.getElementById('cartItemsCount');
        const cartTotalElement = document.getElementById('cartTotal');
        const cartDiscountElement = document.getElementById('cartDiscount');

        if (this.cart.length === 0) {
            cartEmptyElement.style.display = 'block';
            cartSummaryElement.style.display = 'none';
            return;
        }

        cartEmptyElement.style.display = 'none';
        cartSummaryElement.style.display = 'block';

        // Calculate totals
        let total = 0;
        let discount = 0;
        let itemsCount = 0;

        const cartItemsHTML = this.cart.map((item, index) => {
            const itemTotal = item.price * item.quantity;
            total += itemTotal;
            itemsCount += item.quantity;

            // Apply discount for expensive items
            if (item.price > 150000) {
                const itemDiscount = item.price * 0.15 * item.quantity;
                discount += itemDiscount;
                total -= itemDiscount;
            }

            return `
                <div class="cart-item">
                    <div class="cart-item-image">
                        <img src="${item.image}" alt="${item.name}">
                    </div>
                    <div class="cart-item-info">
                        <h4 class="cart-item-title">${item.name}</h4>
                        <div class="cart-item-details">
                            ${item.color} • ${item.storage}
                        </div>
                        <div class="cart-item-price">
                            ${(item.price * item.quantity).toLocaleString()} сом
                        </div>
                    </div>
                    <div class="cart-item-actions">
                        <button class="cart-item-remove" onclick="uiManager.removeFromCart(${index})">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                </div>
            `;
        }).join('');

        cartItemsElement.innerHTML = cartItemsHTML;
        cartItemsCountElement.textContent = itemsCount;
        cartTotalElement.textContent = total.toLocaleString() + ' сом';
        cartDiscountElement.textContent = discount > 0 ? `-${discount.toLocaleString()} сом` : '0 сом';
    }

    buyNow(productId) {
        const product = this.productsData[productId];
        if (!product) return;

        this.addToCartWithOptions(productId);
        setTimeout(() => {
            this.openCart();
        }, 500);
    }

    checkout() {
        if (this.cart.length === 0) {
            this.showNotification('Корзина пуста');
            return;
        }

        // Simulate checkout process
        this.showNotification('Оформление заказа...');
        
        setTimeout(() => {
            this.showNotification('Заказ успешно оформлен!');
            
            // Clear cart
            this.cart = [];
            this.saveCart();
            this.updateCartCount();
            this.closeCart();
            
            // Show success message
            setTimeout(() => {
                this.showNotification('Спасибо за покупку! С вами свяжется менеджер.');
            }, 1000);
        }, 2000);
    }

    openModal(modalId) {
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.classList.add('active');
            document.body.style.overflow = 'hidden';
            this.currentModal = modalId;
        }
    }

    closeModal(modalId) {
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.classList.remove('active');
            document.body.style.overflow = 'auto';
            this.currentModal = null;
        }
    }

    showNotification(message) {
        const notification = document.getElementById('notification');
        const messageElement = document.getElementById('notificationMessage');
        
        if (!notification || !messageElement) return;
        
        messageElement.textContent = message;
        notification.classList.add('show');
        
        setTimeout(() => {
            notification.classList.remove('show');
        }, 3000);
    }
}

// Initialize UI Manager when DOM is loaded
let uiManager;

document.addEventListener('DOMContentLoaded', () => {
    uiManager = new UIManager();
    
    // Global functions for inline event handlers
    window.uiManager = uiManager;
    window.openCart = () => uiManager.openCart();
    window.closeCart = () => uiManager.closeCart();
    window.checkout = () => uiManager.checkout();
    window.closeModal = (modalId) => uiManager.closeModal(modalId);
});

// Expose for inline event handlers
function openProductDetails(productId) {
    if (uiManager) uiManager.openProductDetails(productId);
}

function addToCartSimple(productId) {
    if (uiManager) uiManager.addToCartSimple(productId);
}

function openCart() {
    if (uiManager) uiManager.openCart();
}

function closeCart() {
    if (uiManager) uiManager.closeCart();
}