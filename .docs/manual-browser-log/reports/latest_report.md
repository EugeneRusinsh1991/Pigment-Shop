# AI Debug Report - S_13-27-52_Admin

## 📊 Environment & Diagnostics
| Parameter | Value |
| :--- | :--- |
| **URL** | [http://localhost:8081/admin](http://localhost:8081/admin) |
| **User Agent** | `Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/149.0.0.0 Safari/537.36` |
| **Viewport Size** | 1920x953 (PixelRatio: 1) |
| **Screen Resolution** | 1920x1080 |
| **Network** | Online: `true`, Type: `4g` |
| **DOM Size** | 340 elements |

## 🖼️ Screenshot
![Screenshot](../screenshots/S_13-27-52_Admin.jpg)

## 📂 Quick Links
* [Open Full Screenshot](file:///D:/Magazine/_PigmentShop/.docs/manual-browser-log/screenshots/S_13-27-52_Admin.jpg)
* [Open Raw State JSON](file:///D:/Magazine/_PigmentShop/.docs/manual-browser-log/state/state_S_13-27-52_Admin.json)

## 📜 Console Warnings & Errors (Recent 0)
| Timestamp | Type | Message |
| :--- | :--- | :--- |
| | N/A | No warnings or errors logged | |

## 📦 Application State Dump
```json
{
  "url": "http://localhost:8081/admin",
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
    "elementCount": 340
  },
  "history": {
    "length": 9
  },
  "storage": {
    "localStorage": {
      "all_products_filters": "{\"__v\":1,\"data\":{\"priceMin\":\"\",\"priceMax\":\"\",\"inStock\":true,\"outOfStock\":true,\"onSale\":true,\"isNew\":false,\"categoryIds\":[]}}",
      "all_products_sort_key": "{\"__v\":1,\"data\":\"price_desc\"}",
      "cart_items": "{\"__v\":1,\"data\":[{\"id\":\"prod-2-2-2-1\",\"label\":\"Product 2-2-2-1 EN\",\"price\":388,\"qty\":1,\"image\":\"https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?w=600&auto=format&fit=crop\"}]}"
    },
    "sessionStorage": {
      "all_products_filters": "{\"__v\":1,\"data\":{\"priceMin\":\"\",\"priceMax\":\"\",\"inStock\":true,\"outOfStock\":true,\"onSale\":true,\"isNew\":false,\"categoryIds\":[]}}",
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
          "sku": "BASES-TOPS-112",
          "description": "Плоский универсальный продукт для базовые наборы 1.",
          "id": "p-cat-essentials-1-1-2",
          "discountPercent": 0,
          "brand": "LOVELY",
          "sold": 14,
          "stock": 54,
          "children": [],
          "label": "Базовые наборы 1 2",
          "reviews": [],
          "price": 205,
          "category": "Базовые наборы 1",
          "isNew": true,
          "image": "https://images.unsplash.com/photo-1582201942988-13e60e4556ee?w=600&auto=format&fit=crop",
          "subcategory": ""
        },
        {
          "sku": "BASES-TOPS-213",
          "description": "Плоский универсальный продукт для финишные решения 1.",
          "id": "p-cat-essentials-2-1-3",
          "discountPercent": 10,
          "brand": "CHEYENNE",
          "sold": 17,
          "stock": 61,
          "children": [],
          "reviews": [],
          "label": "Финишные решения 1 3",
          "price": 250,
          "category": "Финишные решения 1",
          "isNew": true,
          "image": "https://images.unsplash.com/photo-1616683693504-3ea7e9ad6fec?w=600&auto=format&fit=crop",
          "subcategory": ""
        },
        {
          "isNew": true,
          "image": "https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?w=600&auto=format&fit=crop",
          "category": "Премиум наборы 2",
          "price": 160,
          "subcategory": "",
          "description": "Плоский универсальный продукт для премиум наборы 2.",
          "id": "p-cat-essentials-3-2-1",
          "sku": "BASES-TOPS-321",
          "label": "Премиум наборы 2 1",
          "reviews": [],
          "children": [],
          "sold": 12,
          "stock": 47,
          "brand": "BARBARA",
          "discountPercent": 0
        },
        {
          "active": true,
          "image": "https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?w=600&auto=format&fit=crop",
          "isNew": false,
          "price": 162,
          "holderCategory": {
            "uk": "Subcategory 1-1 UK",
            "ru": "Subcategory 1-1 RU",
            "en": "Subcategory 1-1 EN"
          },
          "productHolderCategory": {
            "ru": "Group 1-1-4 RU",
            "en": "Group 1-1-4 EN",
            "uk": "Group 1-1-4 UK"
          },
          "label": {
            "uk": "Product 1-1-4-1 UK",
            "en": "Product 1-1-4-1 EN",
            "ru": "Product 1-1-4-1 RU"
          },
          "stock": 55,
          "sold": 9,
          "images": [
            "https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?w=600&auto=format&fit=crop"
          ],
          "brand": "CHEYENNE",
          "discountPercent": 11,
          "id": "prod-1-1-4-1",
          "description": {
            "en": "Универсальный продукт для Product 1-1-4-1 EN",
            "ru": "Универсальный продукт для Product 1-1-4-1 RU",
            "uk": "Универсальный продукт для Product 1-1-4-1 UK"
          },
          "sku": "SKU-PROD-1-1-4-1"
        },
        {
          "subcategory": "",
          "categoryId": "cat-root-2-sub-2-sub-2",
          "category": "Group 3-3-3 RU",
          "isNew": false,
          "image": "https://images.unsplash.com/photo-1582201942988-13e60e4556ee?w=600&auto=format&fit=crop",
          "price": 817,
          "children": [],
          "reviews": [],
          "label": "Product 3-3-3-2 RU",
          "discountPercent": 0,
          "isCategory": false,
          "brand": "LOVELY",
          "sku": "SKU-PROD-3-3-3-2",
          "description": "Универсальный продукт для Product 3-3-3-2 RU",
          "id": "prod-3-3-3-2"
        },
        {
          "categoryId": "cat-root-2-sub-2-sub-2",
          "subcategory": "",
          "price": 417,
          "isNew": false,
          "image": "https://images.unsplash.com/photo-1616683693504-3ea7e9ad6fec?w=600&auto=format&fit=crop",
          "category": "Group 3-3-3 RU",
          "discountPercent": 0,
          "isCategory": false,
          "brand": "LOVELY",
          "label": "Product 3-3-3-3 RU",
          "reviews": [],
          "children": [],
          "description": "Универсальный продукт для Product 3-3-3-3 RU",
          "id": "prod-3-3-3-3",
          "sku": "SKU-PROD-3-3-3-3"
        },
        {
          "id": "prod-3-3-3-4",
          "description": "Универсальный продукт для Product 3-3-3-4 RU",
          "sku": "SKU-PROD-3-3-3-4",
          "reviews": [],
          "label": "Product 3-3-3-4 RU",
          "children": [],
          "isCategory": false,
          "discountPercent": 0,
          "brand": "CHEYENNE",
          "image": "https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?w=600&auto=format&fit=crop",
          "isNew": false,
          "category": "Group 3-3-3 RU",
          "price": 812,
          "subcategory": "",
          "categoryId": "cat-root-2-sub-2-sub-2"
        },
        {
          "discountPercent": 0,
          "isCategory": false,
          "brand": "BARBARA",
          "reviews": [],
          "label": "Product 3-3-4-2 RU",
          "children": [],
          "id": "prod-3-3-4-2",
          "description": "Универсальный продукт для Product 3-3-4-2 RU",
          "sku": "SKU-PROD-3-3-4-2",
          "categoryId": "cat-root-2-sub-2-sub-3",
          "subcategory": "",
          "price": 289,
          "image": "https://images.unsplash.com/photo-1616683693504-3ea7e9ad6fec?w=600&auto=format&fit=crop",
          "isNew": true,
          "category": "Group 3-3-4 RU"
        },
        {
          "price": 913,
          "isNew": false,
          "image": "https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?w=600&auto=format&fit=crop",
          "category": "Group 3-3-4 RU",
          "categoryId": "cat-root-2-sub-2-sub-3",
          "subcategory": "",
          "description": "Универсальный продукт для Product 3-3-4-3 RU",
          "id": "prod-3-3-4-3",
          "sku": "SKU-PROD-3-3-4-3",
          "discountPercent": 0,
          "isCategory": false,
          "brand": "CHEYENNE",
          "label": "Product 3-3-4-3 RU",
          "reviews": [],
          "children": []
        },
        {
          "id": "prod-1-4-1-3",
          "description": "Универсальный продукт для Product 1-4-1-3 RU",
          "sku": "SKU-PROD-1-4-1-3",
          "isCategory": false,
          "brand": "BARBARA",
          "discountPercent": 0,
          "label": "Product 1-4-1-3 RU",
          "reviews": [],
          "children": [],
          "price": 968,
          "image": "https://images.unsplash.com/photo-1616683693504-3ea7e9ad6fec?w=600&auto=format&fit=crop",
          "isNew": false,
          "category": "Category 1 RU",
          "categoryId": "cat-root-0-sub-3-sub-0",
          "subcategory": "Subcategory 1-4 RU"
        },
        {
          "subcategory": "Subcategory 1-1 RU",
          "categoryId": "cat-root-0-sub-0-sub-1",
          "category": "Category 1 RU",
          "image": "https://images.unsplash.com/photo-1582201942988-13e60e4556ee?w=600&auto=format&fit=crop",
          "isNew": true,
          "price": 943,
          "children": [],
          "reviews": [],
          "label": "Product 1-1-2-4 RU",
          "isCategory": false,
          "discountPercent": 0,
          "brand": "BARBARA",
          "sku": "SKU-PROD-1-1-2-4",
          "id": "prod-1-1-2-4",
          "description": "Универсальный продукт для Product 1-1-2-4 RU"
        },
        {
          "brand": "CHEYENNE",
          "discountPercent": 0,
          "isCategory": false,
          "label": "Product 2-1-1-3 RU",
          "reviews": [],
          "children": [],
          "id": "prod-2-1-1-3",
          "description": "Универсальный продукт для Product 2-1-1-3 RU",
          "sku": "SKU-PROD-2-1-1-3",
          "categoryId": "cat-root-1-sub-0-sub-0",
          "subcategory": "Subcategory 2-1 RU",
          "price": 941,
          "image": "https://images.unsplash.com/photo-1582201942988-13e60e4556ee?w=600&auto=format&fit=crop",
          "isNew": false,
          "category": "Category 2 RU"
        },
        {
          "price": 154,
          "image": "https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?w=600&auto=format&fit=crop",
          "isNew": false,
          "category": "Group 3-3-1 RU",
          "categoryId": "cat-root-2-sub-2-sub-0",
          "subcategory": "",
          "id": "prod-3-3-1-2",
          "description": "Универсальный продукт для Product 3-3-1-2 RU",
          "sku": "SKU-PROD-3-3-1-2",
          "brand": "CHEYENNE",
          "isCategory": false,
          "discountPercent": 0,
          "reviews": [],
          "label": "Product 3-3-1-2 RU",
          "children": []
        },
        {
          "categoryId": "cat-root-2-sub-2-sub-1",
          "subcategory": "",
          "price": 88,
          "image": "https://images.unsplash.com/photo-1582201942988-13e60e4556ee?w=600&auto=format&fit=crop",
          "isNew": false,
          "category": "Group 3-3-2 RU",
          "discountPercent": 0,
          "brand": "CHEYENNE",
          "isCategory": false,
          "label": "Product 3-3-2-1 RU",
          "reviews": [],
          "children": [],
          "id": "prod-3-3-2-1",
          "description": "Универсальный продукт для Product 3-3-2-1 RU",
          "sku": "SKU-PROD-3-3-2-1"
        },
        {
          "label": {
            "ru": "Product 2-2-1-1 RU",
            "en": "Product 2-2-1-1 EN",
            "uk": "Product 2-2-1-1 UK"
          },
          "stock": 64,
          "sold": 9,
          "images": [
            "https://images.unsplash.com/photo-1582201942988-13e60e4556ee?w=600&auto=format&fit=crop"
          ],
          "brand": "CHEYENNE",
          "discountPercent": 0,
          "id": "prod-2-2-1-1",
          "description": {
            "en": "Универсальный продукт для Product 2-2-1-1 EN",
            "ru": "Универсальный продукт для Product 2-2-1-1 RU",
            "uk": "Универсальный продукт для Product 2-2-1-1 UK"
          },
          "sku": "SKU-PROD-2-2-1-1",
          "active": true,
          "image": "https://images.unsplash.com/photo-1582201942988-13e60e4556ee?w=600&auto=format&fit=crop",
          "isNew": false,
          "price": 598,
          "holderCategory": {
            "uk": "Subcategory 2-2 UK",
            "ru": "Subcategory 2-2 RU",
            "en": "Subcategory 2-2 EN"
          },
          "productHolderCategory": {
            "en": "Group 2-2-1 EN",
            "ru": "Group 2-2-1 RU",
            "uk": "Group 2-2-1 UK"
          }
        },
        {
          "description": {
            "uk": "Универсальный продукт для Product 1-1-1-1 UK",
            "ru": "Универсальный продукт для Product 1-1-1-1 RU",
            "en": "Универсальный продукт для Product 1-1-1-1 EN"
          },
          "id": "prod-1-1-1-1",
          "sku": "SKU-PROD-1-1-1-1",
          "label": {
            "uk": "Product 1-1-1-1 UK",
            "ru": "Product 1-1-1-1 RU",
            "en": "Product 1-1-1-1 EN"
          },
          "sold": 34,
          "stock": 75,
          "images": [
            "https://images.unsplash.com/photo-1582201942988-13e60e4556ee?w=600&auto=format&fit=crop"
          ],
          "discountPercent": 0,
          "brand": "CHEYENNE",
          "isNew": false,
          "image": "https://images.unsplash.com/photo-1582201942988-13e60e4556ee?w=600&auto=format&fit=crop",
          "holderCategory": {
            "en": "Subcategory 1-1 EN",
            "ru": "Subcategory 1-1 RU",
            "uk": "Subcategory 1-1 UK"
          },
          "price": 398,
          "productHolderCategory": {
            "uk": "Group 1-1-1 UK",
            "ru": "Group 1-1-1 RU",
            "en": "Group 1-1-1 EN"
          },
          "active": true
        },
        {
          "categoryId": "cat-root-1-sub-0-sub-1",
          "subcategory": "Subcategory 2-1 RU",
          "price": 645,
          "isNew": false,
          "image": "https://images.unsplash.com/photo-1616683693504-3ea7e9ad6fec?w=600&auto=format&fit=crop",
          "category": "Category 2 RU",
          "isCategory": false,
          "discountPercent": 0,
          "brand": "LOVELY",
          "label": "Product 2-1-2-1 RU",
          "reviews": [],
          "children": [],
          "description": "Универсальный продукт для Product 2-1-2-1 RU",
          "id": "prod-2-1-2-1",
          "sku": "SKU-PROD-2-1-2-1"
        },
        {
          "categoryId": "cat-root-0-sub-0-sub-1",
          "subcategory": "Subcategory 1-1 RU",
          "price": 893,
          "category": "Category 1 RU",
          "image": "https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?w=600&auto=format&fit=crop",
          "isNew": false,
          "discountPercent": 34,
          "isCategory": false,
          "brand": "BARBARA",
          "children": [],
          "reviews": [],
          "label": "Product 1-1-2-1 RU11111",
          "sku": "SKU-PROD-1-1-2-1",
          "id": "prod-1-1-2-1",
          "description": "Универсальный продукт для Product 1-1-2-1 RU"
        },
        {
          "children": [],
          "label": "Product 2-1-1-1 RU",
          "reviews": [],
          "discountPercent": 0,
          "brand": "LOVELY",
          "isCategory": false,
          "sku": "SKU-PROD-2-1-1-1",
          "id": "prod-2-1-1-1",
          "description": "Универсальный продукт для Product 2-1-1-1 RU",
          "subcategory": "Subcategory 2-1 RU",
          "categoryId": "cat-root-1-sub-0-sub-0",
          "category": "Category 2 RU",
          "image": "https://images.unsplash.com/photo-1582201942988-13e60e4556ee?w=600&auto=format&fit=crop",
          "isNew": true,
          "price": 132
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
