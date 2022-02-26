import React      from "react"
import { Image }  from "react-native"

import { styles } from "./style"

export function GuildIcon(){

    const uri = 'https://d1fdloi71mui9q.cloudfront.net/DKZVtUNNSEiZPVJh0HJf_Discord%20Logo%20Circle.png'

    return (
        <Image
            source={{ uri }}
            style={styles.image}
            resizeMode="cover"
        />
    )
}
