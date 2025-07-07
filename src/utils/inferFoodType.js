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
    "burger", "grill", "flame", "patty", "shack", "bar", "bun", "sizzle",
    "stack", "beef", "diner", "joint", "smash", "blaze", "bite"
  ],
  mexican: [
    "taco", "taqueria", "cantina", "grill", "casa", "cocina", "burrito", "fiesta",
    "loco", "el", "salsa", "agave", "jalapeño", "pollo", "azteca"
  ],
  chicken: [
    "chicken", "wing", "fried", "coop", "cluck", "hen", "shack", "roost",
    "tenders", "bucket", "broast", "yard", "crispy", "feather", "clucker"
  ],
  pizza: [
    "pizza", "pizzeria", "slice", "pie", "oven", "crust", "brick", "fire",
    "hut", "papa", "dough", "wood", "little", "pepperoni", "margherita"
  ],
  sandwiches: [
    "deli", "subs", "sandwich", "sub", "hoagie", "bagel", "panini", "grinder",
    "hero", "roll", "shop", "express", "kitchen", "bistro", "works"
  ],
  cafe: [
    "coffee", "café", "brew", "bean", "espresso", "roasters", "latte", "grind",
    "java", "cup", "grounds", "house", "mug", "barista", "roast"
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
    "jade", "golden", "king", "lotus", "china", "imperial", "house"
  ],
  japanese: [
    "sushi", "ramen", "izakaya", "yakitori", "donburi", "bento", "udon", "sashimi",
    "tempura", "miso", "matcha", "tonkatsu", "teppan", "omakase", "nigiri"
  ],
  korean: [
    "korean", "kimchi", "bibimbap", "bulgogi", "soju", "banchan", "galbi", "gochujang",
    "kbbq", "mandu", "jjigae", "dak", "samgyeopsal", "sundubu", "gimbap"
  ],
  thai: [
    "thai", "papaya", "somtum", "basil", "curry", "lemongrass", "pad", "tom",
    "yum", "rice", "noodle", "satay", "mango", "spice", "peanut"
  ],
  indian: [
    "indian", "curry", "tandoor", "masala", "naan", "biriyani", "chaat", "dal",
    "roti", "spice", "vindaloo", "korma", "paneer", "thali", "dosai"
  ],
  bbq: [
    "bbq", "barbecue", "smokehouse", "pit", "smoked", "ribs", "grill", "brisket",
    "rub", "wood", "fire", "char", "sauce", "slow", "oak"
  ],
  seafood: [
    "seafood", "oyster", "shrimp", "crab", "fish", "lobster", "clam", "grill",
    "dock", "net", "tide", "bay", "shells", "marina", "reef"
  ],
  mediterranean: [
    "pita", "gyro", "kebab", "taverna", "olive", "grill", "falafel", "mezze",
    "shawarma", "souvlaki", "baklava", "zeus", "greek", "baba", "tzatziki"
  ],
  hawaiian: [
    "poke", "aloha", "island", "hawaiian", "bowl", "surf", "luau", "pineapple",
    "ohana", "wave", "volcano", "huli", "plate", "coconut", "shack"
  ],
  hotdogs: [
    "dog", "dogs", "hot", "wiener", "frank", "sausage", "bun", "stand",
    "cart", "grill", "coney", "chicago", "corner", "shack", "king"
  ]
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
