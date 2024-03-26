import { StyleSheet } from "react-native";

export const styles = StyleSheet.create ({
    container: {
        marginTop: 100    ,
        padding: 15
    },
    button: {
        backgroundColor: '#007bff',  // Default blue color
        borderRadius: 5,             // Slightly rounded corners
        padding: 10,                 // Padding within the button
        margin: 10,                  // Spacing around the button
        alignItems: 'center',        // Center the text 
    },
    buttonText: { 
        color: 'white',
        fontWeight: 'bold',
    },
    revealedWord: {
        fontSize: 24,
        fontWeight: 'bold',
        marginTop: 20
    },
    header: {
        fontSize: 20,
        fontWeight: "bold",
        textAlign: "center"
    },
    match: {
        color: "green",
        padding: 2,
    },
    title: {
        fontWeight: "bold",
        fontSize: 15,
        textAlign: "center"
    },
    refresh: {
        padding: 10,                  // Padding within the button
        margin: 10,                   // Spacing around the button
        alignItems: 'center',
        height: 50         // Align items (text) vertically
      },
    img: {
        width: 18,
        height: 18,
    },
    headerco: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
    }
})