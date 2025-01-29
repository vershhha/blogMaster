import React, { useCallback, useEffect, useState} from 'react'
import { useForm } from 'react-hook-form'
import { Button, Select, RTE, Input } from './index'
import storageService from '../appwrite/storage'
import databaseService from '../appwrite/database'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router'

function PostForm({post}) {
    const {register, handleSubmit, watch, setValue, getValues, control} = useForm({
        defaultValues:{
            title: post?.title || "",
            slug: post?.slug || "",
            content: post?.content || "",
            status: post?.status || "active",
        }
    });

    const navigate = useNavigate();
    const userData = useSelector( state => state.auth.userData)
    

    const submit = async (data)=> {
        if(post){
            //if a new photo is given in the form, then upload it
            const file = data.image[0] ? await storageService.uploadFile(data.image[0]) : null;
            //if new file is uploaded then delete the prev one
            if(file){
                storageService.deleteFile(post.featuredImage)
            }

            const dbPost = await databaseService.updatePost( post.$id, {
                title: data.title,
                content: data.content,
                featuredImage: file? file.$id : post.featuredImage,
                status: data.status,
                slug: data.slug
            })

            if(dbPost){
                navigate(`/post/${dbPost.$id}`)
            }
        }
        else {
            //upload the file - this field is required so no need to check for existence
            const file = await storageService.uploadFile(data.image[0]);
            //create a post
            if(file){
                console.log(userData)
                const dbPost = await databaseService.createPost({
                    title: data.title,
                    slug: data.slug,
                    content: data.content,
                    featuredImage: file.$id, 
                    status: data.status, 
                    userId: userData.$id
                })

                if(dbPost){
                    navigate(`/post/${dbPost.$id}`)
                } else storageService.deleteFile(file.$id)
            }
        }
    }

    const slugTransform = useCallback((value)=>{
        if(value && typeof value === "string")
            return value
                .trim()
                .toLowerCase()
                .replace(/[^a-zA-Z\d\s]+/g, "-")
                .replace(/\s/g, "-");

        return "";
    },[])

    useEffect(()=>{
        const subscription = watch((value, { name })=>{
            if(name === 'title'){
                setValue('slug', slugTransform(value.title), {shouldValidate: true})
            }
        })
        return ()=>{
            subscription.unsubscribe()
        }
    },[watch, slugTransform, setValue])


    const [url, setUrl] = useState("");

    useEffect(()=>{
        if(post){
            storageService.getFilePreview(post.featuredImage).then((url)=>{
                if(url) setUrl(url)
            })
        }   
    },[post])

    return (
        <form onSubmit={handleSubmit(submit)} className="flex flex-wrap">
            <div className="w-2/3 px-2">
                <Input
                    label="Title :"
                    labelclass = "text-gray-300"
                    placeholder="Title"
                    className="mb-4"
                    {...register("title", { required: true })}
                />
                <Input
                    label="Slug :"
                    labelclass = "text-gray-300"
                    placeholder="Slug"
                    className="mb-4"
                    {...register("slug", { required: true })}
                    onInput={(e) => {
                        setValue("slug", slugTransform(e.currentTarget.value), {shouldValidate: true});
                    }}
                />
                <RTE label="Content :" labelclass = "text-gray-300" name="content" control={control} defaultValue={getValues("content")} />
            </div>
            <div className="w-1/3 px-2">
                <Input
                    label="Featured Image :"
                    labelclass = "text-gray-300"
                    type="file"
                    className="mb-4"
                    accept="image/png, image/jpg, image/jpeg, image/gif"
                    {...register("image", { required: !post })}
                />
                {post && (
                    <div className="w-full mb-4">
                        <img
                            src={url}
                            alt={post.title}
                            className="rounded-lg"
                        />
                    </div>
                )}
                <Select
                    options={["active", "inactive"]}
                    label="Status"
                    labelclass = "text-gray-300"
                    className="mb-4"
                    {...register("status", { required: true })}
                />
                <Button type="submit" bgColor={post ? "bg-green-500" : undefined} className="w-full">
                    {post ? "Update" : "Submit"}
                </Button>
            </div>
        </form>
    )
}

export default PostForm
