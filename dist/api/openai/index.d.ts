// @ts-check
import { ChatCompletion, ChatCompletionMessage, OpenAIImageResponse, ToolCalls } from './types/types';

export declare function create1(options: {
  model: string;
  messages: ChatCompletionMessage[];
  max_tokens?: number | null | undefined;
  temperature?: number | null | undefined;
  top_p?: number | null | undefined;
  frequency_penalty?: number | null | undefined;
  presence_penalty?: number | null | undefined;
  n?: number | null | undefined;
  response_format?: string | undefined;
  seed?: number | null | undefined;
  stop?: string | string[] | null | undefined;
  logit_bias?: Object | undefined;
  logprobs?: boolean | null | undefined;
  top_logprobs?: number | null | undefined;
  stream?: boolean | null | undefined;
  tools?: ToolCalls[] | undefined;
  tool_choice?: string | {
      type: string;
      function: {
          name: string;
      };
  } | undefined;
  user?: string | undefined;
}, response_format?: {
  type: string;
} | undefined): Promise<ChatCompletion>;
// export { create1 as create }

export declare function create2(options: {
  prompt: string;
  model?: string | undefined;
  quality?: string | undefined;
  n?: number | null | undefined;
  response_format?: string | undefined;
  size?: string | null | undefined;
  style?: string | null | undefined;
  user?: string | undefined;
}): Promise<OpenAIImageResponse>;
// export { create2 as create }

export declare function create3(options: {
  model: string;
  input: string;
  voice: string;
  response_format?: string | undefined;
  speed?: number | undefined;
}): Promise<string>;
// export { create3 as create }

//# sourceMappingURL=index.d.ts.map