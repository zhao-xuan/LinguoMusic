import csv
import pandas as pd
import json

def extractBR(s):
    length = len(s)
    for i in range(length):
        if s[i]=="\"" and s[i+1]==">":
            return s[i+2:length]

def extractfront(s):
    return extractBR(extractBR(s))
            
def extractback(s):
    if s=="":
        return ""
    length = len(s)
    for i in range(length):
        if s[i]=='<':
            return s[0:i]

def extractfirst(s):
    return extractback(extractfront(s))

def formlist(item):
    seplist = sepBR(item)
    #list = [extractfirst(seplist[0])]
    list = [extractback(extractBR(seplist[0]))]
    i = 1
    while (i < len(seplist)):
        list.append(extractback(extractBR(seplist[i])))
        i = i + 1
    return list 

def separate(link):
    seplist1 = []
    length = len(link)
    k = 0
    for i in range(length):
        if link[i] == ',':
            seplist1.append(link[k+1:i])
            k = i
    seplist1.append(link[k+1:length])
    return seplist1
    
def sepBR(item):
    if "<BR>/" in item:
        a = item.split("/<BR>",1)[1]
        length = len(a)
        return sepBR(a[0:length-4])
    else:
        return item

def sepBR2(item):
    a = item.split("/<BR>",1)[1]
    length = len(a)
    return sepBR(a[0:length-4])
    

def containA(item):
    return "</A>" in item

def sepA(item):
    return item.split("</A>")

def sepbracket(item):
    list = []
    for terms in item:
        a = terms.split(">",1)
        if len(a) == 2:
            list.append(a[1])
        if len(a) == 1:
            list.append(a[0])
    return list
    
def clean(item):
    list = []
    list2 = []
    for terms in item:
        if ('>' in terms):
            list.append(terms.split('>',1)[1])
        elif not (terms == '' or terms == ' '):
            list.append(terms)
    for terms in list:
        if (not ('<' in terms)) :
            list2.append(terms)
    return list2

csvfile = open("in.csv","r")
reader = csv.reader(csvfile)

result = {}
for item in reader:
    asepBR = sepBR(item[1])
    asepA = sepA(asepBR)
    asepbracket = sepbracket(asepA)
    aclean = clean(asepbracket)
    result[item[0]] = aclean
    a = str(item)
  
csvfile.close()
with open("output.json", "w+") as f:
    json.dump(result, f)

#pd.DataFrame(result).to_csv("dictionary.csv")
#print(result)

