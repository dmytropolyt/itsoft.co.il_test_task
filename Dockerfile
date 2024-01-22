FROM python:3.11-alpine

ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

COPY ./limit_book /limit_book
COPY ./requirements.txt /tmp/requirements.txt

WORKDIR /limit_book

RUN python -m venv /py && \
    /py/bin/pip install --upgrade pip && \
    apk add --update --no-cache postgresql-client jpeg-dev && \
    apk add --update --no-cache --virtual .tmp-build-deps \
      build-base gcc postgresql-dev musl-dev zlib zlib-dev linux-headers && \
    /py/bin/pip install --no-cache-dir -r  /tmp/requirements.txt && \
    rm -rf /tmp && \
    apk del .tmp-build-deps

COPY ./entrypoint.sh /entrypoint.sh

RUN sed -i 's/\r$//g' /entrypoint.sh
RUN chmod +x /entrypoint.sh

ENV PATH="/scripts:/py/bin:$PATH"


ENTRYPOINT ["/entrypoint.sh"]