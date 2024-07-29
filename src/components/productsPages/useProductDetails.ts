import { db } from "../../firebaseConfig";
import { collection, getDocs } from "firebase/firestore";
import { useState, useEffect } from "react";

interface ProductDetails {
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

interface Data {
  id: string;
  data: ProductDetails[];
}

const useProductDetails = () => {
  const [productDetails, setProductDetails] = useState<Data[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        // Fetch all categories from the products collection.
        const productCategories = collection(db, "products");
        const productDocumentsSnapshot = await getDocs(productCategories);

        // An array to store product details
        const productsData: Data[] = [];

        // Iterate over each document in the products collection.
        for (const productDoc of productDocumentsSnapshot.docs) {
          const productId = productDoc.id;
          // For each product category, fetch all documents from the productslist subcollection.
          const productListCollection = collection(
            db,
            `products/${productId}/productslist`
          );
          const productsListSnapshot = await getDocs(productListCollection);
          // Map over the documents in productslist to extract ProductDetails data.
          const productDetails: ProductDetails[] =
            productsListSnapshot.docs.map(
              (detailDoc) => detailDoc.data() as ProductDetails
            );

          // Push an object with id and data to productsData.
          productsData.push({
            id: productId,
            data: productDetails,
          });
        }

        // Update the productDetails state with the fetched data.
        setProductDetails(productsData);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProductDetails();
  }, []);

  return { loading, productDetails };
};

export default useProductDetails;
