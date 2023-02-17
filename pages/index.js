import Head from 'next/head';                    
import Image from 'next/image';                  
import styles from '../styles/Home.module.css';  
import { PrismaClient } from '@prisma/client';   
import { useState } from 'react';
import axios from 'axios';
import PostForm from '../components/PostForm'; 

const prisma = new PrismaClient(); 



export default function Home({user}) { 

  
  
  console.log(user)  

  


  const deletePost = (id, e) => { 
    console.log(e.target.parentElement)  
    e.target.parentElement.className = 'gone'
    //update ui 
    
    //make crud operation to db  
    axios.post('/api/posts/delete', {id: id})  

  }

  

  return (
    <div className={styles.container}> 
      {user.map( x => (<div className={styles.card}><h2>User: {x.userName}</h2><h4>Posts: {x.posts.map(post => <div className='none'><p>{post.id}</p><p>{post.body}</p><button onClick={(e) => deletePost(post.id, e)} className={styles.button}>delete</button></div>)}</h4></div>))} 
      <PostForm authors={user}></PostForm>
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
