--
-- PostgreSQL database dump
--

-- Dumped from database version 12.17 (Ubuntu 12.17-1.pgdg22.04+1)
-- Dumped by pg_dump version 12.17 (Ubuntu 12.17-1.pgdg22.04+1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

DROP DATABASE universe;
--
-- Name: universe; Type: DATABASE; Schema: -; Owner: freecodecamp
--

CREATE DATABASE universe WITH TEMPLATE = template0 ENCODING = 'UTF8' LC_COLLATE = 'C.UTF-8' LC_CTYPE = 'C.UTF-8';


ALTER DATABASE universe OWNER TO freecodecamp;

\connect universe

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: asteroid; Type: TABLE; Schema: public; Owner: freecodecamp
--

CREATE TABLE public.asteroid (
    asteroid_id integer NOT NULL,
    name character varying(100) NOT NULL,
    diameter_km integer,
    composition text,
    is_potentially_hazardous boolean,
    orbital_period_year integer,
    discovered_by text,
    discovery_date date,
    is_visible_from_earth boolean
);


ALTER TABLE public.asteroid OWNER TO freecodecamp;

--
-- Name: asteroid_asteroid_id_seq; Type: SEQUENCE; Schema: public; Owner: freecodecamp
--

CREATE SEQUENCE public.asteroid_asteroid_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.asteroid_asteroid_id_seq OWNER TO freecodecamp;

--
-- Name: asteroid_asteroid_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: freecodecamp
--

ALTER SEQUENCE public.asteroid_asteroid_id_seq OWNED BY public.asteroid.asteroid_id;


--
-- Name: galaxy; Type: TABLE; Schema: public; Owner: freecodecamp
--

CREATE TABLE public.galaxy (
    galaxy_id integer NOT NULL,
    volume numeric,
    mass_kg numeric,
    name character varying(30) NOT NULL,
    discovered_by text,
    is_visible_from_earth boolean
);


ALTER TABLE public.galaxy OWNER TO freecodecamp;

--
-- Name: galaxy_galaxy_id_seq; Type: SEQUENCE; Schema: public; Owner: freecodecamp
--

CREATE SEQUENCE public.galaxy_galaxy_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.galaxy_galaxy_id_seq OWNER TO freecodecamp;

--
-- Name: galaxy_galaxy_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: freecodecamp
--

ALTER SEQUENCE public.galaxy_galaxy_id_seq OWNED BY public.galaxy.galaxy_id;


--
-- Name: moon; Type: TABLE; Schema: public; Owner: freecodecamp
--

CREATE TABLE public.moon (
    moon_id integer NOT NULL,
    volume_m3 numeric,
    mass_kg numeric,
    name character varying(30) NOT NULL,
    surface_temperature_kelvin numeric,
    discovered_by text,
    is_visible_from_earth boolean,
    planet_id integer
);


ALTER TABLE public.moon OWNER TO freecodecamp;

--
-- Name: moon_moon_id_seq; Type: SEQUENCE; Schema: public; Owner: freecodecamp
--

CREATE SEQUENCE public.moon_moon_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.moon_moon_id_seq OWNER TO freecodecamp;

--
-- Name: moon_moon_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: freecodecamp
--

ALTER SEQUENCE public.moon_moon_id_seq OWNED BY public.moon.moon_id;


--
-- Name: planet; Type: TABLE; Schema: public; Owner: freecodecamp
--

CREATE TABLE public.planet (
    planet_id integer NOT NULL,
    volume_m3 numeric,
    mass_kg numeric,
    name character varying(30) NOT NULL,
    surface_temperature_kelvin numeric,
    discovered_by text,
    is_visible_from_earth boolean,
    has_rings boolean,
    star_id integer
);


ALTER TABLE public.planet OWNER TO freecodecamp;

--
-- Name: planet_planet_id_seq; Type: SEQUENCE; Schema: public; Owner: freecodecamp
--

CREATE SEQUENCE public.planet_planet_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.planet_planet_id_seq OWNER TO freecodecamp;

--
-- Name: planet_planet_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: freecodecamp
--

ALTER SEQUENCE public.planet_planet_id_seq OWNED BY public.planet.planet_id;


--
-- Name: star; Type: TABLE; Schema: public; Owner: freecodecamp
--

CREATE TABLE public.star (
    star_id integer NOT NULL,
    volume_m3 numeric,
    mass_kg numeric,
    name character varying(30) NOT NULL,
    surface_temperature_kelvin numeric,
    discovered_by text,
    is_visible_from_earth boolean,
    galaxy_id integer
);


ALTER TABLE public.star OWNER TO freecodecamp;

--
-- Name: star_star_id_seq; Type: SEQUENCE; Schema: public; Owner: freecodecamp
--

CREATE SEQUENCE public.star_star_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.star_star_id_seq OWNER TO freecodecamp;

--
-- Name: star_star_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: freecodecamp
--

ALTER SEQUENCE public.star_star_id_seq OWNED BY public.star.star_id;


--
-- Name: asteroid asteroid_id; Type: DEFAULT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.asteroid ALTER COLUMN asteroid_id SET DEFAULT nextval('public.asteroid_asteroid_id_seq'::regclass);


--
-- Name: galaxy galaxy_id; Type: DEFAULT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.galaxy ALTER COLUMN galaxy_id SET DEFAULT nextval('public.galaxy_galaxy_id_seq'::regclass);


--
-- Name: moon moon_id; Type: DEFAULT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.moon ALTER COLUMN moon_id SET DEFAULT nextval('public.moon_moon_id_seq'::regclass);


--
-- Name: planet planet_id; Type: DEFAULT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.planet ALTER COLUMN planet_id SET DEFAULT nextval('public.planet_planet_id_seq'::regclass);


--
-- Name: star star_id; Type: DEFAULT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.star ALTER COLUMN star_id SET DEFAULT nextval('public.star_star_id_seq'::regclass);


--
-- Data for Name: asteroid; Type: TABLE DATA; Schema: public; Owner: freecodecamp
--

INSERT INTO public.asteroid VALUES (1, 'Ceres', 940000, 'Rock/Ice', false, 4, 'NASA', '1801-01-01', true);
INSERT INTO public.asteroid VALUES (2, 'Vesta', 525000, 'Rock', false, 3, 'NASA', '1807-03-29', true);
INSERT INTO public.asteroid VALUES (3, 'Pallas', 512000, 'Rock', false, 4, 'NASA', '1802-03-28', true);
INSERT INTO public.asteroid VALUES (4, 'Eros', 16000, 'Nickel/Iron', true, 1, 'NASA', '1898-08-13', true);
INSERT INTO public.asteroid VALUES (5, 'Itokawa', 3000, 'Silicate', true, 1, 'JAXA', '1998-09-26', false);
INSERT INTO public.asteroid VALUES (6, 'Bennu', 500, 'Carbonaceous', true, 1, 'NASA', '1999-09-11', true);


--
-- Data for Name: galaxy; Type: TABLE DATA; Schema: public; Owner: freecodecamp
--

INSERT INTO public.galaxy VALUES (1, 1200000000000, 5600000000000000000000000000000000000, 'Andromeda', 'John Doe', true);
INSERT INTO public.galaxy VALUES (2, 350000000000, 320000000000000000000000000000000000, 'Milky Way', 'Jane Smith', true);
INSERT INTO public.galaxy VALUES (3, 400000000000, 410000000000000000000000000000000000, 'Whirlpool Galaxy', 'Albert Einstein', false);
INSERT INTO public.galaxy VALUES (4, 2200000000000, 6400000000000000000000000000000000000, 'Sombrero Galaxy', 'Isaac Newton', true);
INSERT INTO public.galaxy VALUES (5, 1700000000000, 3900000000000000000000000000000000000, 'Pinwheel Galaxy', 'Marie Curie', true);
INSERT INTO public.galaxy VALUES (6, 1000000000000, 5200000000000000000000000000000000000, 'Messier 87', 'Galileo Galilei', true);


--
-- Data for Name: moon; Type: TABLE DATA; Schema: public; Owner: freecodecamp
--

INSERT INTO public.moon VALUES (1, 5000000000000000, 500000000000000, 'Luna', 273, 'Unknown', true, 1);
INSERT INTO public.moon VALUES (2, 1200000000000000, 120000000000000, 'Phobos', 210, 'NASA', true, 2);
INSERT INTO public.moon VALUES (3, 1500000000000000, 130000000000000, 'Deimos', 200, 'NASA', true, 2);
INSERT INTO public.moon VALUES (4, 2500000000000000, 200000000000000, 'Io', 130, 'NASA', true, 4);
INSERT INTO public.moon VALUES (5, 2200000000000000, 180000000000000, 'Europa', 110, 'NASA', true, 4);
INSERT INTO public.moon VALUES (6, 1800000000000000, 160000000000000, 'Ganymede', 100, 'NASA', true, 4);
INSERT INTO public.moon VALUES (7, 1300000000000000, 120000000000000, 'Callisto', 90, 'NASA', true, 4);
INSERT INTO public.moon VALUES (8, 1000000000000000, 100000000000000, 'Titan', 94, 'NASA', true, 5);
INSERT INTO public.moon VALUES (9, 850000000000000, 85000000000000, 'Rhea', 77, 'NASA', true, 5);
INSERT INTO public.moon VALUES (10, 900000000000000, 90000000000000, 'Enceladus', 85, 'NASA', true, 5);
INSERT INTO public.moon VALUES (11, 400000000000000, 40000000000000, 'Iapetus', 65, 'NASA', true, 5);
INSERT INTO public.moon VALUES (12, 700000000000000, 70000000000000, 'Titania', 50, 'NASA', true, 6);
INSERT INTO public.moon VALUES (13, 650000000000000, 65000000000000, 'Oberon', 40, 'NASA', false, 6);
INSERT INTO public.moon VALUES (14, 600000000000000, 60000000000000, 'Miranda', 30, 'NASA', false, 6);
INSERT INTO public.moon VALUES (15, 500000000000000, 50000000000000, 'Ariel', 20, 'NASA', false, 6);
INSERT INTO public.moon VALUES (16, 300000000000000, 30000000000000, 'Umbriel', 10, 'NASA', false, 6);
INSERT INTO public.moon VALUES (17, 500000000000000, 50000000000000, 'Triton', 38, 'NASA', false, 7);
INSERT INTO public.moon VALUES (18, 400000000000000, 40000000000000, 'Proteus', 36, 'NASA', false, 7);
INSERT INTO public.moon VALUES (19, 350000000000000, 35000000000000, 'Nereid', 33, 'NASA', false, 7);
INSERT INTO public.moon VALUES (20, 250000000000000, 25000000000000, 'Charon', 40, 'NASA', false, 8);


--
-- Data for Name: planet; Type: TABLE DATA; Schema: public; Owner: freecodecamp
--

INSERT INTO public.planet VALUES (1, 8000000000000000000, 5000000000000000000000, 'Earth', 288, 'Unknown', true, false, 1);
INSERT INTO public.planet VALUES (2, 20000000000000000000, 3000000000000000000000, 'Mars', 210, 'NASA', true, false, 1);
INSERT INTO public.planet VALUES (3, 30000000000000000000, 10000000000000000000000, 'Venus', 737, 'NASA', true, true, 1);
INSERT INTO public.planet VALUES (4, 12000000000000000000, 15000000000000000000000, 'Jupiter', 165, 'NASA', true, true, 2);
INSERT INTO public.planet VALUES (5, 90000000000000000000, 70000000000000000000000, 'Saturn', 134, 'NASA', true, true, 2);
INSERT INTO public.planet VALUES (6, 40000000000000000000, 40000000000000000000000, 'Uranus', 76, 'NASA', false, true, 2);
INSERT INTO public.planet VALUES (7, 30000000000000000000, 60000000000000000000000, 'Neptune', 73, 'NASA', false, true, 2);
INSERT INTO public.planet VALUES (8, 50000000000000000000, 80000000000000000000000, 'Pluto', 44, 'NASA', false, false, 2);
INSERT INTO public.planet VALUES (9, 15000000000000000000, 15000000000000000000000, 'Proxima b', 210, 'Astronomers', true, false, 3);
INSERT INTO public.planet VALUES (10, 6000000000000000000, 1000000000000000000000, 'Kepler-22b', 200, 'NASA', true, false, 3);
INSERT INTO public.planet VALUES (11, 2000000000000000000, 800000000000000000000, 'Gliese 581g', 220, 'Astronomers', true, false, 3);
INSERT INTO public.planet VALUES (12, 10000000000000000000, 5000000000000000000000, 'Kepler-452b', 255, 'NASA', true, true, 3);


--
-- Data for Name: star; Type: TABLE DATA; Schema: public; Owner: freecodecamp
--

INSERT INTO public.star VALUES (1, 310000000, 2300000000000000000000000000000, 'Alpha Andromeda', 5778, 'Tycho Brahe', true, 1);
INSERT INTO public.star VALUES (2, 2000000000, 1400000000000000000000000000000, 'Alpha Centauri', 5800, 'Galileo Galilei', true, 2);
INSERT INTO public.star VALUES (3, 15000000000, 3600000000000000000000000000000, 'Whirlpool Star 1', 6000, 'Henrietta Swan Leavitt', false, 3);
INSERT INTO public.star VALUES (4, 5000000000, 2500000000000000000000000000000, 'Sombrero Star 1', 5600, 'Edwin Hubble', true, 4);
INSERT INTO public.star VALUES (5, 600000000, 1000000000000000000000000000000, 'Pinwheel Star 1', 5300, 'Carl Sagan', true, 5);
INSERT INTO public.star VALUES (6, 800000000, 2000000000000000000000000000000, 'Messier 87 Star', 6000, 'Stephen Hawking', true, 6);


--
-- Name: asteroid_asteroid_id_seq; Type: SEQUENCE SET; Schema: public; Owner: freecodecamp
--

SELECT pg_catalog.setval('public.asteroid_asteroid_id_seq', 6, true);


--
-- Name: galaxy_galaxy_id_seq; Type: SEQUENCE SET; Schema: public; Owner: freecodecamp
--

SELECT pg_catalog.setval('public.galaxy_galaxy_id_seq', 6, true);


--
-- Name: moon_moon_id_seq; Type: SEQUENCE SET; Schema: public; Owner: freecodecamp
--

SELECT pg_catalog.setval('public.moon_moon_id_seq', 20, true);


--
-- Name: planet_planet_id_seq; Type: SEQUENCE SET; Schema: public; Owner: freecodecamp
--

SELECT pg_catalog.setval('public.planet_planet_id_seq', 12, true);


--
-- Name: star_star_id_seq; Type: SEQUENCE SET; Schema: public; Owner: freecodecamp
--

SELECT pg_catalog.setval('public.star_star_id_seq', 6, true);


--
-- Name: asteroid asteroid_name_unique; Type: CONSTRAINT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.asteroid
    ADD CONSTRAINT asteroid_name_unique UNIQUE (name);


--
-- Name: asteroid asteroid_pkey; Type: CONSTRAINT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.asteroid
    ADD CONSTRAINT asteroid_pkey PRIMARY KEY (asteroid_id);


--
-- Name: galaxy galaxy_name_unique; Type: CONSTRAINT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.galaxy
    ADD CONSTRAINT galaxy_name_unique UNIQUE (name);


--
-- Name: galaxy galaxy_pkey; Type: CONSTRAINT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.galaxy
    ADD CONSTRAINT galaxy_pkey PRIMARY KEY (galaxy_id);


--
-- Name: moon moon_name_unique; Type: CONSTRAINT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.moon
    ADD CONSTRAINT moon_name_unique UNIQUE (name);


--
-- Name: moon moon_pkey; Type: CONSTRAINT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.moon
    ADD CONSTRAINT moon_pkey PRIMARY KEY (moon_id);


--
-- Name: planet planet_name_unique; Type: CONSTRAINT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.planet
    ADD CONSTRAINT planet_name_unique UNIQUE (name);


--
-- Name: planet planet_pkey; Type: CONSTRAINT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.planet
    ADD CONSTRAINT planet_pkey PRIMARY KEY (planet_id);


--
-- Name: star star_name_unique; Type: CONSTRAINT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.star
    ADD CONSTRAINT star_name_unique UNIQUE (name);


--
-- Name: star star_pkey; Type: CONSTRAINT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.star
    ADD CONSTRAINT star_pkey PRIMARY KEY (star_id);


--
-- Name: moon moon_planet_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.moon
    ADD CONSTRAINT moon_planet_id_fkey FOREIGN KEY (planet_id) REFERENCES public.planet(planet_id);


--
-- Name: planet planet_star_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.planet
    ADD CONSTRAINT planet_star_id_fkey FOREIGN KEY (star_id) REFERENCES public.star(star_id);


--
-- Name: star star_galaxy_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.star
    ADD CONSTRAINT star_galaxy_id_fkey FOREIGN KEY (galaxy_id) REFERENCES public.galaxy(galaxy_id);


--
-- PostgreSQL database dump complete
--

