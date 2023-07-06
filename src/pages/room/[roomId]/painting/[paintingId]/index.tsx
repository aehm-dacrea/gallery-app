import type { GetStaticPropsResult, InferGetStaticPropsType } from "next";
import Head from "next/head";
import { AudioPlayer } from '@/components/audioPlayer';
import {
  getAllPaintings,
  getPainting,
  Painting,
} from "@/utils/contentful";

const Painting = (props: InferGetStaticPropsType<typeof getStaticProps>) => {
  const { title, paintingId, audio } = props;

  return (
    <>
      <Head>
        <title>Virtosu Art Gallery - {title}</title>
        <meta
          property="og:title"
          content={`Virtosu Art Gallery - ${title}`}
          key="title"
        />
      </Head>
      <h1>
        {paintingId}. {title}
      </h1>
      <AudioPlayer title={title} src={audio.url} />
    </>
  );
};

export async function getStaticPaths() {
  const paintings = await getAllPaintings();

  const paths = paintings.map(({ roomId, paintingId }) => ({
    params: { roomId: `${roomId}`, paintingId: `${paintingId}` },
  }));

  return { paths, fallback: false };
}

export async function getStaticProps({
  params,
}: {
  params: { roomId: string; paintingId: string };
}): Promise<GetStaticPropsResult<Painting>> {
  const painting = await getPainting(
    Number(params.roomId),
    Number(params.paintingId)
  );

  return {
    props: painting,
  };
}

export default Painting;
