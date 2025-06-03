import { UserRepository } from "../../../domain/ports/UserRepository";

export class DeleteUser {
    constructor( private userRepository: UserRepository ){};

    async execute( uuid : string ) : Promise<void> {
        return this.userRepository.deleteUser(uuid);
    }
}