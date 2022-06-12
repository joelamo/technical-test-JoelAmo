import UserViewModel from "./UserViewModel";

export default interface UsersApiModel {
    count: number;
    items: UserViewModel[];
}

