const newListItem = (itemName, quantity, checked, timestamp, uid) => {
  return {
    name: itemName,
    quantity: quantity,
    checked: checked,
    createdAt: timestamp,
    lastUpdated: timestamp,
    item_uid: uid,
  };
};

const newList = (name, createdAt, lastUpdated, list_uid, items) => ({
  name,
  createdAt,
  lastUpdated,
  list_uid,
  items,
});

const newUser = (userName, email, uid) => ({
  displayName: userName || "Username",
  email,
  uid: uid || null,
  lists: [],
});

export { newListItem, newUser, newList };
