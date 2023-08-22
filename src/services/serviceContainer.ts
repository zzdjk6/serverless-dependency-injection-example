import * as awilix from "awilix";
import { MessageQueueService } from "./message-queue/MessageQueueService";
import { MessageQueueServiceCloud } from "./message-queue/MessageQueueServiceCloud";
import { MessageQueueServiceLocal } from "./message-queue/MessageQueueServiceLocal";
import { MessageQueueServiceMock } from "./message-queue/MessageQueueServiceMock";
import { ConfigService } from "./config/ConfigService";
import { ConfigServiceCloud } from "./config/ConfigServiceCloud";
import { ConfigServiceLocal } from "./config/ConfigServiceLocal";
import { ConfigServiceMock } from "./config/ConfigServiceMock";
import { TodoService } from "./todo/TodoService";
import { TodoServiceImpl } from "./todo/TodoServiceImpl";

export type ServiceContainerCradle = {
  configService: ConfigService;
  messageQueueService: MessageQueueService;
  todoService: TodoService;
};

const serviceContainer = awilix.createContainer<ServiceContainerCradle>();

serviceContainer.register({ configService: awilix.asClass(ConfigServiceCloud) });
serviceContainer.register({ messageQueueService: awilix.asClass(MessageQueueServiceCloud) });
serviceContainer.register({ todoService: awilix.asClass(TodoServiceImpl) });

const isLocal = Boolean(process.env.IS_LOCAL) || Boolean(process.env.IS_OFFLINE);
if (isLocal) {
  serviceContainer.register({ configService: awilix.asClass(ConfigServiceLocal) });
  serviceContainer.register({ messageQueueService: awilix.asClass(MessageQueueServiceLocal) });
}

const isTest = Boolean(process.env.JEST_WORKER_ID);
if (isTest) {
  serviceContainer.register({ configService: awilix.asClass(ConfigServiceMock) });
  serviceContainer.register({ messageQueueService: awilix.asClass(MessageQueueServiceMock) });
}

export { serviceContainer };
