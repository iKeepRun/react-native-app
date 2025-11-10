import {View, Text, TouchableOpacity, Image} from 'react-native'
import {Link} from "expo-router";
import {images} from "@/constants/images";
import MaskedView from "@react-native-masked-view/masked-view";



const TrendingMovieCard = (item:any
             ) => {
    // console.log("title", item.item.title)
    const index= item.index
    const {title, poster_path, id}=item.item
    return (
        <Link href={`/movies/${id}`} asChild>
            <TouchableOpacity className="w-34 relative pl-5 ">
                <Image source={
                    {
                        uri: poster_path ?
                            `https://image.tmdb.org/t/p/w500${poster_path}` :
                            "https://placeholder.com/300x400/1a1a1a/ffffff.png"
                    }
                } className="w-32 h-48 rounded-lg mt-2"
                  resizeMode="cover"
                />


                <View className="absolute bottom-2.5 left-3.5 px-2 py-1 rounded-full">
                    <MaskedView
                        maskElement={
                            <Text className="font-bold text-white text-6xl">{index + 1}</Text>
                        }
                    >
                        <Image
                            source={images.rankingGradient}
                            className="size-14"
                            resizeMode="cover"
                        />
                    </MaskedView>
                </View>

                <Text className="text-white text-sm mt-2  " numberOfLines={1} >{title}</Text>

            </TouchableOpacity>
        </Link>
    )
}
export default TrendingMovieCard
