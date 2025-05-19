import React, { useEffect, useState } from 'react';
import CommentCard from '../cards/CommentCard';
import { FaPaperPlane } from 'react-icons/fa';
import axiosInstance from '../../../axios/axios';

function Comment({ data }) {
  const postId = data._id;
  const [comment, setComment] = useState('');
  const [allComment, setAllComment] = useState([]);

  const fetchComment = async () => {
    try {
      const res = await axiosInstance.get(`/post/get-comment?postId=${postId}`);
      
      setAllComment(res.data.data);
      // console.log(res.data.data);
      
    } catch (error) {
      console.error('Error fetching comments:', error.message);
    }
  };



  useEffect(() => {
    fetchComment();
  }, [postId]);

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    try {
      await axiosInstance.post('/post/set-comment', { comment, postId });
      setComment('');
      fetchComment(); // Refresh the comment list
    } catch (error) {
      console.error('Error submitting comment:', error);
    }
  };

  return (
    <div className="bg-gray-100 rounded-3xl p-6 max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">Comments</h2>

      {/* Comment Input Box */}
      <form onSubmit={handleCommentSubmit} className="flex items-center gap-3 mb-6">
        <input
          type="text"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Write a comment..."
          className="flex-grow p-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          className="p-3 bg-blue-600 rounded-xl hover:bg-blue-700 text-white flex items-center justify-center"
        >
          <FaPaperPlane className="h-5 w-5" />
        </button>
      </form>

      <ul className="space-y-4">
        {allComment.map((item) => (
          <li key={item._id}>
            <CommentCard data={item} fetch={fetchComment} />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Comment;
