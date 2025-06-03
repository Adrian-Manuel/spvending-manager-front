import { UserRepository } from "../../../domain/ports/UserRepository";
import { User } from "../../../domain/entities/models/user";

export class ModifyUser {
    constructor( private userRepository: UserRepository ){};

    async execute( user : User ) : Promise<void> {
        return this.userRepository.modifyUser(user);
    }
}