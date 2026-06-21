const mongoose = require('mongoose');
const MenuItem = require('./models/MenuItem');

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/theroyals';

const seedMenu = [
  // Fast Food & Snacks
  { name: 'Spring Roll', category: 'Fast Food & Snacks', price: 120, imagePath: '/images/b_springroll.jpeg', isVeg: true },
  { name: 'Macaroni', category: 'Fast Food & Snacks', price: 110, imagePath: '/images/bl_Macaroni.jpg', isVeg: true },
  { name: 'Chhole Bhature', category: 'Fast Food & Snacks', price: 150, imagePath: '/images/br_chholebhature.jpg', isVeg: true },
  { name: 'Chhole Kulche', category: 'Fast Food & Snacks', price: 130, imagePath: '/images/br_ChholeKulche.jpg', isVeg: true },
  { name: 'Chaumin', category: 'Fast Food & Snacks', price: 100, imagePath: '/images/br_chumeen.jpeg', isVeg: true },
  { name: 'Dosa', category: 'Fast Food & Snacks', price: 140, imagePath: '/images/br_dosa.jpeg', isVeg: true },
  { name: 'Idli', category: 'Fast Food & Snacks', price: 80, imagePath: '/images/br_idli.jpg', isVeg: true },
  { name: 'Pizza', category: 'Fast Food & Snacks', price: 250, imagePath: '/images/br_pizza.jpeg', isVeg: true },
  { name: 'Burger', category: 'Fast Food & Snacks', price: 90, imagePath: '/images/w_burger.jpeg', isVeg: true },
  { name: 'Chilla', category: 'Fast Food & Snacks', price: 70, imagePath: '/images/w_chilla.jpeg', isVeg: true },
  { name: 'Dhokla', category: 'Fast Food & Snacks', price: 60, imagePath: '/images/b_dhokla.jpeg', isVeg: true },
  { name: 'Paneer Pakora', category: 'Fast Food & Snacks', price: 120, imagePath: '/images/b_PaneerPakora.jpg', isVeg: true },
  { name: 'Panipuri', category: 'Fast Food & Snacks', price: 50, imagePath: '/images/b_panipuri.jpeg', isVeg: true },
  { name: 'Garlic Bread Pakoda', category: 'Fast Food & Snacks', price: 80, imagePath: '/images/br_pakoda.jpg', isVeg: true },
  { name: 'Paneer Tikka', category: 'Fast Food & Snacks', price: 220, imagePath: '/images/br_PaneerTikka.jpg', isVeg: true },
  { name: 'Samosa', category: 'Fast Food & Snacks', price: 30, imagePath: '/images/w_samosa.jpeg', isVeg: true },

  // Indian Thali (Dinner Items)
  { name: 'Paneer', category: 'Indian Thali', price: 180, imagePath: '/images/b_panner.jpeg', isVeg: true },
  { name: 'Daal Roti', category: 'Indian Thali', price: 100, imagePath: '/images/br_daalroti.jpeg', isVeg: true },
  { name: 'Small Thali', category: 'Indian Thali', price: 150, imagePath: '/images/b_smallparcelThali.jpeg', isVeg: true },
  { name: 'Medium Thali', category: 'Indian Thali', price: 220, imagePath: '/images/T_MediumThali.jpg', isVeg: true },
  { name: 'Big Thali', category: 'Indian Thali', price: 300, imagePath: '/images/t_BigThali.jpg', isVeg: true },
  { name: 'Rice', category: 'Indian Thali', price: 90, imagePath: '/images/t_Rice.jpg', isVeg: true },
  { name: 'Tandoori Roti', category: 'Indian Thali', price: 25, imagePath: '/images/t_TandooriRoti.jpg', isVeg: true },
  { name: 'Daal Makhani', category: 'Indian Thali', price: 160, imagePath: '/images/T_daalMakhani.jpg', isVeg: true },
  { name: 'Boondi Raita', category: 'Indian Thali', price: 80, imagePath: '/images/T_BoondiRaita.jpg', isVeg: true },
  { name: 'Salad', category: 'Indian Thali', price: 60, imagePath: '/images/T_Salad.jpg', isVeg: true },

  // Beverages
  { name: 'Blue Lamon Mocktail', category: 'Beverages', price: 120, imagePath: '/images/b_BlueLamonmocktail.jpg', isVeg: true },
  { name: 'Mint Mocktail', category: 'Beverages', price: 110, imagePath: '/images/br_mocktail.jpeg', isVeg: true },
  { name: 'Mango Shake', category: 'Beverages', price: 130, imagePath: '/images/b_MangoShake.jpg', isVeg: true },
  { name: 'Banana Shake', category: 'Beverages', price: 100, imagePath: '/images/w_bananashake.jpg', isVeg: true },
  { name: 'Brownie Milk Shake', category: 'Beverages', price: 160, imagePath: '/images/w_DecadentBrownieMilkshake.jpg', isVeg: true },
  { name: 'Coffee', category: 'Beverages', price: 70, imagePath: '/images/br_coffee.jpeg', isVeg: true },
  { name: 'Tea', category: 'Beverages', price: 40, imagePath: '/images/bl_tea.jpeg', isVeg: true },
  { name: 'Chhachh', category: 'Beverages', price: 50, imagePath: '/images/w_chhach.jpg', isVeg: true },
  { name: 'Lassi', category: 'Beverages', price: 80, imagePath: '/images/w_lassi.jpeg', isVeg: true },

  // Desserts
  { name: 'Gulab Jamun', category: 'Desserts', price: 60, imagePath: '/images/b_gulabjamun.jpeg', isVeg: true },
  { name: 'Jalebi', category: 'Desserts', price: 50, imagePath: '/images/br_jalebi.jpg', isVeg: true },
  { name: 'Besan Ladoo', category: 'Desserts', price: 70, imagePath: '/images/w_BesanLadoo.jpg', isVeg: true },
  { name: 'Rajbhog', category: 'Desserts', price: 80, imagePath: '/images/w_rajbhog.jpg', isVeg: true },
  { name: 'Kaju Katli', category: 'Desserts', price: 120, imagePath: '/images/br_kajukatli.jpeg', isVeg: true },

  // Ice Creams
  { name: 'Chocolate Ice Cream', category: 'Ice Creams', price: 90, imagePath: '/images/w_chocoicecream.jpg', isVeg: true },
  { name: 'Multi Flavour Ice Cream', category: 'Ice Creams', price: 110, imagePath: '/images/w_icecones.jpg', isVeg: true },
  { name: 'Choco Bar', category: 'Ice Creams', price: 60, imagePath: '/images/w_icecream.jpg', isVeg: true },
  { name: 'Ice Cream Cones', category: 'Ice Creams', price: 70, imagePath: '/images/w_icecreamcone.jpg', isVeg: true }
];

mongoose.connect(MONGODB_URI)
  .then(async () => {
    console.log('✅ Connected to MongoDB.');
    
    // Optional: Clear the existing menu items so you don't get duplicates
    await MenuItem.deleteMany({});
    console.log('🗑️  Cleared old menu items.');

    // Insert all new items
    await MenuItem.insertMany(seedMenu);
    console.log(`🎉 Successfully added ${seedMenu.length} items to The Royals menu!`);
    
    process.exit(); // Close the script
  })
  .catch((err) => {
    console.error('❌ Error seeding data:', err);
    process.exit(1);
  });