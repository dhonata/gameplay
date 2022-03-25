import React from "react"
import { NavigationContainer } from "@react-navigation/native"

import { AppRoutes } from "./app.routes"
import { useAuth } from "../hooks/auth"
import { SighRoutes } from "./sigh.routes"

export function Routes(){

    const { user } = useAuth()

    return (
        <NavigationContainer>
            { user.id ? <AppRoutes /> : <SighRoutes /> }
        </NavigationContainer>
    )
}
