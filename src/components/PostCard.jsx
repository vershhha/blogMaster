import React, { useEffect, useState } from 'react'
import storageService from '../appwrite/storage'
import { Link } from 'react-router'

function PostCard({$id, title, featuredImage}) {
    //this $id is postID (i.e Document ID), we need it just to update the URL
    //imageID is featuredImage
    //getFilePreview return a URL
    
    const [url, setUrl] = useState("")

    useEffect(()=>{
        storageService.getFilePreview(featuredImage).then((url)=>{
            if(url) setUrl(url)
        })
    },[])

    return (
        <Link to={`/post/${$id}`}>
            <div className='w-full bg-blue-100 rounded-xl p-4'>
                <div className='w-full justify-center mb-4'>
                    <img src={url} alt={title} className='rounded-xl'/>
                </div>
                <h2 className='text-xl font-bold'>{title}</h2>
            </div>
        </Link>
    )
}

export default PostCard
