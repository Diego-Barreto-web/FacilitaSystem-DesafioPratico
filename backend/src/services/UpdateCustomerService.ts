import prismaClient from "../prisma";

interface UpdateCustomerProps{
    id: string;
    name: string;
    email: string;
    status: boolean;
}

class UpdateCustomerService {
    async execute( { id, name, email, status}: UpdateCustomerProps) {
        if(!id) {
            throw new Error("Solicitação inválida!");
        }

        const updateCustomer = await prismaClient.customer.update({
            where: {
                id: id
            },
            data: {
                name,
                email,
                status
            }
        });

        if(!updateCustomer) {
            throw new Error("Cliente não encontrado!");
        }

        return updateCustomer;
    }
}

export { UpdateCustomerService }