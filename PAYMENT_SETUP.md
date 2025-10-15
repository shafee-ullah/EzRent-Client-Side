# EzRent Payment System Setup Guide

This guide explains how to set up and use the Stripe payment system in the EzRent application.

## 🚀 Features

- **Secure Payment Processing**: Uses Stripe for secure payment handling
- **Redux Integration**: Complete state management for payment flows
- **Responsive UI**: Mobile-friendly payment forms with Tailwind CSS
- **Error Handling**: Comprehensive error boundaries and validation
- **Real-time Feedback**: Toast notifications and loading states
- **MongoDB Integration**: Payment records stored securely

## 📋 Prerequisites

1. Stripe account (https://stripe.com)
2. MongoDB database
3. Node.js and npm installed

## ⚙️ Environment Setup

### Frontend (.env file)

```env
VITE_payment_key=pk_test_your_stripe_publishable_key_here
```

### Backend (.env file)

```env
PAYMENT_GATEWAY_KEY=sk_test_your_stripe_secret_key_here
DB_USER=your_mongodb_username
DB_PASS=your_mongodb_password
```

## 🔧 Installation Steps

### 1. Install Dependencies

```bash
# Frontend
cd C:\Projects\ez-rent
npm install

# Backend
cd C:\Projects\ez-rent-server
npm install stripe
```

### 2. Configure Stripe Keys

1. Get your Stripe keys from the Stripe Dashboard
2. Add them to your environment files
3. Use test keys during development

### 3. Start the Servers

```bash
# Backend (Terminal 1)
cd C:\Projects\ez-rent-server
node index.js

# Frontend (Terminal 2)
cd C:\Projects\ez-rent
npm run dev
```

## 🎯 Usage

### Basic Payment Flow

1. User fills out booking form
2. Clicks "Book & Pay Now"
3. Redirected to payment page
4. Enters card details
5. Payment processed via Stripe
6. Confirmation and redirect

### Using PaymentButton Component

```jsx
import PaymentButton from "../Components/PaymentButton";

const MyComponent = () => {
  const bookingData = {
    bookingId: "booking-123",
    userId: "user-456",
    amount: 150,
    propertyName: "Beautiful Villa",
  };

  return (
    <PaymentButton bookingData={bookingData} className="w-full">
      Pay Now
    </PaymentButton>
  );
};
```

### Direct Payment Page Navigation

```jsx
import { useNavigate } from "react-router-dom";

const navigate = useNavigate();
navigate("/payment", {
  state: {
    bookingData: {
      bookingId: "booking-123",
      userId: "user-456",
      amount: 150,
      // ... other booking details
    },
  },
});
```

## 🔒 Security Features

- **No Card Storage**: Card details never stored in database
- **Input Validation**: All inputs validated on frontend and backend
- **Error Handling**: Graceful error handling with user feedback
- **Environment Variables**: Sensitive keys stored securely

## 🧪 Testing

### Test Card Numbers

- **Success**: 4242 4242 4242 4242
- **Decline**: 4000 0000 0000 0002
- **Insufficient Funds**: 4000 0000 0000 9995

### Test CVC and Expiry

- Use any 3-digit CVC
- Use any future expiry date

## 📁 File Structure

```
src/
├── Payment/
│   ├── payment.jsx          # Main payment wrapper
│   └── PaymentForm.jsx      # Stripe payment form
├── Pages/PaymentPage/
│   └── PaymentPage.jsx      # Full payment page
├── Components/
│   ├── PaymentButton.jsx    # Reusable payment button
│   └── PaymentErrorBoundary.jsx # Error handling
├── redux/
│   └── paymentSlice.js      # Redux state management
└── Router/
    └── Router.jsx           # Payment routes
```

## 🔄 Payment Flow

1. **Booking Creation**: User creates booking via CheckoutForm
2. **Payment Intent**: Backend creates Stripe PaymentIntent
3. **Client Secret**: Frontend receives client secret
4. **Card Confirmation**: Stripe confirms payment
5. **Database Storage**: Payment details stored in MongoDB
6. **Success Response**: User receives confirmation

## 🛠️ API Endpoints

### POST /api/payment/create-payment-intent

Creates a new Stripe PaymentIntent

```json
{
  "amount": 150,
  "bookingId": "booking-123",
  "userId": "user-456"
}
```

### POST /api/payment/confirm

Confirms payment and stores in database

```json
{
  "transactionId": "pi_1234567890",
  "amount": 150,
  "bookingId": "booking-123",
  "userId": "user-456",
  "status": "succeeded"
}
```

### GET /api/payments/user/:userId

Retrieves payment history for a user

### GET /api/payments/transaction/:transactionId

Retrieves specific payment details

## 🐛 Troubleshooting

### Common Issues

1. **"Payment system not ready"**

   - Check if Stripe keys are properly configured
   - Verify network connection

2. **"Failed to create payment intent"**

   - Check backend server is running
   - Verify Stripe secret key is correct

3. **Payment form not loading**
   - Check if Elements component is properly wrapped
   - Verify Stripe publishable key

### Debug Mode

Set `NODE_ENV=development` to see detailed error messages.

## 📞 Support

For issues or questions:

1. Check the browser console for errors
2. Verify environment variables are set
3. Test with Stripe test cards first
4. Check server logs for backend errors

## 🔄 Updates

To update the payment system:

1. Pull latest changes
2. Update dependencies: `npm install`
3. Restart both frontend and backend servers
4. Test payment flow with test cards

---

**Note**: Always use test keys during development. Switch to live keys only when ready for production.
