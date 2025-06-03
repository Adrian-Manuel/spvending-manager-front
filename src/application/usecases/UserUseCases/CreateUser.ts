import { UserRepository } from "../../../domain/ports/UserRepository";
import { User } from "../../../domain/entities/models/user";

export class CreateUser {
    constructor( private userRepository: UserRepository ){};

    async execute( user : Omit<User, "userId" | "clubName"> ) : Promise<void> {
        return this.userRepository.addUser(user);
    }
}