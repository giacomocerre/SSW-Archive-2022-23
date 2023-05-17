import { Book } from "./classes";

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
  
  //WIDGET: Single Book Interface
  export interface SingleBookInterface {
    item: Book | string;
  }