import prisma from "../prisma";

export const getRooms = () => {
    return prisma.room.findMany({
        orderBy: {
            name: "asc",
        },
    });
}

export const getRoom = (roomId: string) => {
    return prisma.room.findUnique({
        where: {
            id: roomId,
        },
    })
}