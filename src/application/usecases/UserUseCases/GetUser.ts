import { UserRepository } from "../../../domain/ports/UserRepository";
import { UserApi } from "../../../domain/entities/models/user";

export class GetUser {
    constructor( private userRepository: UserRepository ){};

    async execute( userUuid : string ): Promise<UserApi> {
        const user = await this.userRepository.findUserByUuid(userUuid);

        if(!user) throw new Error("User not found");

        return user;
    }
}