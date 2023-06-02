// Interfaccio Button
export interface ButtonInterface {
    label: LabelInterface;
    classes?: string;
    icon?: any;
}

// Interfaccia Label
export interface LabelInterface{
    icon:boolean;
    value: string;
}

// Interfaccia Icon
export interface IconInterface {
    name: string;
    size?: number;
    color?: string;
    bgColor?: string;
    classes?: string;
}

// Interfaccia Input
export interface InputInterface {
    placeholder: string;
    isRequired: boolean;
    icon?: IconInterface;
}
// Interfaccia Messagage
export interface MessageInterface {
    type:string;
    value: string;
    color?:string
}

// Interfacca Widget
export interface WidgetInterface {
    total:number;
    value: string;
    icon:IconInterface
}