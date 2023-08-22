import { ConfigService } from "./ConfigService";

export class ConfigServiceMock implements ConfigService {
  getMessageQueueUrl(): string {
    return "http://localhost";
  }
}
