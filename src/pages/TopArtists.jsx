import React, { useEffect } from "react";
import { ArtistCard, Error, Loader, SongCard } from "../components";
import axios from "axios";
import { useGetTopChartsQuery } from "../redux/servies/shazamCore";

const TopArtists = () => {
  const { data, isFetching, error } = useGetTopChartsQuery();

  if (isFetching) return <Loader title="Loading Songs Around You" />;
  if (error && country) return <Error />;

  return (
    <div className="flex flex-col">
      <h2
        className="font-bold text-3xl text-white text-left
        mt-4 mb-10"
      >
        Top Artist
      </h2>
      <div
        className="flex flex-wrap sm:justify-start 
      justify-center gap-8"
      >
        {data?.map((track, i) => {
          return <ArtistCard key={track.key} track={track} />;
        })}
      </div>
    </div>
  );
};

export default TopArtists;
