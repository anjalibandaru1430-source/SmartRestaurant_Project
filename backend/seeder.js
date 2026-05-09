import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from './models/User.js';
import Restaurant from './models/Restaurant.js';
import FoodItem from './models/FoodItem.js';
import Order from './models/Order.js';
import connectDB from './config/db.js';

dotenv.config();

const localities = [
  { name: 'Koramangala', city: 'Bangalore', state: 'Karnataka', zipCode: '560034', lat: 12.9279, lng: 77.6271 },
  { name: 'Indiranagar', city: 'Bangalore', state: 'Karnataka', zipCode: '560038', lat: 12.9784, lng: 77.6408 },
  { name: 'HSR Layout', city: 'Bangalore', state: 'Karnataka', zipCode: '560102', lat: 12.9116, lng: 77.6389 },
  { name: 'Whitefield', city: 'Bangalore', state: 'Karnataka', zipCode: '560066', lat: 12.9698, lng: 77.7499 },
  { name: 'Jayanagar', city: 'Bangalore', state: 'Karnataka', zipCode: '560011', lat: 12.9299, lng: 77.5822 },
  { name: 'JP Nagar', city: 'Bangalore', state: 'Karnataka', zipCode: '560078', lat: 12.9063, lng: 77.5857 },
  { name: 'Malleshwaram', city: 'Bangalore', state: 'Karnataka', zipCode: '560003', lat: 13.0031, lng: 77.5643 },
  { name: 'BTM Layout', city: 'Bangalore', state: 'Karnataka', zipCode: '560076', lat: 12.9166, lng: 77.6101 },
  { name: 'Marathahalli', city: 'Bangalore', state: 'Karnataka', zipCode: '560037', lat: 12.9569, lng: 77.7011 },
  { name: 'Bellandur', city: 'Bangalore', state: 'Karnataka', zipCode: '560103', lat: 12.9304, lng: 77.6784 },
  { name: 'Electronic City', city: 'Bangalore', state: 'Karnataka', zipCode: '560100', lat: 12.8452, lng: 77.6602 },
  { name: 'Yelahanka', city: 'Bangalore', state: 'Karnataka', zipCode: '560064', lat: 13.1007, lng: 77.5963 },
  { name: 'Banashankari', city: 'Bangalore', state: 'Karnataka', zipCode: '560050', lat: 12.9255, lng: 77.5468 },
  { name: 'Rajajinagar', city: 'Bangalore', state: 'Karnataka', zipCode: '560010', lat: 12.9982, lng: 77.5530 },
  { name: 'Basavanagudi', city: 'Bangalore', state: 'Karnataka', zipCode: '560004', lat: 12.9406, lng: 77.5738 },
];

const realRestaurantsData = [
  {
    name: 'Meghana Foods',
    cuisines: ['Biryani', 'Andhra', 'South Indian'],
    items: [
      { name: 'Chicken Boneless Biryani', price: 350, isVeg: false, desc: 'Signature Meghana special boneless chicken biryani.' },
      { name: 'Mutton Biryani', price: 420, isVeg: false, desc: 'Aromatic basmati rice cooked with tender mutton.' },
      { name: 'Paneer Biryani', price: 290, isVeg: true, desc: 'Spicy Andhra style paneer biryani.' },
      { name: 'Chicken 65', price: 250, isVeg: false, desc: 'Spicy deep-fried chicken appetizer.' }
    ]
  },
  {
    name: 'Truffles',
    cuisines: ['American', 'Fast Food', 'Desserts'],
    items: [
      { name: 'All American Cheese Burger', price: 220, isVeg: false, desc: 'Classic beef/chicken patty with cheese and fries.' },
      { name: 'Ferrero Rocher Shake', price: 180, isVeg: true, desc: 'Thick hazelnut chocolate milkshake.' },
      { name: 'Peri Peri Chicken Steak', price: 380, isVeg: false, desc: 'Grilled chicken breast with spicy peri peri sauce.' },
      { name: 'Veggie Delight Burger', price: 190, isVeg: true, desc: 'Crunchy veg patty with special mayo.' }
    ]
  },
  {
    name: 'Empire Restaurant',
    cuisines: ['North Indian', 'Mughlai', 'Arabian'],
    items: [
      { name: 'Empire Special Ghee Rice', price: 150, isVeg: true, desc: 'Aromatic short-grain rice cooked in ghee.' },
      { name: 'Butter Chicken', price: 280, isVeg: false, desc: 'Tender chicken cooked in rich tomato gravy.' },
      { name: 'Chicken Kebab (Half)', price: 180, isVeg: false, desc: 'Deep fried crispy chicken kebab.' },
      { name: 'Shawarma Roll', price: 90, isVeg: false, desc: 'Arabian chicken shawarma in kuboos.' }
    ]
  },
  {
    name: 'Rameshwaram Cafe',
    cuisines: ['South Indian', 'Breakfast'],
    items: [
      { name: 'Ghee Pudi Idli', price: 90, isVeg: true, desc: 'Steamed idlis soaked in ghee and spicy gun powder.' },
      { name: 'Ghee Roast Dosa', price: 110, isVeg: true, desc: 'Crispy dosa roasted in pure ghee.' },
      { name: 'Filter Coffee', price: 40, isVeg: true, desc: 'Strong South Indian filter coffee.' },
      { name: 'Vada', price: 50, isVeg: true, desc: 'Crispy lentil donut.' }
    ]
  },
  {
    name: 'Corner House',
    cuisines: ['Desserts', 'Ice Cream'],
    items: [
      { name: 'Death by Chocolate', price: 250, isVeg: true, desc: 'Iconic DBC: chocolate cake, vanilla ice cream, hot chocolate fudge.' },
      { name: 'Cake Fudge', price: 180, isVeg: true, desc: 'Vanilla ice cream over cake with rich fudge.' },
      { name: 'Trilogy', price: 200, isVeg: true, desc: 'Three scoops of different ice creams with fruits and nuts.' }
    ]
  },
  {
    name: 'CTR (Shri Sagar)',
    cuisines: ['South Indian', 'Breakfast'],
    items: [
      { name: 'Benne Masala Dosa', price: 95, isVeg: true, desc: 'Legendary crispy dosa cooked in butter.' },
      { name: 'Mangalore Bajji', price: 60, isVeg: true, desc: 'Crispy fried snacks served with coconut chutney.' },
      { name: 'Chow Chow Bath', price: 80, isVeg: true, desc: 'Combo of sweet Kesari Bath and spicy Khara Bath.' }
    ]
  },
  {
    name: 'Toit',
    cuisines: ['Continental', 'Italian', 'Pub Food'],
    items: [
      { name: 'Toit Baked Nachos', price: 350, isVeg: true, desc: 'Loaded nachos with cheese, salsa and sour cream.' },
      { name: 'Wood-fired Pepperoni Pizza', price: 550, isVeg: false, desc: 'Authentic thin crust pizza with pork pepperoni.' },
      { name: 'BBQ Chicken Wings', price: 380, isVeg: false, desc: 'Sticky BBQ chicken wings.' },
      { name: 'Pesto Pasta', price: 420, isVeg: true, desc: 'Penne in rich basil pesto sauce.' }
    ]
  },
  {
    name: 'Leon Grill',
    cuisines: ['Fast Food', 'Arabian'],
    items: [
      { name: 'Peri Peri Chicken (Half)', price: 320, isVeg: false, desc: 'Flame-grilled chicken with spicy peri peri marinade.' },
      { name: 'Jumbo Chicken Burger', price: 210, isVeg: false, desc: 'Large burger with double chicken patty.' },
      { name: 'Falafel Wrap', price: 150, isVeg: true, desc: 'Middle eastern falafel wrapped in pita.' },
      { name: 'Hummus with Pita', price: 180, isVeg: true, desc: 'Creamy hummus served with soft pita bread.' }
    ]
  },
  {
    name: 'Nagarjuna',
    cuisines: ['Andhra', 'South Indian'],
    items: [
      { name: 'Andhra Meals', price: 250, isVeg: true, desc: 'Unlimited authentic spicy Andhra meals.' },
      { name: 'Chilli Chicken', price: 280, isVeg: false, desc: 'Nagarjuna special green chilli chicken dry.' },
      { name: 'Mutton Roast', price: 380, isVeg: false, desc: 'Spicy and tender mutton dry roast.' },
      { name: 'Chicken Biryani', price: 320, isVeg: false, desc: 'Traditional Andhra style biryani.' }
    ]
  },
  {
    name: 'A2B - Adyar Ananda Bhavan',
    cuisines: ['South Indian', 'North Indian', 'Sweets'],
    items: [
      { name: 'Mini Tiffin', price: 140, isVeg: true, desc: 'Assortment of mini idlis, dosa, pongal and sweet.' },
      { name: 'Paneer Butter Masala', price: 220, isVeg: true, desc: 'Cottage cheese in rich tomato gravy.' },
      { name: 'Ghee Mysore Pak (250g)', price: 180, isVeg: true, desc: 'Melt-in-mouth traditional sweet.' },
      { name: 'Roti Curry Combo', price: 160, isVeg: true, desc: '2 rotis with mixed veg curry.' }
    ]
  },
  {
    name: 'Vidyarthi Bhavan',
    cuisines: ['South Indian', 'Breakfast'],
    items: [
      { name: 'Masala Dosa', price: 80, isVeg: true, desc: 'Crispy, thick dosa served with potato sagu and chutney.' },
      { name: 'Khara Bath', price: 50, isVeg: true, desc: 'Spicy semolina dish.' },
      { name: 'Rava Vada', price: 45, isVeg: true, desc: 'Crispy vada made from semolina.' }
    ]
  },
  {
    name: 'Hole in the Wall Cafe',
    cuisines: ['Continental', 'Breakfast', 'Cafe'],
    items: [
      { name: 'The All English Breakfast', price: 450, isVeg: false, desc: 'Eggs, bacon, sausages, baked beans, mushrooms, hash browns, and toast.' },
      { name: 'Fluffy Pancakes', price: 280, isVeg: true, desc: 'Stack of pancakes with maple syrup and butter.' },
      { name: 'Chicken Burger', price: 350, isVeg: false, desc: 'Juicy chicken patty with house sauces.' }
    ]
  },
  {
    name: 'Third Wave Coffee',
    cuisines: ['Cafe', 'Beverages', 'Continental'],
    items: [
      { name: 'Sea Salt Mocha', price: 260, isVeg: true, desc: 'Signature mocha with a hint of sea salt.' },
      { name: 'French Vanilla Latte', price: 240, isVeg: true, desc: 'Classic latte with French vanilla.' },
      { name: 'Smoked Chicken Sandwich', price: 290, isVeg: false, desc: 'Sourdough sandwich with smoked chicken and cheese.' },
      { name: 'Banana Walnut Cake', price: 180, isVeg: true, desc: 'Moist slice of banana walnut cake.' }
    ]
  },
  {
    name: 'Glen\'s Bakehouse',
    cuisines: ['Bakery', 'Desserts', 'Cafe'],
    items: [
      { name: 'Red Velvet Cupcake', price: 80, isVeg: true, desc: 'Famous mini red velvet cupcake with cream cheese frosting.' },
      { name: 'Chicken Quiche', price: 150, isVeg: false, desc: 'Savory tart filled with chicken and cheese.' },
      { name: 'Eclair', price: 90, isVeg: true, desc: 'Choux pastry filled with cream and topped with chocolate.' },
      { name: 'Cappuccino', price: 160, isVeg: true, desc: 'Freshly brewed cappuccino.' }
    ]
  },
  {
    name: 'O.G. Variar & Sons',
    cuisines: ['Bakery', 'Desserts'],
    items: [
      { name: 'Veg Puff', price: 25, isVeg: true, desc: 'Flaky pastry filled with spicy veg mix.' },
      { name: 'Dil Pasand', price: 40, isVeg: true, desc: 'Sweet bakery item stuffed with coconut and tutti frutti.' },
      { name: 'Butter Biscuit (250g)', price: 100, isVeg: true, desc: 'Classic melt-in-mouth butter biscuits.' }
    ]
  }
];

const getRandomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
const getRandomElement = (arr) => arr[Math.floor(Math.random() * arr.length)];

const getRestImage = () => `https://images.unsplash.com/photo-${['1517248135467-4c7edcad34c4', '1552566626-52f8b828add9', '1550966871-3ed3cdb5ed0c', '1537047902298-627b3531ec22', '1414235077428-97114553435e', '1466978913421-bac2e10c93c8'][getRandomInt(0, 5)]}?auto=format&fit=crop&w=800&q=80`;
const getFoodImage = () => `https://images.unsplash.com/photo-${['1546069901-ba9599a7e63c', '1565299624946-b28f40a0ae38', '1604382354936-07c5d9983bd3', '1565958011703-44f9829ba187', '1567620905073-41f021798363'][getRandomInt(0, 4)]}?auto=format&fit=crop&w=400&q=80`;

const importData = async () => {
  try {
    await connectDB();

    console.log('Clearing existing data...');
    await Order.deleteMany();
    await FoodItem.deleteMany();
    await Restaurant.deleteMany();
    await User.deleteMany();

    console.log('Creating Admin User...');
    const adminUser = await User.create({
      name: 'Admin User',
      email: 'admin@smartrest.com',
      password: 'password123',
      role: 'Admin',
      phone: '9876543210'
    });

    console.log('Generating 1000 Real Bangalore Restaurants...');
    const restaurantsData = [];
    
    // Create 1000 records by cycling through real restaurants and creating branches across localities
    let restIndex = 0;
    for (let i = 0; i < 1000; i++) {
      const baseRest = realRestaurantsData[restIndex];
      const loc = getRandomElement(localities);
      
      restaurantsData.push({
        _id: new mongoose.Types.ObjectId(), // pre-generate ID for linking food items easily
        adminId: adminUser._id,
        name: `${baseRest.name} - ${loc.name}`,
        description: `The famous ${baseRest.name}, now serving their signature ${baseRest.cuisines[0]} in ${loc.name}.`,
        images: [getRestImage()],
        address: {
          street: `${getRandomInt(1, 100)} Main Road, ${loc.name}`,
          city: loc.city,
          state: loc.state,
          zipCode: loc.zipCode
        },
        location: {
          type: 'Point',
          coordinates: [loc.lng + (Math.random() - 0.5) * 0.05, loc.lat + (Math.random() - 0.5) * 0.05]
        },
        cuisineTypes: baseRest.cuisines,
        rating: (Math.random() * (5 - 4.0) + 4.0).toFixed(1), // Real popular places have good ratings
        numReviews: getRandomInt(100, 5000),
        deliveryTime: `${getRandomInt(20, 50)} min`,
        isOpen: true,
        baseRestIndex: restIndex // temporary property to link menu items
      });

      restIndex = (restIndex + 1) % realRestaurantsData.length;
    }

    const insertedRestaurants = await Restaurant.insertMany(restaurantsData);
    console.log(`Inserted ${insertedRestaurants.length} Restaurants.`);

    console.log('Generating Authentic Menus...');
    const foodItemsData = [];
    
    // Add the specific signature items for each branch
    restaurantsData.forEach((restaurant) => {
      const baseMenu = realRestaurantsData[restaurant.baseRestIndex].items;
      
      baseMenu.forEach(item => {
        foodItemsData.push({
          restaurantId: restaurant._id,
          name: item.name,
          description: item.desc,
          price: item.price,
          image: getFoodImage(),
          category: realRestaurantsData[restaurant.baseRestIndex].cuisines[0],
          isVegetarian: item.isVeg,
          isAvailable: true
        });
      });
    });

    const insertedItems = await FoodItem.insertMany(foodItemsData);
    console.log(`Inserted ${insertedItems.length} Food Items.`);

    console.log('Real Bangalore Data Imported successfully!');
    process.exit();
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

importData();
