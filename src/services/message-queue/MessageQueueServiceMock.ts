import { createHash } from "node:crypto";
import { MessageQueueService } from "./MessageQueueService";

export class MessageQueueServiceMock implements MessageQueueService {
  public async sendMessage(args: { messageQueueUrl: string; messageBody: string }): Promise<{ messageId: string }> {
    const messageId = MessageQueueServiceMock.getMessageId(args);
    console.log("Send message via mocked SQS: ", args);
    return { messageId };
  }

  public static getMessageId(args: { messageQueueUrl: string; messageBody: string }): string {
    return createHash("md5").update(JSON.stringify(args)).digest("hex");
  }
}
