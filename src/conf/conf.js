const conf = {
    appwrite_url: String(import.meta.env.VITE_APPWRITE_URL),
    appwrite_project: String(import.meta.env.VITE_APPWRITE_PROJECT),
    appwrite_database: String(import.meta.env.VITE_APPWRITE_DATABASE),
    appwrite_collection: String(import.meta.env.VITE_APPWRITE_COLLECTION),
    appwrite_bucket: String(import.meta.env.VITE_APPWRITE_BUCKET),
    editor_api: String(import.meta.env.VITE_EDITOR_API)
}

export default conf;