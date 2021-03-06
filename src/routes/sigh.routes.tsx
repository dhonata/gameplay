import React                    from "react"
import { createStackNavigator } from "@react-navigation/stack"

import { SignIn }               from "../screens/SignIn"

import { theme }                from "../global/styles/theme"

const { Navigator, Screen } = createStackNavigator()

declare global {
    namespace ReactNavigation{
        export interface RootParamList{
            SignIn: any
        }
    }
}

export function SighRoutes() {
    return (
        <Navigator
            screenOptions={{
                headerShown: false,
                cardStyle: { backgroundColor: theme.colors.secondary100 },
            }}
        >
            <Screen
                name="SignIn"
                component={SignIn}
            />
        </Navigator>
    )
}
