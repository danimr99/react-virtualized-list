import { scan } from "react-scan";
import { useCallback } from "react";

import { generateUsers } from "./utils";
import { UserCard, VirtualizedList } from "./components";

const USERS_SIZE = 100_000;

scan({
  enabled: import.meta.env.DEV,
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
      visibleItemsCount={3}
      renderItem={renderUserCard}
    />
  );
};
