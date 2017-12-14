#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Created on Thu Jul 27 10:30:55 2017

@author: nwolanyk
"""

from flask import *
from json import *
from flask_cors import CORS, cross_origin
#from functools import wraps
#from collections import namedtuple
import heapq
import pandas as pd
import numpy as np
import praw
import nltk
import re
import gensim
import pickle
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.feature_extraction.text import HashingVectorizer
from sklearn.feature_extraction.text import TfidfTransformer


#app = Flask(__name__)
#CORS(app)
#given a reddit Comment Object read into it
def Commentextractunclean(comment):
    comment_list = list()
    if(type(comment)!=praw.models.reddit.more.MoreComments):
        #comment_list.append(comment.body)
        [comment_list.append(word) for word in nltk.word_tokenize(comment.body.lower()) if word in model.vocab];
#        [comment_list.remove(word) for word in comment_list if word not in model.vocab];
        return comment_list
    else:
        return []

def Commentextract(comment):
    comment_list = list()
    if(type(comment)!=praw.models.reddit.more.MoreComments):
        [comment_list.append(sno.stem(word)) for word in nltk.word_tokenize(comment.body.lower()) if word not in stop]
        return comment_list
    else:
        return []



app = Flask(__name__)
app.config.from_object(__name__)
model = gensim.models.KeyedVectors.load_word2vec_format('/home/nwolanyk/Downloads/GoogleNews-vectors-negative300.bin', binary=True)  
transformer = pickle.load(open("/home/nwolanyk/Downloads/first pickle.sav", 'rb'))
#sno = nltk.stem.SnowballStemmer('english')
#stop = nltk.corpus.stopwords.words('english')
#stop1 = ['“','—','“','',',','.','...',':',';','?','/','\'','\"','\\','|','!','#','%','^','&','*','(',')','``','[',']','\'\'','\"\"']
#for ii in stop1:
#    stop.append(ii)
#del(stop1)
#stop = set(stop)
#stop = set((nltk.corpus.stopwords.words('english'),',','.',':',';','?','/','\'','\"','\\','|'))
reddit = praw.Reddit(user_agent = 'Comment Extraction (by madsci75)',
                     client_id='RAcycG5iqFM8rw', client_secret='RyiRpKdZtchA7a25EP46b00r7-o')
#subreddit = reddit.subreddit('science')
#submission2 = reddit.submission(url = 'https://www.reddit.com/r/science/comments/6qb07r/blue_light_emitted_from_digital_devices_could/')
#print(submission2.comments[0])
#CORS(app)
#cors = CORS(app, resources={r'/*': {"origins": 'chrome-extension://gpjdkbiabpbalamhjpaofdkapijdmlgh'}})

@app.route('/')
@cross_origin()
def hello():
    print(request.args.getlist('suburl')[0])
    commentlist = list()
    commentidlist = list()
    vec2list = list()
    submission = reddit.submission(url = request.args.getlist('suburl')[0])
    #commentlist = list()
    commentidlist = list()
    vec2list = list()
    rawtext4idflist = list()
    if(re.findall('AMA',submission.title)==[]):
        submission.comments.replace_more(limit=32)
        for comment in submission.comments:
            #commentlist.append(Commentextract(comment))
            commentidlist.append(comment.id)#Commentextractunclean(comment))
            #[vec2list.append(word) for word in nltk.word_tokenize(comment.body.lower()) if word in model.vocab];    
            vec2list.append(Commentextractunclean(comment))
            rawtext4idflist.append(comment.body)
            if(type(comment)==praw.models.reddit.comment.Comment):
                     for reply in comment.replies.list():
                         #commentlist.append(Commentextract(reply))
                         commentidlist.append(reply.id)#Commentextractunclean(reply))  
                         #[vec2list.append(word) for word in nltk.word_tokenize(reply.body.lower()) if word in model.vocab];                 
                         vec2list.append(Commentextractunclean(reply))
                         rawtext4idflist.append(reply.body)
    tfidf = transformer.transform(rawtext4idflist)
    tfidfsum = tfidf.sum(axis=1)
    # finished with the tfidf analysis here
    #perform the word2vec analysis
    subs2text = submission.title
    subs2vec = list()
    [subs2vec.append(word) for word in nltk.word_tokenize(subs2text.lower()) if word in model.vocab];
    #[subs2vec.append(word) for word in nltk.word_tokenize(subs2text.lower()) if word not in stop];
    #[subs2vec.remove(word) for word in subs2vec if word not in model.vocab];
    results2vec = list()
    for commentwords in vec2list:
        #print(commentwords)
        if commentwords:
            #[commentwords.remove(word) for word in commentwords if word not in model.vocab]
            #[commentwords.remove(word) for word in commentwords if word not in model.vocab]
            results2vec.append(model.wv.n_similarity(subs2vec,commentwords))
        else:
            results2vec.append(0)
    #maxvals = heapq.nlargest(3,enumerate(tfidfsum), key = lambda x:x[1])
    #maxvalsdict = dict()
    #print(maxvals)
    #print([results2vec[x[0]] for x in maxvals])
    #maxvalsdict['comment id'] = [commentidlist[x[0]] for x in maxvals]
    #print(maxvalsdict)
    lenarr = np.array([len(x) for x in vec2list], dtype = np.float)
    for ii in range(len(lenarr)):
        if lenarr[ii]!=0:
            lenarr[ii] = (lenarr[ii]/(np.mean(lenarr)+lenarr[ii]))
    test = np.array(tfidfsum)[0]*np.array(results2vec)*lenarr
    #plt.hist(test)
    maxvals = heapq.nlargest(3,enumerate(test), key = lambda x:x[1])
    #maxvalsdict = dict()
    #maxvalsdict['comment id'] = [commentlistcheck[x[0]] for x in maxvals]
    [print(rawtext4idflist[x[0]]) for x in maxvals]
    maxvalsdict = dict()
    print(maxvals)
    #print([results2vec[x[0]] for x in maxvals])
    transfer = [rawtext4idflist[x[0]] for x in maxvals]
    for ii in range(3):
            maxvalsdict['id'+str(ii)] = transfer[ii]
    #maxvalsdict['comment id'] = [commentidlist[x[0]] for x in maxvals]
    #print(maxvalsdict)
    jsonResp = {'jack': maxvals[0][0], 'sape': request.args.getlist('suburl')[0]}
    return(jsonify(maxvalsdict))

app.run(debug = True)