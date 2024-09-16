import React from 'react';
import { Link } from 'react-router-dom';

type ForumPost = {
  id: string;
  title: string;
  author: string;
  preview: string;
};

interface ForumListProps {
  posts: ForumPost[];
}

const ForumList: React.FC<ForumListProps> = ({ posts }) => {
  return (
    <div className="space-y-4">
      {posts.map((post) => (
        <div key={post.id} className="bg-white p-4 rounded-md shadow">
          <Link to={`/forum/${post.id}`} className="text-lg font-semibold text-green-700 hover:underline">
            {post.title}
          </Link>
          <p className="text-sm text-gray-600 mt-1">By {post.author}</p>
          <p className="text-gray-700 mt-2">{post.preview}</p>
        </div>
      ))}
    </div>
  );
};

export default ForumList;