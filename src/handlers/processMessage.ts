import { SQSHandler } from "aws-lambda";

const processMessage: SQSHandler = (event) => {
  const { messageId, body: messageBody } = event.Records[0];
  console.log(`[${new Date().toLocaleString()}] Receive message id: ${messageId}, body: ${messageBody}`);
};

export const handler = processMessage;
