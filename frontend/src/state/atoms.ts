import { IUserDto } from "../types/User.dto";
import { atom } from "recoil";

export const loggedInUserAtom = atom<IUserDto | null>({
    key: "loggedInUser",
    default: null
})