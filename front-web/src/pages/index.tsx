// src/pages/index.tsx
import { Box, Button, Heading, VStack } from "@chakra-ui/react";

export default function Home() {
  return (
    <Box
      minH="100vh"
      bg="background" // semanticTokens.primary が適用される
      color="text" // semanticTokens.text が適用される
      p={8}
    >
      <VStack gap={4}>
        <Heading as="h1" size="2xl">
          Hello, World!
        </Heading>
        <Button colorPalette="brand">Sample ColorPalette</Button>
      </VStack>
    </Box>
  );
}
