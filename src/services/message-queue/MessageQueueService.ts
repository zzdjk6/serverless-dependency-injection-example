export interface MessageQueueService {
  sendMessage(args: { messageQueueUrl: string; messageBody: string }): Promise<{ messageId: string }>;
}
