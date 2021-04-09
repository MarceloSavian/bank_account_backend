export class QueryBuilder {
  private readonly query: object[] = []

  unwind (data: object): QueryBuilder {
    this.query.push({
      $unwind: data
    })
    return this
  }

  sort (data: object): QueryBuilder {
    this.query.push({
      $sort: data
    })
    return this
  }

  limit (data: number): QueryBuilder {
    this.query.push({
      $limit: data
    })
    return this
  }

  project (data: object): QueryBuilder {
    this.query.push({
      $project: data
    })
    return this
  }

  lookup (data: object): QueryBuilder {
    this.query.push({
      $lookup: data
    })
    return this
  }

  build (): object[] {
    return this.query
  }
}
