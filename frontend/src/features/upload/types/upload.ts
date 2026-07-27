export type UploadFile = {
  id: string;
  name: string;
  size: number;
  progress: number;
};

export type UploadState = {
  files: UploadFile[];
  uploading: boolean;
  error: string | null;
};
