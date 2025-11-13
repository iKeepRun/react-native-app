export const TMDB_CONFIG={
     BASE_URL:'https://api.themoviedb.org/3',
     API_KEY: process.env.EXPO_PUBLIC_MOVIE_API_KEY,
     headers:{
             Authorization: `Bearer ${process.env.EXPO_PUBLIC_MOVIE_API_KEY}`,
             accept: 'application/json'
     }
}


export const getMovies = async ({query}:{query:string}) => {
    const url=query?`${TMDB_CONFIG.BASE_URL}/search/movie?query=${encodeURIComponent(query)}`
        :`${TMDB_CONFIG.BASE_URL}/discover/movie?sort_by=popularity.desc`

    const response = await fetch(url,{
        method: 'GET',
        headers: TMDB_CONFIG.headers
    })

    if (!response.ok){
        //@ts-ignore
        throw new Error('Error fetching movies',response.statusText)
    }
    const data = await response.json()

    return data.results
}


export const fetchMovieDetails = async (
    movieId: string
): Promise<MovieDetails> => {
    try {
        const response = await fetch(
            `${TMDB_CONFIG.BASE_URL}/movie/${movieId}?api_key=${TMDB_CONFIG.API_KEY}`,
            {
                method: "GET",
                headers: TMDB_CONFIG.headers,
            }
        );

        if (!response.ok) {
            throw new Error(`Failed to fetch movie details: ${response.statusText}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching movie details:", error);
        throw error;
    }
};

export const trendingMovies=[
    {title:'Stolen Girl',id:1062722,poster_path:"/zT7Lhw3BhJbMkRqm9Zlx2YGMsY0.jpg"},
    {title:'The Rats',id:1096563,poster_path:'/yzqHt4m1SeY9FbPrfZ0C2Hi9x1s.jpg'},
    {title:"KPop Demon Hunters",id:1218925,poster_path:'/5Gr4amaB1xxeYAEMOdrVutaWwgz.jpg'},
    {title:"The Ugly Stepsistes",id:1311031,poster_path:"/rayAREIKtSinuov10GvrZHyXfXH.jpg"},
]