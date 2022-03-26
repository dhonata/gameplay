import React, { useState, useCallback } from "react"
import { View }            from "react-native"
import { FlatList }        from "react-native-gesture-handler"
import { useNavigation, useFocusEffect }   from "@react-navigation/native"

import { Appointment, AppointmentProp }     from "../../components/Appointment"
import { Background }      from "../../components/Background"
import { ButtonAdd }       from "../../components/ButtonAdd"
import { CategorySelect }   from "../../components/CategorySelect"
import { ListDivider }     from "../../components/ListDivider"
import { ListHeader }      from "../../components/ListHeader"
import { Profile }         from "../../components/Profile"

import AsyncStorage from "@react-native-async-storage/async-storage"

import { styles }          from "./styles"
import { COLLECTION_APPOINTMENTS } from "../../configs/database"
import { Load } from "../../components/Load"

export function Home() {

    const [category, setCategory] = useState('')
    const [loading, setLoading]   = useState(true)

    const navigation = useNavigation()

    const [appointments, setAppointments] = useState<AppointmentProp[]>([])

    function handleCategorySelect(category_id: string) {
        category_id === category ? setCategory('') : setCategory(category_id)
    }

    function handleAppointmentDetails(guildSelected: AppointmentProp) {
        navigation.navigate('AppointmentDetails', { guildSelected })
    }

    function handleAppointmentCreate() {
        navigation.navigate('AppointmentCreate')
    }

    async function loadAppointmets(){
        
        const response = await AsyncStorage.getItem(COLLECTION_APPOINTMENTS)

        const storage: AppointmentProp[] = response ? JSON.parse(response) : []

        if(category){
            setAppointments(storage.filter(item => item.category === category))
        }else{
            setAppointments(storage)
        }

        setLoading(false)

    }

    useFocusEffect(
        useCallback(() => {
            loadAppointmets()
        }, [category])
    )

    return (
        <Background>

            <View style={styles.header}>
                <Profile />
                <ButtonAdd onPress={handleAppointmentCreate}/>
            </View>

            <View>
                <CategorySelect
                    categorySelected = {category}
                    setCategory      = {handleCategorySelect}
                />
            </View>
            {
                loading ? <Load /> : 
                <>
                    <ListHeader
                        title    = "Partidas agendadas"
                        subtitle = {`Total ${appointments.length}`}
                    />

                    <FlatList
                        data={appointments}
                        keyExtractor={item => item.id}
                        renderItem={({ item }) => (
                            <Appointment
                                data={item}
                                onPress={() => handleAppointmentDetails(item)}
                            />
                        )}
                        ItemSeparatorComponent={() => <ListDivider />}
                        contentContainerStyle={{ paddingBottom: 69 }}

                        style={styles.matches}
                        showsVerticalScrollIndicator={false}
                    />
                </>
            }

        </Background>
    )
}
