import {View,Image,Text} from 'react-native'
import React from 'react'
import {icons} from "@/constants/icons";

const Profile = () => {
    return (
        <View className="flex flex-1 bg-primary items-center justify-center">
            <Image source={icons.person} className="w-16 h-16 rounded-full mx-auto mt-10"  tintColor="#fff"/>
            <Text className="text-white text-lg font-bold mt-4">Profile</Text>
        </View>
    )
}
export default Profile
