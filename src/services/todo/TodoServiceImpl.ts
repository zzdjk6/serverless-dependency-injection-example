import { TodoService } from "./TodoService";
import * as crypto from "crypto";
import { ServiceContainerCradle } from "../serviceContainer";
import { MessageQueueService } from "../message-queue/MessageQueueService";
import { ConfigService } from "../config/ConfigService";

export class TodoServiceImpl implements TodoService {
  private readonly configService: ConfigService;
  private readonly messageService: MessageQueueService;

  constructor(dependencies: Pick<ServiceContainerCradle, "configService" | "messageQueueService">) {
    this.configService = dependencies.configService;
    this.messageService = dependencies.messageQueueService;
  }

  public async createTodo(content: string): Promise<string> {
    const id = crypto.randomUUID();

    // ...

    await this.messageService.sendMessage({
      messageQueueUrl: this.configService.getMessageQueueUrl(),
      messageBody: JSON.stringify({
        type: "TODO_CREATED",
        id,
      }),
    });

    return id;
  }
}
