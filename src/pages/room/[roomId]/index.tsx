import type {
  GetStaticPathsContext,
  GetStaticPropsResult,
  InferGetStaticPropsType,
} from "next";
import { useState } from "react";
import { AudioPlayer } from "@/components/audioPlayer";
import { PaintingTile } from "@/components/paintingTile";
import { NavigationBar } from "@/components/navigationBar";
import {
  getAllRooms,
  getRoom,
  Room,
  getPaintingsByRoom,
  Painting,
} from "@/utils/contentful";
import styles from "./Room.module.css";

export default function Room({
  room,
  roomPaintings,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const [currentAudio, setCurrentAudio] = useState(roomPaintings[0]);

  return (
    <>
      <NavigationBar />
      <h1 className={styles.title}>Room {room.id}</h1>
      {roomPaintings.map((painting, i) => (
        <PaintingTile
          imageUrl={painting.paintingImageCollection.items[0]?.url}
          paintingId={painting.paintingId}
          title={painting.title}
          key={i}
          onClick={() => setCurrentAudio(() => painting)}
        />
      ))}
      {currentAudio ? (
        <AudioPlayer src={currentAudio.audio.url} title={currentAudio.title} />
      ) : null}
    </>
  );
}

export async function getStaticPaths({ locales }: GetStaticPathsContext) {
  const rooms = await getAllRooms();

  const paths = rooms.flatMap((room) => {
    return locales?.map((locale) => ({
      params: {
        roomId: `${room.id}`,
      },
      locale,
    }));
  });

  return { paths, fallback: false };
}

export async function getStaticProps({
  params,
  locale,
}: {
  params: { roomId: number };
  locale: string;
}): Promise<GetStaticPropsResult<{ room: Room; roomPaintings: Painting[] }>> {
  const room = await getRoom(Number(params.roomId));
  const roomPaintings = await getPaintingsByRoom(Number(params.roomId), locale);

  return {
    props: { room, roomPaintings },
  };
}
