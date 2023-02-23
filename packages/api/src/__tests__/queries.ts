export const REGISTER = `
mutation Register($input: UserIn!) {
    register(input: $input) {
      id
      name
      surname
      password
      email
      role
      authToken
    }
}`;

export const LOGIN = `
mutation Mutation($email: String!, $password: String!) {
  login(email: $email, password: $password){
    token
    role
  }
}`;

export const CHANGE_ROLE = `
mutation ChangeRole($changeRoleId: ID!, $role: Role!) {
  changeRole(id: $changeRoleId, role: $role) {
    id
    name
    surname
    password
    email
    role
    authToken
  }
}`;

export const DELETE_USER = `
mutation Mutation($deleteUserId: ID!) {
  deleteUser(id: $deleteUserId) {
    id
    name
    surname
    password
    email
    role
    authToken
  }
}`;

export const ME = `
query Query {
  me {
    id
    name
    surname
    password
    email
    role
    authToken
  }
}`;

export const USERS = `
query Query {
  users {
    id
    name
    surname
    password
    email
    role
    authToken
  }
}
`;
