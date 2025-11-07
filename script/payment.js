document.addEventListener('DOMContentLoaded', async () => {
    const stripe = Stripe('your_stripe_public_key');
    const elements = stripe.elements();
    
    const cardElement = elements.create('card');
    cardElement.mount('#card-element');
  
    const form = document.getElementById('payment-form');
    const messageDiv = document.getElementById('payment-message');
  
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
  
      const amount = parseInt(form.elements.amount.value) * 100; // Convert amount to cents
      const currency = form.elements.currency.value;
      const { token, error } = await stripe.createToken(cardElement);
  
      if (error) {
        messageDiv.textContent = error.message;
      } else {
        const response = await fetch('/charge', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            amount,
            currency,
            source: token.id,
            description: 'Payment for goods/services',
          }),
        });
  
        const data = await response.json();
        messageDiv.textContent = data.message;
      }
    });
  });
  