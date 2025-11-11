import { Post, User } from "./types"
import postgres from 'postgres';
 
const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });
 
export async function getUser(username: string): Promise<User | undefined> {
  try {
    const user = await sql<User[]>`SELECT * FROM users WHERE username=${username}`;
    return user[0];
  } catch (error) {
    console.error('Failed to fetch user:', error);
    throw new Error('Database fail');
  }
}

export const fetchPosts = async () => {
  try {
    const data = await sql<Post[]>`SELECT * FROM posts`
    return data
  } catch(error) {
    throw new Error('Database fail.') 
  }
}

export const fetchPostsById = async (id: string) => {
  try {
    const data = await sql<Post[]>`SELECT * FROM posts WHERE id=${id}`
    return data[0]
  } catch(error) {
    throw new Error('Database fail.') 
  }
}