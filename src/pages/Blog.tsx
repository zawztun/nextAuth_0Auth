import React from "react";
import { getSession } from "next-auth/react";
import { redirect } from "next/dist/server/api-utils";

interface Post {
  id: number;
  title: string;
  body: string;
}
interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
}
type PostsProps = {
  posts: Post[];
  users: User[];
};

const Blog = (props: PostsProps) => {
  const { posts, users } = props;

  return (
    <div className="w-4/5 mx-auto bg">
      <div className="grid grid-cols-4 gap-4 border-2 p-4">
        {posts.map((post) => (
          <div key={post.id} className="border-2 p-4 ">
            <h2 className="text-2xl">{post.title}</h2>
            <p>{post.body}</p>
          </div>
        ))}
      </div>
      <div className="grid grid-cols-4 gap-4 border-2 p-4">
        {users?.map((user) => (
          <div key={user.id} className="border-2 p-4 ">
            <h2 className="text-2xl">
              {user.firstName} {user.lastName}
            </h2>
            <p>{user.email}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
export default Blog;

export async function getServerSideProps(context: any) {
  const res = await fetch(`https://dummyjson.com/posts`);
  const { posts } = await res.json();

  const res2 = await fetch(`https://dummyjson.com/users`);
  const { users } = await res2.json();

  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: `api/auth/signin?callbackUrl=http://localhost:3000/Blog`,
        permanent: false,
      },
    };
  }

  return {
    props: {
      posts,
      users: session ? users : null,
    },
  };
}
