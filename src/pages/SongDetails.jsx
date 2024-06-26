import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { DetailsHeader, Error, Loader, RelatedSongs } from "../components";
import { setActiveSong, playPause } from "../redux/features/playerSlice";
import { useGetSongDetailsQuery } from "../redux/servies/shazamCore";

const SongDetails = () => {
  const { songid } = useParams();
  const dispatch = useDispatch();
  const { activeSong, isPlaying } = useSelector((state) => state.player);
  const { data: songData, isFetching: isFetchingSongDetails } =
    useGetSongDetailsQuery({ songid });
  const {
    data,
    isFetching: isFetchingRelatedSong,
    error,
  } = useGetSongDetailsQuery({ songid });
  if (isFetchingSongDetails || isFetchingRelatedSong)
    return <Loader title="Sraching Song Details" />;

  if (error) return <Error />;
  const handlePauseClick = () => {
    dispatch(playPause(false));
  };
  const handlePlayClick = (song, data, i) => {
    dispatch(setActiveSong({ song, data, i }));
    dispatch(playPause(true));
  };

  return (
    <div className="flex flex-col">
      <DetailsHeader artisId="" songData={songData} />
      <div className="mb-10">
        <h2 className="text-white text-bold">Lyrics:</h2>
        <div className="mt-5">
          {songData?.sections[1].type === "LYRICS" ? (
            songData?.sections[1].text.map((line, i) => {
              return <p className="text-gray-400 text-base my-1">{line}</p>;
            })
          ) : (
            <p className="text-gray-400 text-base my-1">Soory no lyricks</p>
          )}
        </div>
      </div>
      <RelatedSongs
        songid={songid}
        isPlaying={isPlaying}
        activeSong={activeSong}
        handlePauseClick={handlePauseClick}
        handlePlayClick={handlePlayClick}
      />
    </div>
  );
};

export default SongDetails;
