import {ISliderElement} from "./SliderElement";

export interface Movie {
    id: string
    title: string
    poster: string
    imdbRating: number
    imdbRatingVoting: number
    metacriticRating: number
    similarMovies: ISliderElement[]
    cast: ISliderElement[]
}