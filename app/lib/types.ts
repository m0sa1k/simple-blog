export type User = {
  id: string;
  username: string;
  password: string;
  my_posts: string[] | null;
}

export type Post = {
  id: string;
  title: string;
  body: string;
  author_name: string;
}