import '../styles/globals.css'
import type { AppProps } from 'next/app'
import React, { FC } from 'react';
// import 'antd/dist/antd.css';
import 'antd/dist/antd.variable.min.css';
import Layout from '../components/layout'
import wrapper from "../store/configureStore"
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from "react-query/devtools";

const queryClient = new QueryClient();
const MyApp: FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <>
      <Layout >
        <QueryClientProvider client={queryClient}>
          <Component {...pageProps} />
          <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
      </Layout>

    </>
  )
}

// export function reportWebVitals(metric: any) {
//   console.log(metric);
// }

export default wrapper.withRedux(MyApp);


// Router.events.on("routeChangeStart", (url) => {
//   console.log(`Loading: ${url}`);
//   document.body.classList.add("body-page-transition");
//   ReactDOM.render(
//     <PageChange path={url} />,
//     document.getElementById("page-transition")
//   );
// });
// Router.events.on("routeChangeComplete", () => {
//   ReactDOM.unmountComponentAtNode(document.getElementById("page-transition"));
//   document.body.classList.remove("body-page-transition");
// });
// Router.events.on("routeChangeError", () => {
//   ReactDOM.unmountComponentAtNode(document.getElementById("page-transition"));
//   document.body.classList.remove("body-page-transition");
// });

// export default class MyApp extends App {
//   componentDidMount() {

//   }
//   static async getInitialProps({ Component, router, ctx }) {
//     let pageProps = {};

//     if (Component.getInitialProps) {
//       pageProps = await Component.getInitialProps(ctx);
//     }

//     return { pageProps };
//   }
//   render() {
//     const { Component, pageProps } = this.props;

//     return (
//       <React.Fragment>
//         <Head>
//           <meta
//             name="viewport"
//             content="width=device-width, initial-scale=1, shrink-to-fit=no"
//           />
//           <title>NextJS Material Kit by Creative Tim</title>
//         </Head>
//         <Component {...pageProps} />
//       </React.Fragment>
//     );
//   }
// }