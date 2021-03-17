CREATE TABLE TRIPS (
   Trip_id integer NOT NULL,
   Trip_date DATE,
   Trip_amt decimal(10,2),
   Driver_id integer,
   Usr_id integer,
   Taxi_id integer,
   Start_time TIMESTAMP,
   End_time TIMESTAMP,
   PRIMARY KEY (Trip_id)
);

CREATE TABLE TRANSACTION_DETAILS (
   Bill_no integer NOT NULL,
   Bill_date DATE,
   Trip_amt decimal(10,2),
   Tax_amt decimal(10,2),
   Total_amt decimal(10,2),
   Usr_id integer,
   Trip_id integer,
   PRIMARY KEY (Bill_no),
   UNIQUE (Trip_id)
);
