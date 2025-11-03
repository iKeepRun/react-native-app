import {Tabs} from "expo-router";
import {ImageBackground} from "expo-image";
import {images} from "@/constants/images";
import {icons} from "@/constants/icons";
import {Image, ImageSourcePropType, Text, View} from "react-native";

const TabIcon = ({icon, name, focused}: { icon: ImageSourcePropType, name: string, focused: boolean }) => (
    // console.log("xxxxxxxs",images.highlight),
    focused ? (
        <ImageBackground source={images.highlight}
                         className="flex flex-row w-full flex-1 min-w-[112px] min-h-16 mt-4 justify-center items-center rounded-full overflow-hidden">
            <Image source={icon} tintColor="#151312" className="size-5"/>
            <Text className="text-secondary text-base font-semibold ml-2">{name}</Text>
        </ImageBackground>
    ) : (
        <View className="size-full items-center justify-center mt-4 rounded-full ">
            <Image source={icon} tintColor="#A8B5DB" className="size-5"/>
            {/*<Text className="text-secondary text-base font-semibold ml-2">{name}</Text>*/}
        </View>
    )
)


const _Layout = () => {
    return (
        <Tabs screenOptions={{
            tabBarShowLabel: false,
            tabBarItemStyle: {
                width: '100%',
                height: '100%',
                justifyContent: 'center',
                alignItems: 'center'
            },
            tabBarStyle: {
                backgroundColor: "#0F0D23",
                borderRadius: 50,
                marginHorizontal: 20,
                marginBottom: 36,
                height: 52,
                position: "absolute",
                overflow: "hidden",
                borderWidth: 1,
                borderColor: "#0F0D23",
            }
        }}>
            <Tabs.Screen name="index" options={{
                title: "Home", headerShown: false, tabBarIcon: ({focused}) => (
                    <TabIcon icon={icons.home} name="home" focused={focused}/>
                )
            }}/>
            <Tabs.Screen name="search" options={{
                title: "search", headerShown: false,
                tabBarIcon: ({focused}) => (<TabIcon icon={icons.search} name="search" focused={focused}/>
                )
            }}/>
            <Tabs.Screen name="saved" options={{
                title: "saved", headerShown: false,
                tabBarIcon: ({focused}) => (<TabIcon icon={icons.save} name="saved" focused={focused}/>
                )
            }}/>
            <Tabs.Screen name="profile" options={{
                title: "profile", headerShown: false,
                tabBarIcon: ({focused}) => (<TabIcon icon={icons.person} name="profile" focused={focused}/>
                )
            }}/>
        </Tabs>
    )
}
export default _Layout

