import { fastify } from "fastify";
import {
  serializerCompiler,
  validatorCompiler,
  type ZodTypeProvider
} from "fastify-type-provider-zod";
import { fastifyCors } from "@fastify/cors";
import { env } from "./env.ts";

const app = fastify();

app.register(fastifyCors, {
  origin: "http://localhost:5173"
});

app.setSerializerCompiler(serializerCompiler);
app.setValidatorCompiler(validatorCompiler);

app.get("/health", () => {
  return { status: "ok" };
});

app
  .listen({ port: env.PORT })
  .then(() => {
    console.log(`Server is running on port ${env.PORT}`);
  })
  .catch(err => {
    console.error("Error starting server:", err);
    process.exit(1);
  });
