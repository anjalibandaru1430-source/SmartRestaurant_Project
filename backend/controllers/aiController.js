// Mock AI response controller
const getChatResponse = async (req, res, next) => {
  try {
    const { message } = req.body;
    
    let reply = "I'm your AI assistant. How can I help you today?";
    const msgLower = message.toLowerCase();
    
    if (msgLower.includes('spicy') && msgLower.includes('veg')) {
      reply = "I recommend our 'Spicy Paneer Tikka' or 'Veg Szechuan Noodles'. Both are under ₹200 and very popular!";
    } else if (msgLower.includes('dinner')) {
      reply = "For dinner, I suggest a hearty 'Butter Chicken' with Naan, or if you prefer veg, 'Dal Makhani' is excellent tonight.";
    } else if (msgLower.includes('delivery') || msgLower.includes('track')) {
      reply = "Most of our orders are delivered within 30-45 minutes. You can track your order live on the 'My Orders' page!";
    }

    // Artificial delay to simulate AI thinking
    setTimeout(() => {
      res.json({ reply });
    }, 1000);
  } catch (error) {
    next(error);
  }
};

export { getChatResponse };
