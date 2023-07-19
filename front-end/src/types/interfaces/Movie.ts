import {ISliderElement} from "./SliderElement";

export interface IMovie {
    id: string
    title: string
    poster: string
    trailer: string
    imdbRating: number
    imdbRatingVoting: number
    metacriticRating: number
    similarMovies: ISliderElement[]
    cast: ISliderElement[]
}