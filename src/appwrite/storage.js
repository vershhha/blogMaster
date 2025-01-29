import conf from '../conf/conf.js'
import { Client, Storage, ID } from "appwrite"

class StorageService{
    client = new Client();
    storage;

    constructor(){
        this.client.setEndpoint(conf.appwrite_url)
        .setProject(conf.appwrite_project)

        this.storage = new Storage(this.client);
    }

    async uploadFile(file){
        //returns file object - we can extract res.$id  
        try {
            return await this.storage.createFile(
                conf.appwrite_bucket, // bucketId
                ID.unique(), // fileId
                file, // file
            );
        } catch (error) {
            console.log("Appwrite:: Storage:: uploadFile:: error ", error)
            return false;
        }
    }

    async deleteFile(fileID){
        try {
            await this.storage.deleteFile(
                conf.appwrite_bucket, // bucketId
                fileID // fileId
            );
            return true;
        } catch (error) {
            console.log("Appwrite:: Storage:: deleteFile:: error ", error)
            return false;
        }
    }

    async getFilePreview(fileID){
        return this.storage.getFilePreview(
            conf.appwrite_bucket, // bucketId
            fileID // fileId
        )
    }
}

const storageService = new StorageService();
export default storageService;

