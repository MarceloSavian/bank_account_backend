# Make Movement

> ## Success

1. ✅ Receives an **POST** requisition on **/api/movements** route
2. ✅ Validates **x-access-token**
3. ✅ Validates **accountId** and **movementType** and **value**
4. ✅ **Gets** user account
5. ✅ **Validates** if the account will not be negative
6. ✅ **Updates** account and adds a movement
7. ✅ Returns **200** on success

> ## Exceptions

1. ✅ Returns **400** if **accountId** or **movementType** or **value** are not provided
2. ✅ Returns **401** if do not found user
3. ✅ Returns **500** if any throws any error