import { Socket } from "socket.io";
import { User } from "./user.type";


export interface CustomSocket extends Socket{
    user:User
}