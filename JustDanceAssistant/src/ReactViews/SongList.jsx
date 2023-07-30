import React from "react";

import { SongListManager } from '../SongListManager';
import { SongItem } from "./SongItem";

/**
 * 楽曲リストを表示
 */
class SongList extends React.Component {

    /**
     * 楽曲リストを作成
     * @param {*} props 
     */
    constructor(props) {
        super(props);

        this.manager = new SongListManager(this);

        this.state = {
            songs: this.manager.songs,
            search: '',
        };
    }

    /**
     * 検索欄の文字列で一致する楽曲のみ表示
     * @param {*} e 
     */
    onSearch (e) {
        const text = e.target.value;
        this.manager.search(text);
        this.setState(
            { search: text }
        );
    }

    /**
     * 押されたボタンの要素でソート
     * @param {*} e 
     */
    onSort (e) {
        const sortButtons = document.getElementById('sort-button');
        const buttons = sortButtons.getElementsByTagName('button');
        for (const button of buttons) {
            button.classList.remove('active');
        }

        const target = e.target;
        target.classList.add('active');

        switch (target.value) {
            case 'songSortsWithNumber':
                this.manager.sortByNumber();
                break;
            case 'songSortsWithName':
                this.manager.sortByName();
                break;
            case 'songSortsWithLevel':
                this.manager.sortByLevel();
                break;
            default:
        }

        this.setState({ songs: this.manager.songs });
    }

    /**
     * ノードを描画
     * @returns 
     */
    render () {
        const songs = this.state.songs;
        return (
            <div>
                <div id="song-list-head">
                    <div id="sort-button">
                        <button
                            className="active"
                            onClick={this.onSort.bind(this)}
                            value={'songSortsWithNumber'}>No.</button>
                        <button
                            onClick={this.onSort.bind(this)}
                            value={'songSortsWithName'}>名前</button>
                        <button
                            onClick={this.onSort.bind(this)}
                            value={'songSortsWithLevel'}>レベル</button>
                    </div>
                    <div id="search">
                        <input type="text"
                            onChange={this.onSearch.bind(this)} />
                    </div>
                </div>
                <div id="song-items">
                    {songs.map((song) => {
                        return (
                            <SongItem
                                key={song.id}
                                song={song}
                            />);
                    })}
                </div>
            </div>
        );
    }

}

export { SongList };

