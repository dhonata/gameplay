import   React                           from "react"
import { Image, Text, View, ScrollView, Alert, ActivityIndicator } from "react-native"
import { useNavigation }                 from "@react-navigation/native"

import { styles }                        from "./style"

import IllunstrationImg                  from '../../assets/illustration.png'

import { ButtonIcon }                    from "../../components/ButtonIcon"
import { Background }                    from "../../components/Background"
import { useAuth } from "../../hooks/auth"
import { theme } from "../../global/styles/theme"

export function SignIn(){

    const navigation = useNavigation()

    const { signIn, loading } = useAuth()

    async function handleSignIn() {
        try {
            await signIn()
        } catch (error: any) {
            Alert.alert(error)
        }
        // navigation.navigate('Home')
    }
    
    return (
        <Background>
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

                        {
                            loading ? <ActivityIndicator color={theme.colors.primary}/> :
                            <ButtonIcon
                                text="Entrar com Discord"
                                onPress={handleSignIn}
                            />
                        }

                    </View>

                </ScrollView>
            </View>
        </Background>
    )

}
