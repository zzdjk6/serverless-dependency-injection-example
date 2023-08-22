import { APIGatewayProxyHandlerV2 } from "aws-lambda";
import { serviceContainer } from "../services/serviceContainer";
import _ from "lodash";

const createTodo: APIGatewayProxyHandlerV2 = async (event) => {
  const content = _.get(JSON.parse(event.body || ""), "content");
  const id = await serviceContainer.cradle.todoService.createTodo(content);

  return {
    statusCode: 201,
    body: JSON.stringify({ id }),
    headers: {
      "Content-Type": "application/json",
    },
  };
};

export const handler = createTodo;
