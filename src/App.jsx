import { scan } from "react-scan";
import { useCallback, useState } from "react";

import { generateUsers } from "./utils";
import { UserCard, VirtualizedInfiniteList } from "./components";

const USERS_SIZE = 10;

scan({
  enabled: false, // <-- Enable React Scan
  alwaysShowLabels: true,
  log: true,
});

export const App = () => {
  const [users, setUsers] = useState(generateUsers(USERS_SIZE));

  const renderUserCard = useCallback(
    (user, ref) => <UserCard ref={ref} key={user.id} {...user} />,
    []
  );

  const handleReachEnd = useCallback(() => {
    setUsers((previousUsers) => [
      ...previousUsers,
      ...generateUsers(USERS_SIZE, previousUsers.length),
    ]);
  }, [setUsers]);

  return (
    <VirtualizedInfiniteList
      items={users}
      visibleItemsCount={5}
      renderItem={renderUserCard}
      onReachEnd={handleReachEnd}
    />
  );
};
