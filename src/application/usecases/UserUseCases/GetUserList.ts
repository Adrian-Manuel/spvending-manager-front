import { UserRepository } from "../../../domain/ports/UserRepository";
import { UserInfoDisplay } from "../../../domain/entities/models/user";

export class GetUserList {
    constructor( private userRepository: UserRepository ){};

    async execute(): Promise<UserInfoDisplay[]> {
        const users = await this.userRepository.getAllUsers();
        
        if (!users) throw new Error("User list is not available");

        return users;
    }
}