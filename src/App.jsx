import { generateUsers } from "./utils";
import { VirtualizedList } from "./components";

const USERS_SIZE = 100;

export const App = () => {
  const users = generateUsers(USERS_SIZE);

  return (
    <VirtualizedList items={users} itemHeight={100} containerHeight={500} />
  );
};
