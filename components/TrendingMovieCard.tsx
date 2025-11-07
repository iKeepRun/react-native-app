import {View, Text, TouchableOpacity, Image} from 'react-native'
import {Link} from "expo-router";



const TrendingMovieCard = (item:any
             ) => {
    // console.log("title", item.item.title)

    const {title, poster_path, id}=item.item
    return (
        <Link href={`/movies/${item.item.id}`} asChild>
            <TouchableOpacity className="w-[30%]">
                <Image source={
                    {
                        uri: poster_path ?
                            `https://image.tmdb.org/t/p/w500${poster_path}` :
                            "https://placeholder.com/300x400/1a1a1a/ffffff.png"
                    }
                } className="w-full h-52 rounded-lg"
                  resizeMode="cover"
                />

                <Text className="text-white text-sm mt-2  " numberOfLines={1} >{title}</Text>
                {/*<View className="flex-row justify-start items-center gap-x-1">*/}
                {/*    <Image source={icons.star} className="size-4"/>*/}
                {/*    <Text className="text-white text-xs ml-1 font-bold uppercase">{Math.round(vote_average/2)}</Text>*/}
                {/*</View>*/}
                {/*<View className=" justify-between flex-row items-center">*/}
                {/*    <Text className="text-light-300 text-xs mt-1 font-medium">{release_date}</Text>*/}
                {/*</View>*/}
            </TouchableOpacity>
        </Link>
    )
}
export default TrendingMovieCard
