# Request Call Hierarchy

## `DELETE /publishers/1337`

```text
server.ts
    -> app.ts
        -> routes/index.ts
            GET /

            -> routes/author.ts               /authors/*
                GET /                         /authors/
                    -> controllers/author_controller.ts@index

                GET /:authorId                /authors/:authorId
                    -> controllers/author_controller.ts@show

                POST /                        /authors
                    -> controllers/author_controller.ts@store

                PATCH /:authorId              /authors/:authorId
                    -> controllers/author_controller.ts@update

                DELETE /:authorId             /authors/:authorId
                    -> controllers/author_controller.ts@destroy

            -> routes/book.ts                 /books/*
                GET /                         /books/
                    -> controllers/book_controller.ts@index

                GET /:bookId                  /books/:bookId
                    -> controllers/book_controller.ts@show

                POST /                        /books
                    -> controllers/book_controller.ts@store

                PATCH /:bookId                /books/:bookId
                    -> controllers/book_controller.ts@update

                DELETE /:bookId               /books/:bookId
                    -> controllers/book_controller.ts@destroy

                POST /authors                 /books/:bookId/authors
                    -> controllers/book_controller.ts@addAuthor

                DELETE /authors/:authorId     /books/:bookId/authors/:authorId
                    -> controllers/book_controller.ts@removeAuthor

            -> routes/publisher.ts            /publishers/*
                GET /                         /publishers/
                    -> controllers/publisher_controller.ts@index

                GET /:publisherId             /publishers/:publisherId
                    -> controllers/publisher_controller.ts@show

                POST /                        /publishers
                    -> controllers/publisher_controller.ts@store

                PATCH /:publisherId           /publishers/:publisherId
                    -> controllers/publisher_controller.ts@update

                DELETE /:publisherId          /publishers/:publisherId
                    -> controllers/publisher_controller.ts@destroy

            /*
```
