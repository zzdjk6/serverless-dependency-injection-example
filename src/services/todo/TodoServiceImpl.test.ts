import { TodoServiceImpl } from "./TodoServiceImpl";
import { serviceContainer } from "../serviceContainer";

jest.mock("crypto", () => {
  return {
    randomUUID: jest.fn().mockReturnValue("test-uuid"),
  };
});

it("should create a new todo and put the message into queue", async () => {
  const configService = serviceContainer.cradle.configService;
  const messageQueueService = serviceContainer.cradle.messageQueueService;
  const todoService = new TodoServiceImpl({ configService, messageQueueService });
  const content = "test content";

  const sendMessageSpy = jest.spyOn(messageQueueService, "sendMessage");

  await todoService.createTodo(content);

  expect(sendMessageSpy).toHaveBeenCalledWith({
    messageQueueUrl: configService.getMessageQueueUrl(),
    messageBody: JSON.stringify({
      type: "TODO_CREATED",
      id: "test-uuid",
    }),
  });
});
