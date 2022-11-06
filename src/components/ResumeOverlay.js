const ResumeOverlay = ({ player, setShowResumeOverlay }) => {
  return (
    <div className="w-full h-full bg-slate-900/90 z-10 flex items-center justify-center absolute">
      <button
        type="button"
        className="bg-green-500 hover:bg-green-600 transition-colors text-white rounded-md px-4 py-2 drop-shadow-xl mr-8"
        onClick={() => {
          player.currentTime(localStorage.getItem('videoTime'));
          player.play();
          setShowResumeOverlay(false);
        }}
      >Resume watching</button>
      <button
        type="button"
        className="bg-stone-300 hover:bg-stone-400 transition-colors text-black rounded-md px-4 py-2 drop-shadow-xl"
        onClick={() => {
          player.play();
          setShowResumeOverlay(false);
        }}
      >Start from beginning</button>
    </div>
  );
}

export default ResumeOverlay;