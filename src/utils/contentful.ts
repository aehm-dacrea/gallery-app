
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

export async function getAllRooms(): Promise<Room[]> {
  const { data } = await apolloClient.query<AllRoomsData>({
    query: gql`
      query GetAllRooms {
        roomCollection {
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
