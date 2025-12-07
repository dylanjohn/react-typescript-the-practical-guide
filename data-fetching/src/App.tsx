import { type ReactNode, useEffect, useState } from 'react';

import BlogPosts, { BlogPost } from './components/BlogPosts';
import { get } from './utils/http';
import fetchingImg from './assets/data-fetching.png';

type RawDataBlogPost = {
  userId: number;
  id: number;
  title: string;
  body: string;
};

function App() {
  const [fetchedPosts, setFetchedPosts] = useState<BlogPost[]>();

  useEffect(() => {
    async function fetchPosts() {
      const data = await get<RawDataBlogPost[]>(
        'https://jsonplaceholder.typicode.com/posts'
      );

      const blogPosts: BlogPost[] = data.map((rawPost) => {
        return {
          id: rawPost.id,
          title: rawPost.title,
          text: rawPost.body,
        };
      });

      setFetchedPosts(blogPosts);
    }

    fetchPosts();
  }, []);

  let content: ReactNode;

  if (fetchedPosts) {
    content = <BlogPosts posts={fetchedPosts} />; // Assign to content
  }

  return (
    <main>
      <img src={fetchingImg} alt="Logo" />
      {content}
    </main>
  );
}

export default App;
