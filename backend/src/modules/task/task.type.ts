export interface ITaskCreate {
  title: string;
  description?: string; // optional
  completed?: boolean;
  userId: string;
}


export interface ITaskUpdate {
  title: string;
  description?: string; // optional
  completed?: boolean;
}
