import { SongListManager } from "./SongListManager";
import { defined, uid } from "./Utils";

class Song {

    constructor(
        no,
        title,
        artist,
        category,
        inGameTitle,
        url,
        level
    ) {
        /** @type {String} 管理用ID */
        this.id = uid();

        /** @type {Number|undefined} 楽曲ナンバー */
        this.no
            = no
                ? Number.parseInt(no)
                : undefined;

        /** @type {String|undefined} 楽曲タイトル */
        this.title = title;

        /** @type {String|undefined} 楽曲アーティスト名 */
        this.artist = artist;

        /** @type {String|undefined} ゲーム内のカテゴリ */
        this.category = category;

        /** @type {String|undefined} ゲーム内の楽曲名 */
        this.inGameTitle = inGameTitle || title;

        /** @type {String|undefined} 楽曲のURL */
        this.url = url;

        /** @type {Number|undefined} 楽曲の難易度 */
        this.level = level;

        /** @type {Boolean} 楽曲ゲーム内に登録されているか */
        this.isGameRegistered =
            !((inGameTitle === undefined)
                && defined(url)
                && !defined(category));

        /** @type {SongListManager} */
        this.manager = undefined;

        this.component = undefined;
    }

    view () {
        this.manager.updateSongView(this);
    }

    /**
     * 検索文字列にいずれかの要素が含まれていればtrueを返す
     * @param {String} text 
     * @returns 
     */
    isSearchHitted (text) {

        let result = false;

        if (this.inGameTitle) {
            result ||= this.inGameTitle.toLowerCase().includes(text);
        }

        if (this.no) {
            result ||= this.no.toString().includes(text);
        }

        if (this.category) {
            result ||= this.category.toLowerCase().includes(text);
        }

        result ||= this.title.toLowerCase().includes(text);

        return !!result;
    }

    static fromJSON (songInfo) {
        const no = songInfo.no;
        const artist = songInfo.artist;
        const title = songInfo.title;
        const category = songInfo.category;
        const url = songInfo.url;
        const level = songInfo.level;
        const inGameTitle = songInfo.inGameTitle;

        const song = new Song(
            no,
            title,
            artist,
            category,
            inGameTitle,
            url,
            level
        );

        return song;
    }
}

export { Song };
