import React, { useEffect } from "react";
import { Error, Loader, SongCard } from "../components";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useGetSongsBySearchQuery } from "../redux/servies/shazamCore";

const Search = () => {
  const { searchTerm } = useParams();
  const { activeSong, isPlaying } = useSelector((state) => state.player);
  const { data, isFetching, error } = useGetSongsBySearchQuery(searchTerm);

  if (isFetching) return <Loader title="Loading Songs" />;

  const songs = data?.tracks?.hits?.map((song) => song.track);

  if (error) return <Error />;

  return (
    <div className="flex flex-col">
      <h2
        className="font-bold text-3xl text-white text-left
        mt-4 mb-10"
      >
        Showing Result For <span className="font-black">{searchTerm}</span>
      </h2>
      <div
        className="flex flex-wrap sm:justify-start 
      justify-center gap-8"
      >
        {songs?.map((song, i) => {
          return (
            <SongCard
              key={song.key}
              song={song}
              isPlaying={isPlaying}
              activeSong={activeSong}
              data={data}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Search;
