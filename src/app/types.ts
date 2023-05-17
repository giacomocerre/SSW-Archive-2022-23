// ****** 1. COMPONENTS INTERFACES ******

//ICON: Icon Interface
export interface IconInterface {
  classes?: string;
  name: string;
  width?: number;
  height?: number;
  color?: string;
  bgColor?: string;
}

//WIDGET: Widget Interface
export interface WidgetInterface {
  icon?: IconInterface;
  total: number;
  measure: string;
  title: string;
  classes?: string;
}

// ****** 2. DATA TYPE INTERFACES ******

export interface ArchiveInterface {
  books: BookInterface[];
}

export interface BookInterface {
  position: string;
  author: string;
  title: string;
  onLoan: boolean;
  user?: UserInterface;
  date?: Date;
}

export interface UserInterface {
  name: string;
  surname: string;
}
