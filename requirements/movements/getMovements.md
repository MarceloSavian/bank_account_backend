# Make Movement

> ## Success

1. ✅ Receives an **GET** requisition on **/api/movements** route
2. ✅ Validates **x-access-token**
3. ✅ Get **accountId**
4. ✅ **Gets** user account
5. ✅ **Gets** last 20 movements
6. ✅ Returns **200** on success with last 20 movements

> ## Exceptions

1. ✅ Returns **401** if do not found user
2. ✅ Returns **500** if any throws any error