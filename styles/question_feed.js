import {StyleSheet} from 'react-native';

const questionFeed = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
    },

    title: {
        textAlign: 'left',
        fontWeight: 'bold'
    },

    header: {
        paddingTop: 15,
        paddingBottom: 10,
        textAlign: 'center',
        marginTop: 0,
        fontWeight: 'bold',
        fontSize: 35,
    },

    description: {
        textAlign: 'left',
    },

    questionRow: {
        marginBottom: 20,
        backgroundColor: '#F5FCFF'
    },

    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },

    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
});

module.exports = {
    questionFeed: questionFeed
};
