import { useEffect, useState } from "react";
import { Loading } from "../components/Loading";
import { MovieCard } from "../components/MovieCard";
import { useWishList } from "../hooks/WishList";
import { ITop10WeeklyMovies } from "../interfaces/Home";
import api from "../services/api";
import * as Styles from "../styles/pages/Home";

export function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [top10WeeklyMovies, setTop10WeeklyMovies] = useState<ITop10WeeklyMovies[]>([]);

  const { handleAddOrRemoveMovieOnWishList, isMovieInWishList } = useWishList();

  useEffect(() => {
    api.get('/trending/movie/week').then((response) => {
      setTop10WeeklyMovies(
        response.data.results.slice(0, 10).map((movie: ITop10WeeklyMovies) => movie)
      )
    }).finally(() => {
      setIsLoading(false);
    })
  }, [])

 return (
   <Styles.Container>
     <section id="presentation">
       <div className="text-wrapper">
         <h2>Bem vindo ao Filmz</h2>
         <h1>O lugar perfeito para ter sempre um filme na manga!</h1>

         <p>
           Veja o que as pessoas estão curtindo com a seleção do top 10 da
           semana e pesquise por filmes para saber um pouco mais sobre eles!
         </p>
       </div>
     </section>

     <section id="movies">
       <h3>Top 10 da semana</h3>
       <div className="cards">
          {isLoading ? (
            <Loading />
          ) : (
            top10WeeklyMovies.map((movie) => (
              <MovieCard
                key={movie.id}
                movie={movie}
                handleAddMovieOnWishlist={handleAddOrRemoveMovieOnWishList}
                inWishlist={isMovieInWishList(movie.id)}
                className="card"
              />
            ))
          )}
        </div>
     </section>
   </Styles.Container>
 )
}
