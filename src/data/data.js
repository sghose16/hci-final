// populate website with dummy data

const tops = [
  {
    id: 1,
    brand: "Cider",
    size: "M",
    tags: ["black", "casual", "party"],
    img: require("../assets/top1.png"),
  },
  {
    id: 2,
    brand: "Cider",
    size: "M",
    tags: ["brown", "cold", "long-sleeve"],
    img: require("../assets/top2.png"),
  },
  {
    id: 3,
    brand: "Cider",
    size: "M",
    tags: ["black", "glitter", "long-sleeve"],
    img: require("../assets/top3.png"),
  },
  {
    id: 4,
    brand: "Cider",
    size: "M",
    tags: ["white", "sweater", "cats"],
    img: require("../assets/top4.png"),
  },
  {
    id: 5,
    brand: "Cider",
    size: "M",
    tags: ["blue", "white", "party"],
    img: require("../assets/top5.png"),
  },
  {
    id: 6,
    brand: "Cider",
    size: "M",
    tags: ["white", "coat", "puffy", "cold", "winter"],
    img: require("../assets/top6.jpeg"),
  },
  {
    id: 7,
    brand: "Cider",
    size: "M",
    tags: ["green", "off-shoulder", "casual"],
    img: require("../assets/top7.png"),
  },
  {
    id: 8,
    brand: "Cider",
    size: "M",
    tags: ["green", "casual"],
    img: require("../assets/top8.png"),
  },
  {
    id: 9,
    brand: "Cider",
    size: "M",
    tags: ["green", "casual"],
    img: require("../assets/top9.png"),
  },
  {
    id: 10,
    brand: "Cider",
    size: "M",
    tags: ["black", "long-sleeve", "crop top"],
    img: require("../assets/top10.png"),
  },
  {
    id: 11,
    brand: "Cider",
    size: "M",
    tags: ["brown", "jacket", "cold", "leather"],
    img: require("../assets/top11.png"),
  },
];

const bottoms = [
  {
    id: 21,
    brand: "Cider",
    size: "M",
    tags: ["white", "linen", "casual"],
    img: require("../assets/bot1.png"),
  },
  {
    id: 22,
    brand: "Cider",
    size: "M",
    tags: ["brown", "jean"],
    img: require("../assets/bot2.png"),
  },
  {
    id: 23,
    brand: "Cider",
    size: "M",
    tags: ["black", "jean", "casual"],
    img: require("../assets/bot3.png"),
  },
  {
    id: 24,
    brand: "Cider",
    size: "M",
    tags: ["blue", "jean"],
    img: require("../assets/bot4.png"),
  },
  {
    id: 25,
    brand: "Cider",
    size: "M",
    tags: ["skirt", "black"],
    img: require("../assets/bot5.png"),
  },
  {
    id: 26,
    brand: "Cider",
    size: "M",
    tags: ["brown", "slacks", "semi-formal"],
    img: require("../assets/bot6.png"),
  },
  {
    id: 27,
    brand: "Cider",
    size: "M",
    tags: ["skirt", "short", "green"],
    img: require("../assets/bot7.png"),
  },
  {
    id: 28,
    brand: "Cider",
    size: "M",
    tags: ["white", "slack", "semi-formal"],
    img: require("../assets/bot8.png"),
  },
];

const footwear = [
  {
    id: 41,
    brand: "Cider",
    size: 8,
    tags: ["black", "heels"],
    img: require("../assets/foot1.jpeg"),
  },
  {
    id: 42,
    brand: "Cider",
    size: 8,
    tags: ["white", "sneakers", "casual"],
    img: require("../assets/foot2.png"),
  },
  {
    id: 43,
    brand: "Cider",
    size: 8,
    tags: ["black", "boot", "heels"],
    img: require("../assets/foot3.png"),
  },
  {
    id: 44,
    brand: "Cider",
    size: 8,
    tags: ["black", "boots"],
    img: require("../assets/foot4.jpg"),
  },
  {
    id: 45,
    brand: "Cider",
    size: 8,
    tags: ["black", "sandals"],
    img: require("../assets/foot5.jpeg"),
  },
];

const accessories = [
  {
    id: 61,
    brand: "Cider",
    tags: ["hair", "ribbon", "white"],
    img: require("../assets/acc1.png"),
  },
  {
    id: 62,
    brand: "Cider",
    tags: ["cats", "clips", "hair"],
    img: require("../assets/acc2.png"),
  },
  {
    id: 63,
    brand: "Meijuri",
    size: "M",
    tags: ["brown", "earrings"],
    img: require("../assets/acc3.png"),
  },
  {
    id: 64,
    brand: "Cider",
    tags: ["black", "sunglasses"],
    img: require("../assets/acc4.png"),
  },
  {
    id: 65,
    brand: "Cider",
    size: "S",
    tags: ["gold", "bracelet"],
    img: require("../assets/acc5.png"),
  },
  {
    id: 66,
    brand: "Kendra Scott",
    size: "S",
    tags: ["gold", "earrings"],
    img: require("../assets/acc6.png"),
  },
  {
    id: 67,
    brand: "Cider",
    tags: ["hair", "clips", "white"],
    img: require("../assets/acc7.png"),
  },
  {
    id: 68,
    brand: "Mejuri",
    size: 7,
    tags: ["ring", "gold"],
    img: require("../assets/acc8.jpeg"),
  },
];

const outfits = [
  {
    name: "Outfit 1",
    items: [accessories[0], tops[0], footwear[0], bottoms[0]],
    tags: ["semi-formal"],
  },
  {
    name: "Outfit 2",
    items: [accessories[2], tops[1], footwear[1], bottoms[1]],
    tags: ["casual"],
  },
  {
    name: "Outfit 3",
    items: [accessories[5], tops[2], footwear[4], bottoms[6]],
    tags: ["casual"],
  },
  {
    name: "Outfit 4",
    items: [accessories[1], tops[3], footwear[3], bottoms[2]],
    tags: ["casual"],
  },
  {
    name: "Outfit 5",
    items: [accessories[4], tops[8], footwear[4], bottoms[5]],
    tags: ["casual"],
  },
  {
    name: "Outfit 6",
    items: [accessories[6], tops[4], footwear[4], bottoms[7]],
    tags: ["casual"],
  },
];

export { tops, bottoms, footwear, accessories, outfits };
