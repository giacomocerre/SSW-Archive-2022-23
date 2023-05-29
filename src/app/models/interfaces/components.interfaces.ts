export interface ButtonInterface {
    label: LabelInterface;
    classes?: string;
    icon?: any;
}

export interface LabelInterface{
    icon:boolean;
    value: string;
}

export interface IconInterface {
    name: string;
    size?: number;
    color?: string;
    bgColor?: string;
    classes?: string;
}

export interface InputInterface {
    placeholder: string;
    isRequired: boolean;
    icon?: IconInterface;
}

export interface MessageInterface {
    type:string;
    value: string;
    color?:string
}
export interface WidgetInterface {
    total:number;
    value: string;
    icon?:IconInterface
}