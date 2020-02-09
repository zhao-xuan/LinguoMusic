from NEMbox.api import NetEase
from NEMbox.storage import Storage
import hashlib

class NetEaseService(object):
    def __init__(self):
        self.api = NetEase()
        self.storage = Storage()
        self.storage.load()
        self.collection = self.storage.database['collections']
        self.autologin()
    
    @property
    def user(self):
        return self.storage.database['user']
    
    @property
    def account(self):
        return self.user['username']
    
    @property
    def md5pass(self):
        return self.user['password']
    
    @property
    def userid(self):
        return self.user['user_id']

    @property
    def username(self):
        return self.user['nickname']
    
    def autologin(self, _account = None, _md5pass = None):
        if _account is not None and _md5pass is not None:
            account, md5pass = _account, _md5pass
        elif self.account and self.md5pass:
            account, md5pass = self.account, self.md5pass
        else:
            return False

        resp = self.api.login(account, md5pass)
        print(resp)
        if resp['code'] == 200:
            userid = resp['account']['id']
            nickname = resp['profile']['nickname']
            self.storage.login(account, md5pass, userid, nickname)
            self.storage.save()
            return True
        else:
            self.storage.logout()
            return False
    
    def login_status(self):
        result = {
            "logged_in": True,
            "username": self.username,
            "id": self.userid
        }

        if not self.account or not self.md5pass:
            result["logged_in"] = False
        
        return result
    
    def request_api(self, func, *args):
        result = func(*args)
        if result:
            return result
        if not self.autologin():
            raise Exception("You need to log in")
            return False
        return result
    
    def get_my_playlists(self):
        playlists = self.request_api(self.api.user_playlist, self.userid)
        return self.api.dig_info(playlists, "playlists")
    
    def get_playlist(self, playlist_id):
        songs = self.api.playlist_detail(playlist_id)
        return self.api.dig_info(songs, "songs")
    
    def get_song(self):
        pass
    
    def get_song_lyrics(self, song_id):
        return self.api.song_lyric(song_id)


