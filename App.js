/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import {
	SafeAreaView,
	StyleSheet,
	ScrollView,
	View,
	Text,
	StatusBar,
} from 'react-native';

import {
	Header,
	LearnMoreLinks,
	Colors,
	DebugInstructions,
	ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import MainContent from "./components/MainContent";

const App: () => React$Node = () => {
	return (
		<>
			<StatusBar barStyle="dark-content"/>
			<SafeAreaView>
				<ScrollView style={styles.scrollView} contentInsetAdjustmentBehavior="automatic">
					<MainContent/>
				</ScrollView>
			</SafeAreaView>
		</>
	);
};

const styles = StyleSheet.create({
	scrollView: {
		backgroundColor: Colors.lighter,
	}
});

export default App;
