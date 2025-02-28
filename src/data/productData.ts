
export const specialProducts = [
  {
    id: 101,
    name: "iPhone 14",
    price: 500.00,
    image: "/lovable-uploads/c13e1fe6-bb38-4421-b142-81eeab58cca5.png"
  },
  {
    id: 102,
    name: "WHOME T-TOOL Skateboard for Adult/Kids Girls/Boys Beginner 31\" x 8\" Alpine Maple Deck with ABEC-9 Bearings",
    price: 20.00,
    image: "/lovable-uploads/7fca3272-ac16-4b81-ae76-37c9809e20d2.png"
  },
  {
    id: 103,
    name: "Never Lie: From the Sunday Times Bestselling Author of The Housemaid",
    price: 9.99,
    image: "/lovable-uploads/256306c6-e36b-4a6b-a41f-e56b1fa9306d.png"
  },
  {
    id: 104,
    name: "Emotional Intelligence: 25th Anniversary Edition English edition",
    price: 9.99,
    image: "/lovable-uploads/6410deb4-412c-44f4-8418-1990ea9929e0.png"
  },
  {
    id: 105,
    name: "Fishing Hats Wide Brim UV Protection Fishing Hats Windproof Boonie Hat for Men Women",
    price: 12.00,
    image: "/lovable-uploads/242a4c1f-2870-4767-b542-33233992ff0e.png"
  },
  {
    id: 106,
    name: "UOHHBOE Portable Bluetooth Wireless Speaker 24 Hours Runtime Waterproof and Dustproof",
    price: 25.00,
    image: "/lovable-uploads/bb5d09f8-c491-4bcb-b89e-0583aa81f0c5.png"
  },
  {
    id: 107,
    name: "IRON JIA'S Heated Motorcycle Gloves for Men Winter with USB Charging Port 3000mAh",
    price: 80.00,
    image: "/lovable-uploads/9143698c-c6ed-46f6-a9a8-19dd5c2c49cf.png"
  }
];

export const dealProducts = [
  {
    id: 1,
    name: "Suddenly Cotton Blue Eau de Parfum for Women 100ml EDP",
    price: 10.00,
    image: "/lovable-uploads/3dcdad9e-de18-4a65-9ca0-427fd3ac2025.png"
  },
  {
    id: 2,
    name: "plex care serum 4",
    price: 9.99,
    image: "/lovable-uploads/22960741-63be-49e8-8387-ced1020d4c2c.png"
  },
  {
    id: 3,
    name: "Nike Homme Air Force 1",
    price: 99.99,
    image: "/lovable-uploads/4239ebcc-9043-43e5-bdb8-d054263822e0.png"
  },
  {
    id: 4,
    name: "TANMESSO Y2K Women's Winter Autumn Fashion Long Sleeve Fleece Oversized Hoodie",
    price: 30.00,
    image: "/lovable-uploads/fe5a3d98-7db7-40cf-a4d2-72cef41789c6.png"
  }
];

export const getAllProducts = () => [...specialProducts, ...dealProducts];
