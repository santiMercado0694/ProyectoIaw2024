import "next-auth";

declare module "next-auth" {
    interface Session {
        user: {
            user_id: string;
            nombre: string;
            apellido: string;
            email: string;
            rol: string;
            token: string;
        };
    }
}