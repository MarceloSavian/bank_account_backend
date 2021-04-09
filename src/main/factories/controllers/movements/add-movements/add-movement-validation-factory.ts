import { RequiredFieldValidation, ValidationComposite } from '@/validation/validators'
import { Validation } from '@/presentation/protocols/validation'

export const makeAddMovementValidation = (): ValidationComposite => {
  const validations: Validation[] = []

  for (const field of ['movementType', 'value']) {
    validations.push(new RequiredFieldValidation(field))
  }

  return new ValidationComposite(validations)
}
