import React from 'react';
import { MdDelete } from 'react-icons/md';
import axiosInstance from '../../../axios/axios';

function CommentCard({ data , fetch}) {
  const handleUserClick = () => {
    alert(`Navigate to @${data.username}'s profile`);
  };

  const handleDeleteClick = async () => {
    try {
      const res = await axiosInstance.delete(`/post/delete-comment?commentId=${data._id}`);
      // console.log(res.data.data);
      fetch()
      
    } catch (error) {
      console.error('Error deleting comments:', error.message);
    }
  };


  const formattedDate = new Date(data.createdAt).toLocaleString(undefined, {
    dateStyle: 'medium',
    timeStyle: 'short',
  });

  return (
    <div className="relative bg-white rounded-2xl shadow-md p-4 m-3 w-full max-w-2xl">
      {/* Delete Button */}
      <button
        onClick={handleDeleteClick}
        className="absolute top-3 right-3 text-red-500 hover:text-red-700"
      >
        <MdDelete size={25} className='cursor-pointer mt-3'/>
      </button>

      <button
        onClick={handleUserClick}
        className="user-profile flex cursor-pointer items-center gap-4 mb-3 focus:outline-none hover:bg-gray-100 p-2 rounded-xl w-fit transition"
      >
        <img
          className="rounded-full w-12 h-12 object-cover border-2 border-blue-500"
          src={data.avatar_url}
          alt="user"
        />
        <div className="flex flex-col items-start">
          <span className="font-semibold text-blue-700 hover:underline">@{data.username}</span>
          <span className="text-xs text-gray-500">{formattedDate}</span>
        </div>
      </button>
      <p className="text-gray-700 leading-relaxed text-sm sm:text-base">
        {data.comment}
      </p>
    </div>
  );
}

export default CommentCard;
