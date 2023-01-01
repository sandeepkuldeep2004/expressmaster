import Layout from "../components/Layout/Layout";
import "../styles/globals.css";
import "../styles/themify-icons.css";
import "../styles/tailwind.min.css";
import AppWrapper from "../components/util/contextState";

function MyApp({ Component, pageProps }) {
  return (
    <AppWrapper>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </AppWrapper>
  );
}

export default MyApp;
