import { HelloWorldApi } from "./generated/hello-world";
import configuration from "./api-configuration";

export const helloWorldApi = new HelloWorldApi(configuration);