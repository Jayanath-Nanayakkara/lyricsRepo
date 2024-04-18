import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { DetailsHeader, Error, Loader, RelatedSongs } from "../components";
import { useGetArtistDetailsQuery } from "../redux/servies/shazamCore";

const ArtistDetails = () => {
  const { id: artistId } = useParams();
  const { activeSong, isPlaying } = useSelector((state) => state.player);
  const { data, isFetching, error } = useGetArtistDetailsQuery(artistId);

  if (isFetching) return <Loader title="Searching Artist Details" />;
  if (error) return <Error />;

  return (
    <div className="flex flex-col">
      {data && <DetailsHeader artistId={artistId} artistData={data} />}

      {data && data.songs && (
        <RelatedSongs
          data={Object.values(data.songs)}
          artistId={artistId}
          isPlaying={isPlaying}
          activeSong={activeSong}
        />
      )}
    </div>
  );
};

export default ArtistDetails;
