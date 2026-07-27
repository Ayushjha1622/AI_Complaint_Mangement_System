import Card from "@/components/ui/Card/Card";
import Button from "@/components/ui/Button/Button";

import { attachments } from "@/data/complaintDetails";

import {
  FileImage,
  FileText,
  Download,
  Eye,
  Trash2,
} from "lucide-react";

export default function AttachmentViewer() {
  return (
    <Card>
      <h2 className="mb-6 text-xl font-semibold text-slate-900">
        Attachments
      </h2>

      <div className="space-y-4">
        {attachments.map((file) => (
          <div
            key={file.id}
            className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between rounded-lg border border-slate-200 p-4"
          >
            <div className="flex items-center gap-4">
              {file.type === "image" ? (
                <FileImage size={28} className="text-blue-600" />
              ) : (
                <FileText size={28} className="text-red-600" />
              )}

              <div>
                <h3 className="font-medium text-slate-800">{file.name}</h3>
                <p className="text-sm text-gray-500">{file.size}</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Button variant="secondary" className="flex items-center gap-1 text-xs">
                <Eye size={14} />
                Preview
              </Button>

              <Button variant="outline" className="flex items-center gap-1 text-xs">
                <Download size={14} />
                Download
              </Button>

              <Button variant="danger" className="flex items-center gap-1 text-xs">
                <Trash2 size={14} />
                Delete
              </Button>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}
