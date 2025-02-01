import { useState } from "react";
import { Pause, Play } from "./Player";
import { usePlayerStore } from "@/store/playerStore";
import { type Song } from "@/lib/data";

interface ItemsTableProps {
  songs: Song[];
  playlist_id: string;
}

const Time = () => (
  <svg
    role="img"
    aria-hidden="true"
    viewBox="0 0 16 16"
    height="16"
    width="16"
    fill="currentColor"
  >
    <path d="M8 1.5a6.5 6.5 0 1 0 0 13 6.5 6.5 0 0 0 0-13zM0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8z"></path>
    <path d="M8 3.25a.75.75 0 0 1 .75.75v3.25H11a.75.75 0 0 1 0 1.5H7.25V4A.75.75 0 0 1 8 3.25z"></path>
  </svg>
);

const ItemsTable = ({ songs, playlist_id }: ItemsTableProps) => {
  const {
    currentMusic,
    isPlaying,
    setIsPlaying,
    setCurrentMusic,
    currentIndex,
    setCurrentIndex,
  } = usePlayerStore((state) => state);
  const isPlayingPlayList =
    isPlaying && currentMusic?.playlist.id === playlist_id;

  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const handleMouseEnter = (index: number) => () => setHoveredIndex(index);
  const handleMouseLeave = () => setHoveredIndex(null);

  const handleClick = (song_id: number, index: number) => {
    if (isPlayingPlayList) {
      if (song_id == currentMusic.song?.id) {
        setIsPlaying(false);
        return;
      }
    } else {
      fetch(`/api/get-info-playlist.json?id=${playlist_id}`)
        .then((res) => res.json())
        .then((data) => {
          const { songs, playlist } = data;
          setIsPlaying(true);
          setCurrentMusic({
            songs,
            playlist,
            song: songs.find((song: Song) => song.id === song_id),
          });
          setCurrentIndex(index);
        });
    }
  };

  return (
    <>
      {songs.map((song, index) => (
        <tr
          onClick={() => handleClick(song.id, index)}
          onMouseEnter={handleMouseEnter(index)}
          onMouseLeave={handleMouseLeave}
          className="text-gray-300 text-sm font-light hover:bg-white/10 rounded-lg transition duration-300"
          key={index}
        >
          <td className="px-4 py-2 rounded-tl-lg rounded-bl-lg w-[49px] text-white">
            {hoveredIndex === index ? (
              currentMusic.song?.id === song.id && isPlayingPlayList ? (
                <Pause />
              ) : (
                <Play />
              )
            ) : (
              index + 1
            )}
          </td>
          <td className="px-4 py-2 flex gap-3 ">
            <picture className="">
              <img
                src={song.image}
                alt={song.title}
                className="w-11 h-11"
                loading="eager"
              />
            </picture>
            <div className="flex flex-col">
              <h3 className="text-white text-base font-normal">{song.title}</h3>
              <span>{song.artists.join(", ")}</span>
            </div>
          </td>
          <td className="px-4 py-2">{song.album}</td>
          <td className="px-4 py-2 rounded-tr-lg rounded-br-lg">
            {song.duration}
          </td>
        </tr>
      ))}
    </>
  );
};

interface MusicTablePlaySongProps {
  songs: Song[];
  playlist_id: string;
}

export function MusicTablePlaySong({
  songs,
  playlist_id,
}: MusicTablePlaySongProps) {
  return (
    <table className="table-auto text-left min-w-full divide-y-2 divide-gray-500/20">
      <thead className="">
        <tr className="text-zinc-400 text-sm">
          <th className="px-4 py-2 font-light">#</th>
          <th className="px-4 py-2 font-light">Titulo</th>
          <th className="px-4 py-2 font-light">Album</th>
          <th className="px-4 py-2 font-light">
            <Time />
          </th>
        </tr>
      </thead>
      <tbody>
        <tr className="h-[16px]"></tr>
        <ItemsTable songs={songs} playlist_id={playlist_id} />
      </tbody>
    </table>
  );
}
