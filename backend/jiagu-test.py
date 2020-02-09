import jiagu

text = '有意义'

words = jiagu.seg(text)
print(words)

# jiagu.load_userdict('dict/user.dict') # 加载自定义字典，支持字典路径、字典列表形式。
jiagu.load_userdict(['意义'])

words = jiagu.seg(text) # 自定义分词，字典分词模式有效
print(words)