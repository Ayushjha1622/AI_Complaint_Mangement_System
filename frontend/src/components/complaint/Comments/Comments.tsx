import { useState } from "react";
import Card from "@/components/ui/Card/Card";
import Button from "@/components/ui/Button/Button";
import Textarea from "@/components/ui/Textarea/Textarea";

import { comments as initialComments } from "@/data/complaintDetails";
import type { Comment } from "@/types/complaint";

export default function Comments() {
  const [items, setItems] = useState<Comment[]>(initialComments);
  const [message, setMessage] = useState("");

  const handleAddComment = () => {
    if (!message.trim()) return;

    setItems((prev) => [
      ...prev,
      {
        id: Date.now(),
        author: "Current User",
        message: message.trim(),
        createdAt: new Date().toLocaleString(),
      },
    ]);

    setMessage("");
  };

  return (
    <Card>
      <h2 className="mb-6 text-xl font-semibold text-slate-900">
        Investigation Comments
      </h2>

      <div className="space-y-5">
        {items.map((comment) => (
          <div
            key={comment.id}
            className="rounded-lg border border-slate-200 p-4"
          >
            <div className="flex justify-between items-center">
              <strong className="text-slate-800">{comment.author}</strong>

              <span className="text-sm text-gray-500">
                {comment.createdAt}
              </span>
            </div>

            <p className="mt-3 text-slate-600">{comment.message}</p>
          </div>
        ))}
      </div>

      <Textarea
        className="mt-6"
        placeholder="Add investigation comment..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />

      <Button className="mt-4" onClick={handleAddComment}>
        Post Comment
      </Button>
    </Card>
  );
}
