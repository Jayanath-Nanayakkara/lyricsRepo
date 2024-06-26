import React, { useEffect } from "react";
import { Error, Loader, SongCard } from "../components";
import { useSelector } from "react-redux";
import axios from "axios";
import { useGetTopChartsQuery } from "../redux/servies/shazamCore";

const TopCharts = () => {
  const { activeSong, isPlaying } = useSelector((state) => state.player);
  const { data, isFetching, error } = useGetTopChartsQuery();

  if (isFetching) return <Loader title="Loading Songs Around You" />;
  if (error && country) return <Error />;

  return (
    <div className="flex flex-col">
      <h2
        className="font-bold text-3xl text-white text-left
        mt-4 mb-10"
      >
        Discover Top Charts
      </h2>
      <div
        className="flex flex-wrap sm:justify-start 
      justify-center gap-8"
      >
        {data?.map((song, i) => {
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

export default TopCharts;
