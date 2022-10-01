import { useEffect, useState } from 'react';
import { FiCameraOff, FiCheck, FiLink, FiPlus } from 'react-icons/fi';
import { useParams } from 'react-router-dom';
import { Button } from '../components/Button';
import { ButtonVariants } from '../components/Button/types';
import { Loading } from '../components/Loading';
import { useWishList } from '../hooks/WishList';
import { IMovieRequestProps } from '../interfaces/Movie';
import api from '../services/api';
import * as Styles from '../styles/pages/Movie';

export function Movie() {
  const { isMovieInWishList, handleAddOrRemoveMovieOnWishList } = useWishList();

  const { id } = useParams();

  const [isLoading, setIsLoading] = useState(true);
  const [movie, setMovie] = useState<IMovieRequestProps>({} as IMovieRequestProps);

  const currentUrl = window.location.href;

  const movieYearRelease = movie && new Date(movie.release_date).getFullYear();
  const movieHours = movie && Number(Math.trunc(movie.runtime / 60).toFixed(0));
  const movieMinutes = movie && movieHours && (movie.runtime - movieHours * 60).toFixed(0);

  const [isLinkCopiedToClipboard, setIsLinkCopiedToClipboard] = useState(false);

  function handleCopyLinkToClipboard() {
    setIsLinkCopiedToClipboard(true);

    navigator.clipboard.writeText(currentUrl);
  }

  useEffect(() => {
    if (isLinkCopiedToClipboard) {
      setTimeout(() => {
        setIsLinkCopiedToClipboard(false);
      }, 2500);
    }
  }, [isLinkCopiedToClipboard]);

  useEffect(() => {
    console.log('useEffect');
    api.get<IMovieRequestProps>(`/movie/${id}`).then((response) => {
      setMovie(response.data);
    }).finally(() => {
      setIsLoading(false);
    });
  }, []);

  return (
    <Styles.Container>
      {isLoading ? (
        <div className="loading-wrapper">
          <Loading />
        </div>
      ) : (
        <section id="presentation">
          <div className="movie-poster-wrapper">
            {movie?.poster_path ? (
              <img src={`${import.meta.env.VITE_THE_MOVIE_DB_IMAGES_URL}${movie?.poster_path}`}
                alt={`Capa do filme ${movie?.title}`} />
            ) : (
              <>
                <FiCameraOff />
                <p>Capa indisponível</p>
              </>
            )}
          </div>

          <div className="about">
            <div>
              <h1>{movie?.title}</h1>

              <h4>
                {movie?.genres.map((genre) => genre.name).toString().replaceAll(',', ', ')}movie
                <span>•</span>
                {movieYearRelease}
                <span>•</span>
                {`${movieHours}h `}
                {movieMinutes}m
              </h4>

              <p>{movie?.overview}</p>
            </div>
            <footer>
              <p>Avaliação geral: <span>{movie?.vote_average.toFixed(1)}</span></p>

              <div className="actions">
                <Button
                  variant={ButtonVariants.Secondary}
                  onClick={handleCopyLinkToClipboard}
                  disabled={isLinkCopiedToClipboard}
                >
                  {isLinkCopiedToClipboard ? (
                    <>
                      Link copiado
                      <FiCheck />
                    </>
                  ) : (
                    <>
                      Copiar Link
                      <FiLink />
                    </>
                  )}
                </Button>

                <Button
                  type="button"
                  variant={ButtonVariants.Secondary}
                  onClick={() => handleAddOrRemoveMovieOnWishList(movie)}
                >
                  {isMovieInWishList(movie.id) ? (
                    <>
                      Em sua lista
                      <FiCheck />
                    </>
                  ) : (
                    <>
                      Adicionar à minha lista
                      <FiPlus />  
                    </>
                  )}
                </Button>
              </div>
            </footer>
          </div>
        </section>
      )}
    </Styles.Container>
  );
}
