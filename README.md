# FoodDash — Restaurant Ordering Frontend

A complete React.js + Vite frontend implementing the supplied restaurant-ordering requirements.

## Included

### Customer frontend
- Register
- Login
- Forgot-password demo message
- Logout
- Restaurant listing with:
  - Restaurant name
  - Restaurant image
  - Cuisine
  - Rating
  - Delivery time
  - Delivery fee
  - Open/closed status
- Restaurant menu page
  - Menu categories
  - Item name
  - Description
  - Price
  - Add item / quantity controls
  - Cart preview
- Shopping cart
  - Add/remove items
  - Increase/decrease quantity
  - Subtotal
  - Delivery
  - Tax
  - Total
  - Cart validation
- Checkout and payment
  - Delivery address
  - Order summary
  - Card / UPI / Wallet selection
  - Pay now flow
- Order tracking
  - PLACED
  - ACCEPTED
  - REJECTED
  - PREPARING
  - OUT_FOR_DELIVERY
  - DELIVERED
  - CANCELLED

### Restaurant operator dashboard
- Today's orders
- Pending orders
- Completed orders
- Rejected orders
- Accept / reject orders
- Progress orders through statuses
- Menu management UI

## Run

Requirements:
- Node.js 18+ recommended

Commands:

```bash
npm install
npm run dev
```

Open the URL printed by Vite, normally:

http://localhost:5173

For a production build:

```bash
npm run build
npm run preview
```

## Notes

This package is a frontend demo and stores login, cart and orders in browser `localStorage`. It does not require a backend to demonstrate the requested UI and flows.
