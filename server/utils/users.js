let onlineUsers = [];

export const getOnlineUsers = () => {
  return onlineUsers;
};

export const addUserToOnline = (newUser, sid) => {
  const oldOnlineUsers = onlineUsers;

  const isDuplicate = onlineUsers.find((u) => u?._id === newUser._id);

  if (!isDuplicate) {
    onlineUsers.push({ ...newUser, sid });
  }
  return oldOnlineUsers;
};

export const removeUserFromOnline = (sid) => {
  const remOnlineUsers = onlineUsers.filter((u) => u?.sid !== sid);
  onlineUsers = remOnlineUsers;
  return onlineUsers;
};

export const getReciever = (uid) => {
  return onlineUsers.find((u) => u?._id === uid);
};
