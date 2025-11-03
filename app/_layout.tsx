import {Stack} from "expo-router";
import "./globals.css"

export default function RootLayout() {
    return (<Stack>
            <Stack.Screen name="(tabs)" options={{title: "(Tabs)", headerShown: false}}/>
            <Stack.Screen name="movies/[id]" options={{title: "movies", headerShown: false}}/>
        </Stack>

    )
}
