export const addRoom = async (roomData) => {
  const res = await fetch(`${import.meta.env.VITE_API_URL}/rooms`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(roomData),
  });
  const data = await res.json();
  return data;
};

// get all rooms
export const getAllRooms = async () => {
  const res = await fetch(`${import.meta.env.VITE_API_URL}/rooms`);
  const data = await res.json();
  return data;
};

// get filter rooms for host
// export const getRooms = async (email) => {
//   const res = await fetch(`${import.meta.env.VITE_API_URL}/rooms/${email}`, {
//     headers: {
//       authorization: `Bearer ${localStorage.getItem("access-token")}`,
//     },
//   });
//   const data = await res.json();
//   return data;
// };

// get single rooms
export const getRoom = async (id) => {
  const res = await fetch(`${import.meta.env.VITE_API_URL}/room/${id}`);
  const data = await res.json();
  return data;
};

// delete rooms
export const deleteRoom = async (id) => {
  const res = await fetch(`${import.meta.env.VITE_API_URL}/rooms/${id}`, {
    method: "DELETE",
    headers: {
      "content-type": "application/json",
    },
  });
  const data = await res.json();
  return data;
};

// update a room
export const updateRoom = async (roomData, id) => {
  const response = await fetch(`${import.meta.env.VITE_API_URL}/rooms/${id}`, {
    method: "PUT",
    headers: {
      "content-type": "application/json",
      authorization: `Bearer ${localStorage.getItem("access-token")}`,
    },
    body: JSON.stringify(roomData),
  });

  const data = await response.json();
  return data;
};
