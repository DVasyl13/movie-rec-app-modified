import React, {useEffect, useState} from 'react';
import Button from "../../../../components/Button";
import {IMovie} from "../../../../types/interfaces/Movie";

interface MovieButtonsProps {
    movie: IMovie
}

const MovieButtons = (props: MovieButtonsProps) => {
    const [likedButton, setLikedButton] = useState("btn");
    const [watchedSpan, setWatchedSpan] = useState("add");
    const [ignoredSpan, setIgnoredSpan] = useState("close");
    const { movie } = props;
    let movieIMDbId : string;

    useEffect(() => {
        const href = window.location.href;
        movieIMDbId = href.substring(href.lastIndexOf('/') + 1);

        //TODO: fetch user details about movie (liked/ignore/watched) to set a buttons
    });

    const checkIfUserAuthorized = () => {
        return !!sessionStorage.getItem('jwt');
    }

    const toggleButton = async (buttonName: string, func: () => void) => {
        if (!checkIfUserAuthorized()) {
            return;
        }
        func();
        const response: Response = await fetch("http://localhost:8080/api/v1/user/"+buttonName+"/"+movieIMDbId, {
            mode: 'cors',
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + sessionStorage.getItem('jwt')
            }
        });
        const responseBody = await response.json();
        console.log(responseBody);
    }

    function toggleLikeButton() {
        if (likedButton.includes("btn-liked")) {
            setLikedButton("btn");
        } else {
            setLikedButton("btn btn-liked");
        }
    }
    function toggleWatchedButton() {
        if (watchedSpan === 'add') {
            setWatchedSpan('done');
        } else {
            setWatchedSpan('add');
        }
    }
    function toggleIgnoreButton() {
        ignoredSpan === 'close' ?
            setIgnoredSpan('done')
            : setIgnoredSpan('close');
    }

    return (
        <>
            <Button class="btn"
                    text="Trailer"
                    onClick={() => {}}
                    spanText="play_circle"/>
            <Button class="btn"
                    text="Watched"
                    onClick={() => toggleButton('watched', toggleWatchedButton)}
                    spanText={watchedSpan}/>
            <Button class={likedButton}
                    text="Like"
                    onClick={() => toggleButton('liked', toggleLikeButton)}
                    spanText="favorite"/>
            <Button class="btn"
                    text="Ignore"
                    onClick={() => toggleButton('ignore', toggleIgnoreButton)}
                    spanText={ignoredSpan}/>
        </>
    );
};

export default MovieButtons;