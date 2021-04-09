# Make Movement

> ## Success

1. ✅ Receives an **POST** requisition on **/api/movement** route
2. ✅ Validates **accountId** and **movementType** and **value**
4. ✅ **Gets** user account
4. ✅ **Validates** if the account will not be negative
6. ✅ Generates an session with **accesstoken** with user id
7. ✅ **Updates** account and adds a movement
8. ✅ Returns **200** on success

> ## Exceptions

1. ✅ Returns **400** if **accountId** or **movementType** or **value** are not provided
3. ✅ Returns **401** if do not found user
4. ✅ Returns **500** if any throws any error