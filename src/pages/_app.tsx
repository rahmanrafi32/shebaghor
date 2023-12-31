import type {ReactElement, ReactNode} from 'react'
import type {NextPage} from 'next'
import type {AppProps} from 'next/app'
import {Provider} from "react-redux";
import {store} from "@/redux/store";
import isLoggedIn from "@/utils/isLoggedIn";
import {useRouter} from "next/navigation";
import {useEffect} from "react";

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
    getLayout?: (page: ReactElement) => ReactNode
}

type AppPropsWithLayout = AppProps & {
    Component: NextPageWithLayout
}

export default function App({Component, pageProps}: AppPropsWithLayout) {
    const getLayout = Component.getLayout ?? ((page) => page)
    return getLayout(
        <Provider store={store}>
            <Component {...pageProps} />
        </Provider>
    )
}
