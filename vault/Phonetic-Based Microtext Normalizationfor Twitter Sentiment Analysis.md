# Phonetic-Based Microtext Normalizationfor Twitter Sentiment
https://sentic.net/microtext-normalization.pdf

Analysis Ranjan Satapathy, Claudia Guerreiro, Iti Chaturvedi, Erik Cambria
Nanyang Technological University50 Nanyang Ave, 639798, Singapore
Email: {satapathy.ranjan,claudiaguerreiro,iti,cambria}@ntu.edu.sg

> Abstract—The proliferation of Web 2.0 technologies and the increasing use of computer-mediated communication resultedin a new form of written text, termed microtext. This poses new challenges to natural language processing tools which areusually designed for well-written text. This paper proposes aphonetic-based framework for normalizing microtext to plain English and, hence, improve the classification accuracy of sentiment analysis. Results demonstrated that there is a high(\>0.8) similarity index between tweets normalized by ourmodel and tweets normalized by human annotators in 85.31%of cases, and that there is an accuracy increase of\>4% interms of polarity detection after normalization. Index Terms—Text normalization, Error correction, Microtextanalysis, Sentiment analysis, Twitter.

## 2. Related Work
This section disusesses microtext analysis, spelling correction, machine translation and automatic speech recognition (ASR), their repective pros and cons, and citations.

## 3. Proposed Model
This section proposed three approaches to normalisation of inlput,and the ways to resolve the complexities of human authoring, is that it is erroneous, and overtly stylised by colloquialisms.

- replacement of emotions with in-vocabulary words/phrases
- psuedo phonetic based "interpretations" for normalisation
- the use of emotional state to infer polarity, as a challenge to the typical syntactic vs occurance methods, with the objective to resolve ambiguity - for example in the use of contradictions in paradox or [[oxymoron]]  like "terribly happy". (As used by SentiNet)