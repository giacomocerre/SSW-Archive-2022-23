export interface WidgetInterface {
  icon: any;
  total: number;
  measure: string;
  title: string;
  classes?: string;
}

export interface IconInterface {
  name: string;
  size?: number;
  color?: string
  bgColor?: string;
  classes?: string;
}

export interface MessageInterface {
  type: 'error' | 'box';
  value: string;
}

export interface MenuInterface {
  items: MenuItem[];
}

export interface MenuItem {
  value: string;
  icon: IconInterface;
  label: string,
  action?: () => void;
}

export interface OpenerInterface {
  title: string;
  description: string;
}
