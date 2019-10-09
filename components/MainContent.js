import React, {Component} from "react";
import {ActivityIndicator, BackHandler, Dimensions, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import * as WebReader from "../utils/WebReader";
import RecipeContainer from "./recipe/RecipeContainer";
import SearchList from "./search/SearchList";
import VoiceReader from "./VoiceReader";
import Log from "../utils/Log";

export default class MainContent extends Component {

	state = {
		search: null,
		recipe: null,
		loading: false
	};

	voiceReader;

	logger = new Log("MainContent");

	onVoiceRead = value => {
		this.logger.log("Voice read...");
		this.setState({
			loading: true
		});
		value = "lasagne+al+sugo";
		WebReader.search(value).then(data => {
			this.setState({
				search: data,
				loading: false
			});
		});
	};

	onSearchItemSelected = value => {
		this.logger.log("Items chosen", value);
		this.setState({
			loading: true
		});
		WebReader.recipe(value).then(data => {
			this.setState({
				recipe: data,
				loading: false
			})
		});
	};

	componentDidMount(): void {
		this.logger.log("Component did mount");

		this.voiceReader = new VoiceReader();
		this.voiceReader.start().catch(e => this.logger.error(e));
		this.voiceReader.onVoiceRead = data => {
			this.logger.log("Voice Reader...", data)
		};

		BackHandler.addEventListener('hardwareBackPress', () => {
			if (!this.state.recipe && !this.state.search) {
				this.logger.log("Exiting app...");
				BackHandler.exitApp();
				return true
			}
			this.logger.log("Clearing view...");
			if (this.state.recipe) {
				this.setState({
					recipe: null
				})
			} else {
				this.setState({
					search: null
				})
			}
			return true
		});
	}

	componentWillUnmount(): void {
		// this.voiceReader.destroy();
		BackHandler.removeEventListener("hardwareBackPress", () => {
			this.logger.log("Removing back event handler")
		})
	}

	render() {
		this.logger.log("rendering", this.state);
		if (this.state.loading) {
			return (
				<View style={styles.spinner}>
					<ActivityIndicator size="large" color="#0000ff"/>
				</View>
			)
		}
		if (!this.state.search && !this.state.recipe) {
			return (
				<View style={styles.buttonContainer}>
					<TouchableOpacity style={styles.buttonArea} onPress={this.onVoiceRead}>
						<Text style={styles.buttonText}>Start</Text>
					</TouchableOpacity>
				</View>
			)
		}
		if (this.state.recipe) {
			return (
				<View style={styles.container}>
					<View style={styles.section}>
						<RecipeContainer data={this.state.recipe}/>
					</View>
				</View>
			)
		}
		return (
			<View style={styles.container}>
				<View style={styles.section}>
					<SearchList data={this.state.search} onItemSelected={this.onSearchItemSelected.bind(this)}/>
				</View>
			</View>
		);
	}
}
const paddingStart = 20;
const paddingEnd = 20;
const styles = StyleSheet.create({
	container: {
		paddingTop: 50,
		paddingBottom: 50,
		paddingStart: paddingStart,
		paddingEnd: paddingEnd
	},
	section: {},
	spinner: {
		height: Dimensions.get("screen").height,
		justifyContent: "center"
	},
	buttonContainer: {
		height: Dimensions.get("screen").height,
		justifyContent: "flex-end",
		paddingBottom: 50,
		paddingStart: paddingStart,
		paddingEnd: paddingEnd,
	},
	buttonArea: {
		paddingTop: 40,
		paddingBottom: 40,
		alignItems: "center",
		backgroundColor: "skyblue"
	},
	buttonText: {
		color: "#fff"
	}
});
