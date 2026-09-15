export type StockStatus = "in-stock" | "low-stock" | "out-of-stock";

export type SellBy = "weight" | "each";

export type Product = {
  id: string;
  name: string;
  /** Brand or variety shown under the name */
  brand: string;
  category: "produce" | "grocery" | "bakery" | "dairy" | "meat";
  /** Extra terms for search matching */
  keywords: string[];
  sellBy: SellBy;
  /** Price in USD per lb (weight) or per item (each) */
  price: number;
  unitLabel: string;
  stock: StockStatus;
  description: string;
  /** Soft color wash when no photo is available */
  accent: string;
  image?: string;
};

export const products: Product[] = [
  // —— Onions (by weight) ——
  {
    id: "onion-white",
    name: "White Onions",
    brand: "Produce · White",
    category: "produce",
    keywords: ["onion", "onions", "white onion", "bulb"],
    sellBy: "weight",
    price: 1.29,
    unitLabel: "lb",
    stock: "in-stock",
    description: "Mild, crisp white onions — great for salsas and grilling.",
    accent: "#f5f0e6",
  },
  {
    id: "onion-yellow",
    name: "Yellow Onions",
    brand: "Produce · Yellow",
    category: "produce",
    keywords: ["onion", "onions", "yellow onion", "cooking onion"],
    sellBy: "weight",
    price: 0.99,
    unitLabel: "lb",
    stock: "in-stock",
    description: "Everyday yellow onions for soups, sauces, and roasting.",
    accent: "#f0e4c8",
  },
  {
    id: "onion-small",
    name: "Small Boiling Onions",
    brand: "Produce · Pearl / boiling",
    category: "produce",
    keywords: ["onion", "onions", "small onion", "boiling onion", "pearl"],
    sellBy: "weight",
    price: 1.79,
    unitLabel: "lb",
    stock: "low-stock",
    description: "Petite onions ideal for stews and boiling — limited this week.",
    accent: "#ebe6d9",
  },

  // —— Other produce by weight ——
  {
    id: "carrot-bulk",
    name: "Carrots",
    brand: "Produce · Bulk",
    category: "produce",
    keywords: ["carrot", "carrots", "root"],
    sellBy: "weight",
    price: 0.89,
    unitLabel: "lb",
    stock: "in-stock",
    description: "Sweet, crunchy carrots sold by the pound.",
    accent: "#f3c28a",
    image: "/departments/produce.jpg",
  },
  {
    id: "tomato-vine",
    name: "Vine Tomatoes",
    brand: "Produce · Vine-ripened",
    category: "produce",
    keywords: ["tomato", "tomatoes", "vine"],
    sellBy: "weight",
    price: 2.49,
    unitLabel: "lb",
    stock: "in-stock",
    description: "Ripe vine tomatoes with bright flavor.",
    accent: "#e8b4a8",
  },
  {
    id: "tomato-roma",
    name: "Roma Tomatoes",
    brand: "Produce · Roma",
    category: "produce",
    keywords: ["tomato", "tomatoes", "roma", "plum"],
    sellBy: "weight",
    price: 1.99,
    unitLabel: "lb",
    stock: "low-stock",
    description: "Meaty romas for sauces and roasting.",
    accent: "#d99084",
  },
  {
    id: "orange-navel",
    name: "Navel Oranges",
    brand: "Produce · Navel",
    category: "produce",
    keywords: ["orange", "oranges", "citrus", "navel"],
    sellBy: "weight",
    price: 1.49,
    unitLabel: "lb",
    stock: "in-stock",
    description: "Juicy navels — snack or juice.",
    accent: "#f0c078",
  },
  {
    id: "banana-bulk",
    name: "Bananas",
    brand: "Produce · Yellow",
    category: "produce",
    keywords: ["banana", "bananas", "fruit"],
    sellBy: "weight",
    price: 0.59,
    unitLabel: "lb",
    stock: "in-stock",
    description: "Everyday bananas priced by the pound.",
    accent: "#f5e6a3",
  },
  {
    id: "avocado-hass",
    name: "Hass Avocados",
    brand: "Produce · Hass",
    category: "produce",
    keywords: ["avocado", "avocados", "hass"],
    sellBy: "each",
    price: 1.29,
    unitLabel: "each",
    stock: "in-stock",
    description: "Creamy Hass avocados, sold individually.",
    accent: "#c5d4a8",
  },

  // —— Oats (by count / package) ——
  {
    id: "oats-steel-cut",
    name: "Steel Cut Oats",
    brand: "Quaker",
    category: "grocery",
    keywords: ["oats", "oatmeal", "steel cut", "quaker", "breakfast"],
    sellBy: "each",
    price: 5.49,
    unitLabel: "24 oz canister",
    stock: "in-stock",
    description: "Hearty steel-cut oats with a chewy bite.",
    accent: "#e8dcc8",
  },
  {
    id: "oats-old-fashioned",
    name: "Old Fashioned Oats",
    brand: "Quaker",
    category: "grocery",
    keywords: ["oats", "oatmeal", "old fashioned", "rolled", "non cut", "quaker"],
    sellBy: "each",
    price: 3.99,
    unitLabel: "42 oz canister",
    stock: "in-stock",
    description: "Classic rolled oats — not cut. The pantry staple.",
    accent: "#efe6d4",
  },
  {
    id: "oats-quick",
    name: "Quick 1-Minute Oats",
    brand: "Quaker",
    category: "grocery",
    keywords: ["oats", "oatmeal", "quick", "quaker", "instant"],
    sellBy: "each",
    price: 3.79,
    unitLabel: "42 oz canister",
    stock: "low-stock",
    description: "Faster-cooking Quaker oats for busy mornings.",
    accent: "#e6dcc8",
  },
  {
    id: "oats-instant-packets",
    name: "Instant Oatmeal Assorted",
    brand: "Quaker",
    category: "grocery",
    keywords: ["oats", "oatmeal", "instant", "packets", "quaker"],
    sellBy: "each",
    price: 4.29,
    unitLabel: "10 ct box",
    stock: "in-stock",
    description: "Flavored instant packets — maple, apple, cinnamon.",
    accent: "#f0e8d8",
  },
  {
    id: "oats-kodiak",
    name: "Power Oats",
    brand: "Kodiak Cakes",
    category: "grocery",
    keywords: ["oats", "oatmeal", "kodiak", "protein", "breakfast"],
    sellBy: "each",
    price: 6.99,
    unitLabel: "16 oz bag",
    stock: "in-stock",
    description: "Protein-packed Kodiak oats for a fuller breakfast.",
    accent: "#d9cfc0",
  },
  {
    id: "oats-bob-red",
    name: "Organic Rolled Oats",
    brand: "Bob's Red Mill",
    category: "grocery",
    keywords: ["oats", "oatmeal", "bobs", "bob's red mill", "organic", "rolled"],
    sellBy: "each",
    price: 5.99,
    unitLabel: "32 oz bag",
    stock: "out-of-stock",
    description: "Organic whole-grain rolled oats — back in soon.",
    accent: "#ddd4c4",
  },
  {
    id: "oats-quaker-protein",
    name: "Protein Instant Oatmeal",
    brand: "Quaker",
    category: "grocery",
    keywords: ["oats", "oatmeal", "protein", "quaker", "instant"],
    sellBy: "each",
    price: 4.99,
    unitLabel: "8 ct box",
    stock: "in-stock",
    description: "Quaker protein instant oatmeal cups/packets.",
    accent: "#ebe2d2",
  },

  // —— More grocery by count ——
  {
    id: "pasta-prince",
    name: "Spaghetti",
    brand: "Prince",
    category: "grocery",
    keywords: ["pasta", "spaghetti", "prince", "noodles"],
    sellBy: "each",
    price: 1.29,
    unitLabel: "16 oz box",
    stock: "in-stock",
    description: "Weeknight spaghetti — weekly-ad friendly price.",
    accent: "#f2e8d4",
  },
  {
    id: "rice-jasmine",
    name: "Jasmine Rice",
    brand: "International aisle",
    category: "grocery",
    keywords: ["rice", "jasmine", "grain"],
    sellBy: "each",
    price: 12.99,
    unitLabel: "25 lb bag",
    stock: "in-stock",
    description: "Fragrant jasmine rice — big bag for the pantry.",
    accent: "#f7f2e6",
    image: "/departments/international.jpg",
  },
  {
    id: "bread-baguette",
    name: "French Baguette",
    brand: "European Bakery",
    category: "bakery",
    keywords: ["bread", "baguette", "bakery", "french"],
    sellBy: "each",
    price: 1.99,
    unitLabel: "each",
    stock: "in-stock",
    description: "Crisp crust, soft crumb — baked in-house.",
    accent: "#e8d5b0",
    image: "/departments/bakery.jpg",
  },
  {
    id: "milk-gallon",
    name: "Whole Milk",
    brand: "Local dairy",
    category: "dairy",
    keywords: ["milk", "dairy", "whole milk", "gallon"],
    sellBy: "each",
    price: 3.49,
    unitLabel: "gallon",
    stock: "in-stock",
    description: "Fresh whole milk by the gallon.",
    accent: "#f4f6f8",
  },
  {
    id: "eggs-large",
    name: "Large Eggs",
    brand: "Grade A",
    category: "dairy",
    keywords: ["eggs", "egg", "dozen"],
    sellBy: "each",
    price: 2.99,
    unitLabel: "dozen",
    stock: "low-stock",
    description: "Grade A large eggs — running low this afternoon.",
    accent: "#faf6ea",
  },
  {
    id: "bacon-smokehouse",
    name: "Smokehouse Bacon",
    brand: "Smokehouse",
    category: "meat",
    keywords: ["bacon", "pork", "smokehouse", "meat"],
    sellBy: "each",
    price: 4.99,
    unitLabel: "12 oz pack",
    stock: "in-stock",
    description: "Thick-cut smokehouse bacon.",
    accent: "#e8c4b8",
    image: "/departments/meats.jpg",
  },
  {
    id: "chicken-thighs",
    name: "Chicken Thighs",
    brand: "Family pack",
    category: "meat",
    keywords: ["chicken", "thighs", "poultry", "meat"],
    sellBy: "weight",
    price: 1.49,
    unitLabel: "lb",
    stock: "in-stock",
    description: "Bone-in chicken thighs, sold by the pound.",
    accent: "#e5d0c4",
    image: "/departments/meats.jpg",
  },
];

export const stockLabels: Record<StockStatus, string> = {
  "in-stock": "In stock",
  "low-stock": "Low stock",
  "out-of-stock": "Out of stock",
};

export function formatMoney(amount: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(amount);
}

export function getProduct(id: string): Product | undefined {
  return products.find((p) => p.id === id);
}

/** Simple case-insensitive search across name, brand, keywords, category. */
export function searchProducts(query: string): Product[] {
  const q = query.trim().toLowerCase();
  if (!q) return products;

  const terms = q.split(/\s+/).filter(Boolean);

  return products.filter((product) => {
    const haystack = [
      product.name,
      product.brand,
      product.category,
      product.description,
      ...product.keywords,
    ]
      .join(" ")
      .toLowerCase();

    return terms.every((term) => haystack.includes(term));
  });
}

export function lineTotal(product: Product, quantity: number): number {
  return Math.round(product.price * quantity * 100) / 100;
}
