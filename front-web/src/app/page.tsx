import React from "react";
import { Box, Heading, VStack } from "@chakra-ui/react";
import Link from "next/link";

export default function Home() {
  return (
    <Box
      minH="100vh"
      bg="background" // semanticTokens.background が適用される
      color="text" // semanticTokens.text が適用される
      p={8}
    >
      <VStack gap={4}>
        <Heading as="h1" size="2xl">
          Hello, World!
        </Heading>
        <Link href="sample">Sample</Link>
      </VStack>
    </Box>
  );
}
