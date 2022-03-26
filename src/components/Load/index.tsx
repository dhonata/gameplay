import React          from "react"
import { ActivityIndicator, View }       from "react-native"

import { Background } from "../../components/Background"
import { theme } from "../../global/styles/theme"
import { styles } from "./styles"

export function Load(){
    return (
        <Background>
            <View style={styles.container}>
                <ActivityIndicator
                    size="large"
                    color={theme.colors.primary}
                />
            </View> 
        </Background>
    )
}
