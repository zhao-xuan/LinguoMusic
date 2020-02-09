import csv
import json

def seplink(item):
    return item.split("\\n")[1]

def sepspace(item):
    return item.split(' ')[0]
    

csvfile = open("full_dict.tsv","r")
reader = csv.reader(csvfile, delimiter='\t')

result = {}
csv.field_size_limit(500 * 1024 * 1024)
for item in reader:
    result[sepspace(item[0])] = seplink(item[1])

with open("full_output.json", "w+") as f:
    json.dump(result, f)