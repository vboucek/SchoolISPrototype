import { IUserDto } from "../types/User.dto";
import { atom } from "recoil";

export const loggedInUserAtom = atom<number | null>({
    key: "loggedInUser",
    default: null
})