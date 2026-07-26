# AI Debug Report - S_13-15-37_Products

## 📊 Environment & Diagnostics
| Parameter | Value |
| :--- | :--- |
| **URL** | [http://localhost:8081/products](http://localhost:8081/products) |
| **User Agent** | `Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/149.0.0.0 Safari/537.36` |
| **Viewport Size** | 1920x953 (PixelRatio: 1) |
| **Screen Resolution** | 1920x1080 |
| **Network** | Online: `true`, Type: `4g` |
| **DOM Size** | 534 elements |

## 🖼️ Screenshot
![Screenshot](../screenshots/S_13-15-37_Products.jpg)

## 📂 Quick Links
* [Open Full Screenshot](file:///D:/Magazine/_PigmentShop/.docs/manual-browser-log/screenshots/S_13-15-37_Products.jpg)
* [Open Raw State JSON](file:///D:/Magazine/_PigmentShop/.docs/manual-browser-log/state/state_S_13-15-37_Products.json)

## 📜 Console Warnings & Errors (Recent 0)
| Timestamp | Type | Message |
| :--- | :--- | :--- |
| | N/A | No warnings or errors logged | |

## 📦 Application State Dump
```json
{
  "url": "http://localhost:8081/products",
  "userAgent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/149.0.0.0 Safari/537.36",
  "screen": {
    "viewportWidth": 1920,
    "viewportHeight": 953,
    "devicePixelRatio": 1,
    "width": 1920,
    "height": 1080
  },
  "network": {
    "online": true,
    "effectiveType": "4g"
  },
  "dom": {
    "elementCount": 534
  },
  "history": {
    "length": 29
  },
  "storage": {
    "localStorage": {
      "all_products_filters": "{\"__v\":1,\"data\":{\"priceMin\":\"\",\"priceMax\":\"\",\"inStock\":false,\"outOfStock\":false,\"onSale\":false,\"isNew\":false,\"categoryIds\":[]}}",
      "all_products_sort_key": "{\"__v\":1,\"data\":\"price_desc\"}",
      "cart_items": "{\"__v\":1,\"data\":[{\"id\":\"prod-2-2-2-1\",\"label\":\"Product 2-2-2-1 EN\",\"price\":388,\"qty\":1,\"image\":\"https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?w=600&auto=format&fit=crop\"}]}"
    },
    "sessionStorage": {
      "all_products_filters": "{\"__v\":1,\"data\":{\"priceMin\":\"\",\"priceMax\":\"\",\"inStock\":false,\"outOfStock\":false,\"onSale\":false,\"isNew\":false,\"categoryIds\":[]}}",
      "all_products_sort_key": "{\"__v\":1,\"data\":\"price_desc\"}",
      "cart_items": "{\"__v\":1,\"data\":[{\"id\":\"prod-2-2-2-1\",\"label\":\"Product 2-2-2-1 EN\",\"price\":388,\"qty\":1,\"image\":\"https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?w=600&auto=format&fit=crop\"}]}"
    }
  },
  "state": {
    "auth": {
      "isLoggedIn": true,
      "user": {
        "uid": "oMecAiYQcGbzyyhow1WNvnmX1S43",
        "email": "admin@pigment-shop.com",
        "displayName": null
      }
    },
    "cart": {
      "items": [
        {
          "id": "prod-2-2-2-1",
          "label": "Product 2-2-2-1 EN",
          "price": 388,
          "qty": 1,
          "image": "https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?w=600&auto=format&fit=crop"
        }
      ],
      "totalCount": 1
    },
    "favorites": {
      "items": [
        {
          "sold": 14,
          "reviews": [],
          "brand": "LOVELY",
          "stock": 54,
          "children": [],
          "sku": "BASES-TOPS-112",
          "discountPercent": 0,
          "isNew": true,
          "category": "Базовые наборы 1",
          "image": "https://images.unsplash.com/photo-1582201942988-13e60e4556ee?w=600&auto=format&fit=crop",
          "price": 205,
          "description": "Плоский универсальный продукт для базовые наборы 1.",
          "id": "p-cat-essentials-1-1-2",
          "subcategory": "",
          "label": "Базовые наборы 1 2"
        },
        {
          "id": "p-cat-essentials-2-1-3",
          "subcategory": "",
          "label": "Финишные решения 1 3",
          "description": "Плоский универсальный продукт для финишные решения 1.",
          "price": 250,
          "image": "https://images.unsplash.com/photo-1616683693504-3ea7e9ad6fec?w=600&auto=format&fit=crop",
          "category": "Финишные решения 1",
          "sku": "BASES-TOPS-213",
          "discountPercent": 10,
          "isNew": true,
          "brand": "CHEYENNE",
          "stock": 61,
          "children": [],
          "reviews": [],
          "sold": 17
        },
        {
          "price": 160,
          "description": "Плоский универсальный продукт для премиум наборы 2.",
          "id": "p-cat-essentials-3-2-1",
          "subcategory": "",
          "label": "Премиум наборы 2 1",
          "category": "Премиум наборы 2",
          "image": "https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?w=600&auto=format&fit=crop",
          "brand": "BARBARA",
          "stock": 47,
          "children": [],
          "sku": "BASES-TOPS-321",
          "discountPercent": 0,
          "isNew": true,
          "reviews": [],
          "sold": 12
        },
        {
          "price": 162,
          "description": {
            "ru": "Универсальный продукт для Product 1-1-4-1 RU",
            "en": "Универсальный продукт для Product 1-1-4-1 EN",
            "uk": "Универсальный продукт для Product 1-1-4-1 UK"
          },
          "id": "prod-1-1-4-1",
          "label": {
            "en": "Product 1-1-4-1 EN",
            "ru": "Product 1-1-4-1 RU",
            "uk": "Product 1-1-4-1 UK"
          },
          "active": true,
          "image": "https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?w=600&auto=format&fit=crop",
          "stock": 55,
          "brand": "CHEYENNE",
          "sku": "SKU-PROD-1-1-4-1",
          "isNew": false,
          "discountPercent": 11,
          "productHolderCategory": {
            "uk": "Group 1-1-4 UK",
            "en": "Group 1-1-4 EN",
            "ru": "Group 1-1-4 RU"
          },
          "images": [
            "https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?w=600&auto=format&fit=crop"
          ],
          "holderCategory": {
            "uk": "Subcategory 1-1 UK",
            "ru": "Subcategory 1-1 RU",
            "en": "Subcategory 1-1 EN"
          },
          "sold": 9
        },
        {
          "reviews": [],
          "brand": "LOVELY",
          "children": [],
          "sku": "SKU-PROD-3-3-3-2",
          "discountPercent": 0,
          "isNew": false,
          "category": "Group 3-3-3 RU",
          "image": "https://images.unsplash.com/photo-1582201942988-13e60e4556ee?w=600&auto=format&fit=crop",
          "price": 817,
          "description": "Универсальный продукт для Product 3-3-3-2 RU",
          "isCategory": false,
          "categoryId": "cat-root-2-sub-2-sub-2",
          "id": "prod-3-3-3-2",
          "label": "Product 3-3-3-2 RU",
          "subcategory": ""
        },
        {
          "category": "Group 3-3-3 RU",
          "image": "https://images.unsplash.com/photo-1616683693504-3ea7e9ad6fec?w=600&auto=format&fit=crop",
          "price": 417,
          "description": "Универсальный продукт для Product 3-3-3-3 RU",
          "subcategory": "",
          "label": "Product 3-3-3-3 RU",
          "isCategory": false,
          "categoryId": "cat-root-2-sub-2-sub-2",
          "id": "prod-3-3-3-3",
          "reviews": [],
          "children": [],
          "brand": "LOVELY",
          "isNew": false,
          "discountPercent": 0,
          "sku": "SKU-PROD-3-3-3-3"
        },
        {
          "brand": "CHEYENNE",
          "children": [],
          "sku": "SKU-PROD-3-3-3-4",
          "discountPercent": 0,
          "isNew": false,
          "reviews": [],
          "description": "Универсальный продукт для Product 3-3-3-4 RU",
          "price": 812,
          "categoryId": "cat-root-2-sub-2-sub-2",
          "isCategory": false,
          "id": "prod-3-3-3-4",
          "label": "Product 3-3-3-4 RU",
          "subcategory": "",
          "category": "Group 3-3-3 RU",
          "image": "https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?w=600&auto=format&fit=crop"
        },
        {
          "image": "https://images.unsplash.com/photo-1616683693504-3ea7e9ad6fec?w=600&auto=format&fit=crop",
          "category": "Group 3-3-4 RU",
          "label": "Product 3-3-4-2 RU",
          "subcategory": "",
          "isCategory": false,
          "categoryId": "cat-root-2-sub-2-sub-3",
          "id": "prod-3-3-4-2",
          "description": "Универсальный продукт для Product 3-3-4-2 RU",
          "price": 289,
          "reviews": [],
          "isNew": true,
          "discountPercent": 0,
          "sku": "SKU-PROD-3-3-4-2",
          "children": [],
          "brand": "BARBARA"
        },
        {
          "description": "Универсальный продукт для Product 3-3-4-3 RU",
          "price": 913,
          "id": "prod-3-3-4-3",
          "categoryId": "cat-root-2-sub-2-sub-3",
          "isCategory": false,
          "label": "Product 3-3-4-3 RU",
          "subcategory": "",
          "category": "Group 3-3-4 RU",
          "image": "https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?w=600&auto=format&fit=crop",
          "brand": "CHEYENNE",
          "children": [],
          "sku": "SKU-PROD-3-3-4-3",
          "discountPercent": 0,
          "isNew": false,
          "reviews": []
        },
        {
          "reviews": [],
          "brand": "BARBARA",
          "children": [],
          "sku": "SKU-PROD-1-4-1-3",
          "isNew": false,
          "discountPercent": 0,
          "category": "Category 1 RU",
          "image": "https://images.unsplash.com/photo-1616683693504-3ea7e9ad6fec?w=600&auto=format&fit=crop",
          "price": 968,
          "description": "Универсальный продукт для Product 1-4-1-3 RU",
          "categoryId": "cat-root-0-sub-3-sub-0",
          "isCategory": false,
          "id": "prod-1-4-1-3",
          "label": "Product 1-4-1-3 RU",
          "subcategory": "Subcategory 1-4 RU"
        },
        {
          "subcategory": "Subcategory 1-1 RU",
          "label": "Product 1-1-2-4 RU",
          "isCategory": false,
          "categoryId": "cat-root-0-sub-0-sub-1",
          "id": "prod-1-1-2-4",
          "description": "Универсальный продукт для Product 1-1-2-4 RU",
          "price": 943,
          "image": "https://images.unsplash.com/photo-1582201942988-13e60e4556ee?w=600&auto=format&fit=crop",
          "category": "Category 1 RU",
          "isNew": true,
          "discountPercent": 0,
          "sku": "SKU-PROD-1-1-2-4",
          "children": [],
          "brand": "BARBARA",
          "reviews": []
        },
        {
          "label": "Product 2-1-1-3 RU",
          "subcategory": "Subcategory 2-1 RU",
          "isCategory": false,
          "categoryId": "cat-root-1-sub-0-sub-0",
          "id": "prod-2-1-1-3",
          "price": 941,
          "description": "Универсальный продукт для Product 2-1-1-3 RU",
          "image": "https://images.unsplash.com/photo-1582201942988-13e60e4556ee?w=600&auto=format&fit=crop",
          "category": "Category 2 RU",
          "discountPercent": 0,
          "isNew": false,
          "sku": "SKU-PROD-2-1-1-3",
          "children": [],
          "brand": "CHEYENNE",
          "reviews": []
        },
        {
          "image": "https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?w=600&auto=format&fit=crop",
          "category": "Group 3-3-1 RU",
          "isCategory": false,
          "categoryId": "cat-root-2-sub-2-sub-0",
          "id": "prod-3-3-1-2",
          "subcategory": "",
          "label": "Product 3-3-1-2 RU",
          "description": "Универсальный продукт для Product 3-3-1-2 RU",
          "price": 154,
          "reviews": [],
          "sku": "SKU-PROD-3-3-1-2",
          "isNew": false,
          "discountPercent": 0,
          "brand": "CHEYENNE",
          "children": []
        },
        {
          "isCategory": false,
          "categoryId": "cat-root-2-sub-2-sub-1",
          "id": "prod-3-3-2-1",
          "label": "Product 3-3-2-1 RU",
          "subcategory": "",
          "description": "Универсальный продукт для Product 3-3-2-1 RU",
          "price": 88,
          "image": "https://images.unsplash.com/photo-1582201942988-13e60e4556ee?w=600&auto=format&fit=crop",
          "category": "Group 3-3-2 RU",
          "sku": "SKU-PROD-3-3-2-1",
          "isNew": false,
          "discountPercent": 0,
          "brand": "CHEYENNE",
          "children": [],
          "reviews": []
        },
        {
          "isNew": false,
          "discountPercent": 0,
          "sku": "SKU-PROD-2-2-1-1",
          "stock": 64,
          "brand": "CHEYENNE",
          "sold": 9,
          "holderCategory": {
            "uk": "Subcategory 2-2 UK",
            "en": "Subcategory 2-2 EN",
            "ru": "Subcategory 2-2 RU"
          },
          "images": [
            "https://images.unsplash.com/photo-1582201942988-13e60e4556ee?w=600&auto=format&fit=crop"
          ],
          "productHolderCategory": {
            "en": "Group 2-2-1 EN",
            "ru": "Group 2-2-1 RU",
            "uk": "Group 2-2-1 UK"
          },
          "label": {
            "uk": "Product 2-2-1-1 UK",
            "ru": "Product 2-2-1-1 RU",
            "en": "Product 2-2-1-1 EN"
          },
          "id": "prod-2-2-1-1",
          "description": {
            "uk": "Универсальный продукт для Product 2-2-1-1 UK",
            "ru": "Универсальный продукт для Product 2-2-1-1 RU",
            "en": "Универсальный продукт для Product 2-2-1-1 EN"
          },
          "price": 598,
          "image": "https://images.unsplash.com/photo-1582201942988-13e60e4556ee?w=600&auto=format&fit=crop",
          "active": true
        },
        {
          "id": "prod-1-1-1-1",
          "label": {
            "en": "Product 1-1-1-1 EN",
            "ru": "Product 1-1-1-1 RU",
            "uk": "Product 1-1-1-1 UK"
          },
          "description": {
            "uk": "Универсальный продукт для Product 1-1-1-1 UK",
            "ru": "Универсальный продукт для Product 1-1-1-1 RU",
            "en": "Универсальный продукт для Product 1-1-1-1 EN"
          },
          "price": 398,
          "image": "https://images.unsplash.com/photo-1582201942988-13e60e4556ee?w=600&auto=format&fit=crop",
          "active": true,
          "sku": "SKU-PROD-1-1-1-1",
          "isNew": false,
          "discountPercent": 0,
          "brand": "CHEYENNE",
          "stock": 75,
          "holderCategory": {
            "uk": "Subcategory 1-1 UK",
            "ru": "Subcategory 1-1 RU",
            "en": "Subcategory 1-1 EN"
          },
          "sold": 34,
          "productHolderCategory": {
            "en": "Group 1-1-1 EN",
            "ru": "Group 1-1-1 RU",
            "uk": "Group 1-1-1 UK"
          },
          "images": [
            "https://images.unsplash.com/photo-1582201942988-13e60e4556ee?w=600&auto=format&fit=crop"
          ]
        },
        {
          "image": "https://images.unsplash.com/photo-1616683693504-3ea7e9ad6fec?w=600&auto=format&fit=crop",
          "category": "Category 2 RU",
          "subcategory": "Subcategory 2-1 RU",
          "label": "Product 2-1-2-1 RU",
          "id": "prod-2-1-2-1",
          "categoryId": "cat-root-1-sub-0-sub-1",
          "isCategory": false,
          "price": 645,
          "description": "Универсальный продукт для Product 2-1-2-1 RU",
          "reviews": [],
          "isNew": false,
          "discountPercent": 0,
          "sku": "SKU-PROD-2-1-2-1",
          "children": [],
          "brand": "LOVELY"
        },
        {
          "label": "Product 1-1-2-1 RU11111",
          "subcategory": "Subcategory 1-1 RU",
          "id": "prod-1-1-2-1",
          "isCategory": false,
          "categoryId": "cat-root-0-sub-0-sub-1",
          "price": 893,
          "description": "Универсальный продукт для Product 1-1-2-1 RU",
          "image": "https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?w=600&auto=format&fit=crop",
          "category": "Category 1 RU",
          "isNew": false,
          "discountPercent": 34,
          "sku": "SKU-PROD-1-1-2-1",
          "children": [],
          "brand": "BARBARA",
          "reviews": []
        },
        {
          "image": "https://images.unsplash.com/photo-1582201942988-13e60e4556ee?w=600&auto=format&fit=crop",
          "category": "Category 2 RU",
          "label": "Product 2-1-1-1 RU",
          "subcategory": "Subcategory 2-1 RU",
          "categoryId": "cat-root-1-sub-0-sub-0",
          "isCategory": false,
          "id": "prod-2-1-1-1",
          "price": 132,
          "description": "Универсальный продукт для Product 2-1-1-1 RU",
          "reviews": [],
          "isNew": true,
          "discountPercent": 0,
          "sku": "SKU-PROD-2-1-1-1",
          "children": [],
          "brand": "LOVELY"
        }
      ]
    },
    "language": {},
    "theme": {
      "isDark": false
    }
  }
}
```
