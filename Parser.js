import React, {Component} from 'react';
import {View, Text, Image, StyleSheet, Linking} from "react-native";
const fetch = require('node-fetch');
const accessToken = "e3f0ae416b0dc05944120e59d71db043731a4afa";
const query = `
query MyQuery {
  user(login: "ankitd2") {
    location
    name
    createdAt
    email
    login
    bio
    avatarUrl
    websiteUrl
    followers {
      totalCount
    }
    following {
      totalCount
    }
    repositories(first: 10, privacy: PUBLIC) {
      totalCount
    }
  }
}`
;

/**
 * Parser class queries GitHub using GraphQL to get relevant data from a user
 * Fetches and handles errors with wrong access token or invalid user data
 * Parses resulting JSON for data fields and renders them to be viewed in the app
 */
class Parser extends Component {
    /**
     * Constructor for default initial state of ap
     * @param props
     */
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            result: [],
        };
    }

    /**
     * Calls the getGithubData function to fetch, store, and set the state of the results
     */
    componentDidMount() {
        this.getGithubData();
    }

    /**
     * Uses the result of the getGithubData to render the relevant information with styles and displays
     * them for the app
     * @returns {*}
     */
    render() {
        const {error, isLoaded, result} = this.state;
        let Image_Http_URL = {uri : result.avatarUrl}
        //  result = this.state.result || {}
        return (
            <View style = {[styles.userData, styles.displayText]}>
                <Image source = {Image_Http_URL} style = {{height : 150, width: 150 ,resizeMode : 'center', margin: 5, marginBottom : 40}} alignSelf = "center"/>
                <Text style = {styles.displayText}>Name : {result.name}</Text>
                <Text style = {styles.displayText}>Username : {result.login}</Text>
                <Text style = {styles.displayText}>Location : {result.location}</Text>
                <Text style = {styles.displayText}>Bio : {result.bio}</Text>
                <Text style = {styles.displayText}>Website : <Text style = {[styles.displayText, styles.displayLinkText]} onPress = {() => Linking.openURL(result.websiteUrl)}>{result.websiteUrl}</Text></Text>
                <Text style = {styles.displayText}>Email : {result.email}</Text>
                <Text style = {styles.displayText}>Created At : {new Date(result.createdAt).toString()}</Text>
                <Text style = {styles.displayText}>Followers : {result && result.followers && result.followers.totalCount}</Text>
                <Text style = {styles.displayText}>Following : {result && result.following && result.following.totalCount}</Text>
                <Text style = {styles.displayText}>Number of Public Repositories: {result && result.repositories && result.repositories.totalCount}</Text>
            </View>
        );
    }


    /**
     * Async Function to fetch GitHub data using GraphQL and stores the resulting JSON in the current state
     * Handles errors and uses accessToken for POST request
     * @returns {Promise<void>}
     */
    getGithubData = async () => {
        try {
            const response = await fetch('https://api.github.com/graphql', {
                method: 'POST',
                body: JSON.stringify({query}),
                headers: {
                    'Authorization': `Bearer ${accessToken}`,
                },
            })
            const responseJson = await response.json();

            console.log(responseJson.data.user)
            this.setState({
                result: responseJson.data.user,
                isLoaded: true,
            });
        } catch (error) {
            console.error(error)
        }
    };

}
export default Parser;

/**
 * Stylesheet used to style the information being rendered
 */
const styles = StyleSheet.create({
    userData:{
        margin : 10,
        justifyContent: 'center',
        alignContent: 'center'
    },
    displayText : {
        fontSize : 18,
        fontFamily : 'Avenir-Roman',
        marginBottom: 10
    },
    displayLinkText : {
        color: 'blue',
        textDecorationLine : 'underline'
    }

});
