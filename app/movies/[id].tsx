import {View, Text, Image, ScrollView, TouchableOpacity, SafeAreaView, ActivityIndicator} from 'react-native'
import React from 'react'
import {router, useLocalSearchParams} from "expo-router";
import {fetchMovieDetails} from "@/services/api";
import useFetch from "@/services/useFetch";
import {icons} from "@/constants/icons";

interface  MovieInfoProps{
    label:string;
    value:string | number| null;
}

const MovieInfo = ({label, value}: MovieInfoProps) => (
    <View className="mt-2 px-5">
        <View className="flex-row items-center gap-x-2">
            <Text className="text-light-200 text-sm">{label}</Text>
        </View>
        <Text className="text-white font-bold text-sm mt-2">{value}</Text>
    </View>
)

const MovieDetail = () => {
    const {id} = useLocalSearchParams()
    const {data: movie, loading, error} = useFetch(() => fetchMovieDetails(id as string))

    if (loading)
        return (
            <SafeAreaView className="bg-primary flex-1">
                <ActivityIndicator />
            </SafeAreaView>
        );
    return movie ? (
        <View className="bg-primary flex-1">
            <ScrollView>
                <View>
                    <Image source={{
                        uri: `https://image.tmdb.org/t/p/w500${movie!.poster_path}`
                    }} className="w-full h-[550px]" resizeMode="stretch"/>

                    <TouchableOpacity
                        className="absolute bottom-5 right-5 rounded-full size-14 bg-white flex items-center justify-center">
                        <Image
                            source={icons.play}
                            className="w-6 h-7 ml-1"
                            resizeMode="stretch"
                        />
                    </TouchableOpacity>
                </View>
                {/*<View>*/}
                <View className="flex-col items-start justify-center mt-5 px-5">
                    <Text className="text-white font-bold text-xl">{movie?.title}</Text>
                    <View className="flex-row items-center gap-x-1 mt-2">
                        <Text className="text-light-200 text-sm">
                            {movie?.release_date?.split("-")[0]} •
                        </Text>
                        <Text className="text-light-200 text-sm">{movie?.runtime}m</Text>
                    </View>

                    <View className="flex-row items-center bg-dark-100 px-2 py-1 rounded-md gap-x-1 mt-2">
                        <Image source={icons.star} className="size-4" />

                        <Text className="text-white font-bold text-sm">
                            {Math.round(movie?.vote_average ?? 0)}/10
                        </Text>

                        <Text className="text-light-200 text-sm">
                            ({movie?.vote_count} votes)
                        </Text>
                    </View>
                </View>

                <MovieInfo label="Overview" value={movie?.overview} />
                <MovieInfo label="Genres" value={movie?.genres?.map(genre => genre.name).join(", ")|| "N/A"} />
                <View className="flex flex-row justify-between w-1/2">
                    <MovieInfo
                        label="Budget"
                        value={`$${(movie?.budget ?? 0) / 1_000_000} million`}
                    />
                    <MovieInfo
                        label="Revenue"
                        value={`$${Math.round(
                            (movie?.revenue ?? 0) / 1_000_000
                        )} million`}
                    />
                </View>
                <MovieInfo
                    label="Production Companies"
                    value={
                        movie?.production_companies?.map((c) => c.name).join(" • ") ||
                        "N/A"
                    }
                />
            </ScrollView>
            <TouchableOpacity className="absolute left-0 right-0 bottom-5 flex bg-dark-100 rounded-lg
             flex-row items-center justify-center  mx-5 z-50   py-3.5" onPress={router.back}>
                <Image source={icons.arrow} className="size-5 rotate-180 mr-1 mt-0.5"  tintColor="#fff" resizeMode="stretch"/>
                <Text className="text-white text-base font-semibold">Go Back</Text>
            </TouchableOpacity>
        </View>
    ) : (
        <Text>没有找到电影</Text>
    )
}
export default MovieDetail
