import { User } from "../../../domain/entities/models/user";

export function mapUserToApi(user: Partial<User>): any {
    return {
      username: user.username,
      password: user.password,
      micronId: user.micronId,
      micronUser: user.micronUser,
      micronPass: user.micronPass,
      userType: user.userType,
      tenantEntityId: user.tenantId,
      clubEntityId: user.clubId,
      userId: user.userId?user.userId:""
    };
}