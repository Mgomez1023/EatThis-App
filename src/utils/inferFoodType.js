// utils/inferFoodType.js
const brandMap = {
  "mcdonald's": "burgers",
  "burger king": "burgers",
  "wendy's": "burgers",
  "five guys": "burgers",
  "taco bell": "mexican",
  "chipotle": "mexican",
  "panda express": "chinese",
  "p.f. chang's" : "chinese",
  "kfc": "chicken",
  "popeyes": "chicken",
  "domino's": "pizza",
  "pizza hut": "pizza",
  "little caesars": "pizza",
  "starbucks": "cafe",
  "dunkin": "cafe",
  "subway": "sandwiches",
  "zacatacos" : "mexican",
  "pepe's" : "mexican"
};

const keywordMap = {
  pizza: ["pizza", "pizzeria", "slice"],
  burgers: ["burger", "grill", "patty"],
  mexican: ["tacos", "burrito", "mex", "taqueria", "taco", "mexican"],
  chinese: ["chinese", "szechuan", "wok", "asian"],
  japanese: ["sushi", "ramen", "izakaya"],
  korean: ["korean", "kimchi", "bibimbap"],
  thai: ["thai", "papaya", "somtum"],
  indian: ["indian", "curry", "tandoor"],
  bbq: ["bbq", "barbecue", "smokehouse"],
  chicken: ["chicken", "wing"],
  cafe: ["cafe", "coffee", "espresso"],
  bakery: ["bakery", "bagel", "pastry"],
  seafood: ["seafood", "oyster", "shrimp"]
};

export function inferFoodType(name = "") {
  const lower = name.toLowerCase();

  // 1️⃣ exact‑brand hit
  for (const brand in brandMap) {
    if (lower.includes(brand)) return brandMap[brand];
  }

  // 2️⃣ keyword hit
  for (const [type, words] of Object.entries(keywordMap)) {
    if (words.some(w => lower.includes(w))) return type;
  }

  return "other";
}
