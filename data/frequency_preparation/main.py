import csv
import sqlite3
import json

#conn = sqlite3.connect("../data.db")
#c = conn.cursor()

result = {}

with open('freq.csv', newline='') as csvfile:
    reader = csv.reader(csvfile)

    for row in reader:
        #print(row)
        try:
            result[row[0]] = int(row[2])

            #c.execute("INSERT INTO freqs(freq, word) VALUES(?, ?)", (int(row[2]), row[0]))
        except:
            print("Warning: failed to parse row {}".format(row))


with open("freq.json", "w") as f:
    json.dump(result, f)