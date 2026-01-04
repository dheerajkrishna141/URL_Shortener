import {
  Box,
  Button,
  Container,
  Flex,
  Heading,
  Text,
  VStack,
  keyframes,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const fadeInDown = keyframes`
  from { opacity: 0; transform: translateY(-50px); }
  to { opacity: 1; transform: translateY(0); }
`;

const fadeInUp = keyframes`
  from { opacity: 0; transform: translateY(50px); }
  to { opacity: 1; transform: translateY(0); }
`;

const color = "color:rgb(34, 128, 222)";

export default function Home() {
  const navigate = useNavigate();
  return (
    <Box
      minHeight="100vh"
      bgGradient="linear(to-br, brand.primary, brand.secondary)"
      position="relative"
      overflow="hidden"
    >
      <Container
        maxW="container.lg"
        marginTop={150}
        centerContent
        bg={"white"}
        py={8}
        position="relative"
        zIndex={2}
        borderRadius={"lg"}
        shadow={"0px 3px 6px 2px rgba(255, 255, 255, 0.5)"}
      >
        <VStack spacing={8} textAlign="center">
          <Heading
            style={{
              background:
                "linear-gradient(to right,rgb(55, 64, 147),rgb(14, 131, 233))",
              color: "transparent",
              backgroundClip: "text",
            }}
            as="h1"
            fontSize={["4xl", "5xl", "6xl"]}
            fontWeight="bold"
            animation={`${fadeInDown} 0.5s ease-out`}
          >
            Welcome to URLink
          </Heading>

          <Text
            fontSize={["lg", "xl"]}
            maxW="2xl"
            color={"rgb(80, 78, 78)"}
            animation={`${fadeInUp} 0.5s ease-out`}
          >
            Simplify your online life with{" "}
            <span
              style={{
                fontWeight: "bold",
                fontSize: "23px",
                color: "rgb(62, 129, 196)",
              }}
            >
              URLink!
            </span>{" "}
            Create custom aliases for your URLs and manage your links
            effortlessly. Organize, tag, and access your web resources with
            ease.
          </Text>

          <Text
            fontSize={["xl", "2xl"]}
            fontWeight="bold"
            maxW="2xl"
            bgGradient="linear(to-r, yellow.400, orange.500)"
            bgClip="text"
            animation={`${fadeInUp} 0.5s ease-out 0.2s`}
            // animationFillMode="backwards"
          >
            Say goodbye to clutter and hello to efficiency with URLink – your
            link, your way.
          </Text>

          <Flex gap={4} mt={4}>
            <Button
              colorScheme="black"
              _hover={{ bg: "gray.100" }}
              size="lg"
              onClick={() => navigate("/login")}
            >
              Login
            </Button>
            <Button
              bg="brand.accent"
              color="black"
              _hover={{ bg: "green.500" }}
              size="lg"
              onClick={() => navigate("/register")}
            >
              Signup
            </Button>
          </Flex>
        </VStack>
      </Container>
    </Box>
  );
}
