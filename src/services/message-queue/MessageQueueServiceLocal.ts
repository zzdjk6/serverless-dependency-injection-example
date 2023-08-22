import { SQSClient } from "@aws-sdk/client-sqs";
import { MessageQueueServiceCloud } from "./MessageQueueServiceCloud";

export class MessageQueueServiceLocal extends MessageQueueServiceCloud {
  /**
   * @override
   */
  protected getSqsClient(): SQSClient {
    return new SQSClient({
      endpoint: `http://127.0.0.1:9324`,
      region: "elasticmq",
      credentials: {
        accessKeyId: "root",
        secretAccessKey: "root",
      },
    });
  }
}
