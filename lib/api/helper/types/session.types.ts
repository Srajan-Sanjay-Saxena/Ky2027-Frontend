import { Session } from "@auth/core/types";

type UserRoles = "MANAGER" | "OPERATOR" | "MASTER_ADMIN" | "USER";
type AccountStatus = "ACTIVE" | "SUSPENDED";

export type EnhancedSession = Session & {
  user: {
    role: UserRoles;
    accountStatus: AccountStatus;
  };
};
