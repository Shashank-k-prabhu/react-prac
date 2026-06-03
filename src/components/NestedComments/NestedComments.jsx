import { useState } from "react";

// function Comment({comment, idx})

export default function CommentsSection() {
  const newComment = () => {
    console.log("new comment");
    comments.push({
      id: Math.random(),
      text: "",
      edit: true,
      level: 0,
    });
  };

  const [comments, setComments] = useState([]);

  return (
    <div className="p-4">
      <div className="flex justify-between align-center">
        <h1>Nested Comments</h1>
        <button
          className="p-2 bg-blue-500 rounded-lg h-10 cursor-pointer text-white"
          onClick={() => {
            newComment();
          }}
        >
          New Comment
        </button>
      </div>
      <p>comments will appear here</p>

      <div>{comments.map((comment, idx) => {})}</div>
    </div>
  );
}
