import { db } from "../../firebaseConfig";
import { collection, getDocs } from "firebase/firestore";
import { useState, useEffect } from "react";
import {
  Data,
  ProductDetails,
  SidebarData,
  SidebarDataDetails,
} from "../../interfaces";

export const useProductDetails = () => {
  const [allProducts, setAllProducts] = useState<Data[]>([]);
  const [productDetails, setProductDetails] = useState<ProductDetails[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        // Fetch all categories from the products collection.
        const productCategories = collection(db, "products");
        const productDocumentsSnapshot = await getDocs(productCategories);

        // An array to store all products
        const products: Data[] = [];

        // An array to store all product details
        const productsDetails: ProductDetails[] = [];

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
          const productDetailsArray: ProductDetails[] =
            productsListSnapshot.docs.map(
              (detailDoc) => detailDoc.data() as ProductDetails
            );

          // Push an object with id and data to productsData.
          products.push({
            id: productId,
            data: productDetailsArray,
          });

          // Flatten productDetailsArray into flattenedProducts
          productsDetails.push(...productDetailsArray);
        }

        // Update the productDetails state with the fetched data.
        setAllProducts(products);
        setProductDetails(productsDetails);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProductDetails();
  }, []);

  return { loading, allProducts, productDetails };
};

export const useSidebarData = () => {
  // State for storing fetched sidebar data
  const [sidebarData, setSidebarData] = useState<SidebarData[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Reference to the "products" collection in Firestore
        const productsRef = collection(db, "products");
        const productsSnapshot = await getDocs(productsRef);
        const allSidebarData: SidebarData[] = [];

        // Loop through each product category and fetch its "sidebardata"
        for (const productDoc of productsSnapshot.docs) {
          const category = productDoc.id;
          const sidebardataRef = collection(
            db,
            "products",
            category,
            "sidebardata"
          );
          const sidebardataSnapshot = await getDocs(sidebardataRef);

          // Map through each doc in "sidebardata" and extract data
          const data: SidebarDataDetails[] = sidebardataSnapshot.docs.map(
            (doc) => {
              return doc.data() as SidebarDataDetails;
              // return {
              //   id: doc.id,
              //   items: docData.items || [], // Ensure items is an array, even if it's missing
              // };
            }
          );

          // Push the data to sidebar data array
          allSidebarData.push({ id: category, data });
        }

        // Set the state with fetched sidebar data
        setSidebarData(allSidebarData);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    // Fetch the sidebar data on component mount
    fetchData();
  }, []);
  return { sidebarData };
};
