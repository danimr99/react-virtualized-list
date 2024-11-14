import "../docs";

/**
 * Generates an array of users with the given size.
 *
 * @function generateUsers
 * @param {number} size - The number of users to generate.
 * @returns {User[]} An array of users.
 *
 * @example
 * const users = generateUsers(3);
 * console.log(users);
 */
export const generateUsers = (size) => {
  return Array.from({ length: size }, (_, index) => {
    const userId = index + 1;

    return {
      id: userId,
      name: `User ${userId}`,
      email: `user${userId}@mail.com`,
    };
  });
};
