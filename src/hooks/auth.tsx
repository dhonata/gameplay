import React, { createContext, ReactNode, useContext, useEffect, useState } from "react";

import * as AuthSession from 'expo-auth-session'
import AsyncStorage from "@react-native-async-storage/async-storage"

import { api } from "../service/api";
import { COLLECTION_USERS } from '../configs/database'

const { CDN_IMAGE }     = process.env
const { CLIENT_ID }     = process.env
const { REDIRECT_URI }  = process.env
const { RESPONSE_TYPE } = process.env
const { SCOPE }         = process.env


type User = {
    id:        string
    username:  string
    firstName: string
    avatar:    string
    email:     string
    token:     string
}

type AuthContextData = {
    user:    User,
    loading: boolean,
    signIn : () => Promise<void>
    signOut: () => Promise<void>
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

                const userDate = {
                    ...userInfo.data,
                    firstName,
                    token: params.access_token
                }

                await AsyncStorage.setItem(COLLECTION_USERS, JSON.stringify(userDate))

                setUser(userDate)

            }

        } catch {
            throw new Error("Não foi possível autenticar!")
        } finally {
            setLoading(false)
        }
    }

    async function signOut(){

        setUser({} as User)
        await AsyncStorage.removeItem(COLLECTION_USERS)

    }

    async function loadUserStoregeData() {

        const storage = await AsyncStorage.getItem(COLLECTION_USERS)

        if(storage){
            const userLogged = JSON.parse(storage) as User
            api.defaults.headers.common['authorization'] = `Bearer ${userLogged.token }`

            setUser(userLogged)

        }

    }

    useEffect(() => {
        loadUserStoregeData()
    }, [])

    return (
        <AuthContext.Provider value={{
            user,
            loading,
            signIn,
            signOut,
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
