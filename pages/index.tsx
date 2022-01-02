import Head from 'next/head'
import HomePageMainDoorContainer from "../components/homePageContainer/mainDoor"
import Image from 'next/image'
import HomePageContent from "../components/homePageContainer/contents/homePageContents";
import wrapper, { SagaStore } from 'store/configureStore';
import { END, Task } from 'redux-saga';
import { LOAD_MY_INFO_REQUEST } from '../reducer/user';
import { useSelector } from 'react-redux';
import axios from 'axios'
import { applyMiddleware, compose, createStore, Store } from "redux";
import { GetServerSideProps } from 'next';



// import styles from '../styles/Home.module.css';

const Home = () => {
  return (
    <div className="min-h-screen p-0 flex flex-col justify-center h-screen items-center">
      <Head>
        <title>Omega Consumer</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <section className="w-full h-full">
        <HomePageMainDoorContainer />
        <HomePageContent />
      </section>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = wrapper.getServerSideProps(store => async ({ req }): Promise<any> => {
  const cookie = req ? req.headers.cookie : '';
  axios.defaults.headers.common['Cookie'] = '';
  if (req && cookie) {
    axios.defaults.headers.common['Cookie'] = cookie;
  }
  store.dispatch({
    type: LOAD_MY_INFO_REQUEST,
  });
  store.dispatch(END);
  await (store as SagaStore).sagaTask.toPromise();
});
export default Home;


