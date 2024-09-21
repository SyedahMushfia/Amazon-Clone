export interface ProductProps {
  title: string;
  imageInfo: {
    image: string;
    name?: string;
  }[];
  link?: string;
}

export interface ProductDetails {
  name: string;
  imageURLs: string[];
  rating: number;
  reviewsCount: number;
  monthlySalesCount: number;
  isBestseller: boolean;
  listPrice: number;
  discount: number;
  shippingPrice: number;
  Color?: string[];
  Size?: string;
  Style?: string;
  Pattern?: string;
  brand: string;
  earPlacement?: string;
  formFactor?: string;
  noiseControl?: string;
  impedance?: number;
  compatibleDevices?: string;
  specialFeature?: string;
  recommendedUses?: string;
  connectivityTechnology?: string;
  productDescription: string[];
  dateFirstAvailable: Date;
}

export interface Data {
  id: string;
  data: ProductDetails[];
}

// Interface for sidebar data structure
export interface SidebarDataDetails {
  [key: string]: string[] | number;
}

// Interface for sidebar collection containing id and data
export interface SidebarData {
  id: string;
  data: SidebarDataDetails[];
}
