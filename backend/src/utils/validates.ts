import { ILogin, IObjectHTTP } from "../entities/Interfaces";
import Users from "../models/Users";

export default async function isAuthenticatedForRegister(data: ILogin): Promise<IObjectHTTP> {
    const { username, password } = data
    const senhaRegex = /^(?=.*\d)(?=.*[A-Z])[0-9a-zA-Z$*&@#]{8,}$/

    if (!username || !password) {
        return {message: 'Está faltando o nome de usuário e/ou senha!', status: 400}
    }
    if (username && username.length < 3) {
        return {message: 'Seu nome de usuário deve ter mais que 3 caracteres', status: 400}
    }
    
    if(password) {
        const testRegex = senhaRegex.test(password)
        if(!testRegex) {
            return {message: 'Sua senha deve ter oito caracteres, um número e uma letra maiúscula', status: 400}
        }
    }

    const searchUser = await Users.findAll({where: { username }})
    if (searchUser[0]) {
        return {message: 'O usuário já existe', status: 400}
    }
    return {message: '', status: 200}
}
