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
    document_tsvector TSVECTOR
);

-- Create an index for the tsvector column
CREATE OR REPLACE FUNCTION securities_tsvector_update() RETURNS trigger AS $$
BEGIN
    NEW.document_tsvector :=
        setweight(to_tsvector(coalesce(NEW.symbol, '')), 'A') ||
        setweight(to_tsvector(coalesce(NEW.name, '')), 'C');
    RETURN NEW;
END
$$ LANGUAGE plpgsql;

-- Update the tsvector column anytime the 'name' or 'symbol' fields are changed
CREATE TRIGGER securities_tsvector_update BEFORE INSERT OR UPDATE
ON securities FOR EACH ROW EXECUTE FUNCTION securities_tsvector_update();