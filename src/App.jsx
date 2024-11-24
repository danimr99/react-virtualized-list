import { generateUsers } from "./utils";
import { UserCard, VirtualizedList } from "./components";
import { useCallback } from "react";

const USERS_SIZE = 100_000;

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
