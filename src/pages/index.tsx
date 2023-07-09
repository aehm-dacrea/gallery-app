import { GetStaticPropsResult } from "next";
import { NavigationBar } from "@/components/navigationBar";
import {
  Room,
  getAllRooms,
  getBigPainting,
} from "@/utils/contentful";
import { BigTile } from "@/components/bigTile";
import bigTileStyles from '@/components/bigTile/BigTile.module.css';
import styles from "./Homepage.module.css";

export default function Page({
  rooms,
  bigPainting,
}: {
  rooms: Room[];
  bigPainting: { url: string };
}) {
  return (
    <>
      <NavigationBar />
      <div className={styles.container}>
        <BigTile
          link="/divinityDNA"
          title="Divinity's DNA"
          imageUrl={bigPainting.url}
          className={bigTileStyles.titleShadow}
        />
        {rooms.map((room, i) => (
          <BigTile link={`/room/${room.id}`} title={room.name} key={i} />
        ))}
      </div>
    </>
  );
}

export async function getStaticProps({
  locale,
}: {
  locale: string;
}): Promise<
  GetStaticPropsResult<{ rooms: Room[]; bigPainting: { url: string } }>
> {
  const rooms = await getAllRooms(locale);
  const bigPainting = await getBigPainting();

  return {
    props: { rooms, bigPainting },
  };
}
