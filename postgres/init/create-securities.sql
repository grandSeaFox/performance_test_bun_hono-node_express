CREATE OR REPLACE FUNCTION immutable_to_tsvector(varchar) RETURNS tsvector
IMMUTABLE LANGUAGE SQL AS $$
SELECT to_tsvector('english', $1);
$$;

CREATE TABLE securities (
    id SERIAL PRIMARY KEY,
    symbol VARCHAR(255) UNIQUE NOT NULL,
    name VARCHAR(255),
    exchange VARCHAR(255) NOT NULL,
    asset_type VARCHAR(255) NOT NULL,
    ipo_date DATE NOT NULL,
    delisting_date DATE,
    status VARCHAR(255),
    country VARCHAR(255),
    sector VARCHAR(255),
    industry VARCHAR(255),
    tsv TSVECTOR GENERATED ALWAYS AS (
        setweight(immutable_to_tsvector(coalesce(symbol, '')), 'A') ||
        setweight(immutable_to_tsvector(coalesce(name, '')), 'C')
    ) STORED
);

CREATE INDEX idx_securities_tsv ON securities USING gin (tsv);