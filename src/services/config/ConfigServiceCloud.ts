import { ConfigService } from "./ConfigService";
import _ from "lodash";

export class ConfigServiceCloud implements ConfigService {
  getMessageQueueUrl(): string {
    return _.toString(process.env.MESSAGE_QUEUE_URL);
  }
}
