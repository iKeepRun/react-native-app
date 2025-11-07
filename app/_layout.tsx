import {Stack} from "expo-router";
import "./globals.css"
import {StatusBar} from "react-native";

export default function RootLayout() {
    return (
        <>
            {/*// 隐藏顶部状态栏*/}
            {/*<StatusBar hidden={true} />*/}
            <Stack>
                <Stack.Screen name="(tabs)" options={{title: "(Tabs)", headerShown: false}}/>
                <Stack.Screen name="movies/[id]" options={{title: "movies", headerShown: false}}/>
            </Stack>
        </>


    )
}
