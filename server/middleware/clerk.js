const { ClerkExpressRequireAuth } = require('@clerk/clerk-sdk-node');

exports.clerkMiddleware = ClerkExpressRequireAuth({
  // This will verify the Clerk JWT token
  onError: (error) => {
    console.error('Clerk Auth Error:', error);
  }
});