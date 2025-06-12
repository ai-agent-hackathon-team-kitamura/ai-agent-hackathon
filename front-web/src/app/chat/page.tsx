import React from "react";
import { Box } from "@chakra-ui/react";
import ChatUI from "@/components/ChatUI";

export default function Home() {
  return (
    <Box
      minH="100vh"
      color="text"
      p={8}
      m="auto"
      maxW="9/12"
    >
      <ChatUI />
    </Box>
  );
}
