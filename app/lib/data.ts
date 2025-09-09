import { Post } from "./types"

export const initPosts:Post[] = [
  {
    id: '123123',
    title: 'Post title 1',
    body: 'Lorem ipsum dolor sit <a href="#">Hello</a> amet consectetur adipisicing elit. Sequi dolorem saepe recusandae ea? Aut nihil repellat possimus, earum similique deserunt! Delectus ea incidunt praesentium quas blanditiis corporis, provident exercitationem sit.',
    authorName: 'My Name'
  },
  {
    id: '123125',
    title: 'Post title @',
    body: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi dolorem saepe recusandae ea? Aut nihil repellat possimus, earum similique deserunt! Delectus ea incidunt praesentium quas blanditiis corporis, provident exercitationem sit.',
    authorName: 'Another Name'
  }
]


export const fetchPosts = () => {
  return initPosts
}

export const fetchPostsById = (id: string) => {
  return initPosts.filter(post => post.id === id)[0]
}