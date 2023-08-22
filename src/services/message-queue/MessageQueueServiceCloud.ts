import { SendMessageCommand, SQSClient } from "@aws-sdk/client-sqs";
import { MessageQueueService } from "./MessageQueueService";

export class MessageQueueServiceCloud implements MessageQueueService {
  public async sendMessage(args: { messageQueueUrl: string; messageBody: string }): Promise<{ messageId: string }> {
    const { messageQueueUrl, messageBody } = args;

    const sqsClient = this.getSqsClient();
    const command = new SendMessageCommand({ QueueUrl: messageQueueUrl, MessageBody: messageBody });
    const { MessageId: messageId } = await sqsClient.send(command);
    if (!messageId) {
      throw new Error(`Fail to message to queue, queueUrl: ${messageQueueUrl}`);
    }

    return { messageId };
  }

  protected getSqsClient(): SQSClient {
    return new SQSClient({});
  }
}
