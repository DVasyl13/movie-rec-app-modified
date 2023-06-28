import React from 'react';
import Button from "../../../../components/Button";

const MovieButtons = () => {
    return (
        <>
            <Button class="btn" text="Trailer" onClick={() => {}} spanText="play_circle"/>
            <Button class="btn" text="Watched" onClick={() => {}} spanText="add"/>
            <Button class="btn" text="Like" onClick={() => {}} spanText="favorite"/>
            <Button class="btn" text="Ignore" onClick={() => {}} spanText="close"/>
        </>
    );
};

export default MovieButtons;