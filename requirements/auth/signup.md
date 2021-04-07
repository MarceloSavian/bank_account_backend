# Cadastro

> ## Success

1. ✅ Receives an **POST** requisition on **/api/signup** route
2. ✅ Validates **name**, **email**, **password** and **passwordConfirmation**
3. ✅ Validates **password** and **passwordConfirmation** being equal
4. ✅ Validates field **email** for a valid email
5. ✅ **Validates** if user already exist
6. ✅ Criptographs **password**
7. ✅ **Create** an account with data provided, **replacing** for a Criptograph password 
8. ✅ Generates an session with **accesstoken** for user id
9. ✅ **Create** user session with generated token and invalidate any opened session
10. ✅ Returns **200** with access token

> ## Exceptions

1. ✅ Returns **400** if no name, email, password oe passwordConfirmation are provided
2. ✅ Returns **400** if password e passwordConfirmation are not equal
3. ✅ Returns **400** if invalid email is provided
4. ✅ Returns **403** if email is already in use
5. ✅ Returns **500** if criptography throws an error
6. ✅ Returns **500** if create account on database throws an error
7. ✅ Returns **500** if access token throws an error
8. ✅ Returns **500** if access token update on database throws an error