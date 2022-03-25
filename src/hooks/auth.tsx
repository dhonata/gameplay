import React, { createContext, ReactNode, useContext, useState } from "react";

import * as AuthSession from 'expo-auth-session'
import { api } from "../service/api";

const { CDN_IMAGE, CLIENT_ID, REDIRECT_URI, RESPONSE_TYPE, SCOPE } = process.env

type User = {
    id:        string
    username:  string
    firstName: string
    avatar:    string
    email:     string
    token:     string
}

type AuthContextData = {
    user:   User,
    loading: boolean,
    signIn: () => Promise<void>
}

type AuthProviderProps = {
    children: ReactNode
}

type AuthotizationResponse = AuthSession.AuthSessionResult & {
    params : {
        access_token?: string
        error?:        string
    }
}

export const AuthContext = createContext({} as AuthContextData)

function AuthProvider({ children }: AuthProviderProps){

    const [user, setUser]       = useState<User>({} as User)
    const [token, setToken]     = useState<string>()
    const [loading, setLoading] = useState<boolean>(false)

    async function signIn(): Promise<void>{
        try {

            setLoading(true)

            const authUrl = `${api.defaults.baseURL}/oauth2/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}&scope=${SCOPE}` 

            const { type, params } = await AuthSession
                .startAsync({ authUrl }) as AuthotizationResponse

            if(!params.error && type === 'success'){
                api.defaults.headers.common['authorization'] = `Bearer ${params.access_token }`

                const userInfo = await api.get('users/@me')

                const firstName = userInfo.data.username.split(' ')[0]
                userInfo.data.avatar = `${CDN_IMAGE}/avatars/${userInfo.data.id}/${userInfo.data.avatar}.png`

                setUser({
                    ...userInfo.data,
                    firstName,
                    token: params.access_token
                })

            }

        } catch {
            throw new Error("Não foi possível autenticar!")
        } finally {
            setLoading(false)
        }
    }

    return (
        <AuthContext.Provider value={{
            user,
            loading,
            signIn,
        }}>
            { children }
        </AuthContext.Provider>
    )
}

function useAuth(){
    const  context = useContext(AuthContext)
    return context
}

export {
    AuthProvider,
    useAuth,
}