export const store = {
  name: "Local Market Shop & Save",
  shortName: "Local Market",
  tagline: "Fresher aisle. Bigger savings.",
  support:
    "Your Algonquin neighborhood store — formerly Butera Market — with fresher products, bigger selection, and more international favorites.",
  addressLine1: "100 S Randall Rd",
  addressLine2: "Algonquin, IL 60102",
  phone: "(847) 458-9100",
  phoneHref: "tel:+18474589100",
  mapsUrl:
    "https://www.google.com/maps/search/?api=1&query=100+S+Randall+Rd,+Algonquin,+IL+60102",
  facebookUrl: "https://www.facebook.com/LocalMarketShopAndSaveAlgonquin/",
  weeklyAdUrl:
    "http://www.shopandsavemarket.com/100-South-Randall-Rd-Algonquin-weekly-ad/",
  siteUrl: "https://www.localmarketfresh.com/algonquin",
} as const;

export type DayHours = {
  day: string;
  /** 0 = Sunday … 6 = Saturday */
  dayIndex: number;
  open: string;
  close: string;
  /** Minutes from midnight */
  openMinutes: number;
  closeMinutes: number;
};

export const hours: DayHours[] = [
  { day: "Monday", dayIndex: 1, open: "7:00 AM", close: "9:00 PM", openMinutes: 7 * 60, closeMinutes: 21 * 60 },
  { day: "Tuesday", dayIndex: 2, open: "7:00 AM", close: "9:00 PM", openMinutes: 7 * 60, closeMinutes: 21 * 60 },
  { day: "Wednesday", dayIndex: 3, open: "7:00 AM", close: "9:00 PM", openMinutes: 7 * 60, closeMinutes: 21 * 60 },
  { day: "Thursday", dayIndex: 4, open: "7:00 AM", close: "9:00 PM", openMinutes: 7 * 60, closeMinutes: 21 * 60 },
  { day: "Friday", dayIndex: 5, open: "7:00 AM", close: "9:00 PM", openMinutes: 7 * 60, closeMinutes: 21 * 60 },
  { day: "Saturday", dayIndex: 6, open: "7:00 AM", close: "8:00 PM", openMinutes: 7 * 60, closeMinutes: 20 * 60 },
  { day: "Sunday", dayIndex: 0, open: "7:00 AM", close: "8:00 PM", openMinutes: 7 * 60, closeMinutes: 20 * 60 },
];

export type Department = {
  id: string;
  title: string;
  blurb: string;
  image: string;
  alt: string;
};

export const departments: Department[] = [
  {
    id: "produce",
    title: "Fresh Produce",
    blurb: "Crisp greens, ripe fruit, and seasonal picks delivered daily.",
    image: "/departments/produce.jpg",
    alt: "Colorful fresh produce display",
  },
  {
    id: "meats",
    title: "Smokehouse Meats",
    blurb: "Hand-cut steaks, smoked specialties, and butcher-counter favorites.",
    image: "/departments/meats.jpg",
    alt: "Smokehouse and butcher meats",
  },
  {
    id: "bakery",
    title: "European Bakery",
    blurb: "Fresh-baked breads, pastries, and made-from-scratch sweets.",
    image: "/departments/bakery.jpg",
    alt: "European bakery breads and pastries",
  },
  {
    id: "international",
    title: "International Favorites",
    blurb: "Global pantry staples and hard-to-find flavors from around the world.",
    image: "/departments/international.jpg",
    alt: "International grocery pantry staples",
  },
];

export type AdDeal = {
  title: string;
  /** Primary price display, e.g. "3.99", "79¢", "2/$5" */
  price: string;
  unit: string;
  badge?: string;
  featured?: boolean;
};

export type AdCategory = {
  id: string;
  label: string;
  deals: AdDeal[];
};

/** Sampled from the Sept 9–15 circular — curated for digital browsing, not a full reprint. */
export const weeklyAd = {
  validity: "Prices effective Sept 9 – Sept 15",
  note: "Same weekly specials — redesigned for the web. Browse by department instead of scanning a packed sheet.",
  categories: [
    {
      id: "produce",
      label: "Produce",
      deals: [
        {
          title: "Seedless Watermelons",
          price: "4.99",
          unit: "each",
          badge: "Locally grown",
          featured: true,
        },
        { title: "Cuties Mandarins", price: "4.99", unit: "3 lb bag" },
        { title: "Hass Avocados", price: "1.29", unit: "each" },
        { title: "Sweet Corn", price: "4/$5", unit: "ears" },
        { title: "Red or Green Seedless Grapes", price: "1.99", unit: "lb" },
        { title: "Bananas", price: "59¢", unit: "lb" },
      ],
    },
    {
      id: "meat",
      label: "Meat",
      deals: [
        {
          title: "USDA Choice Black Angus Beef Inner Skirt Steak",
          price: "8.99",
          unit: "lb",
          badge: "USDA Choice",
          featured: true,
        },
        { title: "USDA Choice Black Angus Beef Pepper Steak", price: "8.49", unit: "lb" },
        { title: "Pork Center Cut Chops", price: "2.99", unit: "lb · family pack" },
        { title: "Chicken Thighs", price: "1.49", unit: "lb · family pack" },
        { title: "Smokehouse Bacon", price: "4.99", unit: "12 oz" },
        { title: "Ground Chuck 80/20", price: "4.49", unit: "lb" },
      ],
    },
    {
      id: "seafood",
      label: "Seafood",
      deals: [
        {
          title: "Atlantic Salmon Fillets",
          price: "9.99",
          unit: "lb",
          featured: true,
        },
        { title: "Cod Fillets", price: "7.99", unit: "lb" },
        { title: "Tilapia Fillets", price: "5.99", unit: "lb" },
        { title: "Cooked Shrimp Ring", price: "12.99", unit: "each" },
      ],
    },
    {
      id: "bakery",
      label: "Bakery",
      deals: [
        {
          title: "Raspberry Cloud Cake",
          price: "14.99",
          unit: "each",
          badge: "Our very own",
          featured: true,
        },
        { title: "French Baguettes", price: "1.99", unit: "each" },
        { title: "Tiramisu Cake", price: "16.99", unit: "each" },
        { title: "Fresh Donuts", price: "5.99", unit: "dozen" },
        { title: "Sliced Sandwich Bread", price: "2.49", unit: "loaf" },
      ],
    },
    {
      id: "deli",
      label: "Deli",
      deals: [
        {
          title: "Boar's Head Ovengold Turkey",
          price: "9.99",
          unit: "lb",
          featured: true,
        },
        { title: "Polish Ham", price: "6.99", unit: "lb" },
        { title: "Oaxaca Cheese", price: "5.99", unit: "lb" },
        { title: "Queso Blanco", price: "4.99", unit: "lb" },
        { title: "Farmers Cheese", price: "3.99", unit: "lb" },
      ],
    },
    {
      id: "international",
      label: "International",
      deals: [
        {
          title: "Jasmine Rice",
          price: "12.99",
          unit: "25 lb",
          featured: true,
        },
        { title: "Silver Swan Soy Sauce", price: "2.49", unit: "bottle" },
        { title: "Jarritos Assorted", price: "99¢", unit: "each" },
        { title: "Góralki Polish Wafers", price: "2/$5", unit: "pack" },
        { title: "Coconut Milk", price: "1.79", unit: "can" },
      ],
    },
    {
      id: "grocery",
      label: "Grocery",
      deals: [
        {
          title: "Prince Pasta",
          price: "1.29",
          unit: "16 oz · excl. lasagna",
          featured: true,
        },
        { title: "Quaker Oats", price: "3.99", unit: "42 oz" },
        { title: "Cheez-It", price: "2/$5", unit: "select sizes" },
        { title: "Coke or Pepsi 12-Pack", price: "5.99", unit: "12 pk cans" },
        { title: "Bottled Water", price: "3.99", unit: "24 pk" },
        { title: "Fiora Bath Tissue", price: "5.99", unit: "12 rolls" },
      ],
    },
  ] satisfies AdCategory[],
};
