FROM orchardup/python:2.7
RUN pip install Flask
RUN pip install pymongo
ADD . /src
WORKDIR /src
CMD python index.py