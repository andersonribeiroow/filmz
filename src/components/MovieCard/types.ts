import { HTMLAttributes } from "react";
import { IMovieProps } from "../../hooks/WishList/types";

export interface IMovieCardProps extends HTMLAttributes<HTMLDivElement> {
  movie: any
  inWishlist: boolean
  handleAddMovieOnWishlist: (movie: IMovieProps) => void
}
