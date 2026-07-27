export type CopilotMessage = {
  id: string;
  role: "user" | "assistant";
  content: string;
};

export type CopilotState = {
  messages: CopilotMessage[];
  loading: boolean;
  error: string | null;
};
