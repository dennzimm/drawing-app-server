import { CustomScalar, Scalar } from '@nestjs/graphql';
import { Kind } from 'graphql';

/**
 * A GraphQL object type has a name and fields, but at some point those
 * fields have to resolve to some concrete data. That's where the scalar
 * types come in: they represent the leaves of the query (read more here).
 * GraphQL includes the following default types: Int, Float, String, Boolean
 * and ID. In addition to these built-in types, you may need to support
 * custom atomic data types (e.g., Date).
 *
 * (see https://docs.nestjs.com/graphql/scalars#scalars)
 *
 * @export
 * @class DateScalar
 * @implements {CustomScalar<string, Date>}
 */
@Scalar('Date', (type) => Date)
export class DateScalar implements CustomScalar<string, Date> {
  description = 'Date custom scalar type';

  parseValue(value: string): Date {
    // value from the client
    return new Date(value);
  }

  serialize(value: Date): string {
    // value sent to the client
    return new Date(value).toISOString();
  }

  parseLiteral(ast: any): Date {
    if (ast.kind === Kind.INT) {
      return new Date(ast.value);
    }
    return null;
  }
}
