import React from 'react';
import ReactDOM from 'react-dom/client';

import { SONGINFO } from './SongInfos';
import { Song } from './Song';
import { defined } from './Utils';
import { SongView } from './ReactViews/SongView';

/**
 * 楽曲リスト
 */
class SongListManager {

    /**
     * 楽曲リストを作成
     * @param {*} reactView 
     */
    constructor(reactView) {
        if (!defined(reactView)) {
            throw new Error('reactViewが未定義です。');
        }

        this.songs = [];
        this.allSongs = [];
        this.reactView = reactView;

        const viewNode = document.getElementById('song-view');
        const viewRoot = ReactDOM.createRoot(viewNode);
        this.viewRoot = viewRoot;

        this.initialize();
        this.sortByNumber();
    }

    /**
     * 初期化
     */
    initialize () {
        const songs = [];
        for (const info of SONGINFO) {
            const song = Song.fromJSON(info);
            song.manager = this;
            songs.push(song);
        }

        this.songs = songs;
        this.allSongs = songs;
    }

    /**
     * 楽曲を詳細欄に表示
     * @param {Song} song 
     */
    updateSongView (/** @type {Song} */song) {
        this.viewRoot.render(<SongView song={song} />);
    }

    /**
     * 文字列を含む楽曲のみを表示
     * @param {String|undefined} text 
     */
    search (text) {
        const songs = this.songs;
        for (const song of songs) {
            const visible
                = text
                    ? song.isSearchHitted(text)
                    : true;
            song.component.setState({ visible: visible });
        }

    }

    /**
     * 楽曲を番号でソート
     */
    sortByNumber () {
        const songs = this.songs;

        songs.sort((a, b) => {
            const aNumber = a.no || 999999;
            const bNumber = b.no || 999999;
            const result
                = aNumber > bNumber
                    ? 1
                    : aNumber < bNumber
                        ? -1
                        : 0;
            return result;
        });
    }

    /**
     * 楽曲を名前でソート
     */
    sortByName () {
        const songs = this.songs;

        songs.sort((a, b) => {
            const aName =
                a.inGameTitle
                    ? a.inGameTitle.toLowerCase()
                    : a.title.toLowerCase();
            const bName
                = b.inGameTitle
                    ? b.inGameTitle.toLowerCase()
                    : b.title.toLowerCase();
            const result
                = aName > bName
                    ? 1
                    : aName < bName
                        ? -1
                        : 0;
            return result;
        });
    }

    /**
     * 楽曲をレベルでソート
     */
    sortByLevel () {
        const songs = this.songs;
        songs.sort((a, b) => {
            const aNumber = a.level || 999999;
            const bNumber = b.level || 999999;
            const result
                = aNumber > bNumber
                    ? 1
                    : aNumber < bNumber
                        ? -1
                        : 0;
            return result;
        });
    }

}

export { SongListManager };
