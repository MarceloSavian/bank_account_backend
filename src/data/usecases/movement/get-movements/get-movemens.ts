import { GetMovementsRepository } from '@/data/protocols/db/movement/get-movements-repository'
import { MovementModel } from '@/domain/models/movement'
import { GetMovements } from '@/domain/usecases/movement/get-movements'

export class DbGetMovements implements GetMovements {
  constructor (
    private readonly getMovementsRepository: GetMovementsRepository
  ) {}

  async get (): Promise<MovementModel[] | null> {
    return await this.getMovementsRepository.getAll(20)
  }
}
