import React, { useState } from 'react';

interface ForumPost {
  id: number;
  username: string;
  content: string;
  date: string;
}

const ForumPage: React.FC = () => {
  const [posts, setPosts] = useState<ForumPost[]>([
    {
      id: 1,
      username: 'EcoEnthusiast',
      content: 'How can we make our city greener?',
      date: '2024-09-01',
    },
    {
      id: 2,
      username: 'NatureLover',
      content: 'Plant more trees and reduce pollution!',
      date: '2024-09-02',
    },
  ]);
  const [newPostContent, setNewPostContent] = useState<string>('');
  const [username, setUsername] = useState<string>(''); // Placeholder for username input

  const handlePostSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!username || !newPostContent) {
      alert('Please enter both username and post content');
      return;
    }

    const newPost: ForumPost = {
      id: posts.length + 1,
      username,
      content: newPostContent,
      date: new Date().toISOString().slice(0, 10), // Current date in YYYY-MM-DD format
    };

    setPosts([...posts, newPost]); // Add the new post to the list
    setNewPostContent(''); // Clear the input field
    setUsername(''); // Clear the username field
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <header className="bg-green-600 text-white py-6 px-6 rounded-b-lg shadow-md mb-8">
        <h1 className="text-4xl font-bold">Forum</h1>
      </header>

      <section className="my-8">
        <h2 className="text-3xl font-semibold mb-6">Recent Posts</h2>
        <div className="bg-white p-6 rounded-lg shadow-md">
          {posts.length > 0 ? (
            posts.map((post) => (
              <div key={post.id} className="mb-6 border-b pb-4">
                <h3 className="text-xl font-semibold">{post.username}</h3>
                <p className="text-gray-600">{post.content}</p>
                <span className="text-sm text-gray-400">{post.date}</span>
              </div>
            ))
          ) : (
            <p>No posts available</p>
          )}
        </div>
      </section>

      <section className="my-8">
        <h2 className="text-3xl font-semibold mb-6">Create a New Post</h2>
        <form onSubmit={handlePostSubmit} className="bg-white p-6 rounded-lg shadow-md">
          <div className="mb-4">
            <label className="block mb-2">Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Enter your username"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2">Post Content</label>
            <textarea
              value={newPostContent}
              onChange={(e) => setNewPostContent(e.target.value)}
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Write your post here"
              rows={4}
            ></textarea>
          </div>
          <button
            type="submit"
            className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors duration-200"
          >
            Submit Post
          </button>
        </form>
      </section>
    </div>
  );
};

export default ForumPage;
