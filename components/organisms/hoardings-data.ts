export interface Sweet {
  id: number;
  name: string;
  shop: string;
  category: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviews: number;
  deliveryTime: string;
  tag: string;
  image: string;
  description: string;
  city: string;
  location: string;
  area: string;
  isVeg: boolean;
  isBestseller: boolean;
  weight: string;
  customization?: string[];
}

export const sweets: Sweet[] = [
  {
    id: 1001, name: "Motichoor Ladoo Box", shop: "Bikanervala Sweets", category: "Indian Mithai",
    price: 349, originalPrice: 449, rating: 4.8, reviews: 1243, deliveryTime: "25-30 min",
    tag: "Bestseller", image: "https://images.pexels.com/photos/8887021/pexels-photo-8887021.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop",
    description: "Soft and melt-in-mouth motichoor ladoo made from pure ghee.",
    city: "Delhi", location: "Connaught Place, Delhi", area: "Connaught Place", isVeg: true, isBestseller: true, weight: "500g",
    customization: ["Small Box (250g)", "Regular Box (500g)", "Large Box (1kg)"]
  },
  {
    id: 1002, name: "Chocolate Truffle Cake", shop: "Theobroma", category: "Cakes & Pastries",
    price: 699, originalPrice: 899, rating: 4.9, reviews: 2156, deliveryTime: "30-35 min",
    tag: "Trending", image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=600&h=400&fit=crop",
    description: "Rich dark chocolate truffle cake layered with Belgian chocolate ganache.",
    city: "Mumbai", location: "Bandra, Mumbai", area: "Bandra", isVeg: true, isBestseller: true, weight: "1 kg",
    customization: ["Half Kg", "1 Kg", "2 Kg", "3 Kg"]
  },
  {
    id: 1003, name: "Kaju Katli Premium", shop: "Haldirams", category: "Indian Mithai",
    price: 599, originalPrice: 749, rating: 4.7, reviews: 987, deliveryTime: "20-25 min",
    tag: "Premium", image: "https://images.pexels.com/photos/10514163/pexels-photo-10514163.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop",
    description: "Silver-coated premium kaju katli made from finest cashew nuts.",
    city: "Delhi", location: "Chandni Chowk, Delhi", area: "Chandni Chowk", isVeg: true, isBestseller: false, weight: "500g",
    customization: ["250g Box", "500g Box", "1kg Box"]
  },
  {
    id: 1004, name: "Gulab Jamun Special", shop: "Aggarwal Sweets", category: "Indian Mithai",
    price: 199, rating: 4.6, reviews: 1876, deliveryTime: "15-20 min",
    tag: "Popular", image: "https://images.pexels.com/photos/15014919/pexels-photo-15014919.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop",
    description: "Hot and syrupy gulab jamuns made fresh every hour.",
    city: "Chennai", location: "T Nagar, Chennai", area: "T Nagar", isVeg: true, isBestseller: true, weight: "400g",
    customization: ["4 Pieces", "6 Pieces", "12 Pieces"]
  },
  {
    id: 1005, name: "Red Velvet Cheesecake", shop: "Miam Patisserie", category: "Cakes & Pastries",
    price: 849, originalPrice: 999, rating: 4.8, reviews: 654, deliveryTime: "35-40 min",
    tag: "New", image: "https://images.unsplash.com/photo-1616541823729-00fe0aacd32c?w=600&h=400&fit=crop",
    description: "Creamy New York style cheesecake with red velvet base.",
    city: "Bangalore", location: "Koramangala, Bangalore", area: "Koramangala", isVeg: true, isBestseller: false, weight: "800g",
    customization: ["Mini (400g)", "Regular (800g)", "Party (1.5kg)"]
  },
  {
    id: 1006, name: "Dark Chocolate Truffles", shop: "ChocoArt", category: "Chocolates",
    price: 449, originalPrice: 599, rating: 4.9, reviews: 432, deliveryTime: "25-30 min",
    tag: "Premium", image: "https://images.unsplash.com/photo-1549007994-cb92caebd54b?w=600&h=400&fit=crop",
    description: "Handcrafted 72% dark chocolate truffles with cocoa dusting.",
    city: "Mumbai", location: "Juhu, Mumbai", area: "Juhu", isVeg: true, isBestseller: false, weight: "250g",
    customization: ["6 Pieces Box", "12 Pieces Box", "24 Pieces Gift Box"]
  },
  {
    id: 1007, name: "Rasgulla Delight", shop: "Bengali Sweets House", category: "Indian Mithai",
    price: 249, rating: 4.5, reviews: 876, deliveryTime: "20-25 min",
    tag: "Popular", image: "https://images.pexels.com/photos/18488311/pexels-photo-18488311.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop",
    description: "Soft and spongy rasgullas soaked in light sugar syrup.",
    city: "Kolkata", location: "Park Street, Kolkata", area: "Park Street", isVeg: true, isBestseller: false, weight: "500g",
    customization: ["4 Pieces", "8 Pieces", "16 Pieces"]
  },
  {
    id: 1008, name: "Belgian Waffle Tower", shop: "Waffle House", category: "Bakery",
    price: 399, originalPrice: 499, rating: 4.7, reviews: 543, deliveryTime: "20-30 min",
    tag: "Trending", image: "https://images.unsplash.com/photo-1562376552-0d160a2f238d?w=600&h=400&fit=crop",
    description: "Crispy Belgian waffles stacked with whipped cream and fresh berries.",
    city: "Bangalore", location: "Indiranagar, Bangalore", area: "Indiranagar", isVeg: true, isBestseller: true, weight: "350g",
    customization: ["Nutella & Banana", "Berry Blast", "Classic Maple", "Chocolate Overload"]
  },
  {
    id: 1009, name: "Jalebi Rabdi Special", shop: "Old Delhi Sweets", category: "Indian Mithai",
    price: 179, rating: 4.6, reviews: 1543, deliveryTime: "15-20 min",
    tag: "Hot & Fresh", image: "https://images.pexels.com/photos/5831655/pexels-photo-5831655.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop",
    description: "Crispy hot jalebis served with rich and creamy rabdi.",
    city: "Delhi", location: "Chandni Chowk, Delhi", area: "Chandni Chowk", isVeg: true, isBestseller: true, weight: "300g",
    customization: ["Single Plate", "Double Plate", "Family Pack"]
  },
  {
    id: 1010, name: "Tiramisu Classic", shop: "Italiano Patisserie", category: "Cakes & Pastries",
    price: 549, rating: 4.8, reviews: 321, deliveryTime: "30-35 min",
    tag: "Chef's Special", image: "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=600&h=400&fit=crop",
    description: "Classic Italian tiramisu with espresso-soaked ladyfingers and mascarpone.",
    city: "Mumbai", location: "Lower Parel, Mumbai", area: "Lower Parel", isVeg: true, isBestseller: false, weight: "600g",
    customization: ["Individual", "Regular", "Party Size"]
  },
  {
    id: 1011, name: "Mysore Pak Premium", shop: "Sri Krishna Sweets", category: "Indian Mithai",
    price: 299, rating: 4.7, reviews: 765, deliveryTime: "20-25 min",
    tag: "Traditional", image: "https://images.pexels.com/photos/18488299/pexels-photo-18488299.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop",
    description: "Authentic Mysore pak made with generous amounts of pure ghee.",
    city: "Chennai", location: "Mylapore, Chennai", area: "Mylapore", isVeg: true, isBestseller: false, weight: "400g",
    customization: ["200g Box", "400g Box", "1kg Box"]
  },
  {
    id: 1012, name: "Chocolate Brownie Fudge", shop: "Theobroma", category: "Bakery",
    price: 149, rating: 4.8, reviews: 2341, deliveryTime: "15-20 min",
    tag: "Bestseller", image: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=600&h=400&fit=crop",
    description: "Dense, fudgy chocolate brownie with a crispy top crust.",
    city: "Mumbai", location: "Andheri, Mumbai", area: "Andheri", isVeg: true, isBestseller: true, weight: "150g",
    customization: ["Single", "Box of 4", "Box of 8"]
  }
];

export type Hoarding = Sweet;
export const hoardings = sweets;
