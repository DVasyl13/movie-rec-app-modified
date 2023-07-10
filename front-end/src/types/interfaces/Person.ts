import {ISliderElement} from "./SliderElement";

export interface Person {
    id: string
    name: string
    text: string
    poster: string
    knownForMovies: ISliderElement[]
}