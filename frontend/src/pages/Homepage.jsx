import { Container, SimpleGrid, Text, VStack, Spinner } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useProductStore } from "../store/product";
import ProductCard from "../components/ProductCard";

const Homepage = () => {
  const { fetchProducts, products: storeProducts } = useProductStore();
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);

  // Fetch products on mount
  useEffect(() => {
    const loadProducts = async () => {
      setLoading(true);
      await fetchProducts();
      setProducts(Array.isArray(storeProducts) ? storeProducts : []);
      setLoading(false);
    };
    loadProducts();
  }, [fetchProducts, storeProducts]);

  return (
    <Container maxW="container.xl" py={12}>
      <VStack spacing={8}>
        <Text
          fontSize="30"
          fontWeight="bold"
          bgGradient="linear(to-r, cyan.400,blue.500)"
          bgClip="text"
          textAlign="center"
        >
          CURRENT PRODUCTS
        </Text>

        {loading ? (
          <Spinner size="xl" />
        ) : Array.isArray(products) && products.length > 0 ? (
          <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={10} w="full">
            {products.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </SimpleGrid>
        ) : (
          <Text fontSize="xl" textAlign="center" fontWeight="bold" color="gray.500">
            NO PRODUCTS FOUND{" "}
            <Link to="/create">
              <Text
                as="span"
                color="blue.500"
                _hover={{ textDecoration: "underline" }}
              >
                CREATE A PRODUCT
              </Text>
            </Link>
          </Text>
        )}
      </VStack>
    </Container>
  );
};

export default Homepage;
