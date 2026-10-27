BOT CONTROL PANEL - FULL FRONTEND
==================================
Included:
- Responsive dashboard
- Neon gaming UI inspired by the supplied reference
- Top-up store
- UID validation
- Package selection
- Demo QR/payment modal
- Local demo order history
- Profile page
- Admin dashboard
- Mobile sidebar

HOW TO RUN
1. Extract the ZIP.
2. Open index.html in a browser.
3. For production, upload the files to your hosting.

IMPORTANT
This is a front-end/demo project. The QR is intentionally non-payment and no real money is processed.
For a production store, connect a legitimate payment provider, a server-side database, authentication, and server-side payment verification before granting any digital service.


PAYMENT QR UPDATE
=================
The checkout now uses the supplied UPI ID: 9080195714@fam
Each package has its own UPI QR with the selected amount encoded.
For example, selecting ₹200 creates a QR carrying:
upi://pay?pa=9080195714@fam&pn=Free%20Fire%20Top-Up&am=200&cu=INR

Important: verify the UPI ID and test with your own payment app before using this in production.
The QR only creates a payment request; your server must still verify successful payment before fulfilling an order.
