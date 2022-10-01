import React, { ReactNode } from "react";

export interface IMovieProps {
  id: number
  title: string
  overview: string
  poster_path: string
  vote_average: number
  vote_count: number
}

export interface IWishListContextData {
  wishList: IMovieProps[]
  setWishList: React.Dispatch<React.SetStateAction<IMovieProps[]>>
  handleAddOrRemoveMovieOnWishList: (movie: IMovieProps) => void
  isMovieInWishList: (movieId: number) => boolean
}

export interface IWishListProviderProps {
  children: ReactNode
}