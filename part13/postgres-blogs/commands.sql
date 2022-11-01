CREATE TABLE blogs (
    id SERIAL PRIMARY KEY,
	author text,
    url text NOT NULL,
	title text NOT NULL,
	likes integer DEFAULT 0 NOT NULL
);

insert into blogs (author, url, title, likes) values ('Dan Luu', 'https://danluu.com/simple-architectures/', 'In defense of simple architectures', 5);
insert into blogs (author, url, title) values ('Wes Bos', 'https://wesbos.com/uses/', 'Uses');