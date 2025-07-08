// utils/inferFoodType.js
const brandMap = {
  "a&w": "burgers",
  "arby’s": "sandwiches",
  "auntie anne’s": "dessert",
  "baja fresh": "mexican",
  "barberitos": "mexican",
  "baskin-robbins": "dessert",
  "big chicken": "chicken",
  "blake’s lotaburger": "burgers",
  "bojangles": "chicken",
  "bonchon chicken": "chicken",
  "bubbakoo’s burritos": "mexican",
  "burger king": "burgers",
  "burgerfi": "burgers",
  "carl’s jr.": "burgers",
  "checkers / rally’s": "burgers",
  "chester’s": "chicken",
  "chick-fil-a": "chicken",
  "chicken express": "chicken",
  "chicken salad chick": "chicken",
  "chipotle": "mexican",
  "church’s texas chicken": "chicken",
  "cici’s pizza": "pizza",
  "cold stone creamery": "dessert",
  "crumbl cookies": "dessert",
  "culver’s": "burgers",
  "del taco": "mexican",
  "domino’s": "pizza",
  "dunkin": "cafe",
  "dutch bros": "cafe",
  "einstein bros. bagels": "cafe",
  "el pollo loco": "chicken",
  "firehouse subs": "sandwiches",
  "five guys": "burgers",
  "freddy’s frozen custard & steakburgers": "burgers",
  "good times": "burgers",
  "great american cookies": "dessert",
  "hardee’s": "burgers",
  "hawaiian bros": "hawaiian",
  "hungry howie’s": "pizza",
  "in-n-out burger": "burgers",
  "jack in the box": "burgers",
  "jack’s": "burgers",
  "jason’s deli": "sandwiches",
  "jersey mike’s subs": "sandwiches",
  "jet’s pizza": "pizza",
  "jimmy john’s": "sandwiches",
  "kfc": "chicken",
  "krispy kreme": "cafe",
  "krystal": "burgers",
  "ledos pizza": "pizza",
  "little caesars": "pizza",
  "marco’s pizza": "pizza",
  "mcalister’s deli": "sandwiches",
  "mcdonald's": "burgers",
  "mod pizza": "pizza",
  "moe’s southwest grill": "mexican",
  "mooyah": "burgers",
  "naf naf": "mediterranean",
  "newk’s eatery": "sandwiches",
  "olive garden italian restaurant": "italian",
  "p.f. chang’s": "chinese",
  "pancheros": "mexican",
  "panda express": "chinese",
  "panera bread": "sandwiches",
  "papa gino’s": "pizza",
  "papa john’s": "pizza",
  "papa murphy’s": "pizza",
  "penn station east coast subs": "sandwiches",
  "pepe's": "mexican",
  "peter piper pizza": "pizza",
  "pieology": "pizza",
  "pizza hut": "pizza",
  "pizza inn": "pizza",
  "popeyes": "chicken",
  "portillo’s": "hot dogs",
  "potbelly sandwich works": "sandwiches",
  "qdoba": "mexican",
  "quiznos": "sandwiches",
  "raising cane’s": "chicken",
  "shake shack": "burgers",
  "slim chickens": "chicken",
  "smoothie king": "dessert",
  "sonic drive-in": "burgers",
  "starbucks": "cafe",
  "steak ‘n shake": "burgers",
  "subway": "sandwiches",
  "sbarro" : "pizza",
  "taco bell": "mexican",
  "taco john’s": "mexican",
  "the habit burger grill": "burgers",
  "the halal guys": "mediterranean",
  "tim hortons": "cafe",
  "torchy’s tacos": "mexican",
  "wayback burgers": "burgers",
  "wendy's": "burgers",
  "whataburger": "burgers",
  "white castle": "burgers",
  "zacatacos": "mexican",
  "zaxby’s": "chicken"
};

const keywordMap = {
  burgers: [
    "burger", "flame", "patty", "shack", "bar", "bun", "sizzle",
    "stack", "beef", "diner", "joint", "smash", "blaze", "bite"
  ],
  mexican: [
    "taco", "taqueria", "cantina", "grill", "casa", "cocina", "burrito", "fiesta",
    "loco", "el", "salsa", "agave", "jalapeño", "pollo", "azteca", "mexican", "mex"
  ],
  chicken: [
    "chicken", "wing", "fried", "coop", "cluck", "hen", "shack", "roost",
    "tenders", "bucket", "broast", "yard", "crispy", "feather", "clucker"
  ],
  pizza: [
    "pizza", "pizzeria", "slice", "oven", "crust", "brick",
    "hut", "papa", "dough", "wood", "pepperoni", "margherita"
  ],
  sandwiches: [
    "deli", "subs", "sandwich", "sub", "hoagie", "bagel", "panini", "grinder",
    "hero", "roll", "express", "kitchen", "bistro", "works"
  ],
  cafe: [
    "coffee", "coffee bar", "café", "bean", "espresso", "roasters", "latte", "grind",
    "java", "cup", "grounds", "mug", "barista", "roast"
  ],
  bakery: [
    "bakery", "bagel", "pastry", "donut", "cookie", "cake", "scone", "bakehouse",
    "bread", "croissant", "cupcake", "doughnut", "artisan", "muffin", "sweet"
  ],
  dessert: [
    "cream", "scoop", "sweet", "ice", "cone", "cookie", "donut", "cake",
    "shake", "creamery", "sugar", "swirl", "parlor", "frost", "bliss"
  ],
  chinese: [
    "wok", "dragon", "palace", "panda", "express", "bamboo", "dynasty",
    "jade", "golden", "king", "lotus", "china", "imperial", "noodle", "rice",
    "korean", "kimchi", "bibimbap", "bulgogi", "soju", "banchan", "galbi", "gochujang",
    "kbbq", "mandu", "jjigae", "dak", "samgyeopsal", "sundubu", "gimbap"
  ],
  indian: [
    "indian", "curry", "tandoor", "masala", "naan", "biriyani", "chaat", "dal",
    "roti", "spice", "vindaloo", "korma", "paneer", "thali", "dosai", "pita", "gyro", "kebab", "taverna", "olive", "grill", "falafel", "mezze",
    "shawarma", "souvlaki", "baklava", "zeus", "greek", "baba", "tzatziki"
  ],
  bbq: [
    "bbq", "barbecue", "smokehouse", "pit", "smoked", "ribs", "grill", "brisket",
    "rub", "wood", "fire", "char", "sauce", "slow", "oak"
  ],
  seafood: [
    "seafood", "oyster", "shrimp", "crab", "fish", "lobster", "clam", "grill",
    "dock", "net", "tide", "bay", "shells", "marina", "reef"
  ],
  hotdogs: [
    "dog", "dogs", "hot", "wiener", "frank", "sausage", "bun", "stand",
    "cart", "grill", "coney", "chicago", "corner", "shack", "king"
  ],
  italian: [
    "pasta", "lasagna", "spaghetti", "ravioli", "gnocchi", "focaccia",
    "bolognese", "parmigiana", "risotto", "carbonara", "alfredo", "tiramisu",
    "trattoria", "osteria", "ristorante", "cucina", "italian", "napoli", "roma",
    "toscana", "bella", "amore", "nonna", "da", "il", "la", "vino", "bruschetta"
  ]
};


export function inferFoodType(name = "") {
  const lower = name.toLowerCase();

  // 1️⃣ exact‑brand hit
  for (const brand in brandMap) {
    if (lower.includes(brand)) return brandMap[brand];
  }

  // 2️⃣ keyword hit
  
const skipPhrases = ['coffee bar', 'protein bar', 'salad bar']; // phrases to ignore

for (const [type, words] of Object.entries(keywordMap)) {
  // Skip if restaurant name includes any unwanted phrase
  if (skipPhrases.some(phrase => lower.includes(phrase))) continue;

  for (const w of words) {
    const regex = new RegExp(`\\b${w}\\b`, 'i'); // match full word only
    if (regex.test(lower)) return type;
  }
}

  return "other";
}
