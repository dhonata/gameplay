import React, { useState } from "react"
import { View }            from "react-native"
import { FlatList }        from "react-native-gesture-handler"

import { Appointment }     from "../../components/Appointment"
import { ButtonAdd }       from "../../components/ButtonAdd"
import { CategorySelet }   from "../../components/CategorySelect"
import { ListDivider }     from "../../components/ListDivider"
import { ListHeader }      from "../../components/ListHeader"
import { Profile }         from "../../components/Profile"

import { styles }          from "./styles"

export function Home() {

    const [category, setCategory] = useState('')

    const appointments = [
        {
            id: '1',
            guild: {
                id: '1',
                name: 'Lendários',
                icon: null,
                owner: true,
            },
            category: '1',
            date: '22/06 às 20:40h',
            description: 'É hoje que vamos chegar ao challenger sem perder uma partida da md10'
        },
        {
            id: '2',
            guild: {
                id: '1',
                name: 'Lendários',
                icon: null,
                owner: true,
            },
            category: '1',
            date: '22/06 às 20:40h',
            description: 'É hoje que vamos chegar ao challenger sem perder uma partida da md10'
        }
    ]

    function handleCategorySelect(category_id: string) {
        category_id === category ? setCategory('') : setCategory(category_id)
    }

    return (
        <View>

            <View style={styles.header}>
                <Profile />
                <ButtonAdd />
            </View>

            <View>
                <CategorySelet
                    categorySelected = {category}
                    setCategory      = {handleCategorySelect}
                />
            </View>

            <View style={styles.content}>
                <ListHeader
                    title    = "Partidas agendadas"
                    subtitle = "Total 6"
                />

                <FlatList
                    data={appointments}
                    keyExtractor={item => item.id}
                    renderItem={({ item }) => (
                        <Appointment data={item}/>
                    )}
                    ItemSeparatorComponent={() => <ListDivider />}
                    style={styles.matches}
                    showsVerticalScrollIndicator={false}
                />

            </View>

        </View>
    )
}
