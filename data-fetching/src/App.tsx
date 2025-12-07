import { type ReactNode, useEffect, useState } from 'react';

import BlogPosts, { BlogPost } from './components/BlogPosts';
import { get } from './utils/http';
import fetchingImg from './assets/data-fetching.png';
import ErrorMessage from './components/ErrorMessage';

type RawDataBlogPost = {
  userId: number;
  id: number;
  title: string;
  body: string;
};

function App() {
  const [fetchedPosts, setFetchedPosts] = useState<BlogPost[]>();
  const [isFetching, setIsFetching] = useState(false);
  const [error, setError] = useState<string>();

  useEffect(() => {
    async function fetchPosts() {
      setIsFetching(true);

      try {
        const data = await get<RawDataBlogPost[]>(
          'https://jsonplaceholder.typicode.com/posts',
        );
        const blogPosts: BlogPost[] = data.map((rawPost) => {
          return {
            id: rawPost.id,
            title: rawPost.title,
            text: rawPost.body,
          };
        });
        setFetchedPosts(blogPosts);
      } catch (error) {
        if (error instanceof Error) {
          setError(error.message);
        }
      }

      setIsFetching(false);
    }

    fetchPosts();
  }, []);

  let content: ReactNode;

  if (error) {
    content = <ErrorMessage text={error} />;
  }

  if (fetchedPosts) {
    content = <BlogPosts posts={fetchedPosts} />;
  }

  if (isFetching) {
    content = <p id="loading-fallback">Loading posts...</p>;
  }

  return (
    <main>
      <img src={fetchingImg} alt="Logo" />
      {content}
    </main>
  );
}

export default App;
