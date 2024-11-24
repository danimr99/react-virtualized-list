import "../docs";

/**
 * Generates an array of users with the given size.
 *
 * @function generateUsers
 * @param {number} size - The number of users to generate.
 * @param {number} [offset=0] - The starting index of the users.
 * @returns {User[]} An array of users.
 *
 * @example
 * const users = generateUsers(3);
 * console.log(users);
 */
export const generateUsers = (size, offset = 0) => {
  return Array.from({ length: size }, (_, index) => {
    const userId = index + 1 + (offset || 0);

    return {
      id: userId,
      name: `User ${userId}`,
      email: `user${userId}@mail.com`,
    };
  });
};
