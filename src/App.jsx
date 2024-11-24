import { generateUsers } from "./utils";
import { UserCard, VirtualizedList } from "./components";
import { useCallback } from "react";

const USERS_SIZE = 100;

export const App = () => {
  const users = generateUsers(USERS_SIZE);

  const renderUserCard = useCallback(
    (user) => <UserCard key={user.id} {...user} />,
    []
  );

  return (
    <VirtualizedList
      items={users}
      itemHeight={100}
      containerHeight={500}
      renderItem={renderUserCard}
    />
  );
};
