export default function CommentsSection() {
  return (
    <div className="p-4">
      <div className="flex justify-between align-center">
        <h1>Nested Comments</h1>
        <button className="p-2 bg-blue-500 rounded-lg h-10 cursor-pointer text-white">
          New Comment
        </button>
      </div>
      <p>comments will appear here</p>
    </div>
  );
}
