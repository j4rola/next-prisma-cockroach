import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient(); 



export default function Home({user}) {

  console.log(user) 

  return (
    <div className={styles.container}> 
      
      <h3>Test</h3> 

      <h2>{user.userName}</h2>
    </div>
  )
}

export async function getServerSideProps() {
  const user = await prisma.user.findMany();  
  return {
    props: {
      user: user[0]
    }
  }
}
