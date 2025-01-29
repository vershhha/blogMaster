import conf from '../conf/conf.js'
import { Client, Databases, Query, ID } from "appwrite"

class DatabaseService{
    client = new Client();
    databases;

    constructor(){
        this.client.setEndpoint(conf.appwrite_url)
        .setProject(conf.appwrite_project)

        this.databases = new Databases(this.client);
    }

    async createPost({title, slug, content, featuredImage, status, userId}){
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
                    userId,
                } // data
            );
        } catch (error) {
            console.log("Appwrite:: databases:: createPost:: error ", error)
            return false;
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
            return false;
        }
    }

    async deletePost(slug){
        try {
            await this.databases.deleteDocument(
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
            return await this.databases.getDocument(
                conf.appwrite_database, // databaseId
                conf.appwrite_collection, // collectionId
                slug // documentId - here it is slug
            )
        } catch (error) {
            console.log("Appwrite:: databases:: getPost:: error ", error)
        }
    }

    async getAllPosts(queries = [Query.equal("status", "active")]){
        //return an array of objects
        try {
            return await this.databases.listDocuments(
                conf.appwrite_database, // databaseId
                conf.appwrite_collection, // collectionId
                queries,
            )
        } catch (error) {
            console.log("Appwrite:: databases:: getAllPosts:: error ", error)
        }
    }
}

const databaseService = new DatabaseService();
export default databaseService;

