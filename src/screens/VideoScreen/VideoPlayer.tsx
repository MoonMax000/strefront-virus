'use client';
import { FC, memo, useEffect, useRef, useState } from 'react';
import IconPlay from '@/assets/icons/video/play.svg';
import IconPause from '@/assets/icons/video/pause.svg';
import IconSound from '@/assets/icons/video/sound.svg';
import IconSoundOff from '@/assets/icons/video/sound-off.svg';
import IconSettings from '@/assets/icons/video/settings.svg';
import IconDirection from '@/assets/icons/video/direction.svg';
import IconFormatSize from '@/assets/icons/video/format-size.svg';
import IconFullWindow from '@/assets/icons/video/full-window.svg';
import IconFullScreenExit from '@/assets/icons/video/full-window.svg';
import IconSubscribers from '@/assets/icons/nav/icon-subscribes.svg';
import axios from 'axios';
import useMediaQuery from '@/utils/hooks/useMediaQuery';
import { MessageModel } from './Chat/constants';
import { getCookie } from '@/utils/cookie';
import clsx from 'clsx';

const testPosterUrl = 'https://i.ytimg.com/vi/oygrmJFKYZY/maxresdefault.jpg';

interface VideoState {
  play: boolean;
  muted: boolean;
  fullscreen: boolean;
}

interface VideoPlayerProps {
  url?: string;
  poster?: string;
  toggleChatVisible?: () => void;
  subscribersCount?: number;
  className?: string;
  IsShownSettings?: false;
}

interface ExtendedDocument extends Document {
  webkitFullscreenElement?: Element | null;
  mozFullScreenElement?: Element | null;
  msFullscreenElement?: Element | null;
  webkitExitFullscreen?: () => Promise<void>;
  mozCancelFullScreen?: () => Promise<void>;
  msExitFullscreen?: () => Promise<void>;
}

interface ExtendedHTMLElement extends HTMLElement {
  webkitRequestFullscreen?: () => Promise<void>;
  mozRequestFullScreen?: () => Promise<void>;
  msRequestFullscreen?: () => Promise<void>;
}

const VideoPlayer: FC<VideoPlayerProps> = ({
  url,
  poster,
  toggleChatVisible,
  subscribersCount,
  className,
  IsShownSettings = true,
}) => {
  const isTablet = useMediaQuery('(max-width:824px)');
  const [videoState, setVideoState] = useState<VideoState>({
    muted: false,
    play: false,
    fullscreen: false,
  });
  const [connectionError, setConnectionError] = useState<string | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const playerRef = useRef<HTMLDivElement & ExtendedHTMLElement>(null);
  const [chatData, setChatData] = useState<MessageModel[] | []>([]);

  const videoPoster = poster || testPosterUrl;

  const toggleSound = () => {
    if (videoRef.current) {
      videoRef.current.muted = !videoState.muted;
      setVideoState((prev) => ({ ...prev, muted: !prev.muted }));
    }
  };

  const togglePause = () => {
    if (videoRef.current) {
      if (videoState.play) {
        videoRef.current.pause();
      } else {
        videoRef.current.play().catch((err) => {
          console.warn('Error playing video:', err);
        });
      }
      setVideoState((prev) => ({ ...prev, play: !prev.play }));
    }
  };

  const toggleFullscreen = async () => {
    if (!playerRef.current) return;

    try {
      if (!videoState.fullscreen) {
        await playerRef.current.requestFullscreen();
      } else {
        await document.exitFullscreen();
      }
    } catch (err) {
      console.error('Fullscreen error:', err);
    }
  };

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handlePlay = () => setVideoState((prev) => ({ ...prev, play: true }));
    const handlePause = () => setVideoState((prev) => ({ ...prev, play: false }));

    video.addEventListener('play', handlePlay);
    video.addEventListener('pause', handlePause);

    return () => {
      video.removeEventListener('play', handlePlay);
      video.removeEventListener('pause', handlePause);
    };
  }, []);

  useEffect(() => {
    const handleFullscreenChange = () => {
      const extendedDoc = document as ExtendedDocument;
      const fullscreenElement =
        extendedDoc.fullscreenElement ||
        extendedDoc.webkitFullscreenElement ||
        extendedDoc.mozFullScreenElement ||
        extendedDoc.msFullscreenElement;

      setVideoState((prev) => ({
        ...prev,
        fullscreen: !!fullscreenElement,
      }));
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    document.addEventListener('webkitfullscreenchange', handleFullscreenChange);
    document.addEventListener('mozfullscreenchange', handleFullscreenChange);
    document.addEventListener('MSFullscreenChange', handleFullscreenChange);

    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
      document.removeEventListener('webkitfullscreenchange', handleFullscreenChange);
      document.removeEventListener('mozfullscreenchange', handleFullscreenChange);
      document.removeEventListener('MSFullscreenChange', handleFullscreenChange);
    };
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    console.log(video);
    if (!video || !url) return;
    const wasPlaying = videoState.play;
    video.srcObject = null;
    video.src = url;
    video.load();
    if (wasPlaying) {
      video.play().catch((err) => {
        console.warn('Error playing video after URL change:', err);
      });
    }
  }, [url]);

  useEffect(() => {
    if (!url) return;

    const handlePeerConnection = async () => {
      try {
        const peerConnection = new RTCPeerConnection();

        peerConnection.addTransceiver('video', { direction: 'recvonly' });
        peerConnection.addTransceiver('audio', { direction: 'recvonly' });

        peerConnection.ontrack = (event) => {
          if (videoRef.current) {
            videoRef.current.srcObject = event.streams[0];
          }
        };

        const offer = await peerConnection.createOffer();
        await peerConnection.setLocalDescription(offer);

        const headers: Record<string, string> = {
          'Content-Type': 'application/sdp',
        };

        const token = getCookie('access-token');
        if (token) {
          headers.Authorization = `Bearer ${token}`;
        }

        const response = await axios.post(url, offer.sdp, {
          headers,
        });
        const answer = response.data;

        await peerConnection.setRemoteDescription({
          sdp: answer,
          type: 'answer',
        });
      } catch (err) {
        console.warn('Error in WebRTC connection:', err);
        setConnectionError('Failed to connect to the video stream.');
      }
    };

    handlePeerConnection();
  }, [url]);

  return (
    <div
      className={clsx('relative h-[720px] w-full group max-tablet:h-[234px]', className)}
      ref={playerRef}
    >
      {isTablet && (
        <div className='absolute w-full h-full flex justify-center items-center left-0 top-0 opacity-0 transition-opacity group-hover:opacity-100'>
          <button
            type='button'
            onClick={togglePause}
            className='bg-[#0C1014CC] size-[64px] flex justify-center items-center rounded-[50%]'
          >
            {videoState.play ? <IconPause /> : <IconPlay />}
          </button>
        </div>
      )}

      <video
        className='video_without_controls w-full h-full object-cover object-left-top max-tablet:rounded-none'
        ref={videoRef}
        poster={videoPoster}
        muted={videoState.muted}
        loop={false}
        onEnded={() => setVideoState((prev) => ({ ...prev, play: false }))}
      >
        Your browser does not support video playback.
      </video>

      {!connectionError && (
        <div className='absolute bottom-0 left-0 w-full p-4 flex justify-between items-center'>
          <div className='flex items-center gap-3 bg-[#0B0E11] p-2 rounded-lg'>
            {!isTablet ? (
              <>
                <button type='button' onClick={togglePause}>
                  {videoState.play ? <IconPause /> : <IconPlay />}
                </button>

                <button type='button' onClick={toggleSound}>
                  {videoState.muted ? <IconSoundOff /> : <IconSound />}
                </button>
              </>
            ) : (
              <div className='rounded-[4px] py-[2px] px-1 bg-[#0C1014CC] flex items-center gap-1'>
                <IconSubscribers className='size-4' />
                <span className='font-bold text-[13px] leading-5'>{subscribersCount}</span>
              </div>
            )}
          </div>

          <div className='flex items-center gap-3 bg-[#0B0E11] p-2 rounded-lg'>
            {isTablet && (
              <button type='button' onClick={toggleSound}>
                {videoState.muted ? <IconSoundOff /> : <IconSound />}
              </button>
            )}
            {/* {IsShownSettings && (
              <button type='button'>
                <IconSettings />
              </button>
            )} */}
            {!isTablet ? (
              <>
                {IsShownSettings && (
                  <>
                    <button type='button' onClick={toggleChatVisible}>
                      <IconDirection />
                    </button>

                    {/* <button type='button' onClick={toggleChatVisible}>
                      <IconFormatSize />
                    </button> */}
                  </>
                )}

                <button type='button' onClick={toggleFullscreen}>
                  {videoState.fullscreen ? <IconFullScreenExit /> : <IconFullWindow />}
                </button>
              </>
            ) : (
              <button type='button' onClick={toggleFullscreen}>
                {videoState.fullscreen ? <IconFullScreenExit /> : <IconFullWindow />}
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default memo(VideoPlayer);
