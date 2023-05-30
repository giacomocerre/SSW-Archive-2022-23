/**
 * Interfaccia che rappresenta un utente.
 */
export interface User {
  name: string;
  surname: string;
}

/**
 * Interfaccia che rappresenta lo stato di un'entità.
 */
export interface StatusInterface {
  value: boolean;
  message: string;
}

export interface ActionStatusInterface {
  status: number;
  message: string;
}
