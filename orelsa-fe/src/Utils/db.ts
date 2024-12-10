export interface IRange {
  _id: string | number;
  browseRangePhoto: string;
  description: string;
}

export interface IRooms {
  id: string | number;
  imagesrc: string;
}

export interface ProductDetail {
  _id: string | number;
  photos: string[];
  name: string;
  description: string;
  discount_price: number;
  price: number;
  discount: number;
}

export interface AboutQuality {
  id: string | number;
  src: string;
  title: string;
  desc: string;
}

export interface Price {
  name: string;
  value: string;
}

export const TheRangeData: any = [
  {
    id: 1,
    src: "/TheRange/Group-1.svg",
    desc: "Dining",
  },
  {
    id: 2,
    src: "/TheRange/Group-2.svg",
    desc: "Living",
  },
  {
    id: 3,
    src: "/TheRange/Group-3.svg",
    desc: "Bedroom",
  },
];

export const Rooms: IRooms[] = [
  {
    id: 1,
    imagesrc: "/rooms/R-1.svg",
  },
  {
    id: 2,
    imagesrc: "/rooms/R-2.svg",
  },
  {
    id: 3,
    imagesrc: "/rooms/R-3.svg",
  },
];

export const QualityData: AboutQuality[] = [
  {
    id: 1,
    src: "/Quality/1st.svg",
    title: "High Quality",
    desc: "crafted from top materials",
  },
  {
    id: 2,
    src: "/Quality/2nd.svg",
    title: "Warranty Protection",
    desc: "Over 2 years",
  },
  {
    id: 3,
    src: "/Quality/3rd.svg",
    title: "Free Shipping",
    desc: "Order over 150 $",
  },
  {
    id: 4,
    src: "/Quality/4.svg",
    title: "24 / 7 Support",
    desc: "Dedicated support",
  },
];

export const Prices: Price[] = [
  {
    name: "$1 to $50",
    value: "1-50",
  },
  {
    name: "$51 to $200",
    value: "51-200",
  },
  {
    name: "$201 to $1000",
    value: "201-1000",
  },
];
