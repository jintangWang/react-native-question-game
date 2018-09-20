import {Platform} from 'react-native';
import images from '../data/resources';
import {Image as CanvasImage} from "react-native-canvas";
import RNFS from "react-native-fs";

export default class Resource {
    constructor() {
        this.imagesObj = {};
        this.loadedNum = 0;
    }

    _addLoadEvent(img, callback) {
        img.addEventListener('load', () => {
            this.loadedNum ++;
            if (this.loadedNum >= Object.keys(images).length) {
                callback();
            }
        });
    }

    _copyAndroidAsset(imgName, callback) {
        RNFS.copyFileAssets(imgName, `${RNFS.DocumentDirectoryPath}/imgName`).then(() => {
            callback();
        });
    }

    async loadAll(callback = () => {}) {
        for (let i in images) {
            let img = new CanvasImage(global.canvas);
            if (Platform.OS === 'ios') {
                img.src = `${RNFS.MainBundlePath}/assets/${images[i]}`;
            } else {
                img.src = `file:///android_asset/${images[i]}`;
            }
            this.imagesObj[i] = img;
            this._addLoadEvent(img, callback);
        }
    }

    getImage(imgName) {
        return this.imagesObj[imgName];
    }

    drawImage(img, x = 0, y = 0, width = 0, height = 0) {
        global.ctx.drawImage(img, x, y, width, height);
        return {
            x, y, width, height
        }
    }
}