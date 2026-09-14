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
  price: string;
  unit: string;
};

export type AdPage = {
  id: string;
  label: string;
  deals: AdDeal[];
};

export const weeklyAd = {
  validity: "Valid this week — sample circular mockup",
  note: "Preview only. Open the official weekly ad for current Algonquin specials.",
  pages: [
    {
      id: "produce",
      label: "Produce",
      deals: [
        { title: "Organic Strawberries", price: "$3.99", unit: "16 oz" },
        { title: "Hass Avocados", price: "$1.49", unit: "each" },
        { title: "Baby Spinach", price: "$2.49", unit: "5 oz" },
        { title: "Honeycrisp Apples", price: "$2.99", unit: "lb" },
      ],
    },
    {
      id: "meat",
      label: "Meat",
      deals: [
        { title: "USDA Choice Ribeye", price: "$12.99", unit: "lb" },
        { title: "Smokehouse Bacon", price: "$4.99", unit: "12 oz" },
        { title: "Ground Chuck 80/20", price: "$4.49", unit: "lb" },
        { title: "Chicken Drumsticks", price: "$1.79", unit: "lb" },
      ],
    },
    {
      id: "bakery",
      label: "Bakery",
      deals: [
        { title: "Artisan Sourdough", price: "$3.49", unit: "loaf" },
        { title: "European Butter Croissants", price: "$5.99", unit: "4 ct" },
        { title: "Rye Bread", price: "$2.99", unit: "loaf" },
        { title: "Assorted Danish", price: "$6.49", unit: "6 ct" },
      ],
    },
    {
      id: "grocery",
      label: "Grocery",
      deals: [
        { title: "Extra Virgin Olive Oil", price: "$7.99", unit: "750 ml" },
        { title: "Imported Pasta", price: "$1.29", unit: "16 oz" },
        { title: "Whole Milk", price: "$3.19", unit: "gallon" },
        { title: "Sparkling Water", price: "$3.99", unit: "12 pk" },
      ],
    },
  ] satisfies AdPage[],
};
