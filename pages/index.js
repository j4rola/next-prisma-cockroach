import Head from 'next/head';
import Image from 'next/image';
import styles from '../styles/Home.module.css';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient(); 



export default function Home({user}) { 

  
  
  console.log(user[0].posts)  

  return (
    <div className={styles.container}> 
      {user.map( x => (<><h2>{x.userName}</h2><h4>Post Id's: {x.posts.map(x => <p>{x.id}</p>)}</h4></>))} 
      
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
