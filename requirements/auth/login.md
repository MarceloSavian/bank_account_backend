# Login

> ## Success

1. ⛔️ Receives an **POST** requisition on **/api/login** route
2. ⛔️ Validates **email** and **password**
3. ⛔️ Validates field **email** for a valid email
4. ⛔️ **Search** user with email provided
4. ⛔️ **Validates** password
6. ⛔️ Generates an session with **accesstoken** with user id
7. ⛔️ **Updates** token and creates an session
8. ⛔️ Returns **200** with access token and user data

> ## Exceptions

1. ⛔️ Returns **400** if email or password are not provided
2. ⛔️ Returns **400** if email is invalid
3. ⛔️ Returns **401** if do not found user
4. ⛔️ Returns **500** if access token throws an error
5. ⛔️ Returns **500** if access token update on database throws an error