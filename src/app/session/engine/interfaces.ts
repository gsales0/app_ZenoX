export interface columnsGrid {
    name: string,
    field: string,
    width: number
}

export interface dataForm{
    label: string,
    type: string,
    field: string,
    width: number,
    height?: number,
    required: boolean,
    options?: options[],
    table?: string,
    autocomplete?: 'incluir'|'change',
}

export interface options{
    ID: string,
    DS: string
}