export interface Attachments {
  status: boolean;
  message: string;
  data: AttachmentData[];
}

export interface AttachmentData {
  attachmentId: number;
  requestId: number;
  filePath: string;
  fileType: string;
  status: string;
  uploadedAt: Date;
  uploadedBy: string;
}
