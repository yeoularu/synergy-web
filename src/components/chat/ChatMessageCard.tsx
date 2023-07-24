import React from "react";
import { Paper, Text } from "@mantine/core";

const ChatMessageCard: React.FC<{
  text: string;
  fromMe?: boolean;
  isLast?: boolean;
}> = ({ text, fromMe = false, isLast = false }) => {
  return (
    <Paper
      sx={(theme) => {
        return {
          backgroundColor: fromMe ? theme.colors.blue[5] : theme.colors.gray[1],
          width: "fit-content",
          padding: theme.spacing.xs,
          marginLeft: fromMe ? "auto" : 0,
          borderRadius: !isLast
            ? `${theme.radius.lg} ${theme.radius.lg} ${
                fromMe ? "0 " + theme.radius.lg : theme.radius.lg + " 0"
              }`
            : theme.radius.lg,
        };
      }}
    >
      <Text size="sm" c={fromMe ? "white" : "#000"}>
        {text}
      </Text>
    </Paper>
  );
};

export default ChatMessageCard;
