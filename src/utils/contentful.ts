
import gql from "graphql-tag";
import apolloClient from "./apollo-client";

export interface Room {
  id: number;
  name: string;
  roomImage: {
    url: string;
  }
}

interface AllRoomsData {
  roomCollection: {
    items: Room[];
  }
}

export interface Painting {
  title: string;
  audio: {
    url: string;
  },
  description: string;
  paintingImageCollection: {
    items: [{
      url: string;
    }]
  },
  paintingId: number;
  roomId: number;
}

interface AllPaintingsData {
  paintingCollection: {
    items: Painting[];
  }
}

export interface BigPaintingFragment {
  title: string;
  image: { url: string; };
  paintingId: number;
  coordinateX: number;
  coordinateY: number;
}

export async function getAllRooms(locale = 'en-US'): Promise<Room[]> {
  const { data } = await apolloClient.query<AllRoomsData>({
    query: gql`
      query GetAllRooms($locale: String!) {
        roomCollection(order: id_ASC, locale: $locale) {
          items {
            id,
            name,
            roomImage {
              url
            }
          }
        }
      }
    `,
    variables: {
      locale
    }
  });

  return data.roomCollection.items;
}

export async function getRoom(roomId: number): Promise<Room> {
  const { data } = await apolloClient.query<AllRoomsData>({
    query: gql`
      query GetRoom($roomId: Int!) {
        roomCollection(where: {id: $roomId}) {
          items {
            id,
            name,
            roomImage {
              url
            }
          }
        }
      }
    `,
    variables: {
      roomId
    }
  });

  return data.roomCollection.items[0];
}

export async function getAllPaintings(): Promise<Painting[]> {
  const { data } = await apolloClient.query<AllPaintingsData>({
    query: gql`
      query GetAllPaintings {
        paintingCollection(order: [roomId_ASC, paintingId_ASC]) {
          items {
            title,
            audio {
              url
            },
            description,
            paintingImageCollection {
              items {
                url
              }
            },
            paintingId,
            roomId
          }
        }
      }
    `,
  });

  return data.paintingCollection.items;
}

export async function getPaintingsByRoom(roomId: number, locale: string): Promise<Painting[]> {
  const { data } = await apolloClient.query<AllPaintingsData>({
    query: gql`
      query GetPaintingsByRoom($roomId: Int!, $locale: String!) {
        paintingCollection(where: {roomId: $roomId}, order: paintingId_ASC, locale: $locale) {
          items {
            title,
            audio {
              url
            },
            description,
            paintingImageCollection {
              items {
                url
              }
            },
            paintingId,
            roomId
          }
        }
      }
    `,
    variables: {
      roomId,
      locale
    }
  });

  return data.paintingCollection.items;
}

export async function getPainting(roomId: number, paintingId: number): Promise<Painting> {
  const { data } = await apolloClient.query<AllPaintingsData>({
    query: gql`
      query GetPainting($roomId: Int!, $paintingId: Int!) {
        paintingCollection(where: {paintingId: $paintingId, roomId: $roomId}) {
          items {
            title,
            audio {
              url
            },
            description,
            paintingImageCollection {
              items {
                url
              }
            },
            paintingId,
            roomId
          }
        }
      }
    `,
    variables: {
      paintingId,
      roomId
    }
  });

  return data.paintingCollection.items[0];
}

export async function getBigPainting(): Promise<{ url: string }> {
  const { data } = await apolloClient.query({
    query: gql`
      query {
        asset(id: "L8TmmvPZz9wUVtKJSNfWY") {
          url
        }
      }
    `
  });

  return data.asset;
}

export async function getBigPaintingFragments(): Promise<BigPaintingFragment[]> {
  const { data } = await apolloClient.query({
    query: gql`
      query GetBigPaintingFragments {
        bigPaintingFragmentCollection (order: paintingId_ASC, limit: 1000) {
          items {
            title,
            image {
              url
            },
            paintingId,
            coordinateX,
            coordinateY
          }
        }
      }
    `
  });

  return data.bigPaintingFragmentCollection.items;
}
