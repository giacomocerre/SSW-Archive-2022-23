// Interfaccia che rappresenta un utente.
export interface User {
  name: string;
  surname: string;
}

//Interfaccia che rappresenta lo stato di un'entità.
export interface StatusInterface {
  value: boolean;
  message: string;
}


//Interfaccia che rapprestenta lo stato di un messaggio di risposta di un azione
export interface ActionStatusInterface {
  status: number;
  message: string;
}

// Tipo di azioni per gestire il prestito
export type LoanActions = "borrow" | "return";
