import conf from '../conf/conf.js'
import { Client, Databases, Query } from "appwrite"

class DatabaseService{
    client = new Client();
    databases;

    constructor(){
        this.client.setEndpoint(conf.appwrite_url)
        .setProject(conf.appwrite_project)

        this.databases = new Databases(this.client);
    }

    async createPost({title, slug, content, featuredImage, status, userID}){
        try {
            return await this.databases.createDocument(
                conf.appwrite_database, // databaseId
                conf.appwrite_collection, // collectionId
                slug, // documentId - here it is slug
                {
                    title,
                    content,
                    featuredImage,
                    status,
                    userID
                } // data
            );
        } catch (error) {
            console.log("Appwrite:: databases:: createPost:: error ", error)
        }
    }

    async updatePost(slug, {title, content, featuredImage, status}){
        try {
            return await this.databases.updateDocument(
                conf.appwrite_database, // databaseId
                conf.appwrite_collection, // collectionId
                slug, // documentId - here it is slug
                {
                    title,
                    content,
                    featuredImage,
                    status,
                } // data
            );
        } catch (error) {
            console.log("Appwrite:: databases:: updatePost:: error ", error)
        }
    }

    async deletePost(slug){
        try {
            await databases.deleteDocument(
                conf.appwrite_database, // databaseId
                conf.appwrite_collection, // collectionId
                slug // documentId - here it is slug
            )
            return true;
        } catch (error) {
            console.log("Appwrite:: databases:: deletePost:: error ", error)
            return false;
        }
    }

    async getPost(slug){
        try {
            return await databases.getDocument(
                conf.appwrite_database, // databaseId
                conf.appwrite_collection, // collectionId
                slug // documentId - here it is slug
            )
        } catch (error) {
            console.log("Appwrite:: databases:: getPost:: error ", error)
        }
    }

    async getAllPosts(query = []){
        try {
            return await databases.getDocument(
                conf.appwrite_database, // databaseId
                conf.appwrite_collection, // collectionId
                query,
            )
        } catch (error) {
            console.log("Appwrite:: databases:: getAllPosts:: error ", error)
        }
    }
    

}

const databaseService = new DatabaseService();
export default databaseService;

