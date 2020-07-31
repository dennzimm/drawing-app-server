import { Injectable } from '@nestjs/common';
import { isEmpty, isJSON } from 'class-validator';
import { Kind, ValueNode } from 'graphql';

type Validator = (value: unknown) => boolean;

@Injectable()
export class PaperDataHelper<T> {
  private static readonly JSON_TYPE_ERROR =
    'Given data cannot represent an invalid JSON-String';
  private static readonly INVALID_PAPER_DATA_ERROR =
    'Given data cannot represent invalid PaperData';

  private static readonly DEFAULT_VALIDATOR = (value: unknown): boolean =>
    value ? true : false;

  parse(
    value: string,
    // validate: Validator = PaperDataHelper.DEFAULT_VALIDATOR,
  ): T {
    // if (!isJSON(value) || isEmpty(value)) {
    //   throw new TypeError(PaperDataHelper.JSON_TYPE_ERROR);
    // }

    // let parsedData;
    try {
      return JSON.parse(value);
    } catch (err) {
      throw new TypeError(PaperDataHelper.JSON_TYPE_ERROR);
    }

    // validate(parsedData);

    // return parsedData;
  }

  serialize(
    value: T,
    // validate: Validator = PaperDataHelper.DEFAULT_VALIDATOR,
  ): string {
    // if (!isArray(value)) {
    //   throw new TypeError(PaperDataHelper.INVALID_PAPER_DATA_ERROR);
    // }

    // validate(value);

    // const serializedData = JSON.stringify(value);
    return JSON.stringify(value);

    // return serializedData;
  }

  parseLiteral(
    ast: ValueNode,
    validate: Validator = PaperDataHelper.DEFAULT_VALIDATOR,
  ): T {
    if (isEmpty(ast.kind) || ast.kind !== Kind.STRING || !isJSON(ast.kind)) {
      throw new TypeError(PaperDataHelper.JSON_TYPE_ERROR);
    }

    validate(ast.kind);

    return this.parse(ast.kind);
  }

  // validateDrawingData(value: PaperDrawingData): boolean {
  //   const isValid =
  //     !isEmpty(value) &&
  //     isArray(value) &&
  //     arrayMinSize(value, 1) &&
  //     value.every(v => isArray(v) && arrayContains(v, ['Layer']));

  //   if (!isValid) {
  //     throw new TypeError(
  //       PaperDataHelper.INVALID_PAPER_DATA_ERROR + ': Only Layers are allowed',
  //     );
  //   }

  //   return isValid;
  // }

  // validateItemData(value: PaperItemData): boolean {
  //   const isValid =
  //     !isEmpty(value) &&
  //     isArray(value) &&
  //     arrayMinSize(value, 2) &&
  //     Object.keys(PaperItemTypes).some(t => value[0] === t);

  //   if (!isValid) {
  //     throw new TypeError(
  //       PaperDataHelper.INVALID_PAPER_DATA_ERROR + ': Only Items are allowed',
  //     );
  //   }

  //   return isValid;
  // }

  // validateSegmentData(value: PaperSegmentData): boolean {
  //   const isValid =
  //     !isEmpty(value) &&
  //     isArray(value) &&
  //     arrayMinSize(value, 2) &&
  //     Object.keys(PaperSegmentTypes).some(t => value[0] === t);

  //   if (!isValid) {
  //     throw new TypeError(
  //       PaperDataHelper.INVALID_PAPER_DATA_ERROR + ': Only Segment is allowed',
  //     );
  //   }

  //   return isValid;
  // }
}
