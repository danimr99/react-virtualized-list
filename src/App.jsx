import { generateUsers } from "./utils";

const USERS_SIZE = 100;

export const App = () => {
  const users = generateUsers(USERS_SIZE);

  return <div>{JSON.stringify(users, null, 2)}</div>;
};
