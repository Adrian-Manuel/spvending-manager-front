import { User, UserApi, UserInfoDisplay } from "./../entities/models/user"

export interface UserRepository {
    getAllUsers() : Promise<UserInfoDisplay[]>;
    findUserByUuid( userUuid : string ) : Promise< UserApi | null >;
    addUser( user : Omit<User, "userId" | "clubName"> ) : Promise<void>;
    modifyUser( user :User) : Promise<void>;
    deleteUser(userUuid: string) : Promise<void>
}