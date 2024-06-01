export interface ProductProps {
  title: string;
  imageInfo: {
    image: string;
    name?: string;
  }[];
  link?: string;
}
