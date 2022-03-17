import React, {Component} from 'react';
import {View, Text, StyleSheet} from "react-native";
const fetch = require('node-fetch');

const accessToken = "e3f0ae416b0dc05944120e59d71db043731a4afa";

const query = `
query MyQuery {
  user(login: "ankitd2") {
    repositories(first: 10, privacy: PUBLIC) {
      edges {
        node {
          name
          description
          owner {
            login
          }
          
        }
      }
    }
  }
}`
;

/**
 * RepositoriesData class queries GitHub using GraphQL to get relevant data from a user's repositories
 * Fetches and handles errors with wrong access token or invalid user data
 * Parses resulting JSON for repositories array with name, description, and owner information
 */
class RepositoriesData extends Component {
    /**
     * Constructor for the component to setup initial state with empty array to be replaced with resulting JSON
     * @param props
     */
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            repos: [],
        };
    }

    /**
     * Calls getRepoData to fetch JSON from GraphQL query
     */
    componentDidMount() {
        this.getRepoData();
    }

    /**
     * Renders the repos arrays from the state of the component and iterates through the array to display
     * each repository with its name, description, and owner information
     * @returns {*}
     */
    render() {
        const {error, isLoaded, repos} = this.state;
        return (
            <View style = {[styles.userData, styles.displayText]}>
                {repos.map((item, key) => (
                    <Text style = {[styles.displayText, styles.displayTitle]}>{item && item.node && item.node.name}:{"\n"}
                        <Text style = {[styles.displayText, styles.descriptionText]}>{item && item.node && item.node.description}{"\n"}</Text>
                        <Text style = {[styles.displayText, styles.descriptionText, styles.ownerText]}>Owner - {item && item.node && item.node.owner && item.node.owner.login}</Text>
                    </Text>

                ))}
            </View>
        );

    };


    /**
     * Async method to fetch a user's public repository information from GraphQL using the query from above
     * Handles errors, and sets the state of the component with the resulting JSON object in the repos array
     * @returns {Promise<void>}
     */
    getRepoData = async () => {
        try {
            const response = await fetch('https://api.github.com/graphql', {
                method: 'POST',
                body: JSON.stringify({query}),
                headers: {
                    'Authorization': `Bearer ${accessToken}`,
                },
            })
            const responseJson = await response.json();

            console.log(responseJson.data.user.repositories.edges)
            this.setState({
                repos: responseJson.data.user.repositories.edges,
                isLoaded: true,
            });
        } catch (error) {
            console.error(error)
        }
    };
}

export default RepositoriesData;

const styles = StyleSheet.create({
    userData:{
        margin : 10,
        justifyContent: 'center',
        alignContent: 'center'
    },
    displayText : {
        fontSize : 18,
        fontFamily : 'Avenir-Roman',
        marginBottom: 25
    },
    displayTitle : {
        fontSize: 25,
        fontWeight : 'bold'
    },
    descriptionText: {
        fontWeight: 'normal'
    },
    ownerText: {
        fontStyle : 'italic'
    }

});
