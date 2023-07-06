import { GetStaticPathsContext, GetStaticPropsResult, InferGetStaticPropsType } from 'next';
import { getAllRooms, getRoom, Room, getPaintingsByRoom, Painting } from '@/utils/contentful';
import { AudioPlayer } from '@/components/audioPlayer';
import { useState } from 'react';
import { PaintingTile } from '@/components/paintingTile';
import styles from './Room.module.css';

export default function Room({ room, roomPaintings }: InferGetStaticPropsType<typeof getStaticProps>) {
  const [currentAudio, setCurrentAudio] = useState(roomPaintings[0]);

  return (
    <>
      <h1 className={styles.title}>Room {room.id}</h1>
      {roomPaintings.map((painting, i) => <PaintingTile painting={painting} key={i} setCurrentAudio={setCurrentAudio} />)}
      {currentAudio ? <AudioPlayer src={currentAudio.audio.url} title={currentAudio.title} /> : null}
    </>
  );
}

export async function getStaticPaths({ locales }: GetStaticPathsContext) {
  const rooms = await getAllRooms();

  const paths = rooms.flatMap((room) => {
    return locales?.map((locale) => ({
      params: {
        roomId: `${room.id}`
      },
      locale
    }))
  })

  return { paths, fallback: false }
}
 
export async function getStaticProps({ params, locale }: {
  params: { roomId: number }; locale: string
}): Promise<GetStaticPropsResult<{room: Room, roomPaintings: Painting[]}>> {
  const room = await getRoom(Number(params.roomId));
  const roomPaintings = await getPaintingsByRoom(Number(params.roomId), locale);

  return {
    props: { room, roomPaintings },
  };
}
