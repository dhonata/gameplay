import   React, { useState }              from "react"
import { KeyboardAvoidingView, Modal, Platform, Text, View }  from "react-native"
import { RectButton, ScrollView } from "react-native-gesture-handler"

import AsyncStorage from "@react-native-async-storage/async-storage"

import { Feather }          from "@expo/vector-icons"

import { Background }       from "../../components/Background"
import { CategorySelect }   from "../../components/CategorySelect"
import { Header }           from "../../components/Header"

import { theme }            from "../../global/styles/theme"
import { styles }           from "./styles"
import { GuildIcon }        from "../../components/GuildIcon"
import { SmallInput }       from "../../components/SmallInput"
import { TextArea }         from "../../components/TextArea"
import { Button }           from "../../components/Button"
import { ModalView }        from "../../components/ModalView"

import { Guilds }           from "../Guilds"
import { GuildProps }       from "../../components/Guild"

import uuid                 from "react-native-uuid"
import { COLLECTION_APPOINTMENTS } from "../../configs/database"
import { useNavigation } from "@react-navigation/native"

export function AppointmentCreate(){

    const [category, setCategory]               = useState('')
    const [openGuildsModal, setOpenGuildsModal] = useState(false)
    const [guild, setGuild]                     = useState<GuildProps>({} as GuildProps)

    const [day, setDay]                 = useState('')
    const [month, setMonth]             = useState('')
    const [hour, setHour]               = useState('')
    const [minute, setMinute]           = useState('')
    const [description, setDescription] = useState('')

    const navigation = useNavigation()

    function handleCategorySelect(category_id: string) {
        setCategory(category_id)
    }

    function handleOpenGuilds() {
        setOpenGuildsModal(true)
    }

    function handleCloseGuilds() {
        setOpenGuildsModal(false)
    }

    function handleGuildsSelected(guildSelected: GuildProps) {
        setGuild(guildSelected)
        setOpenGuildsModal(false)
    }

    async function handleSave(){
        const newAppointment = {
            id: uuid.v4(),
            guild,
            category,
            date: `${day}/${month} às ${hour}:${minute}h`,
            description,
        } 

        const storage = await AsyncStorage.getItem(COLLECTION_APPOINTMENTS)

        const appointments = storage ? JSON.parse(storage) : []

        await AsyncStorage.setItem(
            COLLECTION_APPOINTMENTS,
            JSON.stringify([
                ...appointments,
                newAppointment
            ])
        )
        
        navigation.navigate('Home')

    }

    return (
        <KeyboardAvoidingView 
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.container}
        >
            <Background>
                <Header
                    title = "Agendar Partida"
                />

                <ScrollView>

                    <Text style={[ 
                        styles.label,
                        { 
                            marginLeft: 24, 
                            marginTop: 36, 
                            marginBottom: 18 
                        }
                    ]}>
                        Categoria
                    </Text>

                    <CategorySelect
                        hasCheckBox
                        categorySelected = { category }
                        setCategory      = { handleCategorySelect }
                    />

                    <View style={styles.form}>

                        <RectButton onPress={handleOpenGuilds}>
                            <View style={styles.select}>
                                {
                                    guild.icon 
                                    ? <GuildIcon guildId={guild.id} iconId={guild.icon} /> 
                                    : <View style={styles.image} />
                                }

                                <View style={styles.selectBody}>
                                    <Text style={styles.label} >
                                        { 
                                            guild.name 
                                            ?? 'Selecione um servidor'
                                        }
                                    </Text>
                                </View>

                                <Feather
                                    name  = "chevron-right"
                                    size  = { 18 } 
                                    color = { theme.colors.heading }/>

                            </View>
                        </RectButton>

                        <View style={styles.field}>
                            
                            <View>
                                <Text style={[styles.label, {
                                    marginBottom: 12,
                                }]}>
                                    Dia e mês
                                </Text>

                                <View style={styles.column}>
                                    <SmallInput
                                        maxLength={2}
                                        onChangeText={setDay}
                                    />
                                    <Text style={styles.divider}>
                                        /
                                    </Text>
                                    <SmallInput
                                        maxLength={2}
                                        onChangeText={setMonth}
                                    />
                                </View>
                            </View>

                            <View>
                                <Text style={[styles.label, {
                                    marginBottom: 12,
                                }]}>
                                    Hora e minutos
                                </Text>
                                <View style={styles.column}>
                                    <SmallInput
                                        maxLength={2}
                                        onChangeText={setHour}
                                    />
                                    <Text style={styles.divider}>
                                        :
                                    </Text>
                                    <SmallInput
                                        maxLength={2}
                                        onChangeText={setMinute}
                                    />
                                </View>
                            </View>

                        </View>

                        <View style={[styles.field, { marginBottom: 12 }]}>
                            <Text style={styles.label}>
                                Descrição: 
                            </Text>
                            <Text style={styles.caractersLimit}>
                                Max 100 caracteres
                            </Text>
                        </View>

                        <TextArea 
                            multiline
                            maxLength={100}
                            numberOfLines={5}
                            autoCorrect={false}
                            onChangeText={setDescription}
                        />

                        <View style={styles.footer}>
                            <Button
                                onPress={handleSave}
                                text={'Agendar'}
                            />
                        </View>

                    </View>

                </ScrollView>

                <ModalView visible={openGuildsModal} closeModal={handleCloseGuilds}>
                    <Guilds handleGuildsSelected={handleGuildsSelected}/>
                </ModalView>

            </Background>
        </KeyboardAvoidingView>
    )
}
