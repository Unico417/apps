import React from "react";

/**
 * 楽曲詳細を表示
 */
class SongView extends React.Component {

    /**
     * 楽曲詳細表示欄を作成
     * @param {*} props 
     */
    constructor(props) {
        super(props);

        this.state = {};
    }

    /**
     * ノードを描画
     * @returns 
     */
    render () {
        const song = this.props.song;

        const levelNode = levelStarNode(song.level);

        return (
            <div id="view-container">
                <div className="songinfo">
                    <span className="artist">{song.artist} - </span>
                    <span className="title">{song.title}</span><br />
                    <span className="inGameTitle">{song.inGameTitle}</span>
                </div>
                <div className="songno">
                    <span className="no">{song.no}</span>
                </div>
                <div className="songlevel">
                    {levelNode}
                </div>
            </div>
        );
    }
}

/**
 * 難易度を★で表したノードを作成
 * @param {Number} level 
 * @returns {JSX.IntrinsicElements.span}
 */
function levelStarNode (level) {
    let result;
    if (!level) {
        result = (<span className="level">{'★ ?'}</span>);
    } else if (level <= 2) {
        const stars = ''.padStart(level, '★');
        result = (<span className="level">{stars}</span>);
    } else {
        const n = Number.parseInt(level / 2);
        const p = Number.parseInt((level + 1) / 2);

        const u = ''.padStart(n, '★');
        const d = ''.padStart(p, '★');

        result = (
            <span className="level">{u}<br />{d}</span>
        );
    }
    return result;
}

export { SongView };

