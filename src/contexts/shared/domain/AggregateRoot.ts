export abstract class AggregateRoot<AggregateRootPrimitives> {
  abstract toPrimitives(): AggregateRootPrimitives
}
