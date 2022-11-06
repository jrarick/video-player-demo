import { useState, useRef, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

import LoadingSpinner from './LoadingSpinner';
import ResumeOverlay from './ResumeOverlay';
import PausedOverlay from './PausedOverlay';
import VideoEndOverlay from './VideoEndOverlay';
import VideoPlayer from './VideoPlayer';

const VideoPlayerWrapper = () => {
  const [showResumeOverlay, setShowResumeOverlay] = useState(false);
  const [showPausedOverlay, setShowPausedOverlay] = useState(false);
  const [showVideoEndOverlay, setShowVideoEndOverlay] = useState(false);
  const [currentlyPlayingVideo, setCurrentlyPlayingVideo] = useState();
  const playerRef = useRef(null);

  // Data fetching logic
  const fetchVideos = async () => {
    const { data } = await axios.get('https://ccstv.ccsdistrict.org/cablecastapi/publicsitedata?site=1');
    setCurrentlyPlayingVideo(data.galleries[0].shows[0]);
    return data;
  }
  const { data, isLoading } = useQuery( ['videos'], () => fetchVideos() );

  useEffect(() => {
    console.log(currentlyPlayingVideo);
  }, [currentlyPlayingVideo]);

  // Component to conditionally render overlays if appropriate
  const Overlay = () => {
    if (showResumeOverlay) {
      return (
        <ResumeOverlay
          player={playerRef.current}
          setShowResumeOverlay={setShowResumeOverlay}
        />
      );
    }
    if (showPausedOverlay) {
      return (
        <PausedOverlay
          player={playerRef.current}
          setShowPausedOverlay={setShowPausedOverlay}
        />
      );
    }
    if (showVideoEndOverlay) {
      return (
        <VideoEndOverlay
          player={playerRef.current}
          setShowVideoEndOverlay={setShowVideoEndOverlay}
          data={data}
          setCurrentlyPlayingVideo={setCurrentlyPlayingVideo}
        />
      )
    }
    return;
  }

  const handlePlayerReady = (player) => {
    playerRef.current = player;

    if (localStorage.getItem('videoTime')) {
      setShowResumeOverlay(true);
    }

    // Save video time in local storage every 2.5 seconds when video starts playing
    player.on('play', () => {
      setShowPausedOverlay(false);
      setInterval(() => {
        localStorage.setItem('videoTime', player.currentTime());
      }, 2500);
    });
    player.on('pause', () => {
      setShowPausedOverlay(true);
    });
    player.on('seeking', () => {
      setShowPausedOverlay(false);
    });
    player.on('ended', () => {
      setShowPausedOverlay(false);
      setShowVideoEndOverlay(true);
    });
  }

  if (isLoading && !currentlyPlayingVideo) {
    return (
      <LoadingSpinner />
    );
  } else {
    return (
      <div className="w-5/6 md:w-2/3 drop-shadow-light rounded-lg overflow-hidden">
        <Overlay />
        <VideoPlayer
          changedKey={currentlyPlayingVideo?.showId}
          options={{
            autoplay: true,
            controls: true,
            responsive: true,
            fluid: true,
            poster: `https://ccstv.ccsdistrict.org/${currentlyPlayingVideo?.thumbnailUrl}`,
            sources: [{
              src: currentlyPlayingVideo?.vodUrl,
              type: 'application/x-mpegURL'
            }]
          }}
          onReady={handlePlayerReady}
        />
      </div>
    );
  }
}

export default VideoPlayerWrapper;