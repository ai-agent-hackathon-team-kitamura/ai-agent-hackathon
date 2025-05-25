import React from "react";
import { SampleBarChart } from "@/features/sample/chart/SampleBarChart";
import { SampleRadarChart } from "@/features/sample/chart/SampleRadarChart";
import { Box, Button, Heading, VStack } from "@chakra-ui/react";
import Link from "next/link";

export default function Sample() {
  return (
    <Box
      minH="100vh"
      bg="background" // semanticTokens.background が適用される
      color="text" // semanticTokens.text が適用される
      p={8}
    >
      <VStack gap={4}>
        <Heading as="h1" size="2xl">
          Sample
        </Heading>
        <Link href="/">Top</Link>
        <Button colorPalette="primary">Sample ColorPalette</Button>
        <Heading as="h2" size="xl">
          Chart
        </Heading>
        <Heading as="h3" size="lg">
          Sample Radar Chart
        </Heading>
        <SampleRadarChart />
        <Heading as="h3" size="lg">
          Sample Bar Chart
        </Heading>
        <Box w="60%" mx="auto">
          <SampleBarChart />
        </Box>
      </VStack>
    </Box>
  );
}
