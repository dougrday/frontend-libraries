import { HelloWorldApi } from "@shared/generated/hello-world";
import configuration from "./api-configuration";

export const helloWorldApi = new HelloWorldApi(configuration);
