import { faker } from "@faker-js/faker";

interface User {
  id: number;
  name: string;
}

export const users: User[] = Array.from({ length: 200 }, (_, i) => ({
  id: i + 1,
  name: faker.person.fullName(),
}));

export const fetchUsers = async (userName: string): Promise<User[]> => {
  if (!userName) return;
  return users.filter((user) =>
    user.name.toLocaleLowerCase().includes(userName.toLocaleLowerCase())
  );
};
