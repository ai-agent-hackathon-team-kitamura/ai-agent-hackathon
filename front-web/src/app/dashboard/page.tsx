import React from "react";
import { Box } from "@chakra-ui/react";
import { Prose } from "@/components/ui/prose";
import Markdown from "react-markdown";

export default function Dashboard() {
  return (
    <Box
      minH="100vh"
      bg="background" // semanticTokens.background が適用される
      color="text" // semanticTokens.text が適用される
      p={8}
    >
      <Prose mx="auto">
        <Markdown>
          {`
  ## Heading
  
  Based on your Chakra package. So [click here](http://chakra-ui.com) to confirm your plan.
  
  - first item
  - second item
  - second item
  - second item
  
  [title](http://chakra-ui.com)
    `}
        </Markdown>
      </Prose>
    </Box>
  );
}
