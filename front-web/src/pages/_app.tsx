import type { AppProps } from "next/app";
import { Provider } from "@/features/style/provider";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider>
      <Component {...pageProps} />
    </Provider>
  );
}
