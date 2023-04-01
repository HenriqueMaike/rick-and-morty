import '@/styles/globals.scss'
import type { AppProps } from 'next/app'
import { Provider } from 'react-redux'
import store from '../redux/store'

import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <Component {...pageProps}/>
      <ToastContainer 
        autoClose={3000}
        closeOnClick
      />
    </Provider>
  )  
}