const PausedOverlay = ({ player, setShowPausedOverlay }) => {
  return (
    <div className="w-full h-full bg-slate-900/90 z-10 flex flex-col items-center justify-center absolute">
      <div className="text-white text-2xl md:text-4xl mb-12 text-center">Like this video? Consider supporting!</div>
      <div className="flex">
        <a
          className="bg-green-500 hover:bg-green-600 transition-colors text-white rounded-md px-4 py-2 drop-shadow-xl mr-8"
          href="https://cablecast.tv"
          target="_blank"
        >Donate Now</a>
        <button
          type="button"
          className="bg-stone-100/20 hover:bg-stone-100/30 transition-colors text-white rounded-md px-4 py-2 drop-shadow-xl"
          onClick={() => {
            player.play();
            setShowPausedOverlay(false);
          }}
        >Resume video</button>
      </div>
    </div>
  );
}

export default PausedOverlay;