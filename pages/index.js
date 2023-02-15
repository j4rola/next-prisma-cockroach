import Head from 'next/head';                    
import Image from 'next/image';                  
import styles from '../styles/Home.module.css';  
import { PrismaClient } from '@prisma/client';   
import { useState } from 'react';
import axios from 'axios';


const prisma = new PrismaClient(); 



export default function Home({user}) { 

  
  
  console.log(user[0].posts)  

  const [posts, updatePosts] = useState(user[0].posts) 

  const deletePost = (id) => {
    console.log(id)
    //update ui 
    // updatePosts()
    // console.log(posts) 
    //make crud operation to db  
    axios.post('/api/posts/delete', {id: id})

  }

  return (
    <div className={styles.container}> 
      {user.map( x => (<div className={styles.card}><h2>{x.userName}</h2><h4>Post Id's: {x.posts.map(post => <><p>{post.id}</p><button onClick={() => deletePost(post.id)} className={styles.button}>delete</button></>)}</h4></div>))} 
      
    </div>  
  )
}

export async function getServerSideProps() {
  const user = await prisma.user.findMany({
    select: {
      userName: true,
      posts: true
    },
  });    
  //const post = await prisma.post.findMany({where: {authorId: 1}}); 
  return {
    props: {
      
      user: user,  
      
    }
  }
}
