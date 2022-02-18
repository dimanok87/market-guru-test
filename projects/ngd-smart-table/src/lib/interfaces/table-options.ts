export interface FieldOptionsInterface {
  name: string;
  label?: string;
  labelForLegend?: string;
  sort?: boolean;
  filter?: boolean;
  type?: string;
  defaultSort?: boolean;
  enable?: boolean;
}


export interface ControlOptionsInterface {
  name: 'pageSize'|'toBegin'|'toEnd'|'nextPage'|'prevPage'|'choosePage';
  label: string;
  enable: boolean;
}
