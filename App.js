/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import Canvas from 'react-native-canvas';
import {
    Dimensions,
    PixelRatio,
    TouchableWithoutFeedback,
    View,
    StatusBar
} from 'react-native';

import Resource from './src/utils/resource';

console.disableYellowBox = true;

const {width, height} = Dimensions.get('window');
const dpi = PixelRatio.get();


let bg = null, logoImg = null, homeImg = null, btnImg = null, rankImg = null;
export default class App extends Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        StatusBar.setHidden(true);
    }

    handleCanvas = async (canvas) => {
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');

        global.canvas = canvas;
        global.ctx = ctx;

        this.clearCache();
        let resource = new Resource();
        resource.loadAll(() => {
            bg = resource.getImage('background');
            resource.drawImage(bg, 0, 0, width, height);
            logoImg = resource.getImage('logo');
            resource.drawImage(logoImg, 10, -10, logoImg.width / 2, logoImg.height / 2);
            homeImg = resource.getImage('homepage');
            resource.drawImage(homeImg, (width - homeImg.width / 2) / 2, logoImg.height / 2, homeImg.width / 2, homeImg.height / 2);
            btnImg = resource.getImage('start_btn');
            resource.drawImage(btnImg, (width - btnImg.width / 2) / 2, logoImg.height / 2 + homeImg.height / 2 + 60, btnImg.width / 2, btnImg.height / 2);
            rankImg = resource.getImage('rank_btn');
            resource.drawImage(rankImg, (width - rankImg.width / 2) / 2, logoImg.height / 2 + homeImg.height / 2 + 60 + btnImg.height / 2 + 20, rankImg.width / 2, rankImg.height / 2);
        });
    };

    clearCache = (ctx) => {
      global.ctx.clearRect(0, 0, width, height);
    };

    inArea = (e, area) => {
        let {locationX, locationY} = e.nativeEvent;
        if (locationX >= area.x && locationX <= area.x + area.width &&
            locationY >= area.y && locationY <= area.y + area.height) {
            return true;
        }
        return false;
    };

    canvasOnPress = (e) => {
        // if (this.inArea(e, btnImg)) {
        //
        // } else if (this.inArea(e, rankImg)) {
        //
        // }
    };

    render() {
        return (
            <TouchableWithoutFeedback onPress={this.canvasOnPress}>
                <View>
                    <Canvas ref={this.handleCanvas}/>
                </View>
            </TouchableWithoutFeedback>
        );
    }
}

