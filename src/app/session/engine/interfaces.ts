export interface dataRow {
    
}

export interface dataSub {
    [table: string]: {}
}

export interface columnsGrid {
    name: string,
    field: string,
    width: number,

    type?: "date"|"sn_ativo"|"select",
    options?: {[ID: string]: string}
}

export interface dataForm{
    label: string,
    type: string,
    field: string,
    width: number,

    height?: number,
    required?: boolean,
    options?: {ID: string, DS: string}[],
    lookup?: {table: string, ID: string, DS: string[]},
    autocomplete?: 'codigo'|'change',
}

export interface subComponent {
    [table: string]: {
        subColumns: columnsGrid[],
        subForm: dataForm[]
    }
}