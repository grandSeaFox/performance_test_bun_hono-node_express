import postgres from "postgres";

const options = {
  host: process.env.PGHOST, // Often this needs to be the Docker service name or 'host.docker.internal'
  port: parseInt(process.env.PGPORT || "5432"),
  database: process.env.PGDATABASE,
  username: process.env.PGUSER,
  password: process.env.PGPASSWORD,
};

const sql = postgres(options);

export default sql;
