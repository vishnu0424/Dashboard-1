export const headCells = [
    {
        headerName: "S.No",
        valueGetter: "node.rowIndex + 1"
    },
    {
        field: 'Value',
        headerName: "Value",
        sortable: true,
        filter: true,
    }
]