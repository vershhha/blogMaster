import React, {useState, useEffect} from 'react'
import { useNavigate, useParams, Link } from 'react-router'
import databaseService from '../appwrite/database';
import storageService from '../appwrite/storage';
import { Container, Button, Loading } from '../components/index';
import { useSelector } from 'react-redux';
import parse from 'html-react-parser'


function Post() {
    const [post, setPost] = useState(null)
    const {slug} = useParams();
    const navigate = useNavigate();

    const userData = useSelector((state)=>state.auth.userData);

    const isAuthor = post && userData ? userData.$id === post.userId: false;

    const [url, setUrl] = useState("");
    
    //fetch post and set state
    useEffect(()=>{
        if(slug){
            databaseService.getPost(slug).then((post)=>{
                if(post) setPost(post)
                else navigate('/')
            })
        } else navigate('/')
    },[slug, navigate])

    //fetch file for preview when post is available
    useEffect(()=>{
        if(post){
            storageService.getFilePreview(post.featuredImage).then((url)=>{
                if(url) setUrl(url)
            })
        }   
    },[post])


    const deletePost = ()=>{
        if(post){
            databaseService.deletePost(post.$id).then((status)=>{
                if(status){
                    storageService.deleteFile(post.featuredImage);
                    navigate('/')
                }
            })
        }
        
    }


    return post? (
        <div className='py-8'>
            <Container>
                <div className="w-full flex justify-center mb-4 relative border rounded-xl p-2">
                    <img
                        src={url}
                        alt={post.title}
                        className="rounded-xl"
                    />

                    {isAuthor && (
                        <div className="absolute right-6 top-6">
                            <Link to={`/edit-post/${post.$id}`}>
                                <Button bgColor="bg-green-500" className="mr-3">
                                    Edit
                                </Button>
                            </Link>
                            <Button bgColor="bg-red-500" onClick={deletePost}>
                                Delete
                            </Button>
                        </div>
                    )}
                </div>
                <div className='bg-blue-100 p-5 rounded-lg'>
                    <div className="w-full mb-6 ">
                        <h1 className="text-2xl font-bold">{post.title}</h1>
                    </div>
                    <div className="browser-css">
                        {parse(post.content)}
                    </div>
                </div>
            </Container>
        </div>
    ) : <Loading/>
}

export default Post
