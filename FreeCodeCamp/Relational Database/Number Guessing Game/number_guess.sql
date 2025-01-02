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

DROP DATABASE number_guess;
--
-- Name: number_guess; Type: DATABASE; Schema: -; Owner: freecodecamp
--

CREATE DATABASE number_guess WITH TEMPLATE = template0 ENCODING = 'UTF8' LC_COLLATE = 'C.UTF-8' LC_CTYPE = 'C.UTF-8';


ALTER DATABASE number_guess OWNER TO freecodecamp;

\connect number_guess

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
-- Name: guess_info; Type: TABLE; Schema: public; Owner: freecodecamp
--

CREATE TABLE public.guess_info (
    username character varying(22),
    games_played integer,
    best_game integer
);


ALTER TABLE public.guess_info OWNER TO freecodecamp;

--
-- Data for Name: guess_info; Type: TABLE DATA; Schema: public; Owner: freecodecamp
--

INSERT INTO public.guess_info VALUES ('user_1735839219889', 3, 4);
INSERT INTO public.guess_info VALUES ('user_1735839219890', 6, 104);
INSERT INTO public.guess_info VALUES ('user_1735839223071', 3, 431);
INSERT INTO public.guess_info VALUES ('user_1735839223072', 6, 171);
INSERT INTO public.guess_info VALUES ('user_1735839225254', 3, 479);
INSERT INTO public.guess_info VALUES ('user_1735839225255', 6, 134);
INSERT INTO public.guess_info VALUES ('user_1735839227447', 3, 336);
INSERT INTO public.guess_info VALUES ('user_1735839227448', 6, 59);
INSERT INTO public.guess_info VALUES ('user_1735839332821', 3, 367);
INSERT INTO public.guess_info VALUES ('user_1735839332822', 4, 518);
INSERT INTO public.guess_info VALUES ('user_1735839832700', 3, 28);
INSERT INTO public.guess_info VALUES ('user_1735839832701', 6, 7);
INSERT INTO public.guess_info VALUES ('user_1735839626209', 3, 625);
INSERT INTO public.guess_info VALUES ('user_1735839815437', 3, 415);
INSERT INTO public.guess_info VALUES ('user_1735839626210', 6, 53);
INSERT INTO public.guess_info VALUES ('user_1735839815438', 6, 265);
INSERT INTO public.guess_info VALUES ('user_1735839724324', 3, 76);
INSERT INTO public.guess_info VALUES ('user_1735839834271', 3, 160);
INSERT INTO public.guess_info VALUES ('user_1735839724325', 6, 207);
INSERT INTO public.guess_info VALUES ('user_1735839821568', 3, 690);
INSERT INTO public.guess_info VALUES ('user_1735839834272', 6, 73);
INSERT INTO public.guess_info VALUES ('user_1735839821569', 6, 144);
INSERT INTO public.guess_info VALUES ('user_1735839747400', 3, 78);
INSERT INTO public.guess_info VALUES ('user_1735839747401', 6, 196);
INSERT INTO public.guess_info VALUES ('user_1735839823603', 3, 282);
INSERT INTO public.guess_info VALUES ('user_1735839757650', 3, 234);
INSERT INTO public.guess_info VALUES ('user_1735839823604', 6, 242);
INSERT INTO public.guess_info VALUES ('user_1735839757651', 6, 152);
INSERT INTO public.guess_info VALUES ('user_1735839910092', 3, 215);
INSERT INTO public.guess_info VALUES ('user_1735839910093', 6, 78);
INSERT INTO public.guess_info VALUES ('user_1735839759530', 3, 603);
INSERT INTO public.guess_info VALUES ('user_1735839825331', 3, 241);
INSERT INTO public.guess_info VALUES ('user_1735839759531', 6, 306);
INSERT INTO public.guess_info VALUES ('user_1735839825332', 6, 223);
INSERT INTO public.guess_info VALUES ('user_1735839761329', 3, 13);
INSERT INTO public.guess_info VALUES ('user_1735839761330', 6, 294);
INSERT INTO public.guess_info VALUES ('user_1735839912103', 3, 416);
INSERT INTO public.guess_info VALUES ('user_1735839827238', 3, 436);
INSERT INTO public.guess_info VALUES ('user_1735839763153', 3, 544);
INSERT INTO public.guess_info VALUES ('user_1735839912104', 6, 44);
INSERT INTO public.guess_info VALUES ('user_1735839827239', 6, 196);
INSERT INTO public.guess_info VALUES ('user_1735839763154', 6, 228);
INSERT INTO public.guess_info VALUES ('user_1735839765115', 3, 472);
INSERT INTO public.guess_info VALUES ('user_1735839829335', 3, 50);
INSERT INTO public.guess_info VALUES ('user_1735839765116', 6, 117);
INSERT INTO public.guess_info VALUES ('user_1735839829336', 6, 204);
INSERT INTO public.guess_info VALUES ('user_1735839926376', 3, 63);
INSERT INTO public.guess_info VALUES ('user_1735839831056', 3, 209);
INSERT INTO public.guess_info VALUES ('user_1735839926377', 6, 222);
INSERT INTO public.guess_info VALUES ('user_1735839831057', 6, 115);


--
-- Name: guess_info guess_info_name_key; Type: CONSTRAINT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.guess_info
    ADD CONSTRAINT guess_info_name_key UNIQUE (username);


--
-- PostgreSQL database dump complete
--

