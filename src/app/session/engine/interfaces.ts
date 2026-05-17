export interface dataRow {
    
}

export interface dataSub {
    [table: string]: {}
}

export interface columnsGrid {
    name: string,
    field: string,
    width: number,

    type?: "date"|"sn_ativo"|"select"|"lookup",
    options?: {[ID: string]: string},
    table?: string
}

export interface dataForm{
    label: string,
    type: "text"|"number"|"date"|"lookup"|"select"|"checkbox"|"textarea"|"subComponent"|"file",
    field: string,
    width: number,

    height?: number,
    required?: boolean,
    options?: {ID: string, DS: string}[],
    lookup?: {table: string, ID: string, DS: string[], joins?: string[]},
    autocomplete?: {type: "codigo"|"change"|"today", fill?: string[]},
    mask?: string
}

export interface subComponent {
    [table: string]: {
        subColumns: columnsGrid[],
        subForm: dataForm[]
    }
}

export interface abaForm {
    label: string,
    id: string,
    abaForm: dataForm[]
}