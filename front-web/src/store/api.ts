import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

export interface ChatRequest {
  messages: ChatMessage[];
}

export interface ChatResponse {
  success: boolean;
  generated_text?: string;
  error?: string;
}

export interface HealthData {
  score: number;
  note: string;
}

export interface StartSurveyRequest {
  uid: string;
}

export interface StartSurveyResponse {
  success: boolean;
  opening_message?: string;
  error?: string;
}

export interface EvaluateRequest {
  uid: string;
  messages: ChatMessage[];
}

export interface HealthEvaluation {
  note: string;
  score: number;
}

export interface EvaluateResponse {
  uid: string;
  success: boolean;
  health: HealthEvaluation;
  created_at: string;
  error?: string;
}
export interface SummeryResponse {
  average_score: number;
  success: boolean;
  good_point: string;
  bad_point: string;
  error?: string;
}

export const chatApi = createApi({
  reducerPath: "chatApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "/api",
  }),
  endpoints: (builder) => ({
    sendMessage: builder.mutation<ChatResponse, ChatRequest>({
      query: (body) => ({
        url: "/chat",
        method: "POST",
        body,
      }),
    }),
    startSurvey: builder.query<StartSurveyResponse, StartSurveyRequest>({
      query: (body) => ({
        url: "/start-survey",
        method: "POST",
        body,
      }),
    }),
    evaluate: builder.query<EvaluateResponse, EvaluateRequest>({
      query: (body) => ({
        url: "/evaluate",
        method: "POST",
        body,
      }),
    }),
    summery: builder.query<SummeryResponse, void>({
      query: () => ({
        url: "/summery",
        method: "GET",
      }),
    }),
  }),
});

export const { useSendMessageMutation, useStartSurveyQuery, useEvaluateQuery, useSummeryQuery } = chatApi;
