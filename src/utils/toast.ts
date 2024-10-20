import toasteventbus from 'primevue/toasteventbus';

const life = 3000;

export const toastInfo = (summary: string, detail: string) => {
  toasteventbus.emit('add', { severity: 'info', summary, detail, life });
};

export const toastWarn = (summary: string, detail: string) => {
  toasteventbus.emit('add', { severity: 'warn', summary, detail, life });
};

export const toastSuccess = (summary: string, detail: string) => {
  toasteventbus.emit('add', { severity: 'success', summary, detail, life });
};

export const toastError = (summary: string, detail: string) => {
  toasteventbus.emit('add', { severity: 'error', summary, detail, life });
};

export const toastRemoveAll = () => {
  toasteventbus.emit('remove-all-groups');
};
