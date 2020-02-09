from flask import Flask, escape, request
import hashlib
from netease import NetEaseService
from nlp import NLP
import sqlite3

service = NetEaseService()
nlp = NLP()
app = Flask(__name__)

sqlite_conn = sqlite3.connect("data.db")
sqlite_c = sqlite_conn.cursor()


@app.route('/api/ping')
def hello():
    return {"message": "pong"}


@app.route("/api/songs/<int:song_id>")
def get_song(song_id):
    return ""

@app.route("/api/songs/<int:song_id>/lyrics")
def get_lyrics(song_id):
    result = []
    if nlp.cache_exists(song_id):
        result = nlp.analyze_lyrics(None, song_id)
    else:
        lines = service.get_song_lyrics(song_id)
        print(lines)
        parsed_lines = nlp.parse_lrc(lines)
        result = nlp.analyze_lyrics(parsed_lines, song_id)
    return {"lyrics": result}

@app.route("/api/playlists")
def get_playlists():
    return {"playlists": service.get_my_playlists()}

@app.route("/api/playlists/<int:playlist_id>")
def get_playlist(playlist_id):
    return {"id": playlist_id, "songs": service.get_playlist(playlist_id)}

@app.route("/api/user/login", methods = ["POST"])
def login():
    username = request.form.get("username")
    password = request.form.get("password")
    md5pass = hashlib.md5(password.encode("utf-8")).hexdigest()
    resp = service.autologin(username, md5pass)
    if resp:
        return {"message": "Login successful"}, 202
    else:
        return {"message": "Login failed"}, 401

@app.route("/api/user")
def login_status():
    return service.login_status()

@app.route("/api/today")
def today_review():
    pass

@app.route("/api/glossary", methods = ["GET"])
def get_glossary(word):
    result = sqlite_c.execute("SELECT word, timestamp FROM glossary ORDER BY timestamp DESC").fetch_all()
    
    resp = {"glossary": []}

    for row in result:
        word, timestamp = row
        resp["glossary"].append({
            "word": word,
            "timestamp": timestamp
        })
    
    return resp

@app.route("/api/glossary", methods = ["POST"])
def add_to_glossary():
    word = request.form.get("word")
    assert(isinstance(word, str))
    result = sqlite_c.execute("INSERT INTO glossary(word, timestamp) VALUES(?, ?)", (word, int(time.time())))
    return {"message": "success"}, 202

@app.route("/api/glossary/<string:word>", methods = ["DELETE"])
def remove_glossary(word):
    result = sqlite_c.execute("DELETE FROM glossary WHERE word=?", (word, ))
    return {"message": "success"}, 202

@app.route("/api/definition/<string:word>")
def get_definition(word):
    rank = nlp.freq_db.get(word, -1)
    quick_translation = nlp.translation_db.get(word, [])
    full_definition = nlp.full_dict_db.get(word, "Not available")
    
    count = sqlite_c.execute("SELECT COUNT(*) FROM glossary WHERE word=?", (word, )).fetchone()[0]

    return {
        "rank": rank,
        "translation": quick_translation,
        "definition": full_definition,
        "in_glossary": (count == 1)
    }

if __name__ == "__main__":
    app.run(host='0.0.0.0')