import {ISliderElement} from "./SliderElement";

export interface IMovie {
    id: string
    title: string
    poster: string
    trailer: string
    duration: number
    genre: string
    studio: string
    plot: string
    imdbRating: number
    imdbRatingVoting: number
    metacriticRating: number
    similarMovies: ISliderElement[]
    cast: ISliderElement[]
}