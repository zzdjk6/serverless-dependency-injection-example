import { ConfigService } from "./ConfigService";

export class ConfigServiceLocal implements ConfigService {
  getMessageQueueUrl(): string {
    return "http://127.0.0.1:9324/queue/serverless-di-example-local-message-queue";
  }
}
