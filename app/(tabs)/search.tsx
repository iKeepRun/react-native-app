import {View, Image, Text, FlatList} from 'react-native'
import {icons} from "@/constants/icons";
import {images} from "@/constants/images";
import useFetch from "@/services/useFetch";
import {getMovies} from "@/services/api";
import {useEffect, useState} from "react";
import SearchBar from "@/components/SearchBar";
import {HeaderHeightContext} from "react-native-screens/native-stack";

import {router} from "expo-router";
import MovieCard from "@/components/MovieCard";

const Search = () => {

    const [search, setSearch] = useState<string>('')

    const {
        data: movies,
        loading,
        error,
        refetch,
        reset
    } = useFetch(() => getMovies({query: search}),false)


    useEffect(()=>{
        const time=setTimeout(()=>{
            refetch()
        },500)

        //清除计时器
        return ()=>{clearTimeout(time)}
    },[search])

    // console.log("param search", movies)
    return (
        <View className="flex-1 bg-primary">
            <Image source={images.bg} className="absolute w-full z-0 " resizeMode="cover"/>
            <Image source={icons.logo} className="w-12 h-10 mt-20 mb-5 mx-auto"/>
            {/*<Text className="  mt-30 mx-auto text-white">{search}</Text>*/}
            <View className="flex-1">
                <FlatList data={movies}
                          renderItem={({item}) => (

                              <MovieCard {...item} />

                          )}
                          keyExtractor={item => item.id.toString()}
                          numColumns={3}
                          columnWrapperStyle={{
                              justifyContent: "flex-start",
                              gap: 20,
                              paddingRight: 5,
                              marginBottom: 10,
                          }}

                          ListHeaderComponent={
                              <>
                                  <SearchBar value={search}
                                             placeholder="search for a movie"
                                             onChangeText={setSearch}
                                             onPress={() => {
                                                 refetch()
                                             }}
                                  />
                                  <View style={{ minHeight: 10 }}>
                                  </View>
                              </>


                          }
                          className="mt-2 pb-32"
                />
            </View>

        </View>
    )
}
export default Search

