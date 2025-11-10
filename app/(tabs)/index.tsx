import {ActivityIndicator, Image, ScrollView, View, Text, FlatList} from "react-native";
import {images} from "@/constants/images";
import {icons} from "@/constants/icons";
import SearchBar from "@/components/SearchBar";
import {useRouter} from "expo-router";
import useFetch from "@/services/useFetch";
import {getMovies, trendingMovies} from "@/services/api";
import MovieCard from "@/components/MovieCard";
import TrendingMovieCard from "@/components/TrendingMovieCard";


export default function Index() {
    const {
        data: movies,
        loading: movieLoading,
        error: movieError
    } = useFetch(() => getMovies({query: ''}))

    const router = useRouter();

    console.log(movies)
    return (
        <View
            className=" flex-1 bg-primary"
        >
            <Image source={images.bg} className="absolute w-full z-0"/>
            {/*<View className=" flex-1 px-5">*/}
            <ScrollView className=" flex-1 px-5"
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={{minHeight: "100%", paddingBottom: 10}}>
                <Image source={icons.logo} className="w-12 h-10 mt-20 mb-5 mx-auto"/>

                {movieLoading ? (
                    <ActivityIndicator size="large" color="#0000ff" className="mt-10 self-center">

                    </ActivityIndicator>
                ) : movieError ? (
                    <Text>Error:{movieError?.message}</Text>
                ) : (
                    <View className="flex-1 mt-5">
                        <SearchBar placeholder="search for a movie" onPress={() => router.push("/search")}/>
                        <>

                            <FlatList data={trendingMovies}
                                      renderItem={(item)=> (
                                <TrendingMovieCard {...item}
                                // className="w-full"
                                />
                            )}
                                      keyExtractor={(item) => item.id.toString()}
                                      horizontal={true}
                                      showsHorizontalScrollIndicator={false}
                             />

                            <Text className="text-lg text-white font-bold mt-5 mb-3">Latest movies</Text>

                            <FlatList
                                data={movies}
                                renderItem={({item}) => (
                                    // <Text className="text-white text-sm">{item.title}</Text>

                                    <MovieCard {...item} />
                                )}
                                keyExtractor={(item) => item.id.toString()}
                                numColumns={3}
                                columnWrapperStyle={{
                                    justifyContent: "flex-start",
                                    gap: 20,
                                    paddingRight: 5,
                                    marginBottom: 10,
                                }}

                                scrollEnabled={false}
                            />
                        </>
                    </View>
                )}

            </ScrollView>
            {/*</View>*/}
        </View>
    )
        ;
}
