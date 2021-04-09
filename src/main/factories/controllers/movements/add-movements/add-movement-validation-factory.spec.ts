import { RequiredFieldValidation, ValidationComposite } from '@/validation/validators'
import { Validation } from '@/presentation/protocols/validation'
import { makeAddMovementValidation } from './add-movement-validation-factory'

jest.mock('../../../../../validation/validators/validation-composite')

describe('AddMovement validation', () => {
  test('Should call ValidationComposite with all validations', () => {
    makeAddMovementValidation()
    const validations: Validation[] = []

    for (const field of ['movementType', 'value']) {
      validations.push(new RequiredFieldValidation(field))
    }

    expect(ValidationComposite).toHaveBeenCalledWith(validations)
  })
})
