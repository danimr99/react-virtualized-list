import { scan } from "react-scan";
import { useCallback } from "react";

import { generateUsers } from "./utils";
import { UserCard, VirtualizedList } from "./components";

const USERS_SIZE = 100_000;

scan({
  enabled: false, // <-- Enable React Scan feature
  alwaysShowLabels: true,
  log: true,
});

export const App = () => {
  const users = generateUsers(USERS_SIZE);

  const renderUserCard = useCallback(
    (user, ref) => <UserCard ref={ref} key={user.id} {...user} />,
    []
  );

  return (
    <VirtualizedList
      items={users}
      visibleItemsCount={5}
      renderItem={renderUserCard}
    />
  );
};
