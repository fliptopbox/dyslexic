NLP stuff

An experimental project to test intuitions for natural langage processing

The first idea for investiation requires the comparison of standard NLP classification, in comparison to phrase substition

# phrase substitution

A body of text is pre-processed to simplify complex phrase prior to classification, and replace colloquial abbreviations, cliches and contractions. The intention is to extract written pronouns, which have been discovered to show psycological markers of emotional state.

In addition modern abbreviations (eg WTF) and emojicons (;P) should be treated in a similat way to extract implied significance, and replaced with explicit emotion presumptive phrases (preferably an infinitive verb). :D = smile or :( sad

## pre-process
- [[cliche]] a utility to identify cliche phrases to be collapsed in to single word of singleton eg. ace up his sleeve = advantage
- [[word-contractions]] utiliy to expand contraction into integer parts eg, do'nt = do not
- [[emoji]] a utility to identify and replace hieroglyphs with infinitive verbs of phrases
- [[synonum]] and [[phononum]] colloquial abbreviations and/or synonms eg WTF, LOL or 4q (fuck you), l8r (later), 2mrw (tomorrow)


## dataset resources
- https://www.kaggle.com/c/sentiment-analysis-on-movie-reviews
- https://data.world/crowdflower/apple-twitter-sentiment/workspace/file?filename=Apple-Twitter-Sentiment-DFE.csv
- https://pubmed.ncbi.nlm.nih.gov/
