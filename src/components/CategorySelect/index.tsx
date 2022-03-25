import   React        from "react"
import { ScrollView } from "react-native"

import { categories } from "../../utils/categories"

import { styles }     from "./styles"

import { Category }   from "../Category"

type Props = {
    categorySelected: string
    setCategory: (category_id: string) => void
    hasCheckBox?: boolean
}

export function CategorySelect({ 
    categorySelected,
    setCategory,
    hasCheckBox = false
}: Props) {

    return (
        <ScrollView
            horizontal
            style={ styles.conainer }
            showsHorizontalScrollIndicator={ false }
            contentContainerStyle={{ paddingRight: 40 }}
        >
            {
                categories.map(category => (
                    <Category
                        key         = { category.id }
                        title       = { category.title }
                        icon        = { category.icon }
                        checked     = { category.id === categorySelected }
                        hasCheckBox = { hasCheckBox }
                        onPress     = { () => setCategory(category.id) }
                    />
                ))
            }
        </ScrollView>
    )
}
