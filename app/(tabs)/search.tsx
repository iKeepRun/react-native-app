import {View, Image, Text, FlatList, ActivityIndicator} from 'react-native'
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
        const time=setTimeout(async ()=>{
            if(search.trim()){
                await  refetch()
            }else{
                reset()
            }
        },500)

        //清除计时器
        return ()=>{clearTimeout(time)}
    },[search])


    return (
        <View className="flex-1 bg-primary">
            <Image source={images.bg} className="absolute w-full z-0 " resizeMode="cover"/>

                <FlatList data={movies}
                          renderItem={({item}) => (
                              <MovieCard {...item} />
                          )}
                          keyExtractor={item => item.id.toString()}
                          numColumns={3}
                          columnWrapperStyle={{
                              justifyContent: "flex-start",
                              gap: 16,
                              marginVertical: 16
                          }}
                          contentContainerStyle={{
                              paddingBottom: 100
                          }}

                          ListHeaderComponent={
                              <>
                                  <View className="w-full flex-row justify-center mt-20 items-center">
                                      <Image source={icons.logo} className="w-12 h-10" />
                                  </View>
                                  <View className="my-5">
                                      <SearchBar value={search}
                                                 placeholder="search for a movie"
                                                 onChangeText={setSearch}
                                                 onPress={() => {
                                                     refetch()
                                                 }}
                                      />
                                  </View>

                                  {loading && (
                                      <ActivityIndicator
                                          size="large"
                                          color="#0000ff"
                                          className="my-3"
                                      />
                                  )}

                                  {error && (
                                      <Text className="text-red-500 px-5 my-3">
                                          Error: {error.message}
                                      </Text>
                                  )}

                                  {!loading &&
                                      !error &&
                                      search.trim() &&
                                      movies?.length! > 0 && (
                                          <Text className="text-xl text-white font-bold">
                                              Search Results for{" "}
                                              <Text className="text-accent">{search}</Text>
                                          </Text>
                                      )}
                              </>
                          }



                          ListEmptyComponent={!loading&& !error?(
                              <View className="">
                                <Text className="text-gray-500 text-center mt-20">{search.trim()?`No movies found for ${search}`:'Search for a movie'}</Text>
                              </View>
                          ):null}
                          className=" px-5"
                />
        </View>
    )
}
export default Search

