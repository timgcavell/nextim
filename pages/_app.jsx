import "../styles/styles.css";

export const config = {
  unstable_runtimeJS: false,
};

export default function App({ Component, pageProps }) {
  return <Component {...pageProps} />;
}
