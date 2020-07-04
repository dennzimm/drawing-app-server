export enum PaperSegmentTypes {
  'Point' = 'Point',
  'Segment' = 'Segment',
}

export type PaperSegmentType = keyof typeof PaperSegmentTypes;

export type PaperSegmentData = [PaperSegmentType, number[]];
