# Javeo E-Commerce & cPanel Server Integration Reference

This document serves as the persistent memory and technical blueprint for the **Javeo Skincare** storefront and its **cPanel Backend Engine (`server2`)**.

---

## 1. Core Tenancy & Environment Configurations

| Parameter | Value / Details |
| :--- | :--- |
| **Store ID** | `javeo-store-uuid-3333-4444` |
| **Local API URL** | `http://localhost:8085/api` |
| **Production API URL** | `https://api.clickkarte.com/api` |
| **Backend Directory** | `/Users/priyanshunayak/Desktop/cpanael/server2` |
| **Frontend Directory** | `/Users/priyanshunayak/Desktop/javeo/web` |
| **Cart Storage Key** | `javeo_cart_session` (Stored in browser `localStorage`) |
| **Customer Auth Key** | `javeo_customer_token` (Stored in browser `localStorage`) |
| **Free Shipping Goal** | `₹1,000` (Calculated automatically by backend) |
| **Standard GST Rate** | `18%` (Tax-inclusive calculations) |

---

## 2. Database Schema Updates (`cPanel MySQL`)

The following additions were introduced to support complete customer profiles, addresses, and order workflows:

### A. `Customer` Table
```sql
CREATE TABLE IF NOT EXISTS `Customer` (
  `id` VARCHAR(191) NOT NULL PRIMARY KEY,
  `email` VARCHAR(191) NOT NULL,
  `passwordHash` VARCHAR(191) NOT NULL,
  `name` VARCHAR(191) NULL,
  `phone` VARCHAR(191) NULL,
  `skinType` VARCHAR(100) NULL,           -- e.g. Normal, Dry, Oily, Combination, Sensitive
  `skinConcerns` VARCHAR(255) NULL,       -- e.g. Acne, Hyperpigmentation, Anti-Aging
  `avatarUrl` VARCHAR(500) NULL,
  `status` VARCHAR(50) NOT NULL DEFAULT 'active',
  `storeId` VARCHAR(191) NOT NULL,
  `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3),
  UNIQUE KEY `storeId_email` (`storeId`, `email`),
  FOREIGN KEY (`storeId`) REFERENCES `Store`(`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
```

### B. `CustomerAddress` Table
```sql
CREATE TABLE IF NOT EXISTS `CustomerAddress` (
  `id` VARCHAR(191) NOT NULL PRIMARY KEY,
  `customerId` VARCHAR(191) NOT NULL,
  `name` VARCHAR(191) NULL,               -- Recipient full name
  `phone` VARCHAR(50) NULL,               -- Delivery contact phone
  `tag` VARCHAR(50) NOT NULL DEFAULT 'Home', -- 'Home', 'Work', 'Other'
  `street` VARCHAR(191) NOT NULL,
  `city` VARCHAR(191) NOT NULL,
  `state` VARCHAR(191) NOT NULL,
  `postalCode` VARCHAR(191) NOT NULL,
  `country` VARCHAR(191) NOT NULL DEFAULT 'India',
  `isDefault` TINYINT(1) NOT NULL DEFAULT 0,
  `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3),
  FOREIGN KEY (`customerId`) REFERENCES `Customer`(`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
```

---

## 3. Customer Authentication & Profile API (`/api/customer`)

Managed by `/Users/priyanshunayak/Desktop/cpanael/server2/api/customer/index.php`.

### 1. Register Customer
* **Endpoint**: `POST /api/customer/register`
* **Body**:
  ```json
  {
    "storeId": "javeo-store-uuid-3333-4444",
    "name": "Full Name",
    "email": "customer@javeo.in",
    "phone": "+91 9876543210",
    "password": "password123",
    "skinType": "Combination",
    "skinConcerns": "Hyperpigmentation, Anti-Aging"
  }
  ```
* **Returns**: `{ success: true, data: { token, customer } }`

### 2. Login Customer
* **Endpoint**: `POST /api/customer/login`
* **Body**:
  ```json
  {
    "storeId": "javeo-store-uuid-3333-4444",
    "email": "customer@javeo.in",
    "password": "password123"
  }
  ```
* **Returns**: `{ success: true, data: { token, customer } }`

### 3. Get / Update Profile
* **Endpoint**: `GET /api/customer/me` and `PUT /api/customer/me`
* **Headers**: `Authorization: Bearer <token>`
* **Returns**: Full profile with saved addresses and aggregate order stats (`totalOrders`, `totalSpent`).

### 4. Customer Order History
* **Endpoint**: `GET /api/customer/orders`
* **Headers**: `Authorization: Bearer <token>`
* **Returns**: List of orders placed by this customer, including item details, payment status, and Shipway tracking number.

### 5. Address Book
* **Endpoints**:
  * `GET /api/customer/addresses`
  * `POST /api/customer/addresses`
  * `DELETE /api/customer/addresses?addressId=...`
* **Headers**: `Authorization: Bearer <token>`

---

## 4. Shopping Cart API (`/api/cart`)

Managed by `/Users/priyanshunayak/Desktop/cpanael/server2/api/cart/index.php`.

### 1. Get Cart
* **Endpoint**: `GET /api/cart?storeId=javeo-store-uuid-3333-4444&sessionToken=<token>`
* **Returns**: `{ cartId, itemCount, items: [...], summary: { subtotal, gstRate, taxAmount, shippingFee, totalAmount }, validation }`

### 2. Add Item to Cart
* **Endpoint**: `POST /api/cart`
* **Body**:
  ```json
  {
    "storeId": "javeo-store-uuid-3333-4444",
    "sessionToken": "sess_...",
    "productId": 57,
    "quantity": 1,
    "variantId": null
  }
  ```
* **Returns**: Updated cart payload with `sessionToken`.

### 3. Update Item Quantity
* **Endpoint**: `PUT /api/cart`
* **Body**:
  ```json
  {
    "storeId": "javeo-store-uuid-3333-4444",
    "sessionToken": "sess_...",
    "productId": 57,
    "quantity": 2,
    "variantId": null
  }
  ```

### 4. Remove Item / Clear Cart
* **Endpoint**: `DELETE /api/cart?storeId=...&sessionToken=...&productId=...`
* **Or Clear All**: `DELETE /api/cart?storeId=...&sessionToken=...&action=clear`

---

## 5. Orders & Checkout API (`/api/orders`)

* **Endpoint**: `POST /api/orders`
* **Body**:
  ```json
  {
    "storeId": "javeo-store-uuid-3333-4444",
    "sessionToken": "sess_...",
    "customerName": "Customer Name",
    "customerEmail": "customer@javeo.in",
    "customerPhone": "+91 9876543210",
    "shippingAddress": {
      "address": "Street Address",
      "city": "City",
      "state": "State",
      "pincode": "751001"
    },
    "items": [
      { "productId": 57, "quantity": 1, "variantId": null }
    ],
    "paymentMethod": "cod"
  }
  ```
* **Effect**:
  1. Validates stock in `Product` & `ProductVariant`.
  2. Inserts record into `Order` & `OrderItem`.
  3. Automatically decrements inventory.
  4. Automatically clears the customer's cart session.
  5. Returns created order with `orderId`.

---

## 6. Frontend Architecture & Contexts (`javeo/web`)

1. **`src/context/CartContext.js`**:
   * Global state for cart items, summary calculations, drawer open/close (`openCart`, `closeCart`).
   * Manages `sessionToken` in `localStorage`.
2. **`src/context/AuthContext.js`**:
   * Global customer auth state (`login`, `register`, `logout`, `updateProfile`, `fetchOrders`, `addAddress`, `deleteAddress`).
   * Manages `token` in `localStorage`.
3. **`src/utils/api.js`**:
   * Axios instance configured with auto-attached Bearer tokens from `localStorage`.
4. **`src/components/cart/CartDrawer.jsx`**:
   * Luxury slide-over cart drawer with free shipping progress bar, quantity steppers, item deletion, and checkout buttons.
5. **Routes**:
   * `/account`: Customer portal with Sign In/Register, Profile, Orders history, and Saved Addresses.
   * `/cart`: Dedicated full-page cart overview.
   * `/checkout`: Streamlined 1-page checkout with COD and online payment options.
   * `/products/?id=...`: Dynamic product details with quantity selection and variant handling.
   * `/shop`: Product catalog with live search, filters, and add-to-cart.
   * `/wishlist`: Saved products with direct add-to-cart.
