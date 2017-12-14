## Reddit_Cleaner
A chrome extension to keep only the top 3 informative comments on reddit. The informative comment is defined by a comment's extensive vocabulary and relevance to the title. The vocabulary was measured by summing a pre-trained tf-idf matrix. The relevance to title was calculated by Google's pre-trained word2vec model. Reddit_Cleaner_Extension houses the Javascript and extension code. Reddit_Cleaner_Algorithm houses the python and data science code.  NOTE this code will not run without a reddit secret_id token. Future updates Soon 2.


## Extension Architecture

The architecture is:
  1.the extension button is clicked, which tells javascript to scrape the submission ID and send it to Python. 
  2.Python uses the Reddit API: PRAW to examine most of the comments and returns the top 3 most informative comments to the javascript that the extension is running. 
  3. The javascript keeps those comments and pushes them to the top and deletes the rest of the comments.

## Motivation

I wanted to develop an extension that could increase the amount of learning and interest in the world that can prove that value can be found anywhere if you look at it with the right angle.

## Installation
Download from:
https://chrome.google.com/webstore/search/%22Reddit%20Cleaner%22?_feature=free&_category=extensionst.
