import pylrc
import jiagu
import json
import logging
import coloredlogs
import os

logger = logging.getLogger(__name__)
coloredlogs.install(level='DEBUG')

class NLP(object):
    def __init__(self):
        logger.info("Loading dataset...")
        self.freq_db = self.load_json("../data/frequency_preparation/freq.json")
        self.translation_db = self.load_json("../data/dict_preparation/dict.json")
        self.full_dict_db = self.load_json("../data/full_dict_preparation/full_dict.json")
        logger.info("Initializing jiagu...")
        self.init_jiagu(self.freq_db.keys())
        self.cache_dir = "./cache"

    def load_json(self, filename):
        with open(filename, "r") as f:
            data = json.load(f)
        return data

    def parse_lrc(self, lines):
        lrc_string = "\n".join(lines)
        subs = pylrc.parse(lrc_string)
        return subs

    def init_jiagu(self, userdict):
        jiagu.load_userdict(userdict)
        jiagu.init()
    
    def cache_exists(self, song_id):
        filename = os.path.join(self.cache_dir, str(song_id) + ".json")
        return os.path.isfile(filename)
    
    def analyze_lyrics(self, lyrics, song_id):
        filename = os.path.join(self.cache_dir, str(song_id) + ".json")
        if os.path.isfile(filename):
            logger.debug("Using cached lyrics analysis result for song {}".format(song_id))
            with open(filename, "r") as f:
                return json.load(f)
        else:
            logger.debug("No cache found, analyzing lyrics for song {}".format(song_id))
            result = self.analyze_lyrics_real(lyrics)
            with open(filename, "w+") as f:
                json.dump(result, f)
            return result
    
    def analyze_lyrics_real(self, lyrics):
        freq_db = self.freq_db
        translation_db = self.translation_db
        whitelisted_pos = ["n"]

        lyrics_info = []
        for line in lyrics:
            text = line.text
            time = line.time

            line_info = {
                "t": time,
                "words": []
            }

            logger.debug("Analyzing line {}".format(text))

            words = jiagu.seg(text)
            pos = jiagu.pos(words)

            for item in zip(words, pos):
                word, p = item

                freq = self.freq_db.get(word, -1)
                translation = self.translation_db.get(word, None)

                word_info = {
                    "w": word,
                    "p": p,
                    "f": freq,
                    "e": translation
                }
                line_info["words"].append(word_info)
            lyrics_info.append(line_info)
        return lyrics_info
    
    
    