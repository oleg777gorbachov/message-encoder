export interface ModalI {
  state: boolean;
  closeAction: () => void;
  children: React.ReactNode;
}
