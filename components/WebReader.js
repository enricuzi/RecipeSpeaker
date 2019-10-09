import React, {Component} from 'react';
import {StyleSheet, View, Text} from 'react-native';
import WebArticle from "./WebArticle";

export default class WebReader extends Component {

	render() {
		console.log("WebReader", "rendering");
		if (this.props.data) {
			return (
				<View>
					{/*<WebView source={{uri: 'https://www.misya.info/ricetta/sformato-di-zucchine.htm'}}*/}
					{/*		 onLoadEnd={event => {this.fetchData('https://www.misya.info/ricetta/sformato-di-zucchine.htm')}}/>*/}
					{
						this.props.data.map((item, index) => {
							return (
								<React.Fragment key={index}>
									<WebArticle text={item.text} image={item.image}/>
								</React.Fragment>
							)
						})
					}
				</View>
			)
		}
		return (
			<View>
				<Text>Nessuna ricetta caricata...</Text>
			</View>
		)
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1
	}
});
