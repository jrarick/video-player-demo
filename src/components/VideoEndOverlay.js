const VideoEndOverlay = ({ player, setShowVideoEndOverlay, data, setCurrentlyPlayingVideo }) => {
  return (
    <div className="w-full h-full bg-slate-900/90 z-10 absolute text-center">
      <div className="flex flex-row items-start justify-center flex-wrap">
        {data.galleries[0].shows.map((show, index) => {
          if (index < 6) {
            return (
              <button
                type="button"
                className="w-1/4 m-2 md:m-4 rounded-md overflow-hidden drop-shadow-xl"
                key={show.showId}
                onClick={() => {
                  localStorage.clear();
                  data.galleries[0].shows.forEach(video => {
                    if (video.showId === show.showId) {
                      setCurrentlyPlayingVideo(video);
                    }
                  });
                  setShowVideoEndOverlay(false);
                }}
              >
                <img
                  src={`https://ccstv.ccsdistrict.org/${show.thumbnailUrl}`}
                  alt={show.title}
                />
              </button>
            );
          }
        })}
      </div>
      <button
          type="button"
          className="bg-stone-100/20 hover:bg-stone-100/30 transition-colors text-white rounded-md px-4 py-2 mt-4 md:mt-8 drop-shadow-xl"
          onClick={() => {
            setShowVideoEndOverlay(false);
            player.play();
          }}
        >Restart Video</button>
    </div>
  );
}

export default VideoEndOverlay;