import React from "react";
import { Song } from "../Song";

/**
 * 楽曲リストのアイテム
 */
class SongItem extends React.Component {

    /**
     * 楽曲リストのアイテムを作成
     * @param {*} props 
     */
    constructor(props) {
        super(props);

        const song = this.props.song;
        song.component = this;

        this.state = {
            visible: true
        };
    }

    /**
     * URLがクリックされた際に、クリップボードにURLをコピー
     * @param {MouseEvent} e 
     * @returns 
     */
    onClickUrl (e) {
        const song = this.props.song;
        const url = song.url;

        if (!url) {
            console.warn('URLが存在しません');
            return;
        }

        if (navigator.clipboard)
            navigator.clipboard.writeText(url);
        else
            console.warn('navigator.clipboard が存在しません。');
    }

    /**
     * アイテムがクリックされた際に、上部にアイテムを表示して移動
     * @param {MouseEvent} e 
     * @returns 
     */
    onClickSong (e) {
        const song = this.props.song;
        song.view();
    }

    /**
     * ノードを描画
     * @returns 
     */
    render () {

        if (!this.state.visible) return null;

        /** @type {Song} */
        const song = this.props.song;

        const no
            = song.no
                ? song.no.toString().padStart(4, '0')
                : '----';

        const level = song.level || '-';

        const title
            = song.isGameRegistered
                ? song.inGameTitle
                : song.title;

        const category
            = song.isGameRegistered
                ? song.category
                : song.url;

        const categoryNode
            = song.isGameRegistered
                ? (<span className="category">{category}</span>)
                : getCategoryNode(category);

        const categoryClassName
            = song.isGameRegistered
                ? 'dance-category'
                : 'dance-category url';

        return (
            <div
                className="song"
                onClick={this.onClickSong.bind(this)}
            >
                <div className="song-meta">
                    <span className="no">{no}</span>
                    <span className="level">★ {level}</span>
                </div>
                <div className="original-song-info">
                    <span className="artist">{song.artist}</span>
                    <span className="title">{title}</span>
                </div>
                <div
                    className={categoryClassName}
                    onClick={song.isGameRegistered ? undefined : this.onClickUrl.bind(this)}
                >
                    {categoryNode}
                </div>
            </div>
        );
    }

}

/**
 * URLをドメインと動画IDに分離し、改行したノードを返します
 * @param {String} url 
 * @returns {JSX.IntrinsicElements.span}
 */
function getCategoryNode (url) {
    const index = url.lastIndexOf('/') + 1;
    const web = url.substring(0, index);
    const id = url.substring(index);
    const node
        = (
            <span className="category">
                {web}<br />
                {id}
            </span>
        );
    return node;
}

export { SongItem };

