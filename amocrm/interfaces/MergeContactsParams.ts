
export interface MergeContactsParams {
  companyId: number;
  contactIds: number[];
  baseContactId: number;
  baseContactName: string;
  leadIds: number[];
  responsibleUserId: number;
  cfv: {
    position: {id: number, value: string},
    phones: {id: number, values: string[]},
    emails: {id: number, values: string[]},
  };
}
