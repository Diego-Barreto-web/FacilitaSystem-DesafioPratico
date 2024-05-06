import { FastifyInstance, FastifyPluginOptions, FastifyRequest, FastifyReply } from "fastify";
import { CreateCustomerController } from "./controllers/CreateCustomerController";
import { ListCustomersController } from "./controllers/ListCustomersController";
import { DeleteCustomerController } from "./controllers/DeleteCustomerController";
import { UpdateCustomerController } from "./controllers/UpdateCustomerController";


export async function routes(fastify: FastifyInstance, options: FastifyPluginOptions) {
    
    fastify.get("/teste", async(request: FastifyRequest, reply: FastifyReply) => {
        return { hello: "world" };
    });


    fastify.post("/customer", async(request: FastifyRequest, reply: FastifyReply) => {
        return new CreateCustomerController().handle(request, reply);
    });


    fastify.get("/customers", async(request: FastifyRequest, reply: FastifyReply) => {
        return new ListCustomersController().handle(request, reply);
    });


    fastify.delete("/customers", async(request: FastifyRequest, reply: FastifyReply) => {
        return new DeleteCustomerController().handle(request, reply);
    });


    fastify.put("/customers", async(request: FastifyRequest, reply: FastifyReply) => {
        return new UpdateCustomerController().handle(request, reply);
    });
}