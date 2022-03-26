import { Inter_500Medium } from "@expo-google-fonts/inter"
import React, { useEffect, useState }          from "react"
import { FlatList, View }       from "react-native"
import { Guild, GuildProps } from "../../components/Guild"
import { ListDivider } from "../../components/ListDivider"
import { Load } from "../../components/Load"
import { api } from "../../service/api"
import { styles } from "./styles"

type Props = {
    handleGuildsSelected: (guild: GuildProps) => void
}

export function Guilds({ handleGuildsSelected }: Props){

    const [guilds, setGuilds] = useState<GuildProps[]>([])
    const [loading, setLoading] = useState<boolean>(true)

    async function fecthGuilds(){

        const response = await api.get('/users/@me/guilds')

        setGuilds(response.data)
        setLoading(false)

    }

    useEffect(() => {
        fecthGuilds()
    }, [])

    return (
        <View style={styles.container}>
            {
                loading ? <Load /> : 
                <FlatList
                    data={guilds}
                    keyExtractor={item => item.id}
                    renderItem={({item}) => (
                        <Guild
                            data={item}
                            onPress={() => handleGuildsSelected(item)}
                        />
                    )}
                    showsVerticalScrollIndicator={false}
                    ItemSeparatorComponent={() => <ListDivider isCentered />}
                    ListHeaderComponent={() => <ListDivider isCentered />}
                    contentContainerStyle={{ paddingBottom: 68, paddingTop: 103 }}
                    style={styles.guilds}
                /> 
            }

        </View>
    )
}
