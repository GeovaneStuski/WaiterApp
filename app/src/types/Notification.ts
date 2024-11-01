export type Notification = {
  _id: string;
  order: {
    table: string;
    status: 'IN_PRODUCTION' | 'DONE';
  };
  sentAt: number;
  seen: boolean;
};