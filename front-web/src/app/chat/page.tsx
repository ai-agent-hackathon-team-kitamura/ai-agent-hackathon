import React from "react";
import { Box, Flex, Text } from "@chakra-ui/react";
import ChatUI from "@/components/ChatUI";

export default function Home() {
  return (
    <Box minH="100vh" bg="gray.50">
      {/* オレンジ色のヘッダー */}
      <Box bg="orange.400" py={4} px={8}>
        <Text 
          fontSize="xl" 
          fontWeight="bold" 
          color="white" 
          textAlign="center"
          letterSpacing="wider"
        >
          EMPLOYEE ENGAGEMENT
        </Text>
      </Box>
      
      {/* メインコンテンツ */}
      <Box p={8} maxW="4xl" mx="auto">
        <ChatUI />
      </Box>
    </Box>
  );
}
