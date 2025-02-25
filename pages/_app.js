import Layout from "../components/Layout";
import "../styles/globals.scss";
import { Provider } from "next-auth/client"

function MyApp({ Component, pageProps }) {
  return (
   <Provider session={pageProps.session}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
   </Provider>
  );
}

export default MyApp;
