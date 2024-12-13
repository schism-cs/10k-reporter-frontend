import { View, Page, Text, StyleSheet } from "@react-pdf/renderer";

const styles = StyleSheet.create({
    pageStyle: {
        paddingTop: 16,
        paddingHorizontal: 40,
        paddingBottom: 56
    },

    tableStyle: {
        width: "auto"
    },

    tableRowStyle: {
        flexDirection: "row"
    },

    firstTableColHeaderStyle: {
        width: "20%",
        borderStyle: "solid",
        borderColor: "#000",
        borderBottomColor: "#000",
        borderWidth: 1,
        backgroundColor: "#bdbdbd"
    },

    tableColHeaderStyle: {
        width: "20%",
        borderStyle: "solid",
        borderColor: "#000",
        borderBottomColor: "#000",
        borderWidth: 1,
        borderLeftWidth: 0,
        backgroundColor: "#bdbdbd"
    },

    firstTableColStyle: {
        width: "20%",
        borderStyle: "solid",
        borderColor: "#000",
        borderWidth: 1,
        borderTopWidth: 0
    },

    tableColStyle: {
        width: "20%",
        borderStyle: "solid",
        borderColor: "#000",
        borderWidth: 1,
        borderLeftWidth: 0,
        borderTopWidth: 0
    },

    tableCellHeaderStyle: {
        textAlign: "center",
        margin: 4,
        fontSize: 12,
        fontWeight: "bold"
    },

    tableCellStyle: {
        textAlign: "center",
        margin: 5,
        fontSize: 10
    },
})


/* 
    | Category | Cost |
    | --- | --- |
    | Operations | $5 billion |
    | Marketing | $2 billion |
    | Research and Development | $1 billion |
    | General and Administrative | $500 million |
    | Total | $8.5 billion | 
*/

const TableDocument = (props: { tableContent: string }) => {

    const getHeader = () => {
        const lines = props.tableContent.split("\n")
        return lines[0].split("|").slice(1, -1)
    }

    const getRows = () => {
        const lines = props.tableContent.split("\n")
        const filteredLines = lines.filter(line => !line.includes("---"))
        const splitted = filteredLines.map(line => line.split("|").slice(1, -1))
        return splitted
    }

    const createTableHeader = () => {
        return (
            <View style={styles.tableRowStyle} fixed>
                {getHeader().map(headerCol => (
                    <View style={styles.tableColHeaderStyle}>
                        <Text style={styles.tableCellHeaderStyle}>{headerCol}</Text>
                    </View>
                ))}
            </View>
        );
    };

    const createTableRow = (line: string[]) => {
        return (
            <View style={styles.tableRowStyle}>
                {line.map(rowCell => (
                    <View style={styles.firstTableColStyle}>
                        <Text style={styles.tableCellStyle}>{rowCell}</Text>
                    </View>
                ))}
            </View>
        );
    };

    return (
        <View style={styles.tableStyle}>
            {createTableHeader()}
            {getRows().map(row => createTableRow(row))}
        </View>
    );

};



export default TableDocument;