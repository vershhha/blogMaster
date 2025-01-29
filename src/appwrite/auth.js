import conf from '../conf/conf.js'
import { Client, Account, ID } from "appwrite"

class AuthService{
    client = new Client();
    account;

    constructor(){
        this.client.setEndpoint(conf.appwrite_url)
        .setProject(conf.appwrite_project)

        this.account = new Account(this.client);
    }

    async createAccount({email, password, name}){
        try{
            const userAccount = await this.account.create(
                ID.unique(),
                email,
                password,
                name
            )

            if(userAccount) {
                this.login({email, password});
            }
            return userAccount;

        }catch (error){
            throw error;
        }
    }

    async login({email, password}){
        try{
            return await this.account.createEmailPasswordSession( email, password)
        }
        catch (error){
            throw error;
        }
    }

    async logout(){
        try {
            return await this.account.deleteSessions();
        } catch (error) {
            console.log("Appwrite:: error:: logout", error)
        }
    }

    async getCurrentUser() {
        try {
            return await this.account.get();
        } catch (error) {
            if (error.code === 401) {
                // Don't log the error for 401, just return null
                return null;
            } else {
                // Log the error only for non-401 errors
                console.log("Appwrite:: error:: getCurrentUser", error);
                return null;
            }
        }
    }    
}

const authService = new AuthService();
export default authService;

