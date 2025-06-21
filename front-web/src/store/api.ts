import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export interface ChatMessage {
  role: 'user' | 'assistant';
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
  health: HealthData;
  createdAt: string;
}

export interface StartSurveyResponse {
  success: boolean;
  opening_message?: string;
  error?: string;
}

export const chatApi = createApi({
  reducerPath: 'chatApi',
  baseQuery: fetchBaseQuery({
    baseUrl: '/api',
  }),
  endpoints: (builder) => ({
    sendMessage: builder.mutation<ChatResponse, ChatRequest>({
      query: (body) => ({
        url: '/chat',
        method: 'POST',
        body,
      }),
    }),
    startSurvey: builder.query<StartSurveyResponse, StartSurveyRequest>({
      query: (body) => ({
        url: '/start-survey',
        method: 'POST',
        body,
      }),
    }),
  }),
});

export const { useSendMessageMutation, useStartSurveyQuery } = chatApi;