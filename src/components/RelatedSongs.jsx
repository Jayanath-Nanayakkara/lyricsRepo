import { useGetSongRelatedQuery } from "../redux/servies/shazamCore";
import SongBar from "./SongBar";

const RelatedSongs = ({
  songid,
  isPlaying,
  activeSong,
  handlePauseClick,
  handlePlayClick,
  artistId,
}) => {
  const { data } = useGetSongRelatedQuery({ songid });
  return (
    <div className="flex flex-col">
      <h1 className="font-bold text-3xl text-white">Related songs:</h1>
      <div className="mt-6 w-full flex flex-col">
        {data &&
          data.map((song, i) => (
            <SongBar
              key={`${song.key}-${artistId}`}
              song={song}
              i={i}
              artistId={artistId}
              isPlaying={isPlaying}
              activeSong={activeSong}
              handlePauseClick={handlePauseClick}
              handlePlayClick={handlePlayClick}
            />
          ))}
      </div>
    </div>
  );
};

export default RelatedSongs;
