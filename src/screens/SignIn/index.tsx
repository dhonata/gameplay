import React, { useState } from "react"
import { 
    Image,
    Text,
    View,
    ScrollView,
} from "react-native"

import { styles } from "./style"

import IllunstrationImg from '../../assets/illustration.png'
import { ButtonIcon } from "../../components/ButtonIcon"
import { useNavigation } from "@react-navigation/native"

export function SignIn(){
    
    const navigation = useNavigation()

    function handleSignIn() {
        navigation.navigate('Home')
    }
    
    return (
        <View style={styles.container}>
            <ScrollView>

                <Image 
                    source={IllunstrationImg} 
                    style={styles.image}
                    resizeMode="stretch"
                />

                <View style={styles.content}>

                    <Text style={styles.title}>
                        Conecte-se {`\n`}
                        e organize suas {`\n`}
                        jogatinas
                    </Text>

                    <Text style={styles.subtitle}>
                        Crie grupos para jogar seus games {`\n`}
                        favoritos com seus amigos
                    </Text>

                    <ButtonIcon
                        text="Entrar com Discord"
                        onPress={handleSignIn}
                    />

                </View>

            </ScrollView>
        </View>
    )

}
